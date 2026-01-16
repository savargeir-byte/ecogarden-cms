'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function AdminEditButton() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkAdmin() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    // Check if user has admin or editor role
    const role = session.user.user_metadata?.role;
    setIsAdmin(role === 'admin' || role === 'editor');
    setLoading(false);
  }

  if (loading || !isAdmin) return null;

  return (
    <a
      href="/admin"
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-2xl font-medium flex items-center gap-2 transition-all hover:scale-105"
    >
      ✏️ Edit Page
    </a>
  );
}
