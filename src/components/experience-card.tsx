import Link from 'next/link';
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { type Experience, duration, isPastTrip, lowestPrice, money, tripDates } from '@/lib/experiences';
import { Photograph } from './photograph';
export function ExperienceCard({ trip }: { trip: Experience }) {
  return <article className="experience-card">
    <Link className="card-photo-link" href={`/experiences/${trip.id}`} tabIndex={-1} aria-hidden="true"><Photograph src={trip.image} alt={trip.imageAlt} sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"/><span className="photo-caption">{trip.country}</span><span className="card-arrow"><ArrowUpRight size={22}/></span></Link>
    <div className="card-details"><div className="card-topline"><span><CalendarDays size={14}/>{tripDates(trip)}</span><span>{duration(trip)}</span></div>
    <h3><Link href={`/experiences/${trip.id}`}>{trip.title}</Link></h3><p className="card-location"><MapPin size={14}/>{trip.destination}</p>
    <div className="card-price"><div><span className="small muted">Advertised from</span><p>{money(lowestPrice(trip))}<span> / {trip.id.startsWith('gold-reef') ? 'pricing basis to confirm' : 'person'}</span></p></div></div><p className="card-verification">{isPastTrip(trip) ? 'Past departure · enquire about future dates' : 'Price & availability to confirm'}</p></div>
  </article>;
}
