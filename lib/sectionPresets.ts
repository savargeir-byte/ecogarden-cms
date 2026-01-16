export const presets = {
  hero: {
    type: "hero",
    title: "Hero",
    data: {
      title: "Big headline",
      subtitle: "Short description",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
      ctaText: "Get started",
      ctaLink: "/"
    }
  },

  splitImageText: {
    type: "splitImageText",
    title: "Split Image + Text",
    data: {
      title: "Our Story",
      text: "We are passionate about creating sustainable solutions.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
      reverse: false
    }
  },

  features: {
    type: "features",
    title: "Features Grid",
    data: {
      items: [
        { title: "Feature 1", text: "Description", icon: "✨" },
        { title: "Feature 2", text: "Description", icon: "🚀" },
        { title: "Feature 3", text: "Description", icon: "⚡" }
      ]
    }
  },

  featureList: {
    type: "featureList",
    title: "Feature List",
    data: [
      { title: "First Feature", description: "Detailed description of this feature" },
      { title: "Second Feature", description: "Detailed description of this feature" },
      { title: "Third Feature", description: "Detailed description of this feature" }
    ]
  },

  imageGallery: {
    type: "imageGallery",
    title: "Image Gallery",
    data: [
      { url: "", caption: "Image 1" },
      { url: "", caption: "Image 2" },
      { url: "", caption: "Image 3" }
    ]
  },

  specsTable: {
    type: "specsTable",
    title: "Specifications",
    data: [
      { label: "Size", value: "10 x 5 cm" },
      { label: "Weight", value: "250g" },
      { label: "Material", value: "Recycled plastic" }
    ]
  },

  cta: {
    type: "cta",
    title: "Call to Action",
    data: {
      text: "Ready to begin?",
      buttonText: "Contact us",
      buttonLink: "/contact"
    }
  },

  text: {
    type: "text",
    title: "Text Block",
    data: "<p>Add your content here...</p>"
  },

  image: {
    type: "image",
    title: "Single Image",
    data: {
      url: "",
      alt: "Image description",
      caption: ""
    }
  }
};
