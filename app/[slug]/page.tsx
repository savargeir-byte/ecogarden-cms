import PageViewTracker from "@/components/PageViewTracker";
import SectionRenderer from "@/components/SectionRenderer";
import { getPage } from "@/lib/cms";
import type { Metadata } from "next";

// ISR - Revalidate every 60 seconds
export const revalidate = 60;

// SEO Metadata Generation
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const page = await getPage(params.slug, false);

  if (!page) {
    return {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist."
    };
  }

  const seo = page.seo || {};

  return {
    title: seo.title || page.title || "EcoGarden",
    description: seo.description || "",
    openGraph: {
      title: seo.title || page.title,
      description: seo.description || "",
      images: seo.image ? [seo.image] : []
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title || page.title,
      description: seo.description || "",
      images: seo.image ? [seo.image] : []
    }
  };
}

export default async function Page({ params, searchParams }: any) {
  const preview = searchParams?.preview === "true";
  const page = await getPage(params.slug, preview);

  if (!page) {
    return (
      <div className="max-w-6xl mx-auto py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-600">The page you're looking for doesn't exist.</p>
      </div>
    );
  }

  // Sections eru núna í page.sections array
  const sections = page.sections || [];

  return (
    <>
      <PageViewTracker slug={params.slug} />
      <section className="max-w-6xl mx-auto py-8 px-4">
        {preview && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
            👀 Preview Mode - Showing draft content
          </div>
        )}
        
        <SectionRenderer blocks={sections} />

        {sections.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No content yet</p>
          </div>
        )}
      </section>
    </>
  );
}
