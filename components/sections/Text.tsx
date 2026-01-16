export default function Text({ body, data }: any) {
  // Support both 'body' prop and 'data' prop (for PageRenderer compatibility)
  const content = body || data;
  
  // Safety check for undefined content
  if (!content) {
    return null;
  }
  
  // Extract HTML content from various possible structures
  let htmlContent = '';
  if (typeof content === 'string') {
    htmlContent = content;
  } else if (content.content) {
    htmlContent = content.content;
  } else if (content.body) {
    htmlContent = content.body;
  } else if (content.text || content.html) {
    htmlContent = content.text || content.html;
  } else {
    htmlContent = JSON.stringify(content);
  }
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {content.heading && (
          <h2 className="text-4xl lg:text-6xl font-bold mb-10 text-gray-900 text-center">
            {content.heading}
          </h2>
        )}
        <div 
          className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-center [&>p]:text-center [&>p]:text-lg [&>p]:max-w-4xl [&>p]:mx-auto"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </div>
    </section>
  )
}
