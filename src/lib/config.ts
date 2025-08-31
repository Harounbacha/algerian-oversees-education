// Environment configuration helper
export const config = {
  // Supabase
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  
  // App
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Algerian Overseas Education Platform',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    env: import.meta.env.VITE_APP_ENV || 'development',
  },
  
  // Features
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
    payments: import.meta.env.VITE_ENABLE_PAYMENTS === 'true',
  },
  
  // API
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '10485760'),
  },
  
  // External services
  external: {
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  },
  
  // Validation
  validate() {
    const required = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
    const missing = required.filter(key => !import.meta.env[key]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
    
    return true;
  },
  
  // Development helpers
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  isTest: import.meta.env.MODE === 'test',
};

// Validate configuration on import
if (config.isProd) {
  config.validate();
}
