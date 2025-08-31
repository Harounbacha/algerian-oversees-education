import { createClient } from '@supabase/supabase-js'

// Vite's import.meta.env typing can vary; fall back to any
const env: any = (import.meta as any).env || {}
const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
	// eslint-disable-next-line no-console
	console.error('Missing Supabase env. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
	throw new Error('Supabase configuration missing')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

