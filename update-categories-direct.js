const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://irqhaetqxulvylwolhqe.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycWhhZXRxeHVsdnlsd29saHFlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODQ3MDczNSwiZXhwIjoyMDg0MDQ2NzM1fQ.2RLFyzmnydG9czaHh0DNvUfI68YuXQdpakqeEmBxC0w';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateCategories() {
  console.log('🚀 Updating home page categories...\n');

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

  // Find imageGrid section
  const { data: sections, error: sectionError } = await supabase
    .from('sections')
    .select('id, content')
    .eq('page_id', homePage.id)
    .eq('type', 'imageGrid')
    .single();

  if (sectionError || !sections) {
    console.error('❌ ImageGrid section not found:', sectionError);
    return;
  }

  console.log(`✅ Found imageGrid section: ${sections.id}`);

  // New content with correct categories
  const newContent = {
    heading: 'Okkar Þjónusta',
    heading_en: 'Our Services',
    items: [
      {
        title: 'Garðyrkjubændur',
        title_en: 'Horticulture Farmers',
        subtitle: 'Sérsniðnar lausnir fyrir fagfólk í garðyrkju',
        subtitle_en: 'Customized solutions for horticulture professionals',
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
        link: '/products?category=gardyrkjubaendur',
        subcategories: [
          'Gróðurhús',
          'Varmastýring',
          'Ræktunarkassar',
          'Vökvunarkerfi',
          'LED ljósabúnaður',
          'Hitastigar og mælar'
        ],
        subcategories_en: [
          'Greenhouses',
          'Climate Control',
          'Growing Systems',
          'Irrigation Systems',
          'LED Grow Lights',
          'Sensors & Meters'
        ]
      },
      {
        title: 'Landbúnaður',
        title_en: 'Agriculture',
        subtitle: 'Traustir verkfæri og búnaður fyrir bændur',
        subtitle_en: 'Reliable tools and equipment for farmers',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
        link: '/products?category=landbunadur',
        subcategories: [
          'Garðyrkjuvélar',
          'Slátturvélar',
          'Sáningabúnaður',
          'Heyvinnsla',
          'Girðingaefni',
          'Hlaðabúnaður'
        ],
        subcategories_en: [
          'Garden Machinery',
          'Lawn Mowers',
          'Seeding Equipment',
          'Hay Processing',
          'Fencing Materials',
          'Barn Equipment'
        ]
      },
      {
        title: 'Almennar Garðyrkjuvörur',
        title_en: 'General Garden Products',
        subtitle: 'Vandaðar garðvörur fyrir heimili og sumarbústaði',
        subtitle_en: 'Quality garden products for homes and cottages',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
        link: '/products?category=almennar-gardyrkjuvorur',
        subcategories: [
          'Garðverkfæri',
          'Garðhúsgögn',
          'Pottaplöntur',
          'Jarðvegur og áburður',
          'Girðingar og skreyting',
          'Vatnsslöngur'
        ],
        subcategories_en: [
          'Garden Tools',
          'Garden Furniture',
          'Potted Plants',
          'Soil & Fertilizer',
          'Fences & Decorations',
          'Hoses'
        ]
      }
    ]
  };

  // Update the section
  const { error: updateError } = await supabase
    .from('sections')
    .update({ content: newContent })
    .eq('id', sections.id);

  if (updateError) {
    console.error('❌ Error updating section:', updateError);
    return;
  }

  console.log('\n✅ Categories updated successfully!\n');
  console.log('📋 Updated categories:');
  console.log('   1. Garðyrkjubændur / Horticulture Farmers');
  console.log('      - Gróðurhús, Varmastýring, Ræktunarkassar...');
  console.log('   2. Landbúnaður / Agriculture');
  console.log('      - Garðyrkjuvélar, Slátturvélar, Sáningabúnaður...');
  console.log('   3. Almennar Garðyrkjuvörur / General Garden Products');
  console.log('      - Garðverkfæri, Garðhúsgögn, Pottaplöntur...');
  console.log('\n🌍 Both Icelandic and English translations included!\n');
}

updateCategories().catch(console.error);
