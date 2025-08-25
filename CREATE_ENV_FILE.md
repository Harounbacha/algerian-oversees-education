# How to Create Your Environment File

## Step 1: Create the file
Create a new file called `.env.local` in your project root (same folder as `package.json`)

## Step 2: Add your Supabase credentials
Add these lines to the `.env.local` file:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 3: Get your credentials from Supabase
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project (or create a new one)
4. Go to **Settings** → **API**
5. Copy the **Project URL** and **anon/public key**

## Step 4: Replace the placeholders
Replace:
- `https://your-project-ref.supabase.co` with your actual Project URL
- `your_anon_key_here` with your actual anon key

## Step 5: Restart your development server
After creating the file, restart your dev server:
```bash
npm run dev
```

## Step 6: Check the console
Open your browser's developer console (F12) and look for the test messages.

## Example of what your .env.local should look like:
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjU2NzI5MCwiZXhwIjoxOTUyMTQzMjkwfQ.example_key_here
```
