import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, MapPin, Star, Users, DollarSign, Clock, Filter, Grid, List, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { supabase } from '../../supabaseClient';

interface UniversitiesListPageProps {
  onNavigateToPage: (page: string) => void;
  onNavigateHome: () => void;
}

export function UniversitiesListPage({ onNavigateToPage, onNavigateHome }: UniversitiesListPageProps) {
  const [universities, setUniversities] = useState<any[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedTuitionRange, setSelectedTuitionRange] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Sample universities data (in real app, this would come from Supabase)
  const sampleUniversities = [
    {
      id: 1,
      name: "University of Toronto",
      location: "Toronto, Canada",
      country: "Canada",
      image: "https://images.unsplash.com/photo-1600239401291-385542139183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmdzJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NTc3NzkzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      programs: ["Engineering", "Medicine", "Business", "Computer Science"],
      tuition: 45000,
      tuitionCurrency: "CAD",
      deadline: "Jan 15, 2024",
      algerianStudents: 120,
      scholarships: true,
      lowTuition: false,
      openApplications: true,
      worldRanking: 18
    },
    {
      id: 2,
      name: "Sorbonne University",
      location: "Paris, France",
      country: "France",
      image: "https://images.unsplash.com/photo-1600239401291-385542139183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmdzJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NTc3NzkzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      programs: ["Literature", "Philosophy", "Sciences", "Arts"],
      tuition: 2770,
      tuitionCurrency: "EUR",
      deadline: "Mar 1, 2024",
      algerianStudents: 85,
      scholarships: true,
      lowTuition: true,
      openApplications: true,
      worldRanking: 45
    },
    {
      id: 3,
      name: "Technical University of Munich",
      location: "Munich, Germany",
      country: "Germany",
      image: "https://images.unsplash.com/photo-1600239401291-385542139183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmdzJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NTc3NzkzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      programs: ["Engineering", "Computer Science", "Physics", "Mathematics"],
      tuition: 0,
      tuitionCurrency: "EUR",
      deadline: "Feb 28, 2024",
      algerianStudents: 65,
      scholarships: true,
      lowTuition: true,
      openApplications: true,
      worldRanking: 32
    },
    {
      id: 4,
      name: "University of Oxford",
      location: "Oxford, United Kingdom",
      country: "United Kingdom",
      image: "https://images.unsplash.com/photo-1600239401291-385542139183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmdzJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NTc3NzkzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      programs: ["Humanities", "Sciences", "Medicine", "Law"],
      tuition: 39000,
      tuitionCurrency: "GBP",
      deadline: "Oct 15, 2023",
      algerianStudents: 45,
      scholarships: true,
      lowTuition: false,
      openApplications: false,
      worldRanking: 1
    },
    {
      id: 5,
      name: "MIT",
      location: "Cambridge, United States",
      country: "United States",
      image: "https://images.unsplash.com/photo-1600239401291-385542139183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmdzJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NTc3NzkzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      programs: ["Engineering", "Computer Science", "Physics", "Mathematics"],
      tuition: 55000,
      tuitionCurrency: "USD",
      deadline: "Jan 1, 2024",
      algerianStudents: 25,
      scholarships: true,
      lowTuition: false,
      openApplications: false,
      worldRanking: 2
    }
  ];

  useEffect(() => {
    // In a real app, fetch universities from Supabase
    setUniversities(sampleUniversities);
    setFilteredUniversities(sampleUniversities);
    setLoading(false);
  }, []);

  useEffect(() => {
    filterUniversities();
  }, [searchTerm, selectedCountry, selectedField, selectedTuitionRange, selectedRating, activeFilters, universities]);

  const filterUniversities = () => {
    let filtered = universities.filter(university => {
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

    // Tuition range filter
    const matchesTuition = selectedTuitionRange === '' || selectedTuitionRange === 'all' || (() => {
        switch (selectedTuitionRange) {
          case 'free':
            return university.tuition === 0;
          case 'low':
            return university.tuition > 0 && university.tuition <= 5000;
          case 'medium':
            return university.tuition > 5000 && university.tuition <= 20000;
          case 'high':
            return university.tuition > 20000;
          default:
            return true;
        }
      })();

          // Rating filter
    const matchesRating = selectedRating === '' || selectedRating === 'all' || university.rating >= parseFloat(selectedRating);

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

      return matchesSearch && matchesCountry && matchesField && matchesTuition && matchesRating && matchesFilters;
    });

    setFilteredUniversities(filtered);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleViewDetails = (universityId: number) => {
    localStorage.setItem('selectedUniversityId', universityId.toString());
    onNavigateToPage('university-detail');
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setSelectedField('');
    setSelectedTuitionRange('');
    setSelectedRating('');
    setActiveFilters([]);
  };

  const formatTuition = (tuition: number, currency: string) => {
    if (tuition === 0) return 'Free';
    return `${currency} ${tuition.toLocaleString()}/year`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading universities...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateHome}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">All Universities</h1>
                <p className="text-muted-foreground">Discover 500+ universities worldwide</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search universities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Countries" />
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
                </div>

                {/* Field of Study */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Field of Study</label>
                  <Select value={selectedField} onValueChange={setSelectedField}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Fields" />
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

                {/* Tuition Range */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tuition Range</label>
                  <Select value={selectedTuitionRange} onValueChange={setSelectedTuitionRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Ranges" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ranges</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="low">Low (≤ $5,000)</SelectItem>
                      <SelectItem value="medium">Medium ($5,000 - $20,000)</SelectItem>
                      <SelectItem value="high">High (≥ $20,000)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Minimum Rating</label>
                  <Select value={selectedRating} onValueChange={setSelectedRating}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Rating</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4.0">4.0+ Stars</SelectItem>
                      <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quick Filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quick Filters</label>
                  <div className="space-y-2">
                    <Button
                      variant={activeFilters.includes('scholarships') ? 'default' : 'outline'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => toggleFilter('scholarships')}
                    >
                      🎓 Scholarships Available
                    </Button>
                    <Button
                      variant={activeFilters.includes('algerian-enrollment') ? 'default' : 'outline'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => toggleFilter('algerian-enrollment')}
                    >
                      🇩🇿 High Algerian Enrollment
                    </Button>
                    <Button
                      variant={activeFilters.includes('low-tuition') ? 'default' : 'outline'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => toggleFilter('low-tuition')}
                    >
                      💰 Low Tuition
                    </Button>
                    <Button
                      variant={activeFilters.includes('open-applications') ? 'default' : 'outline'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => toggleFilter('open-applications')}
                    >
                      📅 Open Applications
                    </Button>
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedCountry || selectedField || selectedTuitionRange || selectedRating || activeFilters.length > 0) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {filteredUniversities.length} Universities Found
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredUniversities.length === universities.length 
                      ? 'Showing all universities' 
                      : `Filtered from ${universities.length} total universities`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Universities Grid/List */}
            {filteredUniversities.length === 0 ? (
              <div className="bg-card rounded-lg shadow-sm border border-border p-12 text-center">
                <div className="text-muted-foreground text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No universities found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search criteria or filters</p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredUniversities.map((university) => (
                  <Card key={university.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={university.image}
                        alt={university.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {university.scholarships && (
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                          Scholarships Available
                        </Badge>
                      )}
                      <div className="absolute top-3 right-3 flex items-center space-x-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{university.rating}</span>
                      </div>
                    </div>
                    
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {university.name}
                      </CardTitle>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{university.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          #{university.worldRanking} World Ranking
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {university.programs.slice(0, 3).map((program: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                        {university.programs.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{university.programs.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Tuition</span>
                          </div>
                          <span className="font-medium">{formatTuition(university.tuition, university.tuitionCurrency)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Deadline</span>
                          </div>
                          <span className="font-medium">{university.deadline}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Algerian Students</span>
                          </div>
                          <span className="font-medium">{university.algerianStudents}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => handleViewDetails(university.id)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
