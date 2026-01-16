import { supabase } from "./supabase";

export function subscribeToPage(pageId: string, onChange: () => void) {
  return supabase
    .channel("page-" + pageId)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "page_sections" },
      () => onChange()
    )
    .subscribe();
}
