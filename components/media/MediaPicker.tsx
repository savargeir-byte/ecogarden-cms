'use client';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export function MediaPicker({ onSelect }: any) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false });
    setMedia(data || []);
    setLoading(false);
  }

  if (loading) return <div>Loading media...</div>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {media.map((m) => (
        <div
          key={m.id}
          onClick={() => onSelect(m.url)}
          className="cursor-pointer border rounded overflow-hidden hover:border-blue-500 transition"
        >
          <img src={m.url} alt={m.name} className="w-full h-32 object-cover" />
          <div className="p-2 text-xs text-gray-500 truncate">{m.name}</div>
        </div>
      ))}
    </div>
  );
}
