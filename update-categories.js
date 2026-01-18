const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runSQLFile(filename) {
  console.log(`\n📝 Running SQL file: ${filename}\n`);
  
  const sql = fs.readFileSync(filename, 'utf8');
  
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error('❌ Error:', error.message);
      return false;
    }
    
    console.log('✅ SQL executed successfully!');
    if (data) {
      console.log('Response:', data);
    }
    return true;
  } catch (err) {
    console.error('❌ Exception:', err.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Updating home page categories with correct data...\n');
  
  const success = await runSQLFile('update-home-categories-correct.sql');
  
  if (success) {
    console.log('\n✅ Categories updated successfully!');
    console.log('\n📋 Updated categories:');
    console.log('   1. Garðyrkjubændur / Horticulture Farmers');
    console.log('   2. Landbúnaður / Agriculture');
    console.log('   3. Almennar Garðyrkjuvörur / General Garden Products');
    console.log('\n🌍 Both Icelandic and English translations included!\n');
  } else {
    console.log('\n❌ Failed to update categories\n');
    process.exit(1);
  }
}

main();
