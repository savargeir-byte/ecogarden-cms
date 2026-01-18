// Update announcements with English translations
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function updateAnnouncements() {
  console.log('🔄 Updating announcements with English translations...\n');
  
  // Get all announcements
  const { data: announcements, error: fetchError } = await supabase
    .from('announcements')
    .select('*');

  if (fetchError) {
    console.error('❌ Error fetching announcements:', fetchError);
    return;
  }

  console.log(`Found ${announcements.length} announcements\n`);

  // Update each announcement with English translation
  for (const ann of announcements) {
    let englishMessage = ann.message_en;
    
    // If no English translation exists, provide a default one
    if (!englishMessage) {
      if (ann.message.includes('Velkomin')) {
        englishMessage = '🎉 Welcome to our new website!';
      } else if (ann.message.toLowerCase().includes('tilboð')) {
        englishMessage = 'Special offer on garden products - Contact us for details!';
      } else if (ann.message.toLowerCase().includes('nýjar vörur')) {
        englishMessage = 'New products available - Check out our latest arrivals';
      } else {
        // Generic translation
        englishMessage = ann.message; // Keep original if we can't translate
      }

      const { error: updateError } = await supabase
        .from('announcements')
        .update({ message_en: englishMessage })
        .eq('id', ann.id);

      if (updateError) {
        console.error(`❌ Error updating ${ann.id}:`, updateError);
      } else {
        console.log(`✅ Updated: "${ann.message}" → "${englishMessage}"`);
      }
    }
  }

  console.log('\n✅ All announcements updated!');
}

updateAnnouncements();
