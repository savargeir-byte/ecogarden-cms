'use client';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export function MediaUploader({ onSelect }: any) {
  const [uploading, setUploading] = useState(false);

  async function upload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const path = `media/${Date.now()}-${file.name}`;

    await supabase.storage.from('media').upload(path, file);

    const { data } = supabase.storage.from('media').getPublicUrl(path);

    await supabase.from('media').insert({
      url: data.publicUrl,
      name: file.name,
      size: file.size,
      mime_type: file.type,
    });

    onSelect(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="mb-4">
      <input
        type="file"
        onChange={upload}
        disabled={uploading}
        className="border p-2 rounded"
        accept="image/*"
      />
      {uploading && <span className="ml-2 text-sm text-gray-500">Uploading...</span>}
    </div>
  );
}
