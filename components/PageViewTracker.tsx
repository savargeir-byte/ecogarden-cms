"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function PageViewTracker({ slug }: any) {
  useEffect(() => {
    supabase.from("page_views").insert({
      slug,
      user_agent: navigator.userAgent
    });
  }, [slug]);

  return null;
}
