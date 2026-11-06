import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Check, Clock3, Info, MapPin, Users, X } from 'lucide-react';
import { Photograph } from '@/components/photograph';
import { PackageSelector } from '@/components/package-selector';
import { ExperienceCard } from '@/components/experience-card';
import { JsonLd } from '@/components/json-ld';
import { experiences, duration, getExperience, isPastTrip, tripDates } from '@/lib/experiences';
import { metadata } from '@/lib/site';
import { tripBreadcrumbs } from '@/lib/seo';
export const generateStaticParams = () => experiences.map((trip) => ({ slug: trip.id }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const trip = getExperience((await params).slug);
  if (!trip) notFound();
  return metadata(trip.seo.title, trip.seo.description, `/experiences/${trip.id}`, false, { src: trip.image, alt: trip.imageAlt });
}
export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const trip = getExperience((await params).slug);
  if (!trip) notFound();
  const related = experiences.filter((item) => item.id !== trip.id && !item.id.startsWith(trip.id.split('-')[0])).slice(0, 3);
  return <><JsonLd data={tripBreadcrumbs(trip)}/><div className="container trip-intro"><Link href="/experiences" className="back-link"><ArrowLeft size={16}/> All experiences</Link><div className="trip-title-row"><h1>{trip.title}</h1><p><MapPin size={17}/>{trip.country}</p></div><div className="trip-facts"><span><CalendarDays size={17}/>{tripDates(trip)}</span><span><Clock3 size={17}/>{duration(trip)}</span>{trip.groupSize && <span><Users size={17}/>Advertised group: {trip.groupSize} travellers</span>}</div></div>
    <div className="container trip-photo"><Photograph src={trip.image} alt={trip.imageAlt} priority sizes="100vw"/></div>
    <div className="container trip-layout"><div className="trip-copy">{isPastTrip(trip) && <p className="notice">This departure date has passed. Ask DDTC about a future journey.</p>}<section><h2>A little closer to being there.</h2><p className="lead">{trip.description}</p>{trip.durationNote && <p>{trip.durationNote}</p>}{trip.accommodation && <p><strong>Advertised accommodation:</strong> {trip.accommodation}</p>}</section>
    <section className="trip-list-section"><h2>What’s part of the plan.</h2><ul className="check-list">{trip.inclusions.map((item) => <li key={item}><Check size={17}/><span>{item}</span></li>)}</ul></section>
    <section><h2>Know before you go.</h2><h3>Exclusions</h3>{trip.exclusions.length ? <ul className="check-list exclusions">{trip.exclusions.map((item) => <li key={item}><X size={16}/><span>{item}</span></li>)}</ul> : <p>Exclusions are not fully specified in the client material. Please ask DDTC for a written package breakdown.</p>}{trip.requirements.length > 0 && <><h3>Travel requirements</h3>{trip.requirements.map((item) => <p key={item}>{item}</p>)}</>}</section>
    <section><h2>Places and moments.</h2><p className="muted">Attractions featured in the poster. Inclusion and entry costs depend on the package; confirm with DDTC.</p><ul className="activities-list">{trip.activities.map((item) => <li key={item}><MapPin size={17}/>{item}</li>)}</ul></section>
    {trip.itinerary.length > 0 && <section><h2>Your time away.</h2><div className="itinerary">{trip.itinerary.map((day) => <div key={day.label}><h3>{day.label}</h3><p>{day.description}</p></div>)}</div></section>}
    {trip.paymentPlan.length > 0 && <section><h2>Advertised payment options.</h2><ul className="plain-list">{trip.paymentPlan.map((line) => <li key={line}>{line}</li>)}</ul><p className="small muted">Payment schedules and totals require DDTC’s written confirmation.</p></section>}
    {trip.paymentDeadline && <p>Advertised final-payment deadline: {new Intl.DateTimeFormat('en-ZA', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${trip.paymentDeadline}T12:00:00Z`))}. Reconfirm with DDTC.</p>}
    <section className="confirmation-notes"><h2><Info size={23}/> Details to confirm.</h2><p>These details come from client promotional material and are being verified. Please confirm them before making travel arrangements.</p><ul>{trip.verification.map((item) => <li key={item}>{item}</li>)}</ul><Link className="text-link" href="/booking-conditions">Read the draft booking information</Link></section>
    </div><PackageSelector trip={trip}/></div>
    <section className="container section"><div className="section-heading"><h2>Another place calling?</h2><Link className="text-link" href="/experiences">All experiences</Link></div><div className="experience-grid">{related.map((item) => <ExperienceCard key={item.id} trip={item}/>)}</div></section></>;
}
