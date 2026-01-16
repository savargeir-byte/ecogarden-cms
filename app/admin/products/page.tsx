'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  category: string;
  subcategory: string;
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [uploading, setUploading] = useState(false);

  const categories = ['Garðyrkjubændur', 'Landbúnaður', 'Almennar garðyrkjuvörur'];
  const subcategories: Record<string, string[]> = {
    'Garðyrkjubændur': ['Fræ', 'Steinull', 'Mold', 'Varnarefni', 'Dúkar', 'Vélar og tæki'],
    'Landbúnaður': ['Áburður', 'Fóður', 'Fræ', 'Mottur', 'Innréttingar', 'Hús', 'Vélar og tæki'],
    'Almennar garðyrkjuvörur': ['Varnarefni', 'Grasfræ', 'Áburður', 'Næring', 'O.fl'],
  };

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('title');
    if (data) setProducts(data);
    setLoading(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image: publicUrl });
      alert('Mynd hlaðin upp!');
    } catch (error: any) {
      alert('Villa við að hlaða upp mynd: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!formData.title || !formData.slug) {
      alert('Vinsamlegast fylltu út titil og slug');
      return;
    }

    try {
      if (editing && editing !== 'new') {
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', editing);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([formData]);
        if (error) throw error;
      }

      setEditing(null);
      setFormData({});
      await loadProducts();
      alert('Vista tókst!');
    } catch (error: any) {
      alert('Villa: ' + error.message);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Ertu viss?')) return;
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      alert('Villa: ' + error.message);
    } else {
      await loadProducts();
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🛍️ Vörur</h1>
          <button
            onClick={() => {
              setEditing('new');
              setFormData({ category: 'Garðyrkjubændur', subcategory: 'Fræ' });
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            ➕ Ný vara
          </button>
        </div>

        {/* Edit Form */}
        {editing && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-green-500">
            <h2 className="text-xl font-bold mb-4">
              {editing === 'new' ? 'Búa til vöru' : 'Breyta vöru'}
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titill</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Lýsing</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded-lg p-3"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Verð (kr)</label>
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Flokkur</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                  className="w-full border rounded-lg p-3"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Undirflokkur</label>
                <select
                  value={formData.subcategory || ''}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  className="w-full border rounded-lg p-3"
                >
                  {formData.category && subcategories[formData.category]?.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Mynd</label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="flex-1 border rounded-lg p-3"
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
              </div>
              {uploading && <p className="text-sm text-gray-500 mt-2">Hleð upp mynd...</p>}
              <p className="text-xs text-gray-500 mt-1">Eða settu inn URL:</p>
              <input
                type="text"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                💾 Vista
              </button>
              <button
                onClick={() => { setEditing(null); setFormData({}); }}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Hætta við
              </button>
            </div>
          </div>
        )}

        {/* Products List */}
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mynd</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titill</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flokkur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verð</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aðgerðir</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">
                      {product.image && (
                        <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{product.title}</div>
                      <div className="text-sm text-gray-500">{product.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{product.category}</div>
                      <div className="text-xs text-gray-500">{product.subcategory}</div>
                    </td>
                    <td className="px-6 py-4">{product.price?.toLocaleString()} kr</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => { setEditing(product.id); setFormData(product); }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️ Breyta
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️ Eyða
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
