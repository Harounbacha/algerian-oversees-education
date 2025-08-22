import { Button } from "./ui/button";
import { Menu, X, GraduationCap } from "lucide-react";
import { useState } from "react";
import React from "react";

interface HeaderProps {
  currentPage: string;
  onNavigateToPage: (page: string) => void;
}

export function Header({ currentPage, onNavigateToPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (page: string, anchor?: string) => {
    onNavigateToPage(page);
    setIsMenuOpen(false);
    
    if (anchor && page === 'home') {
      // Small delay to ensure page has loaded before scrolling
      setTimeout(() => {
        document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-none">
              Algerian Overseas Education
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <button 
              onClick={() => handleNavigation('home', '#universities')}
              className={`transition-colors text-sm xl:text-base ${
                currentPage === 'home' 
                  ? 'text-primary font-medium' 
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Universities
            </button>
            <button 
              onClick={() => handleNavigation('guidance')}
              className={`transition-colors text-sm xl:text-base ${
                currentPage === 'guidance' 
                  ? 'text-primary font-medium' 
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Guidance
            </button>
            <button 
              onClick={() => handleNavigation('community')}
              className={`transition-colors text-sm xl:text-base ${
                currentPage === 'community' 
                  ? 'text-primary font-medium' 
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Community
            </button>
            <button 
              onClick={() => handleNavigation('careers')}
              className={`transition-colors text-sm xl:text-base ${
                currentPage === 'careers' 
                  ? 'text-primary font-medium' 
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Careers
            </button>
            <button 
              onClick={() => handleNavigation('resources')}
              className={`transition-colors text-sm xl:text-base ${
                currentPage === 'resources' 
                  ? 'text-primary font-medium' 
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Resources
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Login
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-4 pb-6 space-y-2">
              <button
                onClick={() => handleNavigation('home', '#universities')}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'home' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Universities
              </button>
              <button
                onClick={() => handleNavigation('guidance')}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'guidance' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Application Guidance
              </button>
              <button
                onClick={() => handleNavigation('community')}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'community' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Community
              </button>
              <button
                onClick={() => handleNavigation('careers')}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'careers' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Career Support
              </button>
              <button
                onClick={() => handleNavigation('resources')}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'resources' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Resources
              </button>
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Login
                </Button>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}