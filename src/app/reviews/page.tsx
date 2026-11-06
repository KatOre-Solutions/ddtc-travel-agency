import { PageIntro } from '@/components/page-intro';
import { EnquiryCTA } from '@/components/enquiry-cta';
import { ReviewRating } from '@/components/review-rating';
import { publishedReviews } from '@/lib/reviews';
import { metadata } from '@/lib/site';

export const generateMetadata = () => metadata('Traveller Reviews', 'Read reviews from travellers who have explored Mpumalanga, Botswana, Cape Town and more with DDTC Travel Agency.', '/reviews');

export default function Reviews() {
  return <>
    <PageIntro title="Reviews from our travellers."><p>Their experiences with DDTC, in their own words.</p></PageIntro>
    <section className="container" aria-label="Customer reviews">
      <p className="small muted review-edit-note">Reviews are lightly edited for spelling, punctuation and clarity.</p>
      <div className="reviews-grid">
        {publishedReviews.map((review) => <article className="review-story" key={review.id} aria-labelledby={`review-${review.id}`}>
          <div>
            <div className="review-heading"><h2 id={`review-${review.id}`}>{review.name}</h2><ReviewRating rating={review.rating}/></div>
            <p className="review-trip">{review.trip}</p>
            <blockquote>{review.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</blockquote>
          </div>
        </article>)}
      </div>
    </section>
    <EnquiryCTA/>
  </>;
}
