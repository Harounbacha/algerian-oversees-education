import { createClient } from '@supabase/supabase-js'
import { config } from './lib/config'

// Validate configuration
try {
  config.validate()
} catch (error) {
  console.error('Configuration validation failed:', error)
  throw error
}

export const supabase = createClient(config.supabase.url, config.supabase.anonKey)

