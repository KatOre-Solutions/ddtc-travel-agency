import Link from 'next/link';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { Photograph } from '@/components/photograph';
import { Catalogue } from '@/components/catalogue';
import { EnquiryCTA } from '@/components/enquiry-cta';
import TestimonialMarquee from '@/components/ui/marquee-01';
import { experiences } from '@/lib/experiences';
import { publishedReviews } from '@/lib/reviews';
import { metadata } from '@/lib/site';
export const generateMetadata = () => metadata('Travel Agency in Brits', 'DDTC Travel Agency in Rabokala, Brits plans South African holidays, international packages and group travel. Explore trips and enquire on WhatsApp.', '/');
export default function Home() {
  return <>
    <section className="hero container-wide" aria-labelledby="hero-title"><Photograph className="hero-photo" src="cape-town-hero.jpg" alt="Panoramic Cape Town coastline with the Atlantic Ocean and mountains" priority sizes="100vw"/><div className="hero-scrim"/>
      <div className="hero-content"><h1 id="hero-title">Explore More.<br/>Create Memories.</h1><p>Thoughtfully planned holidays for individuals,<br className="desktop-break"/> families, social groups and corporate travellers.</p><div className="hero-actions"><Link className="button button-booking" href="/contact">Plan Your Trip <ArrowUpRight size={19}/></Link><Link className="hero-secondary" href="/experiences">Explore Experiences <ArrowUpRight size={17}/></Link></div></div>
      <div className="hero-bottom"><a href="#experiences" className="hero-scroll" aria-label="Discover experiences below"><ArrowDown size={18}/><span>Find your next memory</span></a><span className="hero-location"><MapPin size={16}/><span>Cape Town, South Africa</span></span></div>
    </section>
    <section className="container section experiences-section" id="experiences"><div className="section-heading"><div><h2>Discover your next experience.</h2><p>A little closer to home. A little further from the everyday.</p></div><Link className="text-link" href="/experiences">View all experiences <ArrowUpRight size={18}/></Link></div><Catalogue trips={experiences} featured/></section>
    <section className="container section about-section"><div className="about-visual"><Photograph src="lesotho-mountains.jpg" alt="Mountain landscape in Lesotho"/></div><div className="about-copy"><h2>A world to explore.<br/>People who care.</h2><p>Since February 2020, DDTC has helped bring people together through thoughtfully planned travel.</p><p>From a weekend in Mpumalanga to the shores of Cape Town and adventures beyond our borders, we help arrange the transport, the stays and the moments in between.</p><p>You bring your people. We help with the plan.</p><Link className="text-link" href="/about">Meet DDTC <ArrowUpRight size={18}/></Link></div></section>
    <section className="services-home section"><div className="container"><div className="section-heading"><div><h2>However you travel, we’re with you.</h2><p>Your kind of journey, thoughtfully brought together.</p></div><Link className="text-link" href="/services">Explore our services <ArrowUpRight size={18}/></Link></div><div className="service-rows">{[
      ['Just the two of you', 'Individual & couples travel', 'Time away that makes room for the things you love.'],
      ['Bring the whole family', 'Family holidays', 'Shared adventures, with the practical details considered.'],
      ['Make it a group thing', 'Social group travel', 'Friends, celebrations and the memories you make together.'],
      ['Take your team further', 'Corporate travel', 'Coordinated journeys for colleagues and company groups.'],
    ].map(([title, label, body]) => <Link key={title} href={`/services#${label.startsWith('Individual') ? 'individual' : label.startsWith('Family') ? 'family' : label.startsWith('Social') ? 'groups' : 'corporate'}`} className="service-row"><h3>{title}</h3><p><span>{label}</span>{body}</p><ArrowUpRight size={23}/></Link>)}</div></div></section>
    <section className="container section cruise-section"><div><h2>A different way<br/>to see the world.</h2><p>Unpack once. Wake up somewhere new. DDTC also helps travellers explore MSC cruise experiences.</p><Link className="text-link" href="/services#cruises">Let’s talk cruises <ArrowUpRight size={18}/></Link></div><Photograph src="cruise-ocean.jpg" alt="A cruise ship on the water, representative cruise imagery"/></section>
    {publishedReviews.length > 0 && <section className="section memory-section home-reviews" aria-labelledby="home-reviews-title"><div className="container"><div className="section-heading"><div><h2 id="home-reviews-title">The memories<br/>speak for themselves.</h2><p>Trips to Mpumalanga, Botswana and Cape Town, told by the people who went.</p></div><Link className="text-link" href="/reviews">Read traveller reviews <ArrowUpRight size={18}/></Link></div></div><TestimonialMarquee reviews={publishedReviews}/></section>}
    <EnquiryCTA/>
  </>;
}
