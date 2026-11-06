'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Check, LoaderCircle, MessageCircle } from 'lucide-react';
import { enquiryMessage, enquirySchema } from '@/lib/enquiry';
import { whatsapp } from '@/lib/site';
type Initial = { destination?: string; dates?: string; package?: string };
export function EnquiryForm({ initial = {}, emailEnabled }: { initial?: Initial; emailEnabled: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [sent, setSent] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(''); setWhatsappUrl(''); setSent(false);
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const result = enquirySchema.safeParse({ ...raw, consent: raw.consent === 'on' });
    if (!result.success) {
      const issues: Record<string, string> = {};
      for (const issue of result.error.issues) { issues[String(issue.path[0])] ??= issue.message; }
      setErrors(issues); form.querySelector<HTMLElement>(`[name="${Object.keys(issues)[0]}"]`)?.focus(); return;
    }
    setErrors({});
    const link = whatsapp(enquiryMessage(result.data));
    if (!emailEnabled) { setWhatsappUrl(link); setMessage('Your enquiry is ready. Open WhatsApp to review and send it to DDTC.'); return; }
    setBusy(true);
    try {
      const response = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(result.data) });
      const body = await response.json();
      if (!response.ok) { setMessage(body.error || 'We couldn’t send your enquiry. Please try WhatsApp instead.'); setWhatsappUrl(link); }
      else { setSent(true); setMessage('Your enquiry has been sent to DDTC. The team will respond using the contact details you provided.'); form.reset(); }
    } catch { setMessage('The enquiry could not be sent. Please check your connection or send it through WhatsApp.'); setWhatsappUrl(link); }
    finally { setBusy(false); }
  }
  function fieldError(name: string) { return errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null; }
  function attrs(name: string) { return { 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${name}-error` : undefined }; }
  return <form className="enquiry-form" onSubmit={submit} noValidate>
    <div className="form-heading"><h2>Tell us where you’d like to go.</h2><p>Share a few details. We’ll help with the next steps.</p></div>
    <div className="form-grid"><label>Full name<input name="name" autoComplete="name" placeholder="Your full name" required maxLength={100} {...attrs('name')}/>{fieldError('name')}</label>
    <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} {...attrs('email')}/>{fieldError('email')}</label>
    <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="e.g. 064 058 4396" required maxLength={22} {...attrs('phone')}/>{fieldError('phone')}</label>
    <label>Preferred destination<input name="destination" placeholder="Where are you dreaming of?" defaultValue={initial.destination} required maxLength={150} {...attrs('destination')}/>{fieldError('destination')}</label>
    <label>Travel dates<input name="dates" placeholder="Dates, a month, or Flexible" defaultValue={initial.dates} required maxLength={100} {...attrs('dates')}/>{fieldError('dates')}</label>
    <label>Number of travellers<input name="travellers" type="number" inputMode="numeric" min="1" max="200" defaultValue="2" required {...attrs('travellers')}/>{fieldError('travellers')}</label>
    <label>Approximate budget per person<select name="budget" defaultValue="" required {...attrs('budget')}><option value="" disabled>Select your budget</option><option>Under R5,000</option><option>R5,000–R10,000</option><option>R10,000–R20,000</option><option>R20,000–R35,000</option><option>Above R35,000</option><option>I’d like some guidance</option></select>{fieldError('budget')}</label>
    <label>Type of trip<select name="type" defaultValue="Individual or couple" {...attrs('type')}>{['Individual or couple', 'Family', 'Social group', 'Corporate group', 'Cruise'].map((type) => <option key={type}>{type}</option>)}</select>{fieldError('type')}</label>
    <label className="span-two">Preferred package <span className="optional">(optional)</span><input name="package" defaultValue={initial.package} placeholder="e.g. Cape Town · return flights" maxLength={150} {...attrs('package')}/>{fieldError('package')}</label>
    <label className="span-two">Anything else we should know? <span className="optional">(optional)</span><textarea name="requirements" rows={4} maxLength={3000} placeholder="Your occasion, accessibility needs, departure city or ideas…" {...attrs('requirements')}/>{fieldError('requirements')}</label></div>
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label className="consent"><input name="consent" type="checkbox" required {...attrs('consent')}/><span>I agree that DDTC may use these details to respond to my enquiry. <Link href="/privacy">Read the privacy information.</Link></span></label>{fieldError('consent')}
    <button className="button button-booking full-width" type="submit" disabled={busy}>{busy ? <><LoaderCircle className="spinner" size={18}/> Sending enquiry…</> : emailEnabled ? <>Send My Enquiry <ArrowUpRight size={18}/></> : <>Prepare WhatsApp Enquiry <MessageCircle size={18}/></>}</button>
    <p className="small muted form-note">{emailEnabled ? 'This is an enquiry, not a confirmed booking.' : 'Send through WhatsApp after reviewing your message. This form does not send an email.'}</p>
    {message && <div role="status" className={`form-status ${sent ? 'success' : ''}`}>{sent && <Check size={20}/>}<p>{message}</p>{whatsappUrl && <a className="button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp <ArrowUpRight size={18}/></a>}</div>}
  </form>;
}
