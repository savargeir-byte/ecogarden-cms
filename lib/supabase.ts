import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// CMS has been removed. This client is a stub kept only so that
// remaining admin/CMS files compile without errors.
// No public pages use Supabase any more.
export const supabase = createClient(supabaseUrl, supabaseKey);
