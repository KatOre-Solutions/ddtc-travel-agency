import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Brand } from './brand';
import { company, whatsapp } from '@/lib/site';
export function Footer() {
  return <><footer className="site-footer"><div className="container footer-grid">
    <div className="footer-brand"><Link href="/" aria-label="DDTC home"><Brand variant="full"/></Link><p>Explore. Experience.<br/>Create Memories.</p><p className="small muted">Thoughtfully planned journeys.<br/>From Rabokala to wherever calls you.</p></div>
    <div><h2>Explore</h2><Link href="/experiences">Our experiences</Link><Link href="/about">About DDTC</Link><Link href="/services">Our services</Link><Link href="/reviews">Traveller stories</Link></div>
    <div><h2>Let’s make a plan</h2><a href="tel:+27640584396"><Phone size={15}/>{company.phone}</a><a href="tel:+27814866678">{company.secondaryPhone}</a><a className="footer-email" href={`mailto:${company.email}`}><Mail size={15}/>{company.email}</a><a href={whatsapp()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp <ArrowUpRight size={15}/></a></div>
    <div><h2>Find us</h2><p className="address"><MapPin size={16}/> <span>RV017 Rabokala View<br/>Rabokala, Brits, 0250<br/>South Africa</span></p><Link href="/contact">Start your enquiry <ArrowUpRight size={15}/></Link></div>
  </div><div className="container footer-bottom"><div><p>© {new Date().getFullYear()} {company.legalName}.</p><p>Registration {company.registration}</p></div><div className="legal-links"><Link href="/privacy">Privacy</Link><Link href="/booking-conditions">Booking conditions</Link><Link href="/photo-credits">Photo credits</Link></div><a href="https://katoresolutions.co.za/" target="_blank" rel="noopener noreferrer">Designed & developed by Katore Solutions <ArrowUpRight size={13}/></a></div></footer>
  <a className="whatsapp-float" href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="Enquire with DDTC on WhatsApp"><MessageCircle size={24}/></a></>;
}
