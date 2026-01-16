"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function ImageUploader({
  onUpload,
  currentImage,
}: {
  onUpload: (url: string) => void;
  currentImage?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    try {
      setUploading(true);
      setError(null);

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error("File size must be less than 5MB");
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("File must be an image");
      }

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `images/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage.from("media").getPublicUrl(filePath);

      onUpload(data.publicUrl);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {currentImage && (
        <div className="mb-2">
          <img
            src={currentImage}
            alt="Current"
            className="max-w-xs rounded border"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && upload(e.target.files[0])}
          disabled={uploading}
          className="text-sm"
        />
        {uploading && (
          <span className="text-sm text-gray-500">Uploading...</span>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <p className="text-xs text-gray-500">
        Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
      </p>
    </div>
  );
}
