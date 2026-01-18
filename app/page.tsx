import PageRenderer from '@/components/PageRenderer';
import ProductsSection from '@/components/sections/ProductsSection';
import StatsSection from '@/components/sections/StatsSection';
import MissionSection from '@/components/sections/MissionSection';
import { getPage } from '@/lib/cms';
import { supabase } from '@/lib/supabase';

export default async function Home({ searchParams }: any) {
  const params = await searchParams;
  const preview = params?.preview === "true";

  const page = await getPage('home', preview);

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'published')
    .limit(6)
    .order('created_at', { ascending: false });

  if (page && page.sections && page.sections.length > 0) {
    const heroSection = page.sections.find((s: any) => s.type === 'hero');
    const imageGridSection = page.sections.find((s: any) => s.type === 'imageGrid');
    const otherSections = page.sections.filter((s: any) => s.type !== 'hero' && s.type !== 'imageGrid');

    return (
      <div className="min-h-screen">
        {preview && (
          <div className="bg-yellow-100 border-b-2 border-yellow-400 text-yellow-800 px-4 py-2 text-center text-sm font-medium">
            👀 Preview Mode - Showing draft content
          </div>
        )}
        
        {heroSection && <PageRenderer sections={[heroSection]} mode="public" />}
        {imageGridSection && <PageRenderer sections={[imageGridSection]} mode="public" />}
        
        <ProductsSection products={products || []} />
        <MissionSection />
        <StatsSection />
        
        {otherSections.length > 0 && <PageRenderer sections={otherSections} mode="public" />}
      </div>
    );
  }

  return (
    <>
      <ProductsSection products={products || []} />
      <MissionSection />
      <StatsSection />
    </>
  );
}
