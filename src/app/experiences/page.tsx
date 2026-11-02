import { Catalogue } from '@/components/catalogue';
import { PageIntro } from '@/components/page-intro';
import { EnquiryCTA } from '@/components/enquiry-cta';
import { experiences } from '@/lib/experiences';
import { metadata } from '@/lib/site';
export const generateMetadata = () => metadata('Our Experiences', 'Explore DDTC’s advertised local getaways, beach holidays, safari adventures and international trips. Find your dates and enquire.', '/experiences');
export default function ExperiencesPage() {
  return <><PageIntro title="Where will your next memory begin?"><p>Coastal mornings, mountain air and journeys beyond the familiar. Explore the places we’re planning to go.</p></PageIntro><section className="container catalogue-page"><Catalogue trips={experiences}/><p className="catalogue-note">Prices are advertised amounts from client material, subject to DDTC’s confirmation. An enquiry does not reserve a place or confirm a booking.</p></section><EnquiryCTA/></>;
}
