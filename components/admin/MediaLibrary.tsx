'use client';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function MediaLibrary({ onSelect }: any) {
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    // Load from media table (database)
    const { data: mediaData } = await supabase.from('media').select('*').order('created_at', { ascending: false });
    
    if (mediaData && mediaData.length > 0) {
      setFiles(mediaData);
    } else {
      // Fallback to storage bucket if media table is empty
      const { data } = await supabase.storage.from('media').list('');
      if (data) {
        const filesWithUrls = data.map((file) => {
          const { data: urlData } = supabase.storage
            .from('media')
            .getPublicUrl(file.name);
          return { name: file.name, url: urlData.publicUrl };
        });
        setFiles(filesWithUrls);
      }
    }
  }

  async function upload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const path = `${Date.now()}-${file.name}`;

    await supabase.storage.from('media').upload(path, file);

    const { data } = supabase.storage.from('media').getPublicUrl(path);

    // Save to media table
    await supabase.from('media').insert({
      url: data.publicUrl,
      name: file.name,
      size: file.size,
      mime_type: file.type,
    });

    await loadFiles();
    setUploading(false);
  }

  return (
    <div>
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

      <div className="grid grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file.url || file.name}
            className="cursor-pointer border rounded overflow-hidden hover:border-blue-500"
            onClick={() => onSelect(file.url)}
          >
            <img src={file.url} alt={file.name} className="w-full h-32 object-cover" />
            {file.name && <div className="p-2 text-xs text-gray-500 truncate">{file.name}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
