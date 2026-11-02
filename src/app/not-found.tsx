import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
export default function NotFound() { return <div className="not-found"><PageIntro title="A little off the beaten path."><p>We couldn’t find that page. Let’s get you back to your next adventure.</p><Link className="button" href="/experiences">Explore Experiences</Link></PageIntro></div>; }
