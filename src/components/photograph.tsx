import Image from 'next/image';
export function Photograph({ src, alt, className = '', priority = false, sizes = '(max-width: 700px) 100vw, 50vw' }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return <div className={`photograph ${className}`}><Image src={`/images/${src}`} alt={alt} fill sizes={sizes} priority={priority} quality={85}/></div>;
}
