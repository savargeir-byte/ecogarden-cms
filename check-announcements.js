// Quick check of announcements table structure
const { createClient } = require('@supabase/supabase-js');

// Read from .env.local manually or use process.env
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkAnnouncements() {
  console.log('🔍 Checking announcements table...\n');
  
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .limit(5);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log('📊 Sample announcements:');
  console.log(JSON.stringify(data, null, 2));
  
  if (data && data.length > 0) {
    console.log('\n📋 Columns found:', Object.keys(data[0]).join(', '));
    
    const hasMessageEn = data[0].hasOwnProperty('message_en');
    console.log(`\n${hasMessageEn ? '✅' : '❌'} message_en column ${hasMessageEn ? 'exists' : 'does NOT exist'}`);
  }
}

checkAnnouncements();
