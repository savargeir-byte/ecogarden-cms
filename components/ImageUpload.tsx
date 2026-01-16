"use client";
import { supabase } from "@/lib/supabase";

export default function ImageUpload({ onUpload }: any) {
  const upload = async (e: any) => {
    const file = e.target.files[0];

    const { data } = await supabase.storage
      .from("images")
      .upload(`pages/${Date.now()}-${file.name}`, file);

    const url = supabase.storage
      .from("images")
      .getPublicUrl(data!.path).data.publicUrl;

    onUpload(url);
  };

  return <input type="file" onChange={upload} />;
}
