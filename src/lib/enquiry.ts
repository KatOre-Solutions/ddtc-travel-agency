import { z } from 'zod';
export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  email: z.email('Please enter a valid email address.').max(254),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{7,22}$/, 'Please enter a valid phone number.'),
  destination: z.string().trim().min(2, 'Please choose or enter a destination.').max(150),
  dates: z.string().trim().min(2, 'Please enter your preferred dates or “Flexible”.').max(100),
  travellers: z.coerce.number().int().min(1, 'Please enter at least one traveller.').max(200, 'For larger groups, please call DDTC.'),
  budget: z.string().trim().min(1, 'Please select an approximate budget.').max(100),
  type: z.enum(['Individual or couple', 'Family', 'Social group', 'Corporate group', 'Cruise']),
  requirements: z.string().trim().max(3000).default(''),
  package: z.string().trim().max(150).default(''),
  consent: z.literal(true, { error: 'Please consent to DDTC using your information to respond.' }),
  website: z.string().max(0).default(''),
});
export type Enquiry = z.infer<typeof enquirySchema>;
export function enquiryMessage(data: Enquiry) {
  return [`Hello DDTC, I would like to enquire about a trip.`, `Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone}`, `Destination: ${data.destination}`, `Preferred dates: ${data.dates}`, `Travellers: ${data.travellers}`, `Budget per person: ${data.budget}`, `Trip type: ${data.type}`, data.package ? `Preferred package: ${data.package}` : '', data.requirements ? `Additional requirements: ${data.requirements}` : ''].filter(Boolean).join('\n');
}
