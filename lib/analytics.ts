import { supabase } from './supabase';

export async function trackView(product_id: string) {
  await supabase.from('analytics').insert({
    product_id,
    event: 'view',
  });
}

export async function trackEvent(product_id: string, event: string) {
  await supabase.from('analytics').insert({
    product_id,
    event,
  });
}

export async function getProductAnalytics() {
  const { data } = await supabase
    .from('analytics')
    .select('product_id, event, created_at')
    .order('created_at', { ascending: false })
    .limit(100);
  
  return data || [];
}
