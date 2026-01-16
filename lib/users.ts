import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase admin environment variables');
}

const adminSupabase = createClient(supabaseUrl, supabaseServiceKey);

export async function listUsers() {
  const { data } = await adminSupabase.auth.admin.listUsers();
  return data.users;
}

export async function createUser(email: string, role: 'admin' | 'editor') {
  await adminSupabase.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { role },
  });
}

export async function updateUserRole(userId: string, role: string) {
  await adminSupabase.auth.admin.updateUserById(userId, {
    user_metadata: { role },
  });
}

export async function deleteUser(userId: string) {
  await adminSupabase.auth.admin.deleteUser(userId);
}
