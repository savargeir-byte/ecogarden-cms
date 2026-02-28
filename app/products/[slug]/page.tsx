import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { client, urlFor } from '@/sanity/lib/client';
import ProductDetail from './ProductDetail';

const BASE_URL = 'https://eccogarden.vercel.app';

interface Params { params: Promise<{ slug: string }> }

async function getProduct(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      title,
      description,
      features,
      specifications,
      videoUrl,
      image,
      images,
      "pdfUrl": pdfBrochure.asset->url,
      pdfLabel,
      "categories": categories[]->{
        title_is,
        "slug": slug.current
      },
      seo
    }`,
    { slug }
  ).catch(() => null);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return { title: 'Vara ekki fundin' };
  const imgUrl = p.image ? urlFor(p.image).width(1200).url() : undefined;
  return {
    title: `${p.seo?.title ?? p.title} – Eco Garden`,
    description: p.seo?.description ?? p.description?.slice(0, 160),
    alternates: { canonical: `${BASE_URL}/products/${slug}` },
    openGraph: {
      title: p.title,
      url: `${BASE_URL}/products/${slug}`,  
      images: imgUrl ? [{ url: imgUrl, width: 1200, height: 630, alt: p.title }] : [],
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return notFound();

  const mainImageUrl = product.image ? urlFor(product.image).width(900).url() : undefined;
  const galleryUrls  = (product.images ?? []).map((img: any) => urlFor(img).width(900).url());

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: mainImageUrl,
    url: `${BASE_URL}/products/${slug}`,

    brand: { '@type': 'Brand', name: 'Eco Garden' },
  };

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail
        product={{
          slug,
          title:          product.title,
          description:    product.description,
          features:       product.features,
          specifications: product.specifications,
          videoUrl:       product.videoUrl,
          pdfUrl:         product.pdfUrl,
          pdfLabel:       product.pdfLabel,
          mainImageUrl,
          galleryUrls,
          categories:     product.categories,
        }}
      />
    </main>
  );
}
