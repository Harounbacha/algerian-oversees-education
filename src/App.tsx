import React, { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { UniversityFinderSection } from "./components/UniversityFinderSection";
import { Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
const ApplicationGuidancePage = lazy(() => import("./components/ApplicationGuidancePage").then(m => ({ default: m.ApplicationGuidancePage })));
const CommunityPage = lazy(() => import("./components/CommunityPage").then(m => ({ default: m.CommunityPage })));
const CareerSupportPage = lazy(() => import("./components/CareerSupportPage").then(m => ({ default: m.CareerSupportPage })));
const ResourcesPage = lazy(() => import("./components/ResourcesPage").then(m => ({ default: m.ResourcesPage })));
import { Footer } from "./components/Footer";
const Dashboard = lazy(() => import("./components/Dashboard"));
const LoginPage = lazy(() => import("./components/auth/LoginPage").then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("./components/auth/RegisterPage").then(m => ({ default: m.RegisterPage })));
const UniversityDetailPage = lazy(() => import("./components/universities/UniversityDetailPage").then(m => ({ default: m.UniversityDetailPage })));
const UniversitiesListPage = lazy(() => import("./components/universities/UniversitiesListPage").then(m => ({ default: m.UniversitiesListPage })));
const UserProfilePage = lazy(() => import("./components/profile/UserProfilePage").then(m => ({ default: m.UserProfilePage })));
const ApplicationPage = lazy(() => import("./components/applications/ApplicationPage").then(m => ({ default: m.ApplicationPage })));
import { AppProvider } from "./context/AppContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { NotificationSystem } from "./components/NotificationSystem";
import { useApp } from "./context/AppContext";
import { useEffect } from "react";
import { supabase } from './supabaseClient';

// Main App Component
function AppContent() {
  const { state, setCurrentPage } = useApp();
  const { currentPage } = state;

  // Test Supabase connection and database schema
  useEffect(() => {
    async function testDatabase() {
      try {
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
        
        console.log('✅ Environment variables found');
        console.log('URL:', supabaseUrl);
        console.log('Key:', supabaseKey.substring(0, 20) + '...');
        
        // Test core tables
        const tablesToTest = [
          'users',
          'universities', 
          'application_statuses',
          'discussion_categories',
          'resource_categories',
          'countries'
        ];
        
        console.log('🔍 Testing database schema...');
        
        for (const tableName of tablesToTest) {
          try {
            const { data, error } = await supabase
              .from(tableName)
              .select('*')
              .limit(1);
            
            if (error) {
              console.error(`❌ ${tableName} table error:`, error.message);
            } else {
              console.log(`✅ ${tableName} table accessible`);
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
          console.log(`✅ Application statuses loaded: ${statuses?.length || 0} statuses`);
        }
        
        // Test countries (should have default data)
        const { data: countries, error: countryError } = await supabase
          .from('countries')
          .select('*');
        
        if (countryError) {
          console.error('❌ Countries error:', countryError);
        } else {
          console.log(`✅ Countries loaded: ${countries?.length || 0} countries`);
        }
        
        console.log('🎉 Database schema test completed!');
        console.log('📝 Next: Follow DATABASE_IMPLEMENTATION_GUIDE.md to add sample data');
        
      } catch (err) {
        console.error('❌ Database test failed:', err);
      }
    }

    testDatabase();
  }, []);

  const renderCurrentPage = () => {
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
            <Suspense fallback={<div className="p-8">Loading…</div>}>
              {renderCurrentPage()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigateToPage={setCurrentPage} />
      <NotificationSystem />
    </div>
  );
}

// Root App Component with Providers
export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider children={<AppContent />} />
    </ErrorBoundary>
  );
}