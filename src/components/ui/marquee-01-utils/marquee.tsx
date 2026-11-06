import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type MarqueeProps = ComponentProps<'div'> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  paused?: boolean;
};

// Four identical groups keep even the shorter row filled on wide screens.
// Children are presentational review cards; duplicate groups are not announced.
export function Marquee({ children, className, reverse = false, pauseOnHover = false, paused = false, ...props }: MarqueeProps) {
  return <div className={cn('review-marquee-row', reverse && 'review-marquee-reverse', className)} data-paused={paused} data-pause-on-hover={pauseOnHover} {...props}>
    <div className="review-marquee-track">
      {Array.from({ length: 4 }, (_, index) => <div className="review-marquee-group" key={index} aria-hidden={index > 0 ? true : undefined}>{children}</div>)}
    </div>
  </div>;
}
