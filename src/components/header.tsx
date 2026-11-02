'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Brand } from './brand';
const links = [['/', 'Home'], ['/experiences', 'Experiences'], ['/services', 'Our Services'], ['/about', 'About Us'], ['/reviews', 'Reviews'], ['/contact', 'Contact']];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  return <header className="site-header"><div className="container nav-shell">
    <Link href="/" aria-label="DDTC Travel Agency home" onClick={() => setOpen(false)}><Brand /></Link>
    <nav aria-label="Main navigation" className="desktop-nav">{links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)) ? 'page' : undefined}>{label}</Link>)}</nav>
    <Link className="button button-small nav-cta" href="/contact">Plan Your Trip <ArrowUpRight size={16}/></Link>
    <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
  </div>{open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav container">{links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="button" href="/contact" onClick={() => setOpen(false)}>Plan Your Trip <ArrowUpRight size={18}/></Link></nav>}</header>;
}
