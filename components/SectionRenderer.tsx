import CTA from "./sections/CTA";
import FeatureList from "./sections/FeatureList";
import Features from "./sections/Features";
import Hero from "./sections/Hero";
import ImageGallery from "./sections/ImageGallery";
import SpecsTable from "./sections/SpecsTable";
import SplitImageText from "./sections/SplitImageText";
import SmartImage from "./SmartImage";

export default function SectionRenderer({ blocks }: any) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return blocks.map((section: any) => {
    // Section structure: { id, type, content, position }
    const { id, type, content } = section;

    switch (type) {
      case "hero":
        return <Hero key={id} data={content} />;
      case "features":
        return <Features key={id} data={content} />;
      case "featureList":
        return <FeatureList key={id} data={content} />;
      case "splitImageText":
        return <SplitImageText key={id} data={content} />;
      case "imageGallery":
        return <ImageGallery key={id} data={content} />;
      case "specsTable":
        return <SpecsTable key={id} data={content} />;
      case "cta":
        return <CTA key={id} data={content} />;
      case "text":
        return (
          <section key={id} className="bg-white">
            <div className="container prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content.html || content }} />
            </div>
          </section>
        );
      case "image":
        return content.url ? (
          <section key={id} className="bg-white">
            <div className="container">
              <SmartImage 
                src={content.url} 
                alt={content.alt || ""} 
                className="rounded-lg shadow-lg w-full"
              />
              {content.caption && (
                <p className="text-center text-gray-600 mt-3">{content.caption}</p>
              )}
            </div>
          </section>
        ) : null;
      case "banner":
        return (
          <section
            key={id}
            className="bg-cover bg-center"
            style={{ 
              backgroundImage: content.image 
                ? `url(${content.image})` 
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
            }}
          >
            <div className="container py-20 text-white">
              <h2 className="text-4xl font-bold mb-2">{content.title}</h2>
              <p className="text-xl">{content.subtitle}</p>
            </div>
          </section>
        );
      default:
        console.warn(`Unknown section type: ${type}`);
        return null;
    }
  });
}
