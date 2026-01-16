'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import MediaLibrary from '@/components/admin/MediaLibrary';
import PageRenderer from '@/components/PageRenderer';
import { addSection, deleteSection, getPage, publishPage, unpublishPage, updateSection } from '@/lib/cms';
import { saveVersion } from '@/lib/versioning';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const RichTextEditor = dynamic(() => import('@/components/cms/RichTextEditor'), { ssr: false });

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
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<string>('');

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage() {
    setLoading(true);
    const data = await getPage('home', true);
    setPage(data);
    setLoading(false);
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
      }
    };
    return defaults[type] || {};
  }

  if (loading || !page) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
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
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Heading</label>
                            <input
                              type="text"
                              value={formData.heading || ''}
                              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                              className="w-full border rounded-lg p-3"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Subheading</label>
                            <textarea
                              value={formData.subheading || ''}
                              onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                              className="w-full border rounded-lg p-3"
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Background Image</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={formData.backgroundImage || ''}
                                onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
                                className="flex-1 border rounded-lg p-3"
                                placeholder="https://..."
                              />
                              <button
                                onClick={() => openMediaLibrary('backgroundImage')}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                              >
                                📁 Browse
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CTA Text</label>
                            <input
                              type="text"
                              value={formData.ctaText || ''}
                              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                              className="w-full border rounded-lg p-3"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CTA Link</label>
                            <input
                              type="text"
                              value={formData.ctaLink || ''}
                              onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                              className="w-full border rounded-lg p-3"
                            />
                          </div>
                        </div>
                      );

                    case 'text':
                      return (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Heading</label>
                            <input
                              type="text"
                              value={formData.heading || ''}
                              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                              className="w-full border rounded-lg p-3"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Content</label>
                            <RichTextEditor
                              content={formData.content || ''}
                              onChange={(content) => setFormData({ ...formData, content })}
                            />
                          </div>
                        </div>
                      );

                    case 'cta':
                      return (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Heading</label>
                            <input
                              type="text"
                              value={formData.heading || ''}
                              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                              className="w-full border rounded-lg p-3"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                              value={formData.description || ''}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="w-full border rounded-lg p-3"
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Button Text</label>
                            <input
                              type="text"
                              value={formData.buttonText || ''}
                              onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                              className="w-full border rounded-lg p-3"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Button Link</label>
                            <input
                              type="text"
                              value={formData.buttonLink || ''}
                              onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                              className="w-full border rounded-lg p-3"
                            />
                          </div>
                        </div>
                      );

                    case 'features':
                      return (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Heading</label>
                            <input
                              type="text"
                              value={formData.heading || ''}
                              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                              className="w-full border rounded-lg p-3"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Features</label>
                            <div className="space-y-3">
                              {(formData.features || []).map((feature: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                                  <div className="flex justify-between items-start mb-3">
                                    <span className="text-sm font-medium text-gray-700">Feature {index + 1}</span>
                                    <button
                                      onClick={() => {
                                        const newFeatures = [...(formData.features || [])];
                                        newFeatures.splice(index, 1);
                                        setFormData({ ...formData, features: newFeatures });
                                      }}
                                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                      🗑️ Remove
                                    </button>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <input
                                      type="text"
                                      value={feature.icon || ''}
                                      onChange={(e) => {
                                        const newFeatures = [...(formData.features || [])];
                                        newFeatures[index] = { ...newFeatures[index], icon: e.target.value };
                                        setFormData({ ...formData, features: newFeatures });
                                      }}
                                      className="w-full border rounded p-2 text-sm"
                                      placeholder="Icon (emoji)"
                                    />
                                    <input
                                      type="text"
                                      value={feature.title || ''}
                                      onChange={(e) => {
                                        const newFeatures = [...(formData.features || [])];
                                        newFeatures[index] = { ...newFeatures[index], title: e.target.value };
                                        setFormData({ ...formData, features: newFeatures });
                                      }}
                                      className="w-full border rounded p-2 text-sm"
                                      placeholder="Title"
                                    />
                                    <textarea
                                      value={feature.description || ''}
                                      onChange={(e) => {
                                        const newFeatures = [...(formData.features || [])];
                                        newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                        setFormData({ ...formData, features: newFeatures });
                                      }}
                                      className="w-full border rounded p-2 text-sm"
                                      rows={2}
                                      placeholder="Description"
                                    />
                                  </div>
                                </div>
                              ))}
                              
                              <button
                                onClick={() => {
                                  const newFeatures = [...(formData.features || []), { icon: '✨', title: '', description: '' }];
                                  setFormData({ ...formData, features: newFeatures });
                                }}
                                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                              >
                                ➕ Add Feature
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
