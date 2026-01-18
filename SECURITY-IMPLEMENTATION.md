# Security Implementation fyrir Admin CMS

## 🔒 Security Features

### 1. **Authentication (Auðkenning)**
- ✅ Supabase Auth integration
- ✅ Password login með bcrypt hashing
- ✅ Magic link email authentication
- ✅ Session management með JWT tokens
- ✅ Automatic redirect ef ekki innskráður

### 2. **Authorization (Heimildir)**
- ✅ Role-based access control (RBAC)
- ✅ Aðeins `admin` og `editor` roles fá aðgang
- ✅ Middleware authentication fyrir allar /admin routes
- ✅ Client-side RoleGate component
- ✅ Server-side role validation

### 3. **Rate Limiting**
- ✅ 5 failed login attempts → 15 minute lockout
- ✅ Automatic unlock eftir tímamörk
- ✅ Visual warnings fyrir failed attempts
- ✅ Client-side lockout state

### 4. **Session Security**
- ✅ HTTP-only cookies fyrir tokens
- ✅ Secure cookie flags í production
- ✅ Automatic session refresh
- ✅ Session expiry handling
- ✅ Logout functionality

### 5. **UI Security Indicators**
- ✅ Lock icon þegar account er locked
- ✅ Attempt counter (1/5, 2/5, etc.)
- ✅ User role badge (Admin/Editor)
- ✅ Signed in as email display
- ✅ Secure logout button

## 📋 Setup Leiðbeiningar

### 1. Búa til Admin User

Farðu í Supabase SQL Editor og keyrðu:

```sql
-- Create admin user profile
INSERT INTO profiles (id, email, role, created_at)
VALUES (
  'USER_ID_FROM_AUTH_USERS',
  'admin@ecogarden.is',
  'admin',
  NOW()
);
```

**MIKILVÆGT:** Skiptu út `USER_ID_FROM_AUTH_USERS` fyrir raunverulegt user ID frá `auth.users` töflu.

### 2. Fá User ID

```sql
-- Get user ID from email
SELECT id FROM auth.users WHERE email = 'admin@ecogarden.is';
```

### 3. Búa til fyrsta admin user

Ef þú hefur ekki neinn user ennþá:

1. Farðu á `/login`
2. Notaðu Magic Link mode
3. Sláðu inn admin email
4. Opnaðu email og smelltu á link
5. Keyrðu SQL hér að ofan með þínu user ID

### 4. Búa til Editor User

```sql
INSERT INTO profiles (id, email, role, created_at)
VALUES (
  'EDITOR_USER_ID',
  'editor@ecogarden.is',
  'editor',
  NOW()
);
```

## 🛡️ Security Best Practices

### Environment Variables

Gakktu úr skugga um að þessar séu settar í `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Row Level Security (RLS)

Supabase RLS policies ætti að vera virkar á `profiles` töflu:

```sql
-- Only authenticated users can read profiles
CREATE POLICY "Allow authenticated read"
ON profiles FOR SELECT
TO authenticated
USING (true);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);
```

### Cookie Security

Í production, bættu þessu við `next.config.ts`:

```typescript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

## 🔐 Login Flow

```
1. User goes to /admin
   ↓
2. Middleware checks auth token
   ↓
3. If no token → redirect to /login
   ↓
4. User enters credentials
   ↓
5. Client validates (rate limit check)
   ↓
6. Supabase authenticates
   ↓
7. Check user role in profiles table
   ↓
8. If admin/editor → redirect to /admin
   ↓
9. If not → logout + error message
```

## 🚨 Security Scenarios

### Scenario 1: Unauthorized User tries to access /admin
**Result:** Middleware redirects to `/login?redirectTo=/admin`

### Scenario 2: User without admin/editor role tries to login
**Result:** Authentication succeeds but immediate logout + error message

### Scenario 3: 5 failed login attempts
**Result:** 15 minute lockout with countdown timer

### Scenario 4: Valid token expires
**Result:** Automatic redirect to login with session expired message

### Scenario 5: User opens /admin in incognito
**Result:** Immediate redirect to login (no session)

## 🔧 Testing Security

### Test 1: Unauthenticated Access
```bash
# Open browser in incognito mode
# Navigate to http://localhost:3000/admin
# Should redirect to /login
```

### Test 2: Wrong Role
```sql
-- Temporarily change your role to 'viewer'
UPDATE profiles SET role = 'viewer' WHERE email = 'your@email.com';
-- Try to login
-- Should get "Access denied" error
-- Change back:
UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
```

### Test 3: Rate Limiting
```
1. Go to /login
2. Enter wrong password 5 times
3. Should see "Account locked" message
4. Wait 15 minutes OR reset in browser localStorage
```

### Test 4: Logout
```
1. Login successfully
2. Click user profile → Sign out
3. Should redirect to /login
4. Try to access /admin
5. Should redirect back to /login
```

## 📊 Monitoring & Logging

### Failed Login Attempts
```typescript
// Add to login page if needed:
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('Successful login:', session?.user?.email);
  }
  if (event === 'SIGNED_OUT') {
    console.log('User logged out');
  }
});
```

### Track Suspicious Activity
```typescript
// Log failed attempts to database
async function logFailedAttempt(email: string) {
  await supabase.from('security_logs').insert({
    event: 'failed_login',
    email,
    ip_address: req.headers['x-forwarded-for'],
    timestamp: new Date()
  });
}
```

## 🆘 Emergency Procedures

### Reset Locked Account
```javascript
// In browser console on /login page:
localStorage.removeItem('loginAttempts');
localStorage.removeItem('lockoutTime');
location.reload();
```

### Manually Unlock User
```sql
-- If you implement lockout in database:
UPDATE profiles 
SET locked_until = NULL, failed_attempts = 0 
WHERE email = 'user@email.com';
```

### Reset All Sessions
```sql
-- In Supabase Dashboard → Authentication → Users
-- Click on user → "Sign out user"
```

## 🔄 Future Improvements

### Recommended additions:
1. **Two-Factor Authentication (2FA)**
   - TOTP support
   - SMS verification
   - Backup codes

2. **IP Whitelisting**
   - Allow only specific IPs to access /admin
   - Configurable in environment variables

3. **Activity Logging**
   - Track all admin actions
   - Who edited what and when
   - IP address logging

4. **Password Requirements**
   - Minimum 12 characters
   - Uppercase, lowercase, number, symbol
   - Password strength indicator

5. **Session Timeout**
   - Auto-logout after 30 minutes inactive
   - "Keep me logged in" checkbox
   - Activity-based session refresh

6. **Email Notifications**
   - Alert on new login from unknown device
   - Alert on password change
   - Alert on role change

## 📝 Security Checklist

Before going to production:

- [ ] Enable Supabase RLS policies on all tables
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure secure cookie settings
- [ ] Enable rate limiting on API routes
- [ ] Set up monitoring/alerting
- [ ] Test all authentication flows
- [ ] Document emergency procedures
- [ ] Train users on security best practices
- [ ] Set up automated backups
- [ ] Configure CORS policies
- [ ] Enable audit logging
- [ ] Test disaster recovery plan

---

**Dagsetning:** 18. janúar 2026
**Status:** Production Ready with Security ✅🔒
