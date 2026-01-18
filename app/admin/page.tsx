'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import MediaLibrary from '@/components/admin/MediaLibrary';
import PageRenderer from '@/components/PageRenderer';
import { addSection, deleteSection, getPage, publishPage, unpublishPage, updateSection } from '@/lib/cms';
import { saveVersion } from '@/lib/versioning';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const RichTextEditor = dynamic(() => import('@/components/cms/RichTextEditor'), { ssr: false });
const ImageUploader = dynamic(() => import('@/components/cms/ImageUploader'), { ssr: false });

interface Section {
  id: string;
  type: string;
  content: any;
  position: number;
}

interface Page {
  id: string;
  slug: string;
  title: string;
  status: 'draft' | 'published';
  sections: Section[];
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<string>('');

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);
    loadPage();
  }

  async function loadPage() {
    try {
      setLoading(true);
      // For admin, always load the base Icelandic page (no language suffix)
      const { data, error } = await supabase
        .from('pages')
        .select('*, sections(*)')
        .eq('slug', 'home')
        .single();

      if (error) {
        console.error('Error loading page:', error);
        return;
      }

      // Sort sections by position
      if (data?.sections) {
        data.sections.sort((a: any, b: any) => a.position - b.position);
      }

      setPage(data);
    } catch (error) {
      console.error('Error loading page:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddSection(type: string) {
    if (!page) return;
    setSaving(true);
    const defaultContent = getDefaultContent(type);
    await addSection(page.id, type, defaultContent);
    await loadPage();
    setSaving(false);
  }

  async function handleDeleteSection(sectionId: string) {
    if (!confirm('Are you sure?')) return;
    setSaving(true);
    await deleteSection(sectionId);
    await loadPage();
    setSaving(false);
  }

  async function handlePublish() {
    if (!page) return;
    setSaving(true);
    await publishPage(page.id);
    await loadPage();
    setSaving(false);
  }

  async function handleUnpublish() {
    if (!page) return;
    setSaving(true);
    await unpublishPage(page.id);
    await loadPage();
    setSaving(false);
  }

  async function handleSaveEdit() {
    if (!editingSection) return;
    setSaving(true);
    const currentSection = page?.sections.find(s => s.id === editingSection);
    if (currentSection) {
      await saveVersion(currentSection);
    }
    await updateSection(editingSection, formData);
    setEditingSection(null);
    setFormData({});
    await loadPage();
    setSaving(false);
  }

  function startEditing(section: Section) {
    setEditingSection(section.id);
    setFormData(section.content);
  }

  function openMediaLibrary(target: string) {
    setMediaTarget(target);
    setShowMediaLibrary(true);
  }

  function selectMedia(url: string) {
    setFormData({ ...formData, [mediaTarget]: url });
    setShowMediaLibrary(false);
  }

  function getDefaultContent(type: string) {
    const defaults: any = {
      hero: {
        heading: 'Welcome to EcoGarden',
        subheading: 'Sustainable gardening solutions for your home',
        ctaText: 'Get Started',
        ctaLink: '/products',
        backgroundImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&h=1080&fit=crop'
      },
      text: {
        heading: 'About Us',
        content: '<p>Add your content here...</p>'
      },
      cta: {
        heading: 'Ready to start?',
        description: 'Join thousands of happy gardeners',
        buttonText: 'Get Started',
        buttonLink: '/products'
      },
      features: {
        heading: 'Why Choose Us',
        features: [
          { title: 'Eco-Friendly', description: 'Sustainable materials', icon: '🌱' },
          { title: 'Easy to Use', description: 'Simple setup', icon: '✨' },
          { title: 'Quality', description: 'Premium products', icon: '⭐' }
        ]
      },
      imageGrid: {
        heading: 'Our Services',
        items: [
          {
            title: 'Service 1',
            subtitle: 'Description here',
            image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
            link: '/products',
            subcategories: []
          }
        ]
      }
    };
    return defaults[type] || {};
  }

  if (!isAuthenticated || loading || !page) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-xl text-gray-600">
              {!isAuthenticated ? 'Checking authentication...' : 'Loading page...'}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-full">
        {/* Top Bar */}
        <div className="bg-white border-b sticky top-0 z-40 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{page.title}</h1>
              <p className="text-sm text-gray-500 mt-1">
                Status: <span className={`font-semibold ${page.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {page.status}
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <a 
                href="/"
                target="_blank"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                👁️ Preview
              </a>
              {page.status === 'draft' ? (
                <button
                  onClick={handlePublish}
                  disabled={saving}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
                >
                  {saving ? 'Publishing...' : '✅ Publish'}
                </button>
              ) : (
                <button
                  onClick={handleUnpublish}
                  disabled={saving}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 font-medium"
                >
                  {saving ? 'Unpublishing...' : '⏸️ Unpublish'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Page Preview with Edit Overlays */}
        <div className="min-h-screen bg-white">
          {page.sections.map((section) => (
            <div key={section.id} className="relative group">
              {/* Section Content - Use real components */}
              <div className={editingSection === section.id ? 'ring-4 ring-blue-500' : ''}>
                <PageRenderer sections={[section]} mode="admin" />
              </div>

              {/* Edit Overlay (shows on hover) */}
              <div className="absolute inset-0 border-2 border-dashed border-green-500 bg-green-500 bg-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 text-xs rounded font-medium shadow-lg">
                  {section.type.toUpperCase()} - Position {section.position}
                </div>
                <div className="absolute top-2 right-2 flex gap-2 pointer-events-auto">
                  <button
                    onClick={() => startEditing(section)}
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded shadow-lg hover:bg-red-700 font-medium text-sm flex items-center gap-1"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Add Section Menu */}
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border-2 border-gray-300 p-4 max-w-xs z-50">
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">➕ Add Section</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleAddSection('hero')}
              disabled={saving}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 text-sm font-medium text-left shadow-md"
            >
              🎯 Hero Section
            </button>
            <button
              onClick={() => handleAddSection('text')}
              disabled={saving}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-sm font-medium text-left shadow-md"
            >
              📝 Text Section
            </button>
            <button
              onClick={() => handleAddSection('cta')}
              disabled={saving}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 text-sm font-medium text-left shadow-md"
            >
              🎬 Call to Action
            </button>
            <button
              onClick={() => handleAddSection('features')}
              disabled={saving}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 text-sm font-medium text-left shadow-md"
            >
              ⭐ Features
            </button>
            <button
              onClick={() => handleAddSection('imageGrid')}
              disabled={saving}
              className="px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg hover:from-pink-700 hover:to-pink-800 disabled:opacity-50 text-sm font-medium text-left shadow-md"
            >
              🖼️ Image Grid
            </button>
          </div>
        </div>

        {/* Edit Modal */}
        {editingSection && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-xl">
                <h2 className="text-xl font-bold">✏️ Edit Section</h2>
                <button
                  onClick={() => setEditingSection(null)}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                {/* Edit forms based on section type */}
                {(() => {
                  const section = page.sections.find(s => s.id === editingSection);
                  if (!section) return null;

                  switch (section.type) {
                    case 'hero':
                      return (
                        <div className="space-y-6">
                          {/* Icelandic Fields */}
                          <div className="border-l-4 border-blue-500 pl-4 space-y-4">
                            <h3 className="text-lg font-bold text-blue-700">🇮🇸 Íslenska</h3>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Title (IS)</label>
                              <input
                                type="text"
                                value={formData.title || formData.heading || ''}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value, heading: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                placeholder="Garðlausnir byggðar fyrir íslenskar aðstæður"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Subtitle (IS)</label>
                              <textarea
                                value={formData.subtitle || formData.subheading || ''}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value, subheading: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                rows={2}
                                placeholder="Hönnuð fyrir íslenskt veðurfar"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Image Alt Text (IS)</label>
                              <input
                                type="text"
                                value={formData.imageAlt || ''}
                                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                placeholder="Íslenskur garður"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">CTA Button Text (IS)</label>
                              <input
                                type="text"
                                value={formData.ctaText || formData.cta?.text || ''}
                                onChange={(e) => setFormData({ 
                                  ...formData, 
                                  ctaText: e.target.value,
                                  cta: { ...formData.cta, text: e.target.value }
                                })}
                                className="w-full border rounded-lg p-3"
                                placeholder="Skoða vörur"
                              />
                            </div>
                          </div>

                          {/* English Fields */}
                          <div className="border-l-4 border-green-500 pl-4 space-y-4">
                            <h3 className="text-lg font-bold text-green-700">🇬🇧 English</h3>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Title (EN)</label>
                              <input
                                type="text"
                                value={formData.title_en || formData.heading_en || ''}
                                onChange={(e) => setFormData({ ...formData, title_en: e.target.value, heading_en: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                placeholder="Garden Solutions Built for Icelandic Conditions"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Subtitle (EN)</label>
                              <textarea
                                value={formData.subtitle_en || formData.subheading_en || ''}
                                onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value, subheading_en: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                rows={2}
                                placeholder="Designed for Icelandic weather"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Image Alt Text (EN)</label>
                              <input
                                type="text"
                                value={formData.imageAlt_en || ''}
                                onChange={(e) => setFormData({ ...formData, imageAlt_en: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                placeholder="Icelandic garden"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">CTA Button Text (EN)</label>
                              <input
                                type="text"
                                value={formData.ctaText_en || formData.cta?.text_en || ''}
                                onChange={(e) => setFormData({ 
                                  ...formData, 
                                  ctaText_en: e.target.value,
                                  cta: { ...formData.cta, text_en: e.target.value }
                                })}
                                className="w-full border rounded-lg p-3"
                                placeholder="View Products"
                              />
                            </div>
                          </div>

                          {/* Shared Fields */}
                          <div className="border-l-4 border-purple-500 pl-4 space-y-4">
                            <h3 className="text-lg font-bold text-purple-700">🖼️ Images & Links</h3>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Background Image</label>
                              <ImageUploader
                                currentImage={formData.backgroundImage || formData.image}
                                onUpload={(url) => setFormData({ ...formData, backgroundImage: url, image: url })}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">CTA Link</label>
                              <input
                                type="text"
                                value={formData.ctaLink || formData.cta?.link || ''}
                                onChange={(e) => setFormData({ 
                                  ...formData, 
                                  ctaLink: e.target.value,
                                  cta: { ...formData.cta, link: e.target.value }
                                })}
                                className="w-full border rounded-lg p-3"
                                placeholder="/products"
                              />
                            </div>
                          </div>
                        </div>
                      );

                    case 'text':
                      return (
                        <div className="space-y-6">
                          {/* Icelandic */}
                          <div className="border-l-4 border-blue-500 pl-4 space-y-4">
                            <h3 className="text-lg font-bold text-blue-700">🇮🇸 Íslenska</h3>
                            <div>
                              <label className="block text-sm font-medium mb-2">Heading (IS)</label>
                              <input
                                type="text"
                                value={formData.heading || ''}
                                onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                placeholder="Um okkur"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Content (IS)</label>
                              <RichTextEditor
                                content={formData.content || ''}
                                onChange={(content) => setFormData({ ...formData, content })}
                              />
                            </div>
                          </div>

                          {/* English */}
                          <div className="border-l-4 border-green-500 pl-4 space-y-4">
                            <h3 className="text-lg font-bold text-green-700">🇬🇧 English</h3>
                            <div>
                              <label className="block text-sm font-medium mb-2">Heading (EN)</label>
                              <input
                                type="text"
                                value={formData.heading_en || ''}
                                onChange={(e) => setFormData({ ...formData, heading_en: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                placeholder="About Us"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Content (EN)</label>
                              <RichTextEditor
                                content={formData.content_en || ''}
                                onChange={(content_en) => setFormData({ ...formData, content_en })}
                              />
                            </div>
                          </div>
                        </div>
                      );

                    case 'cta':
                      return (
                        <div className="space-y-6">
                          {/* Icelandic */}
                          <div className="border-l-4 border-blue-500 pl-4 space-y-4">
                            <h3 className="text-lg font-bold text-blue-700">🇮🇸 Íslenska</h3>
                            <div>
                              <label className="block text-sm font-medium mb-2">Heading (IS)</label>
                              <input
                                type="text"
                                value={formData.heading || ''}
                                onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                placeholder="Tilbúin að byrja?"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Description (IS)</label>
                              <textarea
                                value={formData.description || ''}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                rows={3}
                                placeholder="Vertu með þúsundum ánægðra garðyrkjumanna"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Button Text (IS)</label>
                              <input
                                type="text"
                                value={formData.buttonText || ''}
                                onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                placeholder="Byrja núna"
                              />
                            </div>
                          </div>

                          {/* English */}
                          <div className="border-l-4 border-green-500 pl-4 space-y-4">
                            <h3 className="text-lg font-bold text-green-700">🇬🇧 English</h3>
                            <div>
                              <label className="block text-sm font-medium mb-2">Heading (EN)</label>
                              <input
                                type="text"
                                value={formData.heading_en || ''}
                                onChange={(e) => setFormData({ ...formData, heading_en: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                placeholder="Ready to start?"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Description (EN)</label>
                              <textarea
                                value={formData.description_en || ''}
                                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                rows={3}
                                placeholder="Join thousands of happy gardeners"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Button Text (EN)</label>
                              <input
                                type="text"
                                value={formData.buttonText_en || ''}
                                onChange={(e) => setFormData({ ...formData, buttonText_en: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                placeholder="Get Started"
                              />
                            </div>
                          </div>

                          {/* Shared */}
                          <div className="border-l-4 border-purple-500 pl-4 space-y-4">
                            <h3 className="text-lg font-bold text-purple-700">🔗 Link</h3>
                            <div>
                              <label className="block text-sm font-medium mb-2">Button Link</label>
                              <input
                                type="text"
                                value={formData.buttonLink || ''}
                                onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                                className="w-full border rounded-lg p-3"
                                placeholder="/products"
                              />
                            </div>
                          </div>
                        </div>
                      );

                    case 'features':
                      return (
                        <div className="space-y-6">
                          {/* Icelandic Heading */}
                          <div className="border-l-4 border-blue-500 pl-4">
                            <label className="block text-sm font-medium mb-2">🇮🇸 Heading (IS)</label>
                            <input
                              type="text"
                              value={formData.heading || ''}
                              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                              className="w-full border rounded-lg p-3"
                              placeholder="Af hverju að velja okkur"
                            />
                          </div>
                          
                          {/* English Heading */}
                          <div className="border-l-4 border-green-500 pl-4">
                            <label className="block text-sm font-medium mb-2">🇬🇧 Heading (EN)</label>
                            <input
                              type="text"
                              value={formData.heading_en || ''}
                              onChange={(e) => setFormData({ ...formData, heading_en: e.target.value })}
                              className="w-full border rounded-lg p-3"
                              placeholder="Why Choose Us"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-bold mb-3 text-lg">⭐ Features</label>
                            <div className="space-y-4">
                              {(formData.features || []).map((feature: any, index: number) => (
                                <div key={index} className="border-2 border-gray-300 rounded-xl p-5 bg-white shadow-sm">
                                  <div className="flex justify-between items-start mb-4 bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg">
                                    <span className="text-base font-bold text-gray-800">Feature {index + 1}</span>
                                    <button
                                      onClick={() => {
                                        const newFeatures = [...(formData.features || [])];
                                        newFeatures.splice(index, 1);
                                        setFormData({ ...formData, features: newFeatures });
                                      }}
                                      className="text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded hover:bg-red-50"
                                    >
                                      🗑️ Remove
                                    </button>
                                  </div>
                                  
                                  {/* Icon */}
                                  <div className="mb-4">
                                    <label className="block text-xs font-medium mb-1 text-gray-700">Icon (emoji)</label>
                                    <input
                                      type="text"
                                      value={feature.icon || ''}
                                      onChange={(e) => {
                                        const newFeatures = [...(formData.features || [])];
                                        newFeatures[index] = { ...newFeatures[index], icon: e.target.value };
                                        setFormData({ ...formData, features: newFeatures });
                                      }}
                                      className="w-full border-2 rounded-lg p-2.5 text-sm"
                                      placeholder="🌱"
                                    />
                                  </div>
                                  
                                  {/* Icelandic */}
                                  <div className="border-l-4 border-blue-500 pl-4 space-y-3 bg-blue-50 p-3 rounded mb-3">
                                    <h4 className="font-bold text-blue-700">🇮🇸 Íslenska</h4>
                                    <div>
                                      <label className="block text-xs font-medium mb-1 text-gray-700">Title (IS)</label>
                                      <input
                                        type="text"
                                        value={feature.title || ''}
                                        onChange={(e) => {
                                          const newFeatures = [...(formData.features || [])];
                                          newFeatures[index] = { ...newFeatures[index], title: e.target.value };
                                          setFormData({ ...formData, features: newFeatures });
                                        }}
                                        className="w-full border-2 rounded-lg p-2.5 text-sm"
                                        placeholder="Umhverfisvænn"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium mb-1 text-gray-700">Description (IS)</label>
                                      <textarea
                                        value={feature.description || ''}
                                        onChange={(e) => {
                                          const newFeatures = [...(formData.features || [])];
                                          newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                          setFormData({ ...formData, features: newFeatures });
                                        }}
                                        className="w-full border-2 rounded-lg p-2.5 text-sm"
                                        rows={2}
                                        placeholder="Sjálfbær efni og framkvæmdir"
                                      />
                                    </div>
                                  </div>
                                  
                                  {/* English */}
                                  <div className="border-l-4 border-green-500 pl-4 space-y-3 bg-green-50 p-3 rounded">
                                    <h4 className="font-bold text-green-700">🇬🇧 English</h4>
                                    <div>
                                      <label className="block text-xs font-medium mb-1 text-gray-700">Title (EN)</label>
                                      <input
                                        type="text"
                                        value={feature.title_en || ''}
                                        onChange={(e) => {
                                          const newFeatures = [...(formData.features || [])];
                                          newFeatures[index] = { ...newFeatures[index], title_en: e.target.value };
                                          setFormData({ ...formData, features: newFeatures });
                                        }}
                                        className="w-full border-2 rounded-lg p-2.5 text-sm"
                                        placeholder="Eco-Friendly"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium mb-1 text-gray-700">Description (EN)</label>
                                      <textarea
                                        value={feature.description_en || ''}
                                        onChange={(e) => {
                                          const newFeatures = [...(formData.features || [])];
                                          newFeatures[index] = { ...newFeatures[index], description_en: e.target.value };
                                          setFormData({ ...formData, features: newFeatures });
                                        }}
                                        className="w-full border-2 rounded-lg p-2.5 text-sm"
                                        rows={2}
                                        placeholder="Sustainable materials and practices"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                              
                              <button
                                onClick={() => {
                                  const newFeatures = [...(formData.features || []), { 
                                    icon: '✨', 
                                    title: '', 
                                    title_en: '',
                                    description: '',
                                    description_en: ''
                                  }];
                                  setFormData({ ...formData, features: newFeatures });
                                }}
                                className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-bold shadow-md"
                              >
                                ➕ Add Feature
                              </button>
                            </div>
                          </div>
                        </div>
                      );

                    case 'imageGrid':
                      return (
                        <div className="space-y-4">
                          {/* Icelandic Heading */}
                          <div className="border-l-4 border-blue-500 pl-4">
                            <label className="block text-sm font-medium mb-2">🇮🇸 Heading (IS)</label>
                            <input
                              type="text"
                              value={formData.heading || ''}
                              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                              className="w-full border rounded-lg p-3"
                              placeholder="Vöruflokkar"
                            />
                          </div>
                          
                          {/* English Heading */}
                          <div className="border-l-4 border-green-500 pl-4">
                            <label className="block text-sm font-medium mb-2">🇬🇧 Heading (EN)</label>
                            <input
                              type="text"
                              value={formData.heading_en || ''}
                              onChange={(e) => setFormData({ ...formData, heading_en: e.target.value })}
                              className="w-full border rounded-lg p-3"
                              placeholder="Product Categories"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-bold mb-3 text-lg">🖼️ Grid Items</label>
                            <div className="space-y-4">
                              {(formData.items || []).map((item: any, index: number) => (
                                <div key={index} className="border-2 border-gray-300 rounded-xl p-5 bg-white shadow-sm space-y-4">
                                  <div className="flex justify-between items-start bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg">
                                    <span className="text-base font-bold text-gray-800">Item {index + 1}</span>
                                    <button
                                      onClick={() => {
                                        const newItems = [...(formData.items || [])];
                                        newItems.splice(index, 1);
                                        setFormData({ ...formData, items: newItems });
                                      }}
                                      className="text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded hover:bg-red-50"
                                    >
                                      🗑️ Remove
                                    </button>
                                  </div>
                                  
                                  {/* Icelandic */}
                                  <div className="border-l-4 border-blue-500 pl-4 space-y-3 bg-blue-50 p-3 rounded">
                                    <h4 className="font-bold text-blue-700">🇮🇸 Íslenska</h4>
                                    <div>
                                      <label className="block text-xs font-medium mb-1 text-gray-700">Title (IS)</label>
                                      <input
                                        type="text"
                                        value={item.title || ''}
                                        onChange={(e) => {
                                          const newItems = [...(formData.items || [])];
                                          newItems[index] = { ...newItems[index], title: e.target.value };
                                          setFormData({ ...formData, items: newItems });
                                        }}
                                        className="w-full border-2 rounded-lg p-2.5 text-sm"
                                        placeholder="Garðyrkjubændur"
                                      />
                                    </div>
                                    
                                    <div>
                                      <label className="block text-xs font-medium mb-1 text-gray-700">Subtitle (IS)</label>
                                      <input
                                        type="text"
                                        value={item.subtitle || ''}
                                        onChange={(e) => {
                                          const newItems = [...(formData.items || [])];
                                          newItems[index] = { ...newItems[index], subtitle: e.target.value };
                                          setFormData({ ...formData, items: newItems });
                                        }}
                                        className="w-full border-2 rounded-lg p-2.5 text-sm"
                                        placeholder="Fagleg garðræktarlausn"
                                      />
                                    </div>
                                  </div>
                                  
                                  {/* English */}
                                  <div className="border-l-4 border-green-500 pl-4 space-y-3 bg-green-50 p-3 rounded">
                                    <h4 className="font-bold text-green-700">🇬🇧 English</h4>
                                    <div>
                                      <label className="block text-xs font-medium mb-1 text-gray-700">Title (EN)</label>
                                      <input
                                        type="text"
                                        value={item.title_en || ''}
                                        onChange={(e) => {
                                          const newItems = [...(formData.items || [])];
                                          newItems[index] = { ...newItems[index], title_en: e.target.value };
                                          setFormData({ ...formData, items: newItems });
                                        }}
                                        className="w-full border-2 rounded-lg p-2.5 text-sm"
                                        placeholder="Professional Growers"
                                      />
                                    </div>
                                    
                                    <div>
                                      <label className="block text-xs font-medium mb-1 text-gray-700">Subtitle (EN)</label>
                                      <input
                                        type="text"
                                        value={item.subtitle_en || ''}
                                        onChange={(e) => {
                                          const newItems = [...(formData.items || [])];
                                          newItems[index] = { ...newItems[index], subtitle_en: e.target.value };
                                          setFormData({ ...formData, items: newItems });
                                        }}
                                        className="w-full border-2 rounded-lg p-2.5 text-sm"
                                        placeholder="Professional gardening solutions"
                                      />
                                    </div>
                                  </div>
                                  
                                  {/* Image */}
                                  <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-3 rounded">
                                    <label className="block text-xs font-bold mb-2 text-purple-700">🖼️ Image</label>
                                    <ImageUploader
                                      currentImage={item.image}
                                      onUpload={(url) => {
                                        const newItems = [...(formData.items || [])];
                                        newItems[index] = { ...newItems[index], image: url };
                                        setFormData({ ...formData, items: newItems });
                                      }}
                                    />
                                  </div>
                                  
                                  {/* Link */}
                                  <div>
                                    <label className="block text-xs font-medium mb-1 text-gray-700">🔗 Link</label>
                                    <input
                                      type="text"
                                      value={item.link || ''}
                                      onChange={(e) => {
                                        const newItems = [...(formData.items || [])];
                                        newItems[index] = { ...newItems[index], link: e.target.value };
                                        setFormData({ ...formData, items: newItems });
                                      }}
                                      className="w-full border-2 rounded-lg p-2.5 text-sm"
                                      placeholder="/products?category=gardyrkjubaendur"
                                    />
                                  </div>
                                  
                                  {/* Subcategories */}
                                  <div>
                                    <label className="block text-xs font-medium mb-1 text-gray-700">📋 Subcategories (comma separated)</label>
                                    <input
                                      type="text"
                                      value={(item.subcategories || []).join(', ')}
                                      onChange={(e) => {
                                        const newItems = [...(formData.items || [])];
                                        newItems[index] = { 
                                          ...newItems[index], 
                                          subcategories: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)
                                        };
                                        setFormData({ ...formData, items: newItems });
                                      }}
                                      className="w-full border-2 rounded-lg p-2.5 text-sm"
                                      placeholder="Jarðvegur, Áburður, Gler"
                                    />
                                  </div>
                                </div>
                              ))}
                              
                              <button
                                onClick={() => {
                                  const newItems = [...(formData.items || []), { 
                                    title: '', 
                                    title_en: '',
                                    subtitle: '', 
                                    subtitle_en: '',
                                    image: '', 
                                    link: '',
                                    subcategories: []
                                  }];
                                  setFormData({ ...formData, items: newItems });
                                }}
                                className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-bold shadow-md"
                              >
                                ➕ Add New Item
                              </button>
                            </div>
                          </div>
                        </div>
                      );

                    default:
                      return <div>Unsupported section type</div>;
                  }
                })()}
              </div>
              
              <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end gap-3 rounded-b-xl">
                <button
                  onClick={() => setEditingSection(null)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
                >
                  ✕ Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={saving}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                  {saving ? 'Saving...' : '💾 Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Media Library Modal */}
        {showMediaLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">📁 Media Library</h2>
                <button
                  onClick={() => setShowMediaLibrary(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
              <MediaLibrary onSelect={selectMedia} />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
