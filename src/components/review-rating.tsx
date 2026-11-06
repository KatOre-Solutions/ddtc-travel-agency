import { Star } from 'lucide-react';
import type { CustomerReview } from '@/lib/reviews';

export function ReviewRating({ rating }: { rating: CustomerReview['rating'] }) {
  if (rating === null) return null;
  return <span className="review-rating" role="img" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, index) => <Star key={index} size={17} fill={index < rating ? 'currentColor' : 'none'} aria-hidden="true"/>)}
  </span>;
}
