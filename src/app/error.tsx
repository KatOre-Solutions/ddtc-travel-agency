'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }: { reset: () => void }) { return <div className="container error-page"><h1>A small detour.</h1><p>We couldn’t load this page. Please try again, or contact DDTC directly.</p><button className="button" onClick={reset}>Try again</button><Link className="text-link" href="/contact">Contact DDTC</Link></div>; }
