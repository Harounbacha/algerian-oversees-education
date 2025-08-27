import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, MapPin, Star, Users, DollarSign, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { supabase } from "../supabaseClient";

type UniversityFinderSectionProps = {
  onNavigateToPage?: (page: string) => void;
};

export function UniversityFinderSection({ onNavigateToPage }: UniversityFinderSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [activeFilters, setActiveFilters] = useState([] as string[]);
  const [universities, setUniversities] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('universities')
          .select('*')
          .order('world_ranking', { ascending: true })
          .limit(12);
        if (error) throw error;
        let mapped = (data || []).map(u => ({
          id: u.id,
          name: u.name,
          location: u.country || '',
          country: u.country || '',
          image: '/images/university-placeholder.jpg',
          rating: u.rating || 0,
          programs: [],
          tuition: '',
          deadline: '',
          algerianStudents: 0,
          scholarships: false,
          lowTuition: false,
          openApplications: true,
          website: u.website || undefined,
        }));
        // If Supabase has no rows, show empty state without calling external APIs
        setUniversities(mapped);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleViewDetails = (universityId: number) => {
    if (onNavigateToPage) {
      onNavigateToPage('university-detail');
      // In a real app, you'd pass the university ID as a parameter
      localStorage.setItem('selectedUniversityId', universityId.toString());
    }
  };

  const handleViewAllUniversities = () => {
    if (onNavigateToPage) {
      onNavigateToPage('universities-list');
    }
  };

  const filteredUniversities = universities.filter(university => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.programs.some((program: string) => 
        program.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Country filter
    const matchesCountry = selectedCountry === '' || selectedCountry === 'all' || university.country === selectedCountry;

    // Field filter
    const matchesField = selectedField === '' || selectedField === 'all' || 
      university.programs.some((program: string) => 
        program.toLowerCase().includes(selectedField.toLowerCase())
      );

    // Active filters
    const matchesFilters = activeFilters.every(filter => {
      switch (filter) {
        case 'scholarships':
          return university.scholarships;
        case 'algerian-enrollment':
          return university.algerianStudents > 50;
        case 'low-tuition':
          return university.lowTuition;
        case 'open-applications':
          return university.openApplications;
        default:
          return true;
      }
    });

    return matchesSearch && matchesCountry && matchesField && matchesFilters;
  });

  if (loading) {
    return (
      <section id="universities" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading universities...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="universities" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect University
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Search through 500+ top universities worldwide with programs tailored for Algerian students
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-12">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search universities, programs, or locations..."
                  className="pl-10 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="France">France</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="United States">United States</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Field of Study" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="arts">Arts & Humanities</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Button 
              variant={activeFilters.includes('scholarships') ? "default" : "outline"} 
              size="sm" 
              className="text-sm"
              onClick={() => toggleFilter('scholarships')}
            >
              🎓 Scholarships Available
            </Button>
            <Button 
              variant={activeFilters.includes('algerian-enrollment') ? "default" : "outline"} 
              size="sm" 
              className="text-sm"
              onClick={() => toggleFilter('algerian-enrollment')}
            >
              🇩🇿 High Algerian Enrollment
            </Button>
            <Button 
              variant={activeFilters.includes('low-tuition') ? "default" : "outline"} 
              size="sm" 
              className="text-sm"
              onClick={() => toggleFilter('low-tuition')}
            >
              💰 Low Tuition
            </Button>
            <Button 
              variant={activeFilters.includes('open-applications') ? "default" : "outline"} 
              size="sm" 
              className="text-sm"
              onClick={() => toggleFilter('open-applications')}
            >
              📅 Open Applications
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredUniversities.length} of {universities.length} universities
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUniversities.map((university, index) => (
            <Card key={university.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={university.image}
                  alt={university.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {university.scholarships && (
                  <Badge className="absolute top-3 left-3 bg-primary text-white">
                    Scholarships Available
                  </Badge>
                )}
                <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{university.rating}</span>
                </div>
              </div>
              
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {university.name}
                </CardTitle>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{university.location}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {university.programs.map((program: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {program}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Tuition</span>
                    </div>
                    <span className="font-medium">{university.tuition}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Deadline</span>
                    </div>
                    <span className="font-medium">{university.deadline}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Algerian Students</span>
                    </div>
                    <span className="font-medium">{university.algerianStudents}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => handleViewDetails(university.id)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredUniversities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCountry('');
                setSelectedField('');
                setActiveFilters([]);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* View More */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary text-primary hover:bg-primary hover:text-white"
            onClick={handleViewAllUniversities}
          >
            View All 500+ Universities
          </Button>
        </div>
      </div>
    </section>
  );
}