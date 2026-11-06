'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/marquee-01-utils/marquee';
import { ReviewRating } from '@/components/review-rating';
import type { CustomerReview } from '@/lib/reviews';

function ReviewCard({ review }: { review: CustomerReview }) {
  const initials = review.name.replace(/^Mrs\s+/, '').split(' ').slice(0, 2).map((part) => part[0]).join('');
  return <Card className="marquee-review-card border-0 shadow-none">
    <CardContent className="marquee-review-content p-0">
      <div className="marquee-review-author">
        <span className="marquee-review-initials" aria-hidden="true">{initials}</span>
        <div><p className="marquee-review-name">{review.name}</p><p className="marquee-review-trip">{review.trip}</p></div>
      </div>
      <ReviewRating rating={review.rating}/>
      <blockquote className="marquee-review-quote"><p>{review.excerpt}</p></blockquote>
    </CardContent>
  </Card>;
}

export default function TestimonialMarquee({ reviews }: { reviews: CustomerReview[] }) {
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const midpoint = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, midpoint);
  const secondRow = reviews.slice(midpoint);

  useEffect(() => {
    const element = root.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div className="review-marquee-widget" ref={root}>
    <div className="container marquee-controls"><p className="small muted">Five-star reviews from our travellers.</p><button type="button" className="marquee-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={15} aria-hidden="true"/> : <Pause size={15} aria-hidden="true"/>}{paused ? 'Resume reviews' : 'Pause reviews'}</button></div>
    <div className="review-marquee-rows" onPointerDown={(event) => { if (event.pointerType === 'touch') setPaused(true); }}>
      <Marquee pauseOnHover paused={paused || !inView}>{firstRow.map((review) => <ReviewCard key={review.id} review={review}/>)}</Marquee>
      {secondRow.length > 0 && <Marquee reverse pauseOnHover paused={paused || !inView}>{secondRow.map((review) => <ReviewCard key={review.id} review={review}/>)}</Marquee>}
    </div>
  </div>;
}
