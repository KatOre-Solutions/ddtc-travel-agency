import { PageIntro } from '@/components/page-intro';
import { EnquiryCTA } from '@/components/enquiry-cta';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';
import { publishedReviews } from '@/lib/reviews';
import { metadata } from '@/lib/site';

export const generateMetadata = () => metadata('Traveller Reviews', 'Read reviews from travellers who have explored Mpumalanga, Botswana, Cape Town and more with DDTC Travel Agency.', '/reviews');

export default function Reviews() {
  return <>
    <PageIntro title="Reviews from our travellers."><p>Their experiences with DDTC, in their own words.</p></PageIntro>
    <div className="container"><p className="small muted review-edit-note">Reviews are lightly edited for spelling, punctuation and clarity.</p></div>
    <StaggerTestimonials reviews={publishedReviews}/>
    <EnquiryCTA/>
  </>;
}
