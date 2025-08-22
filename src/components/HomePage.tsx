import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { UniversityFinderSection } from "./UniversityFinderSection";
import React from "react";

export function HomePage() {
  return (
    <main>
      <HeroSection onNavigateToPage={(page) => console.log(`Navigating to ${page}`)} />
      <FeaturesSection />
      <UniversityFinderSection />
    </main>
  );
}