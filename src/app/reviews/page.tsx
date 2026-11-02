import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { Photograph } from '@/components/photograph';
import { EnquiryCTA } from '@/components/enquiry-cta';
import { metadata } from '@/lib/site';
export const generateMetadata = () => metadata('Traveller Stories', 'Client-supplied traveller story summaries from DDTC journeys. Publication approval and reviewer details are pending.', '/reviews', true);
const stories = [
  ['Mpumalanga', 'Waterfalls, wide views and good company.', 'The traveller described breakfast buffets, accommodation, organised transport and visits to waterfalls, Bourke’s Luck Potholes and the Three Rondavels. They praised reliable transport and recommended DDTC for future travel.', 'blyde-river-canyon.jpg'],
  ['Botswana & Victoria Falls · 2023', 'A little further from the familiar.', 'The customer travelled with DDTC in 2023, visiting Botswana and Victoria Falls through Zimbabwe. They praised transport and accommodation arrangements, and the assistance they received while travelling in a foreign country.', 'victoria-falls.jpg'],
  ['Durban', 'From the harbour to the beach.', 'The customer described hotels, boat cruising, uShaka Marine World, Moses Mabhida Stadium and beaches. They praised transport, accommodation, food and the CEO’s communication when plans changed.', 'durban-beachfront.jpg'],
  ['Cape Town · February 2022', 'Three days in the Mother City.', 'The traveller described a three-day, two-night trip, including the Capetonian Hotel, breakfast, Stellenbosch wine tasting, Table Mountain Cableway and a boat cruise.', 'cape-town-coast.jpg'],
  ['Personal care', 'Feeling at home, away from home.', 'A reviewer described the tour as a family experience and said they felt safe and at home away from home.', 'lesotho-mountains.jpg'],
  ['South African adventures', 'So many ways to make a memory.', 'A reviewer praised trips involving nightlife, beaches, hiking, food, hotels and adventure experiences.', 'cape-town-panorama.jpg'],
];
export default function Reviews() {
  const preview = process.env.NODE_ENV !== 'production';
  return <><PageIntro title="The memories speak for themselves."><p>The places stay with you. So do the people you share them with.</p></PageIntro><div className="container"><div className="notice"><h2>{preview ? 'Traveller stories · internal preview' : 'Traveller stories are being prepared.'}</h2><p>{preview ? 'These are edited summaries of client-supplied experiences, not direct quotations. Names and publication consent are pending. These summaries are hidden in production builds.' : 'We’re confirming reviewer details and permission before sharing customer stories here. In the meantime, explore our experiences or talk to DDTC about your journey.'}</p>{!preview && <Link className="text-link" href="/experiences">Explore experiences</Link>}</div>{preview && <div className="reviews-grid">{stories.map(([location, title, text, photo]) => <article className="review-story" key={title}><Photograph src={photo} alt={`Destination scenery for ${location}; no customer portrait`}/><div><span className="story-place"><MapPin size={15}/>{location}</span><h2>{title}</h2><p>{text}</p><p className="small muted">Summary · reviewer name & publication consent pending</p></div></article>)}</div>}</div><EnquiryCTA/></>;
}
