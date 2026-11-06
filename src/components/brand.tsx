import Image from 'next/image';

/** Outlines originate in the client-selected artwork, never a typed substitute. */
export function Brand({ variant = 'navigation' }: { variant?: 'navigation' | 'full' | 'wordmark' }) {
  if (variant === 'full') return <span className="brand brand-full"><Image className="brand-image" src="/brand/ddtc-primary.png" width={1536} height={1024} alt="DDTC Travel Agency — Diutlwileng Diutlwileng Touring Corporation. Explore. Experience. Create Memories." unoptimized/></span>;
  return <span className={`brand brand-${variant}`}><Image className="brand-image" src="/brand/ddtc-wordmark-navy.svg" width={1165} height={230} alt="DDTC Travel Agency" unoptimized loading="eager"/></span>;
}
