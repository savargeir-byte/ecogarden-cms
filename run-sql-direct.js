const https = require('https');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SUPABASE_URL = 'irqhaetqxulvylwolhqe.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycWhhZXRxeHVsdnlsd29saHFlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODQ3MDczNSwiZXhwIjoyMDg0MDQ2NzM1fQ.2RLFyzmnydG9czaHh0DNvUfI68YuXQdpakqeEmBxC0w';

async function insertData(table, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    
    const options = {
      hostname: SUPABASE_URL,
      path: `/rest/v1/${table}?on_conflict=slug`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Prefer': 'resolution=merge-duplicates,return=representation'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ ${table} data inserted successfully`);
          resolve(JSON.parse(body));
        } else {
          console.log(`⚠️  ${table} status: ${res.statusCode}`);
          console.log('Response:', body);
          reject(new Error(body));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log('🚀 Inserting Eco Garden homepage data...\n');

  const homePageData = {
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
  };

  try {
    await insertData('pages', homePageData);
    console.log('\n✅ Homepage data inserted!');
    console.log('🌐 Visit http://localhost:3000 to see your site\n');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n📋 Manual setup required - check MANUAL-SQL-SETUP.md\n');
  }
}

main();
