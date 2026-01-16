import PageRenderer from '@/components/PageRenderer';
import CTA from "@/components/sections/CTA";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import { getPage } from '@/lib/cms';

export default async function Home({ searchParams }: any) {
  const params = await searchParams;
  const preview = params?.preview === "true";
  const status = preview ? "draft" : "published";

  // Use getPage helper
  const page = await getPage('home', preview);

  // If page exists in CMS, render sections
  if (page && page.sections && page.sections.length > 0) {
    return (
      <div className="min-h-screen">
        {preview && (
          <div className="bg-yellow-100 border-b-2 border-yellow-400 text-yellow-800 px-4 py-2 text-center text-sm font-medium">
            👀 Preview Mode - Showing draft content
          </div>
        )}
        <PageRenderer sections={page.sections} mode="public" />
      </div>
    );
  }

  // Fallback: Static homepage (if no CMS content)
  return (
    <>
      <Hero
        data={{
          heading: "Eco Garden – Vistvænar lausnir",
          text: "Hágæða garðvörur sem virka",
          ctaText: "Skoða vörur",
          ctaLink: "/products",
        }}
      />
      <Features
        data={{
          heading: "Af hverju Eco Garden?",
          items: [
            {
              icon: "🌱",
              title: "Umhverfisvænt",
              text: "Allar vörur eru vistvænar",
            },
            {
              icon: "✅",
              title: "Gæði",
              text: "Hágæða vörur sem virka",
            },
            {
              icon: "🚚",
              title: "Afhending",
              text: "Fljót og áreiðanleg þjónusta",
            },
          ],
        }}
      />
      <CTA
        data={{
          text: "Tilbúinn að byrja?",
          buttonText: "Hafa samband",
          buttonLink: "/contact",
        }}
      />
    </>
  );
}

