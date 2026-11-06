import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { EnquiryForm } from '@/components/enquiry-form';
import { getExperience, tripDates } from '@/lib/experiences';
import { company, metadata, whatsapp } from '@/lib/site';
export const generateMetadata = () => metadata('Contact & Travel Enquiries', 'Contact DDTC Travel Agency in Rabokala, Brits. Call or WhatsApp +27 64 058 4396 for holiday packages, group trips and travel enquiries.', '/contact');
export default async function Contact({ searchParams }: { searchParams: Promise<{ trip?: string; package?: string; destination?: string }> }) {
  const query = await searchParams;
  const trip = query.trip ? getExperience(query.trip) : undefined;
  const option = trip?.packages.find((item) => item.id === query.package);
  const emailEnabled = !!(process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM_EMAIL && process.env.ENQUIRY_TO_EMAIL);
  return <><PageIntro title="Let’s make a memory."><p>Big plans or the beginning of an idea, we’d love to hear where you want to go.</p></PageIntro><div className="container contact-layout"><aside className="contact-aside"><h2>A real conversation.<br/>A better journey.</h2><p>Speak to DDTC about destinations, travel dates and the right plan for your people.</p><div className="contact-method"><Phone size={21}/><div><h3>Give us a call</h3><a href="tel:+27640584396">{company.phone}</a><a href="tel:+27814866678">{company.secondaryPhone}</a></div></div><div className="contact-method"><MessageCircle size={21}/><div><h3>Start on WhatsApp</h3><a className="text-link" href={whatsapp()} target="_blank" rel="noopener noreferrer">Chat with DDTC</a></div></div><div className="contact-method"><Mail size={21}/><div><h3>Send an email</h3><a className="contact-email" href={`mailto:${company.email}`}>{company.email}</a></div></div><div className="contact-method"><MapPin size={21}/><div><h3>Based in Rabokala</h3><p>RV017 Rabokala View<br/>Rabokala, Brits, 0250<br/>South Africa</p></div></div></aside><EnquiryForm emailEnabled={emailEnabled} initial={{ destination: trip?.destination || query.destination?.slice(0, 150), dates: trip ? tripDates(trip) : '', package: trip ? `${trip.title}${option ? ` · ${option.name}` : ''}` : '' }}/></div></>;
}
