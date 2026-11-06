import { z } from 'zod';

const packageSchema = z.object({
  id: z.string(), name: z.string(), transport: z.enum(['Road', 'Return flights']),
  price: z.number().positive(), deposit: z.number().positive().nullable(),
  departure: z.string().nullable(), inclusions: z.array(z.string()),
});
export const experienceSchema = z.object({
  id: z.string(), title: z.string(), destination: z.string(), country: z.string(),
  category: z.enum(['Local getaways', 'Beach holidays', 'Safari adventures', 'International']),
  description: z.string(), start: z.string(), end: z.string(),
  days: z.number().positive().nullable(), nights: z.number().nonnegative().nullable(),
  durationNote: z.string().nullable(), accommodation: z.string().nullable(),
  groupSize: z.number().positive().nullable(), image: z.string(), imageAlt: z.string(),
  packages: z.array(packageSchema).min(1), inclusions: z.array(z.string()),
  exclusions: z.array(z.string()), activities: z.array(z.string()),
  itinerary: z.array(z.object({ label: z.string(), description: z.string() })),
  requirements: z.array(z.string()), verification: z.array(z.string()),
  paymentPlan: z.array(z.string()), paymentDeadline: z.string().nullable(),
  sources: z.array(z.string()), status: z.literal('Confirm with DDTC'),
  seo: z.object({ title: z.string(), description: z.string() }),
});
export type Experience = z.infer<typeof experienceSchema>;
export type TripPackage = z.infer<typeof packageSchema>;
const poster = (time: string) => `WhatsApp Image 2026-10-27 at ${time}.jpeg`;
const generalVerification = [
  'Reconfirm advertised prices, current availability, departure point and booking deadline with DDTC.',
  'Final refund, cancellation and rescheduling wording requires client approval before publication as booking conditions; no binding terms are published here.',
];
const crossBorder = ['Confirm passport, entry permission and any applicable travel requirements with DDTC before booking.'];
const base = {
  status: 'Confirm with DDTC' as const, durationNote: null, groupSize: null, accommodation: null,
  days: null, nights: null, itinerary: [], exclusions: [], requirements: [], paymentPlan: [], paymentDeadline: null,
};
const road = (price: number, deposit: number | null, inclusions: string[] = []): TripPackage => ({
  id: 'road', name: 'Road package', transport: 'Road', price, deposit, departure: null, inclusions,
});
const lesothoInclusions = ['Return transport to Lesotho', 'Daily breakfast', 'Local driving in Lesotho', 'Day visit to Golden Gate Highlands National Park', 'Half-day visit to Clarens', 'Afriski Mountain Resort visit', 'DDTC T-shirt'];
const lesothoVerification = ['The combined poster specifies 4 days / 3 nights but does not list accommodation among the inclusions. Supply the property and room basis, and clarify whether accommodation is included.', 'Visits and daily breakfast are listed. Clarify whether attraction admission, skiing or equipment hire and other meals are included or extra.', ...generalVerification];

export const experiences: Experience[] = z.array(experienceSchema).parse([
  {
    ...base, id: 'cape-town-december-2027', title: 'Cape Town Holiday', destination: 'Cape Town', country: 'South Africa', category: 'Beach holidays',
    description: 'Four days of coastal scenery, harbour discoveries and the freedom to explore the Mother City. Choose the road journey or return flights.',
    start: '2027-12-10', end: '2027-12-13', days: 4, nights: 3, groupSize: 8,
    image: 'cape-town-coast.jpg', imageAlt: 'Cape Town coastline and mountains',
    packages: [
      { ...road(7937, 2687), departure: '2027-12-09', inclusions: ['Road transport to Cape Town (H1 minibus)', 'Local driving for activities'] },
      { id: 'flights', name: 'Return flights package', transport: 'Return flights', price: 10487, deposit: 2687, departure: null, inclusions: ['Return flights', 'Cape Town airport-to-hotel shuttle', 'Local driving for activities'] },
    ],
    inclusions: ['Accommodation', 'Daily breakfast'], exclusions: ['All activity costs'],
    activities: ['Robben Island', 'Cape Town boat cruise', 'Cape Point', 'Cape Town beaches and natural attractions'],
    verification: ['Supply the hotel, room basis and flight origin; these are not named in the poster.', 'The road departure is 9 December and the advertised 4-day / 3-night stay is 10–13 December. Clarify the road travel schedule and any additional overnight arrangements.', ...generalVerification],
    sources: [poster('19.11.04')], seo: { title: 'Cape Town Holiday · December 2027', description: 'Explore DDTC’s advertised Cape Town road and flight packages for 10–13 December 2027 and enquire about the details.' },
  },
  {
    ...base, id: 'mpumalanga-october-2027', title: 'Mpumalanga Panorama', destination: 'Mpumalanga', country: 'South Africa', category: 'Local getaways',
    description: 'Follow the Panorama Route through dramatic canyon views, waterfalls and underground worlds on a small-group getaway.',
    start: '2027-10-28', end: '2027-10-31', days: 4, nights: 3, accommodation: 'Panorama (property description as advertised; exact property to confirm)', groupSize: 10,
    image: 'blyde-river-canyon.jpg', imageAlt: 'Blyde River Canyon and the Three Rondavels in Mpumalanga',
    packages: [road(5497, 1000)],
    inclusions: ['Accommodation (Panorama)', 'Return transport', 'Lone Creek Falls visit', 'Sudwala Caves visit', 'Echo Caves visit', 'God’s Window visit', 'Tour guide assistance'],
    activities: ['God’s Window', 'Three Rondavels', 'Lone Creek Falls', 'Sudwala Caves', 'Echo Caves'],
    paymentPlan: ['Booking deposit: R1,000 in month 1', '10 monthly payments of R408.82 in months 2–11', 'Final payment: R408.80 in month 12', 'Advertised total: R5,497'],
    verification: ['Confirm the payment-plan start date and whether the full 12-month plan remains possible.', 'Confirm meals, attraction admission fees and whether Three Rondavels is included or suggested only.', ...generalVerification],
    sources: [poster('19.11.01 (1)')], seo: { title: 'Mpumalanga Panorama · October 2027', description: 'Discover DDTC’s 28–31 October 2027 Mpumalanga package, advertised at R5,497 per person.' },
  },
  {
    ...base, id: 'botswana-victoria-falls-may-2027', title: 'Botswana & Victoria Falls', destination: 'Botswana & Victoria Falls', country: 'Botswana / Zimbabwe', category: 'Safari adventures',
    description: 'A Chobe river cruise, a safari game drive and the spectacle of Victoria Falls, brought together in one cross-border journey.',
    start: '2027-05-06', end: '2027-05-09', days: 4, nights: 3, accommodation: 'Kwalape (as advertised)',
    image: 'victoria-falls.jpg', imageAlt: 'The broad cascade of Victoria Falls', packages: [road(11300, 4800)],
    inclusions: ['Road transport (H1 minibus)', 'Three nights at Kwalape', 'Daily breakfast as per quotation', 'Guided visit to Victoria Falls', 'Chobe National Park game drive', 'Chobe River boat cruise', 'Park fees and local transfers', 'Time to explore local markets and attractions'],
    activities: ['Victoria Falls guided visit', 'Chobe National Park game drive', 'Chobe River boat cruise', 'Local markets'], requirements: crossBorder,
    verification: ['Park fees and local transfers are explicitly included. Clarify the Victoria Falls border route and whether visa or border charges are also included.', 'The poster includes a Chobe National Park game drive, Chobe River cruise and guided Victoria Falls visit. Supply their schedule; wildlife sightings are not guaranteed.', 'Exclusions are not specified; clarify lunches, dinners and personal expenses.', ...generalVerification],
    sources: [poster('19.11.06 (1)')], seo: { title: 'Botswana & Victoria Falls · May 2027', description: 'Enquire about DDTC’s 6–9 May 2027 Botswana and Victoria Falls journey with advertised safari and boat-cruise inclusions.' },
  },
  ...(['winter', 'mountain'] as const).map((season) => ({
    ...base, id: `lesotho-${season === 'winter' ? 'june' : 'august'}-2027`, title: season === 'winter' ? 'Lesotho Winter Escape' : 'Lesotho Mountain Adventure', destination: 'Lesotho', country: 'Lesotho / South Africa', category: 'International',
    description: 'Explore the Kingdom in the Sky, with mountain scenery, Afriski, a day in Golden Gate Highlands and time in Clarens.',
    start: season === 'winter' ? '2027-06-24' : '2027-08-19', end: season === 'winter' ? '2027-06-27' : '2027-08-22', days: 4, nights: 3,
    image: 'lesotho-mountains.jpg', imageAlt: 'High mountain scenery in Lesotho', packages: [road(7500, 3000)],
    inclusions: lesothoInclusions, activities: ['Afriski Mountain Resort', 'Golden Gate Highlands National Park', 'Clarens', 'Lesotho mountain scenery'],
    requirements: crossBorder, verification: lesothoVerification,
    sources: season === 'winter' ? [poster('19.10.59'), poster('19.11.01')] : [poster('19.11.01')],
    seo: { title: `Lesotho ${season === 'winter' ? 'Winter Escape · June' : 'Mountain Adventure · August'} 2027`, description: 'Discover DDTC’s advertised four-day Lesotho getaway with return road transport, breakfast, Golden Gate and Clarens visits.' },
  })),
  {
    ...base, id: 'durban-christmas-2027', title: 'Durban Christmas Escape', destination: 'Durban', country: 'South Africa', category: 'Beach holidays',
    description: 'Spend Christmas by the sea, with three nights on Durban’s beachfront, a harbour cruise and a visit to uShaka Marine World.',
    start: '2027-12-23', end: '2027-12-26', days: 4, nights: 3, accommodation: 'The Edward Hotel', groupSize: 10,
    image: 'durban-beachfront.jpg', imageAlt: 'The beachfront and ocean in Durban', packages: [road(8600, null)],
    inclusions: ['Three nights at The Edward Hotel', 'Return transport', 'uShaka Marine World entry', 'Wine tasting at Highgate Wine Estate on the way to Durban', 'Boat cruise with Madevu', 'Courtesy gift from DDTC'],
    activities: ['uShaka Marine World', 'Highgate Wine Estate (Howick)', 'Madevu harbour boat cruise', 'Durban beachfront'],
    itinerary: [
      { label: '23 December', description: 'Depart, wine tasting at Highgate Wine Estate, continue to Durban and check in at The Edward Hotel.' },
      { label: '24 December', description: 'Visit uShaka Marine World.' },
      { label: '25 December', description: 'Christmas Day boat cruise with Madevu.' },
      { label: '26 December', description: 'Breakfast, check-out and return journey.' },
    ],
    paymentPlan: ['Standard: 11 payments of R720 and a final payment of R680. Total R8,600.', 'Extended: R615 per month over 14 months. Total R8,610.', 'Flexible: R575 per month over 15 months. Total R8,625.'],
    verification: ['The three plans have separately advertised totals of R8,600, R8,610 and R8,625. Supply their payment start dates and clarify whether any separate deposit is required.', 'The Edward Hotel and 3 nights are specified; supply the room-sharing basis and exclusions.', 'Breakfast appears in the final-day itinerary, but daily breakfast is not explicitly listed as an inclusion. Clarify meals on the other days.', ...generalVerification],
    sources: [poster('19.11.03')], seo: { title: 'Durban Christmas Escape · December 2027', description: 'Enquire about DDTC’s 23–26 December 2027 Durban holiday, with The Edward Hotel, uShaka entry and a harbour cruise as advertised.' },
  },
  {
    ...base, id: 'durban-may-2027', title: 'Durban Beach Escape', destination: 'Durban', country: 'South Africa', category: 'Beach holidays',
    description: 'Enjoy Durban’s coastline with accommodation at Garden Court South Beach, breakfast, a boat cruise and uShaka Marine World entry in the advertised package.',
    start: '2027-05-14', end: '2027-05-18', durationNote: '14–18 May; number of accommodation nights and travel schedule to confirm', accommodation: 'Garden Court South Beach Durban', groupSize: 8,
    image: 'durban-beachfront.jpg', imageAlt: 'The beachfront and ocean in Durban', packages: [{ ...road(7068, 3570), name: 'Durban package' }],
    inclusions: ['Accommodation at Garden Court South Beach Durban', 'Breakfast', 'Boat cruise', 'uShaka Marine World entry', 'Local driving around Durban for activities'],
    exclusions: ['Wine tasting at High Gate Estate (as printed)', 'Mandela Capture Site visit', 'Pavilion Mall shopping', 'Durban nightlife activities'],
    activities: ['Durban beachfront', 'Boat cruise', 'uShaka Marine World', 'High Gate Estate wine tasting (optional, own cost)', 'Mandela Capture Site (optional, own cost)', 'Pavilion Mall shopping (own cost)', 'Durban nightlife (optional, own cost)'],
    verification: ['Garden Court South Beach Durban and breakfast are specified; supply the number of accommodation nights and room-sharing basis.', 'The poster includes local driving around Durban but does not explicitly include transport to or from Durban. Clarify intercity transport, pickup points and any extra cost.', 'A boat cruise and uShaka Marine World entry are included. Supply the cruise operator and the specific uShaka ticket or attraction access.', 'Wine tasting, Mandela Capture Site, Pavilion Mall shopping and nightlife are explicitly at own cost. Clarify the identity/location of High Gate Estate as printed and optional activity arrangements.', ...generalVerification],
    sources: ['WhatsApp Image 2026-11-02 at 20.47.04.jpeg'], seo: { title: 'Durban Beach Escape · May 2027', description: 'Ask DDTC about the 14–18 May 2027 Durban package, advertised at R7,068 per person with Garden Court South Beach accommodation.' },
  },
  {
    ...base, id: 'durban-valentines-february-2027', title: 'Durban Valentine’s Escape', destination: 'Durban', country: 'South Africa', category: 'Beach holidays',
    description: 'Celebrate Valentine’s in Durban with an advertised stay at ONOMO Hotel North Beach, daily breakfast, a romantic dinner and a boat cruise.',
    start: '2027-02-11', end: '2027-02-14', durationNote: '11–14 February; number of accommodation nights and travel schedule to confirm', accommodation: 'ONOMO Hotel North Beach (as advertised)',
    image: 'durban-beachfront.jpg', imageAlt: 'The beachfront and ocean in Durban', packages: [road(5860, 2430)],
    inclusions: ['Accommodation at ONOMO Hotel North Beach', 'Daily breakfast', 'Transport to Durban', 'Romantic dinner (printed as “Romantic Galler Dinner”; details to confirm)', 'Boat cruise'],
    activities: ['Romantic dinner', 'Boat cruise', 'Durban beachfront'],
    verification: ['ONOMO Hotel North Beach is named and the price is per person. Supply the room-sharing basis and number of accommodation nights.', 'Transport to Durban is included. Supply the departure point, pickup times and schedule, and clarify whether return transport is also included.', 'A romantic dinner is included; clarify the printed “Romantic Galler Dinner” wording and dinner arrangements.', 'A boat cruise is included; supply the operator, schedule and any package exclusions.', ...generalVerification],
    sources: ['WhatsApp Image 2026-11-02 at 20.47.05.jpeg'], seo: { title: 'Durban Valentine’s Escape · February 2027', description: 'Enquire about DDTC’s 11–14 February 2027 Durban Valentine’s trip, advertised at R5,860 per person with a R2,430 deposit.' },
  },
  {
    ...base, id: 'mozambique-september-2027', title: 'Mozambique Coastal Escape', destination: 'Mozambique', country: 'Mozambique', category: 'Beach holidays',
    description: 'Warm coastal scenery and time to explore Mozambique, with road travel, accommodation and breakfast arranged in the advertised package.',
    start: '2027-09-16', end: '2027-09-19', durationNote: '16–19 September; overnight stay details to confirm', accommodation: 'Hotel Kapital (as printed; exact property to confirm)',
    image: 'mozambique-coast.jpg', imageAlt: 'Coastal scenery in Mozambique', packages: [road(7500, 2500)],
    inclusions: ['Road transport to Mozambique', 'Accommodation at Hotel Kapital', 'Local driving for activities', 'Daily breakfast'],
    activities: ['Bazaruto Archipelago (featured destination)', 'Tofo Beach (featured destination)', 'Marine life experiences (featured)', 'Maputo City (featured destination)'], requirements: crossBorder,
    verification: ['Maputo, Tofo and Bazaruto are shown as attractions, but no itinerary or admission inclusions are supplied. Clarify which are actually visited.', 'Hotel Kapital is named. Supply its location, room basis and number of nights; these are not stated in the poster.', 'Local driving is included; clarify activity/admission costs, exclusions and whether return transport is included.', ...generalVerification],
    sources: [poster('19.11.05 (1)')], seo: { title: 'Mozambique Coastal Escape · September 2027', description: 'See DDTC’s advertised Mozambique package for 16–19 September 2027 and ask for the confirmed route and accommodation details.' },
  },
  {
    ...base, id: 'bali-august-2027', title: 'Bali & Singapore', destination: 'Bali', country: 'Indonesia / Singapore', category: 'International',
    description: 'Discover Ubud, Seminyak and Uluwatu, with a Singapore day visit advertised alongside return connecting flights.',
    start: '2027-08-03', end: '2027-08-13', durationNote: '3–13 August; flight and overnight schedule to confirm', accommodation: 'Karunia House Lodge, Ubud; Kaia Raya Surf Lodge, Seminyak; Umi Resort, Uluwatu (names as printed)',
    image: 'bali-temple.jpg', imageAlt: 'Temple architecture and landscape in Bali',
    packages: [{ id: 'flights', name: 'Return flights package', transport: 'Return flights', price: 31150, deposit: 4000, departure: null, inclusions: ['Return flights with one stop connecting in Singapore'] }],
    inclusions: ['Day visit to Singapore', 'Accommodation in three locations: Ubud, Seminyak and Uluwatu', 'Breakfast at all advertised accommodation', 'Transfers (as advertised)', 'Visa fee (printed as “Ivisa fee”; verify)'],
    activities: ['Singapore day visit', 'Ubud', 'Seminyak', 'Uluwatu'], requirements: crossBorder,
    verification: ['Return flights via Singapore and transfers are listed. Supply the flight origin, schedule, baggage allowance and the specific transfer routes covered.', 'Karunia House Lodge, Kaia Raya Surf Lodge and Umi Resort are named. Supply the nights at each property and room-sharing basis.', 'The printed “Ivisa fee” wording is unclear. Clarify the visa service, fee, eligibility and country covered.', 'Supply exclusions and optional activity costs; clarify arrangements for the advertised Singapore day visit.', ...generalVerification],
    sources: [poster('19.11.05')], seo: { title: 'Bali & Singapore · August 2027', description: 'Explore DDTC’s advertised Bali and Singapore journey for 3–13 August 2027, from R31,150 per person subject to confirmation.' },
  },
  {
    ...base, id: 'gold-reef-city-november-2026', title: 'Gold Reef City Day Out', destination: 'Gold Reef City', country: 'South Africa', category: 'Local getaways',
    description: 'One day of rides and shared memories in Johannesburg, with entrance, ride access, snacks and transport advertised together.',
    start: '2026-11-21', end: '2026-11-21', days: 1, nights: 0,
    image: 'johannesburg-skyline.jpg', imageAlt: 'Johannesburg, the city home to Gold Reef City', packages: [road(1000, 300)],
    inclusions: ['Transport to Gold Reef City', 'Entrance fee', 'All ride access (as advertised; park restrictions to confirm)', 'Snacks'],
    exclusions: ['Lunch meals and drinks'], activities: ['Gold Reef City theme park rides'],
    verification: ['R1,000 is advertised for Madibeng areas, Mabopane, Soshanguve and Pretoria. Price may change according to pickup location.', 'Confirm return transport, pickup points and times, age or height restrictions, and park operating arrangements.', 'The poster does not explicitly label the price as per person; confirm the pricing basis.', ...generalVerification],
    sources: [poster('19.11.03 (1)')], seo: { title: 'Gold Reef City Day Out · November 2026', description: 'Ask DDTC about the 21 November 2026 Gold Reef City day trip, advertised at R1,000 with pickup-dependent pricing.' },
  },
  {
    ...base, id: 'mpumalanga-december-2026', title: 'Mpumalanga Summer Getaway', destination: 'Mpumalanga', country: 'South Africa', category: 'Local getaways',
    description: 'A three-night summer getaway through Mpumalanga’s canyon viewpoints, waterfalls and caves.',
    start: '2026-12-18', end: '2026-12-21', nights: 3, durationNote: '18–21 December, with 3 nights advertised',
    image: 'blyde-river-canyon.jpg', imageAlt: 'The Three Rondavels above the Blyde River Canyon', packages: [road(4600, 1800)],
    inclusions: ['Three nights’ accommodation', 'Transport', 'Daily breakfast', 'Local driving for activities', 'Visits to Three Rondavels, Sudwala Caves, Echo Caves, Lone Creek Falls and Potholes'],
    exclusions: ['All other activities are at the traveller’s own cost'], activities: ['Three Rondavels', 'Sudwala Caves', 'Echo Caves', 'Lone Creek Falls', 'Potholes (exact site to confirm)'], paymentDeadline: '2026-12-15',
    verification: ['Three nights, daily breakfast, transport and the listed attraction visits are included. Supply the accommodation property, room basis, transport origin and return arrangement.', 'Clarify whether admission fees for the listed visits are covered, and which site the printed “Potholes” refers to.', ...generalVerification],
    sources: [poster('19.11.06')], seo: { title: 'Mpumalanga Summer Getaway · December 2026', description: 'Discover DDTC’s 18–21 December 2026 Mpumalanga trip, advertised at R4,600 per person with three nights’ accommodation.' },
  },
]);

export function getExperience(id: string) { return experiences.find((trip) => trip.id === id); }
export function lowestPrice(trip: Experience) { return Math.min(...trip.packages.map((option) => option.price)); }
export function money(amount: number) { return `R${new Intl.NumberFormat('en-ZA', { maximumFractionDigits: 2 }).format(amount).replace(/\u00a0/g, ' ')}`; }
export function tripDates(trip: Pick<Experience, 'start' | 'end'>) {
  const start = new Date(`${trip.start}T12:00:00Z`);
  const end = new Date(`${trip.end}T12:00:00Z`);
  const month = new Intl.DateTimeFormat('en-ZA', { month: 'short', timeZone: 'UTC' }).format(start);
  return trip.start === trip.end ? `${start.getUTCDate()} ${month} ${start.getUTCFullYear()}` : `${start.getUTCDate()}–${end.getUTCDate()} ${month} ${start.getUTCFullYear()}`;
}
export function duration(trip: Experience) { return trip.days && trip.nights !== null ? trip.nights ? `${trip.days} days · ${trip.nights} nights` : 'Day trip' : trip.nights ? `${trip.nights} nights` : 'Schedule to confirm'; }
export function isPastTrip(trip: Experience, today = new Date().toISOString().slice(0, 10)) { return trip.end < today; }
