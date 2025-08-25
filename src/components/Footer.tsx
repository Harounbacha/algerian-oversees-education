import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  GraduationCap,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { ApplicationGuidancePage } from "./ApplicationGuidancePage";

type FooterProps = {
  onNavigateToPage: (page: string) => void;
};

export function Footer({ onNavigateToPage }: FooterProps) {
  // Add this function to handle navigation
  const handleNavigation = (page: string) => {
    console.log('Navigating to:', page); // Add this for debugging
    onNavigateToPage(page);
  };

  return (
    <footer className="bg-card text-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-semibold">
                Algerian Overseas Education
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering Algerian students to study, connect, and succeed abroad through comprehensive support and guidance.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-accent p-2">
                  <Facebook className="w-5 h-5"/>
                </Button>
              </a>
              <a href="https://x.coms" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-accent p-2">
                  <Twitter className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-accent p-2">
                  <Instagram className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-accent p-2">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Platform</h4>
            <div className="space-y-2">
              <button onClick={() => handleNavigation('univarsity-finder')} className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                University Finder
              </button>
              <button onClick={() => handleNavigation('guidance')} className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                Application Guidance
              </button>
              <button onClick={() => handleNavigation('community')} className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                Student Community
              </button>
              <button onClick={() => handleNavigation('careers')} className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                Career Support
              </button>
              <button onClick={() => handleNavigation('resources')} className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                Resource Hub
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Support</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                Contact Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                FAQs
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Stay Connected</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>harounbacha2005@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+213 656536613</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Batna, Algeria</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-accent"
                />
                <Button size="sm" className="bg-accent hover:bg-accent/90 px-3">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Algerian Overseas Education. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-muted-foreground">🇩🇿 Made with love for Algeria</span>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-2 bg-accent rounded-sm"></div>
                <div className="w-3 h-2 bg-primary-foreground rounded-sm"></div>
                <div className="w-3 h-2 bg-primary rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}