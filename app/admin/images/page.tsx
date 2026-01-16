'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface Section {
  id: string;
  type: string;
  content: any;
  page_id: string;
  position: number;
}

export default function ImagesAdminPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    loadSections();
  }, []);

  async function loadSections() {
    setLoading(true);
    const { data: pages } = await supabase.from('pages').select('id, slug').eq('slug', 'home').single();
    
    if (pages) {
      const { data } = await supabase
        .from('sections')
        .select('*')
        .eq('page_id', pages.id)
        .in('type', ['hero', 'imageGrid'])
        .order('position');
      
      if (data) setSections(data);
    }
    setLoading(false);
  }

  async function handleImageUpload(sectionId: string, field: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(sectionId);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Update section content
      const section = sections.find(s => s.id === sectionId);
      if (!section) return;

      const newContent = { ...section.content };
      
      if (field === 'hero-image') {
        newContent.image = publicUrl;
      } else if (field.startsWith('grid-')) {
        const index = parseInt(field.split('-')[1]);
        newContent.items[index].image = publicUrl;
      }

      const { error } = await supabase
        .from('sections')
        .update({ content: newContent })
        .eq('id', sectionId);

      if (error) throw error;

      await loadSections();
      alert('Mynd uppfærð!');
    } catch (error: any) {
      alert('Villa: ' + error.message);
    } finally {
      setUploading(null);
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">🖼️ Myndir & Banners</h1>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 capitalize">
                  {section.type === 'hero' ? '🎯 Hero Banner' : '🖼️ Image Grid'}
                </h2>

                {section.type === 'hero' && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Hero Mynd</label>
                      {section.content.image && (
                        <img 
                          src={section.content.image} 
                          alt="Hero" 
                          className="w-full h-48 object-cover rounded mb-2"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(section.id, 'hero-image', e)}
                        disabled={uploading === section.id}
                        className="w-full border rounded-lg p-3"
                      />
                      {uploading === section.id && (
                        <p className="text-sm text-gray-500 mt-2">Hleð upp...</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      <p><strong>Heading:</strong> {section.content.heading}</p>
                      <p><strong>Subheading:</strong> {section.content.subheading}</p>
                    </div>
                  </div>
                )}

                {section.type === 'imageGrid' && section.content.items && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.content.items.map((item: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-32 object-cover rounded mb-2"
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(section.id, `grid-${index}`, e)}
                          disabled={uploading === section.id}
                          className="w-full border rounded-lg p-2 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Leiðbeiningar</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Veldu mynd til að hlaða upp</li>
            <li>• Myndir eru vistaðar í Supabase Storage</li>
            <li>• Best er að nota myndir í 1920x700 fyrir hero banner</li>
            <li>• Image grid myndir ættu að vera 800x400 eða hærra</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
