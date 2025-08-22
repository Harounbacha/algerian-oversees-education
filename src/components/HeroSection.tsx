import { Button } from "./ui/button";
import { ArrowRight, Search, Users, Award } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import React from "react";

type HeroSectionProps = {
  onNavigateToPage: (page: string) => void;
};

export function HeroSection({ onNavigateToPage }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-teal-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Your Gateway to
                <span className="block text-teal-200">International Education</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover universities, navigate applications, and connect with fellow Algerian students worldwide.
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">500+ Universities</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">1200+ Students</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">95% Success Rate</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 shadow-lg text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto"
                onClick={() => onNavigateToPage('univarsity-finder')}
              >
                Explore Universities
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary shadow-lg text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto"
                onClick={() => onNavigateToPage('community')}
              >
                Join Community
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nfGVufDF8fHx8MTc1NTc3NzkyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students studying together"
                className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-xl shadow-xl p-3 sm:p-4 text-gray-900 max-w-[140px] sm:max-w-[180px]">
                <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
                <div className="text-lg sm:text-2xl font-bold text-primary">95%</div>
                <div className="text-xs sm:text-sm text-gray-600">Applications Accepted</div>
              </div>
              
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white rounded-xl shadow-xl p-3 sm:p-4 text-gray-900 max-w-[140px] sm:max-w-[180px]">
                <div className="text-xs sm:text-sm text-gray-600">Global Network</div>
                <div className="text-lg sm:text-2xl font-bold text-teal-600">45+</div>
                <div className="text-xs sm:text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}