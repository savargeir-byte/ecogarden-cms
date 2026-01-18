const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://irqhaetqxulvylwolhqe.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycWhhZXRxeHVsdnlsd29saHFlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODQ3MDczNSwiZXhwIjoyMDg0MDQ2NzM1fQ.2RLFyzmnydG9czaHh0DNvUfI68YuXQdpakqeEmBxC0w';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateHero() {
  console.log('🚀 Updating Hero section with Icelandic content...\n');

  // Get home page
  const { data: homePage, error: pageError } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', 'home')
    .single();

  if (pageError || !homePage) {
    console.error('❌ Home page not found:', pageError);
    return;
  }

  console.log(`✅ Found home page: ${homePage.id}`);

  // Find all hero sections
  const { data: sections, error: sectionError } = await supabase
    .from('sections')
    .select('id, content, position')
    .eq('page_id', homePage.id)
    .eq('type', 'hero')
    .order('position');

  if (sectionError || !sections || sections.length === 0) {
    console.error('❌ Hero sections not found:', sectionError);
    return;
  }

  console.log(`✅ Found ${sections.length} hero section(s)`);

  // New content with Icelandic text and image
  const newContent = {
    title: 'Garðlausnir byggðar fyrir íslenskar aðstæður',
    title_en: 'Garden Solutions Built for Icelandic Conditions',
    subtitle: 'Hönnuð fyrir íslenskt veðurfar. Valið af fagfólki.',
    subtitle_en: 'Designed for Icelandic weather. Selected by professionals.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80',
    imageAlt: 'Íslenskur garður',
    imageAlt_en: 'Icelandic garden',
    ctaText: 'Skoða vörur',
    ctaText_en: 'View Products',
    ctaLink: '/products'
  };

  // Update all hero sections
  for (const section of sections) {
    const { error: updateError } = await supabase
      .from('sections')
      .update({ content: newContent })
      .eq('id', section.id);

    if (updateError) {
      console.error(`❌ Error updating section ${section.id}:`, updateError);
    } else {
      console.log(`✅ Updated hero section ${section.id} (position: ${section.position})`);
    }
  }

  console.log('\n✅ Hero section updated successfully!\n');
  console.log('📋 New content:');
  console.log('   IS: "Garðlausnir byggðar fyrir íslenskar aðstæður"');
  console.log('   EN: "Garden Solutions Built for Icelandic Conditions"');
  console.log('   Subtitle IS: "Hönnuð fyrir íslenskt veðurfar. Valið af fagfólki."');
  console.log('   Subtitle EN: "Designed for Icelandic weather. Selected by professionals."');
  console.log('   🖼️  New image with Icelandic garden theme');
  console.log('\n🌍 Both Icelandic and English translations included!\n');
}

updateHero().catch(console.error);
