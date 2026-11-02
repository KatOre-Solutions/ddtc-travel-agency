import { NextResponse } from 'next/server';
import { enquiryMessage, enquirySchema } from '@/lib/enquiry';
export const runtime = 'nodejs';
const attempts = new Map<string, { count: number; reset: number }>();
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin && origin !== process.env.NEXT_PUBLIC_SITE_URL) return NextResponse.json({ error: 'Please submit the enquiry from the DDTC website.' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 16384) return NextResponse.json({ error: 'Your enquiry is too long. Please shorten the additional requirements.' }, { status: 413 });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
  const now = Date.now();
  for (const [key, value] of attempts) { if (value.reset < now) attempts.delete(key); }
  const entry = attempts.get(ip);
  if (entry && entry.reset > now && entry.count >= 5) return NextResponse.json({ error: 'Please wait a few minutes before trying again, or contact DDTC on WhatsApp.' }, { status: 429 });
  attempts.set(ip, { count: (entry?.count || 0) + 1, reset: entry?.reset || now + 600000 });
  let raw: unknown;
  try { const text = await request.text(); if (text.length > 16384) return NextResponse.json({ error: 'Please shorten your enquiry.' }, { status: 413 }); raw = JSON.parse(text); }
  catch { return NextResponse.json({ error: 'The enquiry could not be read. Please check the form and try again.' }, { status: 400 }); }
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: 'Please check the form details and privacy consent before submitting.' }, { status: 400 });
  const key = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!key || !from || !to) return NextResponse.json({ error: 'Email enquiries are not configured yet. Please send your enquiry through WhatsApp or call DDTC.' }, { status: 503 });
  try {
    const result = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(12000), body: JSON.stringify({ from, to: [to], reply_to: parsed.data.email, subject: 'DDTC website travel enquiry', text: enquiryMessage(parsed.data) }) });
    if (!result.ok) return NextResponse.json({ error: 'We couldn’t deliver your enquiry. Please try WhatsApp or call DDTC.' }, { status: 502 });
    const receipt = await result.json();
    if (!receipt.id) return NextResponse.json({ error: 'Delivery was not confirmed. Please use WhatsApp to contact DDTC.' }, { status: 502 });
    return NextResponse.json({ sent: true });
  } catch { return NextResponse.json({ error: 'Delivery could not be confirmed. Please use WhatsApp or try again later.' }, { status: 502 }); }
}
