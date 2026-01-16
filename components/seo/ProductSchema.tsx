export function ProductSchema({ product }: any) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Eco Garden',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: product.price || 0,
      priceCurrency: 'ISK',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
