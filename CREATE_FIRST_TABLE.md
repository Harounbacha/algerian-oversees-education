# Create Your First Table in Supabase

## 🎉 Congratulations!
Your Supabase connection is working! The error you saw was just because the test table doesn't exist yet.

## How to Create a Test Table

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase project dashboard**
   - Visit [https://supabase.com](https://supabase.com)
   - Sign in and select your project

2. **Navigate to Table Editor**
   - Click on **"Table Editor"** in the left sidebar

3. **Create a new table**
   - Click **"New table"** button
   - Name it `test_table`
   - Add these columns:
     - `id` (type: `int8`, check "Primary Key")
     - `name` (type: `text`)
     - `created_at` (type: `timestamptz`, default: `now()`)

4. **Save the table**
   - Click **"Save"** to create the table

### Option 2: Using SQL Editor

1. **Go to SQL Editor**
   - Click on **"SQL Editor"** in the left sidebar

2. **Run this SQL command:**
```sql
CREATE TABLE test_table (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert a test row
INSERT INTO test_table (name) VALUES ('Test Item');
```

## Test Your Table

After creating the table, refresh your browser and check the console. You should now see:
```
✅ Supabase connected successfully! [{id: 1, name: "Test Item", created_at: "..."}]
```

## Next Steps

Now that your connection is working, you can:

1. **Create tables for your app** (users, universities, applications, etc.)
2. **Set up authentication** if needed
3. **Start building your app features**

## Example Tables for Your Education Platform

Here are some suggested tables for your Algerian Overseas Education Platform:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Universities table
CREATE TABLE universities (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  university_id BIGINT REFERENCES universities(id),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Remove the Test Code

Once you've confirmed everything works, you can remove the test code from your `App.tsx` file.
