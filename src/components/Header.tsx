import { Button } from "./ui/button";
import { Menu, X, GraduationCap, Sun, Moon } from "lucide-react";
import { useState } from "react";
import React from "react";
import { useApp } from "../context/AppContext";

interface HeaderProps {
  currentPage: string;
  onNavigateToPage: (page: string) => void;
}

export function Header({ currentPage, onNavigateToPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state, setTheme } = useApp();

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
    <header className="w-full bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 py-2">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-foreground tracking-tight truncate max-w-[200px] sm:max-w-none">
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
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Universities
            </button>
            <button 
              onClick={() => handleNavigation('guidance')}
              className={`transition-colors text-sm xl:text-base ${
                currentPage === 'guidance' 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Guidance
            </button>
            <button 
              onClick={() => handleNavigation('community')}
              className={`transition-colors text-sm xl:text-base ${
                currentPage === 'community' 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Community
            </button>
            <button 
              onClick={() => handleNavigation('careers')}
              className={`transition-colors text-sm xl:text-base ${
                currentPage === 'careers' 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Careers
            </button>
            <button 
              onClick={() => handleNavigation('resources')}
              className={`transition-colors text-sm xl:text-base ${
                currentPage === 'resources' 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Resources
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0"
              onClick={() =>
                setTheme(
                  state.theme.name === 'dark'
                    ? { name: 'light', label: 'Light', icon: () => null }
                    : { name: 'dark', label: 'Dark', icon: () => null }
                )
              }
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {state.theme.name === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => onNavigateToPage('login')}
            >
              Login
            </Button>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => onNavigateToPage('register')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-muted-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <div className="px-2 pt-4 pb-6 space-y-2">
              <button
                onClick={() => handleNavigation('home', '#universities')}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'home' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent'
                }`}
              >
                Universities
              </button>
              <button
                onClick={() => handleNavigation('guidance')}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'guidance' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent'
                }`}
              >
                Application Guidance
              </button>
              <button
                onClick={() => handleNavigation('community')}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'community' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent'
                }`}
              >
                Community
              </button>
              <button
                onClick={() => handleNavigation('careers')}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'careers' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent'
                }`}
              >
                Career Support
              </button>
              <button
                onClick={() => handleNavigation('resources')}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'resources' 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent'
                }`}
              >
                Resources
              </button>
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-10"
                  onClick={() =>
                    setTheme(
                      state.theme.name === 'dark'
                        ? { name: 'light', label: 'Light', icon: () => null }
                        : { name: 'dark', label: 'Dark', icon: () => null }
                    )
                  }
                >
                  {state.theme.name === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 mr-2" /> Light mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 mr-2" /> Dark mode
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => onNavigateToPage('login')}
                >
                  Login
                </Button>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => onNavigateToPage('register')}
                >
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