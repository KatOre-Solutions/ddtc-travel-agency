'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, BusFront, Check, Plane } from 'lucide-react';
import { type Experience, money, tripDates } from '@/lib/experiences';
export function PackageSelector({ trip }: { trip: Experience }) {
  const [packageId, setPackageId] = useState(trip.packages[0].id);
  const selected = trip.packages.find((item) => item.id === packageId)!;
  const query = new URLSearchParams({ trip: trip.id, package: selected.id });
  return <aside className="package-panel" aria-label="Select your travel package"><h2>Your journey, your way.</h2><p className="muted">{tripDates(trip)}</p>
    <fieldset className="package-options"><legend>Choose a package</legend>{trip.packages.map((option) => <label key={option.id} className={`package-option ${selected.id === option.id ? 'selected' : ''}`}><input type="radio" name="trip-package" value={option.id} checked={selected.id === option.id} onChange={() => setPackageId(option.id)}/>{option.transport === 'Road' ? <BusFront size={21}/> : <Plane size={21}/>}<span>{option.name}</span><span className="radio-mark">{selected.id === option.id && <Check size={12}/>}</span></label>)}</fieldset>
    <div className="selected-price" aria-live="polite"><span className="small muted">Advertised package price</span><p>{money(selected.price)}<span>{trip.id.startsWith('gold-reef') ? 'pricing basis to confirm' : 'per person'}</span></p><p className="deposit-info">{selected.deposit ? `Advertised deposit ${money(selected.deposit)}` : 'Deposit to confirm with DDTC'}</p></div>
    {selected.departure && <p className="small">Road departure: {new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${selected.departure}T12:00:00Z`))}</p>}
    {selected.inclusions.length > 0 && <ul className="check-list small">{selected.inclusions.map((item) => <li key={item}><Check size={15}/><span>{item}</span></li>)}</ul>}
    <Link className="button full-width" href={`/contact?${query}`}>Enquire About This Trip <ArrowUpRight size={18}/></Link><p className="small muted package-disclaimer">Confirm price and availability with DDTC.<br/>No payment or reservation is made here.</p>
  </aside>;
}
