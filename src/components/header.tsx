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
  const [present, setPresent] = useState(false);
  const [instant, setInstant] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const closing = useRef<ReturnType<typeof setTimeout> | null>(null);
  function changeMenu(next: boolean, immediate = false) {
    if (closing.current) clearTimeout(closing.current);
    setInstant(immediate);
    setOpen(next);
    if (next) setPresent(true);
    else if (immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPresent(false);
    else closing.current = setTimeout(() => setPresent(false), 200);
  }
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { if (closing.current) clearTimeout(closing.current); setOpen(false); setPresent(false); toggle.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); if (closing.current) clearTimeout(closing.current); };
  }, []);
  return <header className="site-header"><div className="container nav-shell">
    <Link href="/" aria-label="DDTC Travel Agency home" onClick={() => changeMenu(false, true)}><Brand /></Link>
    <nav aria-label="Main navigation" className="desktop-nav">{links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)) ? 'page' : undefined}>{label}</Link>)}</nav>
    <Link className="button button-small nav-cta" href="/contact">Plan Your Trip <ArrowUpRight size={16}/></Link>
    <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={(event) => changeMenu(!open, event.detail === 0)}>{open ? <X/> : <Menu/>}</button>
  </div>{present && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav container" data-open={open} data-instant={instant} aria-hidden={!open} inert={!open}>{links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => changeMenu(false, true)}>{label}</Link>)}<Link className="button" href="/contact" onClick={() => changeMenu(false, true)}>Plan Your Trip <ArrowUpRight size={18}/></Link></nav>}</header>;
}
