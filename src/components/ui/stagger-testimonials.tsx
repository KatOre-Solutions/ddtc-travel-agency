'use client';

// Adapted from the 21st.dev StaggerTestimonials component supplied by the site owner.
// Real DDTC reviews replace demo quotations and unrelated stock portraits.
import { useId, useState, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReviewRating } from '@/components/review-rating';
import type { CustomerReview } from '@/lib/reviews';
import { cn } from '@/lib/utils';

function initials(name: string) {
  return name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('');
}

export function StaggerTestimonials({ reviews }: { reviews: CustomerReview[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const detailId = useId();
  const activeReview = reviews[activeIndex];

  if (!activeReview) return null;

  function move(steps: number, immediate = false) {
    setInstant(immediate);
    setActiveIndex((index) => (index + steps + reviews.length) % reviews.length);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1, true);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      setInstant(true);
      setActiveIndex(event.key === 'Home' ? 0 : reviews.length - 1);
    }
  }

  return <div className="stagger-testimonials">
    <section className="stagger-carousel" aria-label="Traveller review carousel" aria-roledescription="carousel" onKeyDown={onKeyDown} data-instant={instant}>
      <div className="stagger-stage">
        {reviews.map((review, index) => {
          const half = Math.floor(reviews.length / 2);
          const position = ((index - activeIndex + reviews.length + half) % reviews.length) - half;
          const selected = position === 0;
          return <article
            className={cn('stagger-card', selected && 'stagger-card-active')}
            key={review.id}
            aria-hidden={!selected}
            aria-label={`${index + 1} of ${reviews.length}: ${review.name}`}
            aria-roledescription="slide"
            style={{
              transform: `translate(-50%, -50%) translateX(calc(var(--stagger-step) * ${position})) translateY(${selected ? -32 : position % 2 ? 15 : -15}px) rotate(${selected ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
              zIndex: selected ? 10 : reviews.length - Math.abs(position),
            }}
          >
            <div className="stagger-card-top"><span className="stagger-initials" aria-hidden="true">{initials(review.name)}</span><ReviewRating rating={review.rating}/></div>
            <blockquote><p>“{review.excerpt}”</p></blockquote>
            <div className="stagger-attribution"><p className="stagger-name">{review.name}</p><p className="stagger-trip">{review.trip}</p></div>
            {!selected && <button className="stagger-card-select" type="button" tabIndex={-1} aria-hidden="true" aria-label={`Read ${review.name}’s review`} onClick={() => move(position)}/>}
          </article>;
        })}
      </div>
      {reviews.length > 1 && <div className="stagger-controls">
        <button type="button" className="stagger-arrow" onClick={(event) => move(-1, event.detail === 0)} aria-label="Previous testimonial" aria-controls={detailId}><ChevronLeft size={22}/></button>
        <p className="stagger-count" aria-hidden="true">{activeIndex + 1} <span>/ {reviews.length}</span></p>
        <button type="button" className="stagger-arrow" onClick={(event) => move(1, event.detail === 0)} aria-label="Next testimonial" aria-controls={detailId}><ChevronRight size={22}/></button>
      </div>}
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Review {activeIndex + 1} of {reviews.length}: {activeReview.name}.</p>
    </section>
    <article className="stagger-full-review container" id={detailId} aria-label={`Full review by ${activeReview.name}`}>
      <div className="stagger-review-heading"><div><h2>{activeReview.name}</h2><p className="muted">{activeReview.trip}</p></div><ReviewRating rating={activeReview.rating}/></div>
      <blockquote>{activeReview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</blockquote>
    </article>
    <noscript><div className="container stagger-no-script">{reviews.slice(1).map((review) => <article key={review.id}><h2>{review.name}</h2><p>{review.trip}</p><ReviewRating rating={review.rating}/>{review.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>)}</div></noscript>
  </div>;
}
