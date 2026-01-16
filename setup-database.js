const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Disable SSL verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SUPABASE_URL = 'https://irqhaetqxulvylwolhqe.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycWhhZXRxeHVsdnlsd29saHFlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODQ3MDczNSwiZXhwIjoyMDg0MDQ2NzM1fQ.2RLFyzmnydG9czaHh0DNvUfI68YuXQdpakqeEmBxC0w';

// Create Supabase client with service role
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function executeSQL(sqlFile) {
  console.log(`\n📄 Running ${sqlFile}...`);
  const sql = fs.readFileSync(sqlFile, 'utf8');
  
  // Split SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  let successCount = 0;
  let errorCount = 0;

  for (const statement of statements) {
    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql: statement });
      
      if (error) {
        console.log(`  ⚠️  Warning: ${error.message}`);
        errorCount++;
      } else {
        successCount++;
      }
    } catch (err) {
      // Try direct query instead
      try {
        await supabase.from('_').select('*').limit(0); // Just to test connection
        console.log(`  ⚠️  Could not execute: ${statement.substring(0, 50)}...`);
        errorCount++;
      } catch {
        console.log(`  ⚠️  Skipping statement`);
        errorCount++;
      }
    }
  }

  console.log(`✅ ${sqlFile}: ${successCount} statements executed, ${errorCount} warnings`);
}

async function main() {
  console.log('🚀 Starting Supabase database setup with direct table creation...\n');
  
  console.log('📦 Creating database schema...\n');

  // Create pages table first
  try {
    const { error } = await supabase
      .from('pages')
      .select('id')
      .limit(1);
    
    if (error && error.message.includes('does not exist')) {
      console.log('⚠️  Pages table does not exist. You need to create it in Supabase SQL Editor.');
      console.log('📄 Please run the SQL from MANUAL-SQL-SETUP.md in Supabase Dashboard\n');
    } else {
      console.log('✅ Pages table exists');
    }
  } catch (err) {
    console.log('⚠️  Could not check pages table:', err.message);
  }

  // Try inserting home page
  console.log('\n📝 Inserting sample data...\n');

  const { data, error } = await supabase
    .from('pages')
    .upsert({
      slug: 'home',
      title: 'Eco Garden - Vistvænar lausnir',
      status: 'published',
      locale: 'is',
      blocks: [
        {
          type: 'hero',
          data: {
            title: 'Eco Garden – Vistvænar lausnir fyrir garð og ræktun',
            subtitle: 'Hágæða garðvörur sem virka – fyrir heimili, bændur og græna drauma',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'
          }
        },
        {
          type: 'text',
          data: '<div class="max-w-4xl mx-auto px-6 py-16 text-center"><p class="text-xl text-gray-700 leading-relaxed">Eco Garden sérhæfir sig í umhverfisvænum garðvörum fyrir neytendamarkað og stórnotendur. Við bjóðum fjölbreytt úrval áburðar, fræja, varnarefna og moltugerðarvöru sem leysir raunveruleg vandamál í garðyrkju og ræktun.</p></div>'
        },
        {
          type: 'featureList',
          data: [
            { title: 'Umhverfisvænar vörur', description: 'Vörur sem virða náttúruna og stuðla að sjálfbærni.' },
            { title: 'Fyrir heimili & atvinnu', description: 'Fræ, áburðir og lausnir fyrir garða, golfvelli og akrana.' },
            { title: 'Reynsla og þekking', description: 'Um 30 ára samanlögð reynsla í þjónustu og sölu.' }
          ]
        },
        {
          type: 'cta',
          data: { text: 'Skoða vörur', link: '/products' }
        }
      ],
      seo: {
        title: 'Eco Garden – Vistvænar garðvörur fyrir Ísland',
        description: 'Hágæða umhverfisvænar garðvörur fyrir heimili og atvinnu.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'
      }
    }, { 
      onConflict: 'slug',
      ignoreDuplicates: false 
    });

  if (error) {
    console.log('⚠️  Home page error:', error.message);
    console.log('\n📋 MANUAL SETUP REQUIRED:');
    console.log('1. Open: https://supabase.com/dashboard/project/irqhaetqxulvylwolhqe/sql/new');
    console.log('2. Copy SQL from MANUAL-SQL-SETUP.md');
    console.log('3. Run it in Supabase SQL Editor\n');
  } else {
    console.log('✅ Home page created successfully!');
  }

  console.log('\n✅ Setup script complete!');
  console.log('🌐 Visit http://localhost:3000 to see your site\n');
}

main().catch(console.error);
