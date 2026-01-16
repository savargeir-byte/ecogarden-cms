"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RoleGate({ role, children }: any) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profile?.role === role) setAllowed(true);
    });
  }, []);

  if (!allowed) return null;
  return children;
}
