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
  const [urlInput, setUrlInput] = useState("");
  const [mode, setMode] = useState<"upload" | "url">("upload");

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

  function handleUrlSubmit() {
    if (urlInput.trim()) {
      onUpload(urlInput.trim());
      setUrlInput("");
    }
  }

  return (
    <div className="space-y-3 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
      {/* Current Image Preview */}
      {currentImage && (
        <div className="mb-3">
          <p className="text-xs font-medium text-gray-700 mb-2">Current Image:</p>
          <img
            src={currentImage}
            alt="Current"
            className="max-w-full max-h-48 rounded-lg border-2 border-gray-300 shadow-sm"
          />
          <p className="text-xs text-gray-500 mt-1 break-all">{currentImage}</p>
        </div>
      )}

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode("upload")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            mode === "upload"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          📤 Upload File
        </button>
        <button
          onClick={() => setMode("url")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            mode === "url"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          🔗 Use URL
        </button>
      </div>

      {/* Upload Mode */}
      {mode === "upload" && (
        <div>
          <label className="block">
            <div className="border-2 border-dashed border-blue-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && upload(e.target.files[0])}
                disabled={uploading}
                className="hidden"
              />
              {uploading ? (
                <div className="text-blue-600">
                  <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full mb-2"></div>
                  <p className="text-sm font-medium">Uploading...</p>
                </div>
              ) : (
                <div className="text-gray-600">
                  <span className="text-4xl">📁</span>
                  <p className="text-sm font-medium mt-2">Click to select image</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Max 5MB • JPG, PNG, GIF, WebP
                  </p>
                </div>
              )}
            </div>
          </label>
        </div>
      )}

      {/* URL Mode */}
      {mode === "url" && (
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Image URL</span>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg or https://images.unsplash.com/..."
              className="w-full border-2 border-gray-300 rounded-lg p-3 mt-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <button
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim()}
            className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
          >
            ✓ Use This URL
          </button>
          <p className="text-xs text-gray-500">
            💡 Tip: Try Unsplash for free images: https://images.unsplash.com/
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-700 font-medium">❌ {error}</p>
        </div>
      )}
    </div>
  );
}
