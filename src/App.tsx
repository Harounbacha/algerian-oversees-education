import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { UniversityFinderSection } from "./components/UniversityFinderSection";
import { ApplicationGuidancePage } from "./components/ApplicationGuidancePage";
import { CommunityPage } from "./components/CommunityPage";
import { CareerSupportPage } from "./components/CareerSupportPage";
import { ResourcesPage } from "./components/ResourcesPage";
import { Footer } from "./components/Footer";
import React from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handleNavigateToPage = (page: string) => {
    console.log('App received navigation to:', page);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'guidance':
        return (
          <div className="min-h-screen bg-white">
            <Header currentPage={currentPage} onNavigateToPage={handleNavigateToPage} />
            <ApplicationGuidancePage onNavigateHome={handleNavigateHome} />
            <Footer onNavigateToPage={handleNavigateToPage} />
          </div>
        );
      case 'community':
        return (
          <div className="min-h-screen bg-white">
            <Header currentPage={currentPage} onNavigateToPage={handleNavigateToPage} />
            <CommunityPage onNavigateHome={handleNavigateHome} />
            <Footer onNavigateToPage={handleNavigateToPage} />
          </div>
        );
      case 'careers':
        return (
          <div className="min-h-screen bg-white">
            <Header currentPage={currentPage} onNavigateToPage={handleNavigateToPage} />
            <CareerSupportPage onNavigateHome={handleNavigateHome} />
            <Footer onNavigateToPage={handleNavigateToPage} />
          </div>
        );
      case 'resources':
        return (
          <div className="min-h-screen bg-white">
            <Header currentPage={currentPage} onNavigateToPage={handleNavigateToPage} />
            <ResourcesPage onNavigateHome={handleNavigateHome} />
            <Footer onNavigateToPage={handleNavigateToPage} />
          </div>
        );
      case 'home':
      default:
        return (
          <div className="min-h-screen bg-white">
            <Header currentPage={currentPage} onNavigateToPage={handleNavigateToPage} />
            <HeroSection onNavigateToPage={handleNavigateToPage} />
            <FeaturesSection />
            <UniversityFinderSection />
            <Footer onNavigateToPage={handleNavigateToPage} />
          </div>
        );
        case 'univarsity-finder':
            return (
              <div className="min-h-screen bg-white">
                <Header currentPage={currentPage} onNavigateToPage={handleNavigateToPage} />
                <UniversityFinderSection onNavigateToPage={handleNavigateToPage} />    
                <Footer onNavigateToPage={handleNavigateToPage} />
              </div>
            );
    }
  };

  return renderCurrentPage();
}