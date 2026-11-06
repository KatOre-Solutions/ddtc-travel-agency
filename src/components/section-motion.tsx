'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Only editorial content enters on scroll. Forms, prices and catalogue results
// stay immediate, and server-rendered content is visible without JavaScript.
const editorialTargets = [
  '.section-heading', '.about-copy', '.about-visual',
  '.cruise-section > div:first-child', '.cruise-section > .photograph',
  '.memory-section > div',
  '.editorial-split > *', '.principles-grid > *', '.company-note',
  '.service-editorial > .photograph', '.service-editorial > div',
  '.review-story', '.closing-cta .cta-inner > div',
].join(',');

export function SectionMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(editorialTargets));
    const animations = new Map<HTMLElement, Animation>();
    const easing = getComputedStyle(document.documentElement).getPropertyValue('--ease-out').trim();
    const siblingOrder = new Map<Element, number>();
    const delays = new Map<HTMLElement, number>();

    function show(element: HTMLElement, immediate = false) {
      observer.unobserve(element);
      element.removeAttribute('data-motion-pending');
      if (immediate || preference.matches) {
        animations.get(element)?.cancel();
        return;
      }
      const photo = element.classList.contains('photograph') || element.classList.contains('about-visual');
      const keyframes: Keyframe[] = photo
        ? [{ opacity: 0, clipPath: 'inset(0 0 8% 0)' }, { opacity: 1, clipPath: 'inset(0 0 0% 0)' }]
        : [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }];
      const animation = element.animate(keyframes, { duration: photo ? 650 : 550, delay: delays.get(element) || 0, easing, fill: 'both' });
      animations.set(element, animation);
      animation.finished.then(() => {
        animation.cancel();
        if (animations.get(element) === animation) animations.delete(element);
      }).catch(() => { /* Cancellation on navigation or reduced motion is expected. */ });
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) show(entry.target as HTMLElement);
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    for (const element of targets) {
      const parent = element.parentElement!;
      const order = siblingOrder.get(parent) || 0;
      siblingOrder.set(parent, order + 1);
      delays.set(element, Math.min(order, 3) * 50);
      // Never hide content already on screen, above the reader, or at an anchor.
      if (element.getBoundingClientRect().top < window.innerHeight) continue;
      element.setAttribute('data-motion-pending', '');
      observer.observe(element);
    }

    function revealFocused(event: FocusEvent) {
      const focused = event.target as HTMLElement;
      for (const element of targets) if (element.contains(focused)) show(element, true);
    }
    function disableMotion() {
      if (!preference.matches) return;
      observer.disconnect();
      targets.forEach((element) => element.removeAttribute('data-motion-pending'));
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }
    document.addEventListener('focusin', revealFocused);
    preference.addEventListener('change', disableMotion);
    return () => {
      observer.disconnect();
      targets.forEach((element) => element.removeAttribute('data-motion-pending'));
      animations.forEach((animation) => animation.cancel());
      document.removeEventListener('focusin', revealFocused);
      preference.removeEventListener('change', disableMotion);
    };
  }, [pathname]);

  return null;
}
