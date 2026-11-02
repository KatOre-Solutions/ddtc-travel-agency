'use client';
import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { Experience } from '@/lib/experiences';
import { isPastTrip, lowestPrice } from '@/lib/experiences';
import { ExperienceCard } from './experience-card';
const categories = ['All experiences', 'Local getaways', 'Beach holidays', 'Safari adventures', 'International'];
export function Catalogue({ trips, featured = false }: { trips: Experience[]; featured?: boolean }) {
  const [category, setCategory] = useState('All experiences');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recommended');
  const [period, setPeriod] = useState('upcoming');
  const matching = trips.filter((trip) => (category === 'All experiences' || trip.category === category) && `${trip.title} ${trip.destination} ${trip.country}`.toLowerCase().includes(search.toLowerCase()) && (featured || period === 'all' || (period === 'past' ? isPastTrip(trip) : !isPastTrip(trip))));
  if (sort === 'date') matching.sort((a, b) => a.start.localeCompare(b.start));
  if (sort === 'price') matching.sort((a, b) => lowestPrice(a) - lowestPrice(b));
  const visible = featured ? matching.slice(0, 3) : matching;
  return <div className="catalogue">
    <div className="filter-tabs" aria-label="Filter experiences by category">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    {!featured && <div className="catalogue-tools"><label className="search-field"><Search size={19}/><span className="sr-only">Search experiences</span><input placeholder="Find your destination…" value={search} onChange={(e) => setSearch(e.target.value)}/></label><label className="sort-field"><SlidersHorizontal size={16}/><span className="sr-only">Sort experiences</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="date">Departure date</option><option value="price">Lowest advertised price</option></select></label><label className="sort-field"><span className="sr-only">Departure period</span><select value={period} onChange={(e) => setPeriod(e.target.value)}><option value="upcoming">Future departures</option><option value="past">Past departures</option><option value="all">All departures</option></select></label></div>}
    {!featured && <p className="results-count" role="status">{matching.length} {matching.length === 1 ? 'experience' : 'experiences'} to explore</p>}
    {visible.length ? <div className="experience-grid" aria-live="polite">{visible.map((trip) => <ExperienceCard key={trip.id} trip={trip}/>)}</div> : <div className="empty-state"><h3>No journeys found just yet.</h3><p>Try a different destination or category. DDTC can also help plan something for you.</p><button className="button button-secondary" onClick={() => { setSearch(''); setCategory('All experiences'); setPeriod('all'); }}>Clear filters</button></div>}
  </div>;
}
