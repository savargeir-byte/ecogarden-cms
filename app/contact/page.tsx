import { client } from '@/sanity/lib/client';
import { contactPageQuery } from '@/sanity/lib/queries';
import ContactClient from './ContactClient';

const DEFAULTS = {
  heroImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1920&q=80',
  heroTitle: 'Við eigum lausnina fyrir þig',
  heroSubtitle: 'Hringdu eða sendu okkur línu!',
  address: 'Lambhagavegur 9\n110 Reykjavík',
  phone: '487-8910',
  email: 'info@ecogarden.is',
  openingHours: 'Mán–Fös: 8:00–17:00',
  facebookUrl: 'https://www.facebook.com/Eco-Garden-104951408186641',
  linkedinUrl: 'https://www.linkedin.com/company/eco-garden-island',
  instagramUrl: '',
  mapEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1742.8324567890123!2d-21.9!3d64.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjTCsDA4JzI0LjAiTiAyMcKwNTQnMDAuMCJX!5e0!3m2!1sen!2sis!4v1234567890123!5m2!1sen!2sis',
};

export default async function ContactPage() {
  const pageData = await client.fetch(contactPageQuery).catch(() => null);

  const heroImage    = pageData?.heroImage        ?? DEFAULTS.heroImage;
  const heroTitle    = pageData?.heroTitle_is      ?? DEFAULTS.heroTitle;
  const heroSubtitle = pageData?.heroSubtitle_is   ?? DEFAULTS.heroSubtitle;
  // Contact info all from contactPage — edit in “Hafa samband” in Studio
  const address      = pageData?.address           ?? DEFAULTS.address;
  const phone        = pageData?.phone             ?? DEFAULTS.phone;
  const email        = pageData?.email             ?? DEFAULTS.email;
  const openingHours = pageData?.openingHours_is   ?? DEFAULTS.openingHours;
  const facebookUrl  = pageData?.facebookUrl       ?? DEFAULTS.facebookUrl;
  const linkedinUrl  = pageData?.linkedinUrl       ?? DEFAULTS.linkedinUrl;
  const instagramUrl = pageData?.instagramUrl      ?? DEFAULTS.instagramUrl;
  const mapEmbedSrc  = pageData?.mapEmbedSrc       ?? DEFAULTS.mapEmbedSrc;

  return (
    <ContactClient
      heroImage={heroImage}
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      address={address}
      phone={phone}
      email={email}
      openingHours={openingHours}
      facebookUrl={facebookUrl}
      linkedinUrl={linkedinUrl}
      instagramUrl={instagramUrl}
      mapEmbedSrc={mapEmbedSrc}
    />
  );
}
