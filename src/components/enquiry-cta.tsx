import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export function EnquiryCTA() {
  return <section className="closing-cta"><div className="container cta-inner"><div><h2>Your next adventure<br/>starts here.</h2><p>A destination in mind, or just the feeling it’s time to go?<br className="desktop-break"/> Let’s plan a journey that feels like you.</p></div><div className="cta-actions"><Link className="button button-booking" href="/contact">Plan My Trip <ArrowUpRight size={19}/></Link><Link className="text-link" href="/contact">Contact DDTC</Link></div></div></section>;
}
