import Image from 'next/image';

/** Outlines originate in the client-selected artwork, never a typed substitute. */
export function Brand({ variant = 'navigation' }: { variant?: 'navigation' | 'full' | 'wordmark' }) {
  if (variant === 'full') return <span className="brand brand-full"><Image className="brand-image" src="/brand/ddtc-white-gold.svg" width={1408} height={957} alt="DDTC Travel Agency — Diutlwileng Diutlwileng Touring Corporation. Explore. Experience. Create Memories." unoptimized/></span>;
  if (variant === 'wordmark') return <span className="brand brand-wordmark"><Image className="brand-image" src="/brand/ddtc-wordmark.svg" width={1165} height={230} alt="DDTC Travel Agency" unoptimized/></span>;
  return <span className="brand brand-navigation"><picture>
    <source media="(max-width: 700px)" srcSet="/brand/ddtc-wordmark.svg"/>
    <Image className="brand-image" src="/brand/ddtc-horizontal.svg" width={330} height={76} alt="DDTC Travel Agency" unoptimized loading="eager"/>
  </picture></span>;
}
