import { logAudit } from "./audit";
import { supabase } from "./supabase";

// ============================================
// 📖 CORE CMS FUNCTIONS
// ============================================

export async function getPage(slug: string, preview = false, language = 'is') {
  const status = preview ? 'draft' : 'published'
  
  // Append language suffix to slug for English
  const languageSlug = language === 'en' ? `${slug}-en` : slug;

  const { data, error } = await supabase
    .from('pages')
    .select('*, sections(*)')
    .eq('slug', languageSlug)
    .single()

  if (error) {
    console.error('getPage error:', error);
    // Fallback to Icelandic if English not found
    if (language === 'en') {
      return getPage(slug, preview, 'is');
    }
    return null;
  }

  // If not in preview mode, only return published pages
  if (!preview && data?.status !== 'published') {
    return null;
  }

  // Sort sections by position
  if (data?.sections) {
    data.sections.sort((a: any, b: any) => a.position - b.position);
  }

  return data
}

// ============================================
// 📖 LEGACY READ OPERATIONS (compatibility)
// ============================================

export async function getPageLegacy(slug: string, preview = false) {
  // Bygg query með status filter
  let pageQuery = supabase
    .from("pages")
    .select("*, sections(*)")
    .eq("slug", slug);

  // Ef ekki preview mode, sýna bara published
  if (!preview) {
    pageQuery = pageQuery.eq("status", "published");
  }

  const { data: page, error } = await pageQuery.single();

  if (error || !page) {
    console.error("getPage error:", error);
    return null;
  }

  // Raða sections eftir position
  if (page.sections) {
    page.sections.sort((a: any, b: any) => a.position - b.position);
  }

  return page;
}

export async function getProduct(slug: string, preview = false) {
  let query = supabase
    .from("products")
    .select("*")
    .eq("slug", slug);

  if (!preview) {
    query = query.eq("status", "published");
  }

  const { data: product, error } = await query.single();

  if (error || !product) {
    console.error("getProduct error:", error);
    return null;
  }

  return product;
}

export async function getAllPages(locale = "is") {
  const { data: pages } = await supabase
    .from("pages")
    .select("slug, title, updated_at")
    .eq("status", "published")
    .eq("locale", locale)
    .order("updated_at", { ascending: false });

  return pages || [];
}

export async function getAllProducts() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return products || [];
}

// ============================================
// ✏️ WRITE OPERATIONS (Admin CMS)
// ============================================

/**
 * Add a new section to a page
 */
export async function addSection(pageId: string, type: string, content: any = {}) {
  // Get current max position
  const { data: sections } = await supabase
    .from('sections')
    .select('position')
    .eq('page_id', pageId)
    .order('position', { ascending: false })
    .limit(1);

  const nextPosition = (sections?.[0]?.position ?? -1) + 1;

  const { data, error } = await supabase
    .from('sections')
    .insert({
      page_id: pageId,
      type,
      position: nextPosition,
      content
    })
    .select()
    .single();

  if (error) {
    console.error('addSection error:', error);
    throw error;
  }

  // Log audit
  await logAudit({
    action: 'created',
    entityType: 'section',
    entityId: data.id,
    entityName: type,
    newData: content,
  });

  return data;
}

/**
 * Update section content
 */
export async function updateSection(id: string, content: any) {
  // Get old data
  const { data: oldSection } = await supabase
    .from('sections')
    .select('*')
    .eq('id', id)
    .single();

  const { error } = await supabase
    .from('sections')
    .update({ content })
    .eq('id', id);

  if (error) {
    console.error('updateSection error:', error);
    throw error;
  }

  // Log audit
  await logAudit({
    action: 'updated',
    entityType: 'section',
    entityId: id,
    entityName: oldSection?.type || 'Unknown',
    oldData: oldSection?.content,
    newData: content,
  });
}

/**
 * Delete a section
 */
export async function deleteSection(id: string) {
  // Get section data before deleting
  const { data: section } = await supabase
    .from('sections')
    .select('*')
    .eq('id', id)
    .single();

  const { error } = await supabase
    .from('sections')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('deleteSection error:', error);
    throw error;
  }

  // Log audit
  await logAudit({
    action: 'deleted',
    entityType: 'section',
    entityId: id,
    entityName: section?.type || 'Unknown',
    oldData: section,
  });
}

/**
 * Reorder sections (drag & drop)
 */
export async function reorderSections(sections: { id: string }[]) {
  await Promise.all(
    sections.map((s, index) =>
      supabase
        .from('sections')
        .update({ position: index })
        .eq('id', s.id)
    )
  );
}

/**
 * Publish a page
 */
export async function publishPage(pageId: string) {
  // Get page data
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('id', pageId)
    .single();

  const { error } = await supabase
    .from('pages')
    .update({ 
      status: 'published',
      updated_at: new Date().toISOString()
    })
    .eq('id', pageId);

  if (error) {
    console.error('publishPage error:', error);
    throw error;
  }

  // Log audit
  await logAudit({
    action: 'published',
    entityType: 'page',
    entityId: pageId,
    entityName: page?.title || 'Unknown',
  });
}

/**
 * Unpublish a page (set to draft)
 */
export async function unpublishPage(pageId: string) {
  // Get page data
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('id', pageId)
    .single();

  const { error } = await supabase
    .from('pages')
    .update({ 
      status: 'draft',
      updated_at: new Date().toISOString()
    })
    .eq('id', pageId);

  if (error) {
    console.error('unpublishPage error:', error);
    throw error;
  }

  // Log audit
  await logAudit({
    action: 'unpublished',
    entityType: 'page',
    entityId: pageId,
    entityName: page?.title || 'Unknown',
  });
}
