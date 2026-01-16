import { supabase } from './supabase';

export async function saveVersion(section: any) {
  await supabase.from('section_versions').insert({
    section_id: section.id,
    content: section.content,
  });
}

export async function getVersions(sectionId: string) {
  const { data } = await supabase
    .from('section_versions')
    .select('*')
    .eq('section_id', sectionId)
    .order('created_at', { ascending: false });
  
  return data || [];
}

export async function rollbackToVersion(sectionId: string, versionId: string) {
  const { data } = await supabase
    .from('section_versions')
    .select('content')
    .eq('id', versionId)
    .single();

  if (data) {
    await supabase
      .from('sections')
      .update({ content: data.content })
      .eq('id', sectionId);
  }
}
