import { test } from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../src/app/api/enquiry/route';
const data = { name: 'Test Traveller', email: 'test@example.com', phone: '0640584396', destination: 'Cape Town', dates: 'Flexible', travellers: 2, budget: 'Under R5,000', type: 'Family', consent: true };
let sequence = 0;
const request = (body: unknown, origin = 'http://127.0.0.1:3000') => new Request('http://127.0.0.1:3000/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json', origin, 'x-forwarded-for': `test-${sequence++}` }, body: JSON.stringify(body) });
test('API validates consent and rejects cross-origin submissions', async () => {
  assert.equal((await POST(request({ ...data, consent: false }))).status, 400);
  assert.equal((await POST(request(data, 'https://other.example'))).status, 403);
});
test('API never reports success without delivery configuration or provider confirmation', async () => {
  const saved = { key: process.env.RESEND_API_KEY, from: process.env.ENQUIRY_FROM_EMAIL, to: process.env.ENQUIRY_TO_EMAIL };
  const originalFetch = globalThis.fetch;
  delete process.env.RESEND_API_KEY; delete process.env.ENQUIRY_FROM_EMAIL; delete process.env.ENQUIRY_TO_EMAIL;
  try {
    assert.equal((await POST(request(data))).status, 503);
    process.env.RESEND_API_KEY = 'test-local-only'; process.env.ENQUIRY_FROM_EMAIL = 'test@example.com'; process.env.ENQUIRY_TO_EMAIL = 'recipient@example.com';
    globalThis.fetch = async () => new Response(JSON.stringify({ error: 'provider failure' }), { status: 500 });
    assert.equal((await POST(request(data))).status, 502);
    globalThis.fetch = async () => new Response('{}', { status: 200 });
    assert.equal((await POST(request(data))).status, 502);
    globalThis.fetch = async (_input, options) => {
      const sent = JSON.parse(String(options?.body));
      assert.equal(sent.reply_to, data.email);
      assert.ok(sent.text.includes('Destination: Cape Town'));
      return new Response(JSON.stringify({ id: 'mock-receipt-only' }), { status: 200 });
    };
    const result = await POST(request(data));
    assert.equal(result.status, 200); assert.equal((await result.json()).sent, true);
  } finally {
    globalThis.fetch = originalFetch;
    for (const [name, value] of Object.entries({ RESEND_API_KEY: saved.key, ENQUIRY_FROM_EMAIL: saved.from, ENQUIRY_TO_EMAIL: saved.to })) { if (value === undefined) delete process.env[name]; else process.env[name] = value; }
  }
});
