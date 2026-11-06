import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { experiences, experienceSchema, getExperience, isPastTrip, money, tripDates } from '../src/lib/experiences';
import { enquiryMessage, enquirySchema } from '../src/lib/enquiry';
import { whatsapp } from '../src/lib/site';

test('all twelve source posters are preserved and mapped to structured content', () => {
  const originals = JSON.parse(readFileSync('poster-original-hashes.json', 'utf8').replace(/^\uFEFF/, '')) as { Hash: string; Path: string }[];
  assert.equal(originals.length, 12);
  const filenames = readdirSync('events');
  const mapped = new Set(experiences.flatMap((trip) => trip.sources));
  for (const source of originals) {
    const filename = source.Path.split(/[/\\]/).pop()!;
    const current = createHash('sha256').update(readFileSync(`events/${filename}`)).digest('hex');
    assert.equal(current, source.Hash.toLowerCase(), filename);
    assert.ok(mapped.has(filename), `Missing extracted content for ${filename}`);
  }
  assert.equal(filenames.length, 12);
});
test('trip IDs are unique, dates ordered, images exist and all prices remain provisional', () => {
  assert.equal(experiences.length, 12);
  assert.equal(new Set(experiences.map((trip) => trip.id)).size, 12);
  for (const trip of experiences) {
    assert.ok(experienceSchema.safeParse(trip).success);
    assert.ok(trip.start <= trip.end);
    assert.equal(trip.status, 'Confirm with DDTC');
    assert.ok(readFileSync(`public/images/${trip.image}`).length > 10000);
    assert.ok(trip.verification.length > 0);
  }
});
test('Cape Town retains 2027 dates and distinct road/flight prices and shared deposit', () => {
  const trip = getExperience('cape-town-december-2027')!;
  assert.equal(trip.start, '2027-12-10'); assert.equal(trip.end, '2027-12-13');
  assert.deepEqual(trip.packages.map((option) => option.price), [7937, 10487]);
  assert.deepEqual(trip.packages.map((option) => option.deposit), [2687, 2687]);
  assert.equal(trip.packages[0].departure, '2027-12-09');
  assert.deepEqual(trip.exclusions, ['All activity costs']);
});
test('Lesotho and Mpumalanga departures are distinct; missing details remain null', () => {
  const winter = getExperience('lesotho-june-2027')!;
  assert.equal(winter.accommodation, null);
  assert.equal(winter.sources.length, 2);
  assert.equal(getExperience('lesotho-august-2027')!.start, '2027-08-19');
  assert.equal(getExperience('mpumalanga-december-2026')!.packages[0].price, 4600);
  assert.equal(getExperience('mpumalanga-october-2027')!.packages[0].price, 5497);
  assert.equal(getExperience('durban-christmas-2027')!.packages[0].deposit, null);
  assert.equal(getExperience('bali-august-2027')!.nights, null);
});
test('trip dates and archive logic use dates without assigning availability', () => {
  const trip = getExperience('cape-town-december-2027')!;
  assert.equal(tripDates(trip), '10–13 Dec 2027');
  assert.equal(isPastTrip(trip, '2027-12-13'), false);
  assert.equal(isPastTrip(trip, '2027-12-14'), true);
  assert.equal(money(7937), 'R7 937');
});
test('new Durban departures retain poster facts without duplicating existing trips or inventing inclusions', () => {
  const may = getExperience('durban-may-2027')!;
  const valentines = getExperience('durban-valentines-february-2027')!;
  assert.deepEqual([may.start, may.end, may.packages[0].price, may.packages[0].deposit, may.groupSize], ['2027-05-14', '2027-05-18', 7068, 3570, 8]);
  assert.equal(may.accommodation, 'Garden Court South Beach Durban');
  assert.equal(may.nights, null);
  assert.ok(may.inclusions.includes('uShaka Marine World entry'));
  assert.ok(may.exclusions.includes('Mandela Capture Site visit'));
  assert.ok(!may.inclusions.some((item) => /transport to|return transport|wine tasting/i.test(item)));
  assert.deepEqual([valentines.start, valentines.end, valentines.packages[0].price, valentines.packages[0].deposit], ['2027-02-11', '2027-02-14', 5860, 2430]);
  assert.equal(valentines.accommodation, 'ONOMO Hotel North Beach (as advertised)');
  assert.equal(valentines.nights, null);
  assert.ok(valentines.inclusions.includes('Daily breakfast'));
  assert.ok(valentines.inclusions.includes('Boat cruise'));
  assert.equal(experiences.filter((trip) => trip.id === 'mozambique-september-2027').length, 1);
  assert.equal(experiences.filter((trip) => trip.id === 'durban-christmas-2027').length, 1);
});
const valid = { name: 'Test Traveller', email: 'test@example.com', phone: '+27 64 058 4396', destination: 'Cape Town', dates: 'December 2027', travellers: 2, budget: 'R5,000–R10,000', type: 'Family', requirements: 'Window seat & two rooms', package: 'Return flights', consent: true, website: '' };
test('enquiry rejects missing consent, invalid contacts and honeypot content', () => {
  assert.ok(enquirySchema.safeParse(valid).success);
  for (const invalid of [{ ...valid, consent: false }, { ...valid, email: 'bad' }, { ...valid, phone: 'not a phone' }, { ...valid, travellers: 0 }, { ...valid, travellers: 1.5 }, { ...valid, website: 'spam' }]) assert.equal(enquirySchema.safeParse(invalid).success, false);
});
test('WhatsApp preserves package and enquiry details through URL encoding', () => {
  const parsed = enquirySchema.parse(valid);
  const message = enquiryMessage(parsed);
  const url = new URL(whatsapp(message));
  assert.equal(url.hostname, 'wa.me'); assert.equal(url.pathname, '/27640584396');
  assert.equal(url.searchParams.get('text'), message);
  assert.ok(message.includes('Preferred package: Return flights'));
  assert.ok(message.includes('Window seat & two rooms'));
});
