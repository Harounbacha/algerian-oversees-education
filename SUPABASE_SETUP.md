# Supabase Setup Guide

## Current Status
✅ Supabase JS client is installed (`@supabase/supabase-js`)
✅ Supabase CLI is installed (`supabase`)
✅ Client configuration files exist

## Steps to Complete Setup

### 1. Create Environment Variables File
Create a `.env.local` file in your project root with the following content:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Get Your Supabase Credentials

#### Option A: Using Supabase Dashboard
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Create a new project or select an existing one
4. Go to **Settings** → **API**
5. Copy the **Project URL** and **anon/public key**

#### Option B: Using Supabase CLI
```bash
# Login to Supabase
npx supabase login

# Create a new project
npx supabase projects create

# Or link to existing project
npx supabase link --project-ref your-project-ref
```

### 3. Update Environment Variables
Replace the placeholder values in `.env.local` with your actual credentials:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Test the Connection
You can test if your Supabase connection is working by adding this to your App component:

```typescript
useEffect(() => {
  async function testConnection() {
    try {
      const { data, error } = await supabase.from('your_table_name').select('*').limit(1);
      if (error) {
        console.error('Supabase connection error:', error);
      } else {
        console.log('Supabase connected successfully!');
      }
    } catch (err) {
      console.error('Connection test failed:', err);
    }
  }
  
  testConnection();
}, []);
```

### 5. Database Schema Setup
If you need to set up database tables, you can:

#### Option A: Using Supabase Dashboard
1. Go to **Table Editor** in your Supabase dashboard
2. Create tables manually through the UI

#### Option B: Using Supabase CLI
```bash
# Initialize Supabase in your project
npx supabase init

# Start local development
npx supabase start

# Create migrations
npx supabase migration new create_your_table

# Apply migrations
npx supabase db push
```

## File Structure
Your project now has these Supabase-related files:
- `src/supabaseClient.ts` - Main Supabase client (recommended)
- `utils/supabase.ts` - Alternative client configuration
- `src/App.tsx` - Updated to use the correct import

## Next Steps
1. Create your database tables
2. Set up authentication if needed
3. Create your first queries
4. Add error handling

## Troubleshooting
- Make sure your `.env.local` file is in the project root
- Restart your development server after adding environment variables
- Check that your Supabase project is active and not paused
- Verify your API keys are correct and have the right permissions
