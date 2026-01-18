// Create admin user via Supabase Auth API
// Run with: node create-admin-via-api.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read .env.local manually
const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  console.log('🚀 Creating admin user...\n');

  // Step 1: Create auth user
  console.log('📝 Step 1: Creating user in auth.users...');
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: 'iceveflausnir@gmail.com',
    password: 'admin123',
    email_confirm: true,
    user_metadata: {
      full_name: 'Admin User'
    }
  });

  if (authError) {
    console.error('❌ Error creating user:', authError.message);
    
    // Check if user already exists
    if (authError.message.includes('already registered')) {
      console.log('\n⚠️  User already exists. Fetching existing user...');
      
      const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
      if (listError) {
        console.error('❌ Error listing users:', listError);
        process.exit(1);
      }
      
      const existingUser = users.find(u => u.email === 'iceveflausnir@gmail.com');
      if (existingUser) {
        console.log('✅ Found existing user:', existingUser.id);
        
        // Update password
        console.log('🔄 Updating password...');
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          existingUser.id,
          { password: 'admin123' }
        );
        
        if (updateError) {
          console.error('❌ Error updating password:', updateError);
          process.exit(1);
        }
        
        console.log('✅ Password updated!');
        
        // Use existing user for profile creation
        authData.user = existingUser;
      }
    } else {
      process.exit(1);
    }
  } else {
    console.log('✅ User created:', authData.user.id);
  }

  // Step 2: Create/update profile
  console.log('\n📝 Step 2: Creating admin profile...');
  
  const userId = authData.user.id;
  
  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (existingProfile) {
    console.log('⚠️  Profile exists, updating role...');
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', userId);
    
    if (updateError) {
      console.error('❌ Error updating profile:', updateError);
      process.exit(1);
    }
    console.log('✅ Profile updated to admin!');
  } else {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        role: 'admin',
        created_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('❌ Error creating profile:', profileError);
      process.exit(1);
    }
    console.log('✅ Profile created!');
  }

  // Step 3: Verify
  console.log('\n📝 Step 3: Verifying setup...');
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  console.log('\n✨ SUCCESS! Admin user created:\n');
  console.log('📧 Email:', 'iceveflausnir@gmail.com');
  console.log('🔑 Password:', 'admin123');
  console.log('👤 User ID:', userId);
  console.log('🎭 Role:', profile?.role);
  console.log('\n⚠️  IMPORTANT: Change password after first login!');
  console.log('\n🌐 Login at: http://localhost:3000/login');
}

createAdminUser().catch(console.error);
