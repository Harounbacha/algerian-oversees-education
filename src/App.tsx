import React from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { UniversityFinderSection } from "./components/UniversityFinderSection";
import { lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Footer } from "./components/Footer";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/auth/LoginPage";
import { RegisterPage } from "./components/auth/RegisterPage";
import { UniversityDetailPage } from "./components/universities/UniversityDetailPage";
import { UniversitiesListPage } from "./components/universities/UniversitiesListPage";
import { UserProfilePage } from "./components/profile/UserProfilePage";
import { ApplicationPage } from "./components/applications/ApplicationPage";
import { ApplicationGuidancePage } from "./components/ApplicationGuidancePage";
import { CommunityPage } from "./components/CommunityPage";
import { CareerSupportPage } from "./components/CareerSupportPage";
import { ResourcesPage } from "./components/ResourcesPage";
import { AppProvider } from "./context/AppContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { NotificationSystem } from "./components/NotificationSystem";
import { useApp } from "./context/AppContext";
import { useEffect } from "react";
import { supabase } from './supabaseClient';
import { DebugAuth } from "./components/DebugAuth";

// Main App Component
function AppContent() {
  const { state, setCurrentPage } = useApp();
  const { currentPage } = state;
  
  console.log('AppContent: currentPage =', currentPage, 'user =', state.user);

  // Test Supabase connection and database schema
  useEffect(() => {
    async function testDatabase() {
      try {
        const isDev = (import.meta as any).env?.DEV;
        const devLog = (...args: any[]) => { if (isDev) console.log(...args); };
        // First, check if environment variables are loaded
        const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
        const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey) {
          console.error('❌ Supabase environment variables are missing!');
          console.error('Please create a .env.local file with:');
          console.error('VITE_SUPABASE_URL=your_supabase_project_url');
          console.error('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
          return;
        }
        
        devLog('✅ Environment variables found');
        devLog('URL:', supabaseUrl);
        devLog('Key:', supabaseKey.substring(0, 20) + '...');
        
        // Test core tables
        const tablesToTest = [
          'users',
          'universities', 
          'application_statuses',
          'discussion_categories',
          'resource_categories',
          'countries'
        ];
        
        devLog('🔍 Testing database schema...');
        
        for (const tableName of tablesToTest) {
          try {
            const { data, error } = await supabase
              .from(tableName)
              .select('*')
              .limit(1);
            
            if (error) {
              console.error(`❌ ${tableName} table error:`, error.message);
            } else {
              devLog(`✅ ${tableName} table accessible`);
            }
          } catch (err) {
            console.error(`❌ ${tableName} table failed:`, err);
          }
        }
        
        // Test application statuses (should have default data)
        const { data: statuses, error: statusError } = await supabase
          .from('application_statuses')
          .select('*');
        
        if (statusError) {
          console.error('❌ Application statuses error:', statusError);
        } else {
          devLog(`✅ Application statuses loaded: ${statuses?.length || 0} statuses`);
        }
        
        // Test countries (should have default data)
        const { data: countries, error: countryError } = await supabase
          .from('countries')
          .select('*');
        
        if (countryError) {
          console.error('❌ Countries error:', countryError);
        } else {
          devLog(`✅ Countries loaded: ${countries?.length || 0} countries`);
        }
        
        devLog('🎉 Database schema test completed!');
        devLog('📝 Next: Follow DATABASE_IMPLEMENTATION_GUIDE.md to add sample data');
        
      } catch (err) {
        console.error('❌ Database test failed:', err);
      }
    }

    testDatabase();
  }, []);

  const renderCurrentPage = () => {
    console.log('Rendering page:', currentPage);
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSection onNavigateToPage={setCurrentPage} />
            <FeaturesSection />
            <UniversityFinderSection onNavigateToPage={setCurrentPage} />
          </>
        );
      case 'dashboard':
        return <Dashboard onNavigateToPage={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigateToPage={setCurrentPage} onNavigateHome={() => setCurrentPage('home')} />;
      case 'register':
        return <RegisterPage onNavigateToPage={setCurrentPage} onNavigateHome={() => setCurrentPage('home')} />;
      case 'university-detail':
        return <UniversityDetailPage onNavigateToPage={setCurrentPage} onNavigateHome={() => setCurrentPage('home')} />;
      case 'application':
        return <ApplicationPage onNavigateToPage={setCurrentPage} onNavigateHome={() => setCurrentPage('home')} />;
      case 'universities-list':
        return <UniversitiesListPage onNavigateToPage={setCurrentPage} onNavigateHome={() => setCurrentPage('home')} />;
      case 'profile':
        return <UserProfilePage onNavigateToPage={setCurrentPage} onNavigateHome={() => setCurrentPage('home')} />;
      case 'guidance':
        return <ApplicationGuidancePage onNavigateHome={() => setCurrentPage('home')} />;
      case 'community':
        return <CommunityPage onNavigateHome={() => setCurrentPage('home')} />;
      case 'careers':
        return <CareerSupportPage onNavigateHome={() => setCurrentPage('home')} />;
      case 'resources':
        return <ResourcesPage onNavigateHome={() => setCurrentPage('home')} />;
      default:
        return (
          <>
            <HeroSection onNavigateToPage={setCurrentPage} />
            <FeaturesSection />
            <UniversityFinderSection onNavigateToPage={setCurrentPage} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPage={currentPage} onNavigateToPage={setCurrentPage} />
      <main className="">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigateToPage={setCurrentPage} />
      <NotificationSystem />
      <DebugAuth />
    </div>
  );
}

// Root App Component with Providers
export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}