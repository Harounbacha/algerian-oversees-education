import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  MapPin, 
  Globe, 
  Users, 
  Award, 
  Calendar, 
  DollarSign, 
  BookOpen, 
  Star,
  Phone,
  Mail,
  ExternalLink,
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Eye,
  Clock,
  GraduationCap,
  Building,
  Flag
} from "lucide-react";
import { supabase } from '../../supabaseClient';

interface UniversityDetailPageProps {
  onNavigateToPage: (page: string) => void;
  onNavigateHome: () => void;
  universityId?: string;
}

interface University {
  id: number;
  name: string;
  slug: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  founded_year: number;
  student_population: number;
  international_student_percentage: number;
  world_ranking: number;
  acceptance_rate: number;
  tuition_range: any;
  living_costs: any;
  language_requirements: any;
  application_deadlines: any;
  scholarships_available: boolean;
  visa_support: boolean;
  rating: number;
  total_reviews: number;
  country: any;
  city: any;
}

interface Program {
  id: number;
  name: string;
  level: string;
  field_of_study: string;
  duration_months: number;
  tuition_fee: number;
  currency: string;
  language_of_instruction: string[];
  application_deadline: string;
  start_date: string;
  requirements: string;
  description: string;
}

export function UniversityDetailPage({ onNavigateToPage, onNavigateHome, universityId }: UniversityDetailPageProps) {
  const [university, setUniversity] = useState<University | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchUniversityDetails();
  }, [universityId]);

  const fetchUniversityDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch university details with country and city info
      const { data: universityData, error: universityError } = await supabase
        .from('universities')
        .select(`
          *,
          country:countries(name, code, flag_emoji),
          city:cities(name)
        `)
        .eq('id', universityId || 1) // Default to first university if no ID provided
        .single();

      if (universityError) throw universityError;

      setUniversity(universityData);

      // Fetch university programs
      const { data: programsData, error: programsError } = await supabase
        .from('university_programs')
        .select('*')
        .eq('university_id', universityData.id);

      if (programsError) throw programsError;

      setPrograms(programsData || []);

    } catch (err) {
      setError('Failed to load university details');
      console.error('Error fetching university:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Add to user's favorites in database
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: university?.name,
        text: `Check out ${university?.name} on Algerian Overseas Education Platform`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  const handleApply = (programId: number) => {
    onNavigateToPage('application');
    // TODO: Pass program and university data to application form
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading university details...</p>
        </div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || 'University not found'}</p>
          <Button onClick={onNavigateHome}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Universities
            </button>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFavorite}
                className={`flex items-center ${isFavorite ? 'text-destructive border-destructive' : ''}`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* University Header */}
      <div className="bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{university.country?.flag_emoji}</span>
                    <Badge variant="secondary" className="text-sm">
                      {university.country?.name}
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {university.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {university.city?.name}, {university.country?.name}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {university.rating} ({university.total_reviews} reviews)
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {university.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{university.world_ranking}</div>
                  <div className="text-sm text-muted-foreground">World Ranking</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{university.acceptance_rate}%</div>
                  <div className="text-sm text-muted-foreground">Acceptance Rate</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{university.international_student_percentage}%</div>
                  <div className="text-sm text-muted-foreground">International Students</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{university.founded_year}</div>
                  <div className="text-sm text-muted-foreground">Founded</div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <a 
                      href={university.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center"
                    >
                      Visit Website
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                  {university.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{university.email}</span>
                    </div>
                  )}
                  {university.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{university.phone}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => onNavigateToPage('application')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Application
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Virtual Tour
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Tuition & Costs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Tuition & Living Costs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Tuition Fees</h4>
                    <div className="text-2xl font-bold text-primary">
                      {university.tuition_range?.min?.toLocaleString()} - {university.tuition_range?.max?.toLocaleString()} {university.tuition_range?.currency}
                    </div>
                    <p className="text-sm text-muted-foreground">Per academic year</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Living Costs</h4>
                    <div className="text-2xl font-bold text-primary">
                      {university.living_costs?.monthly?.toLocaleString()} {university.living_costs?.currency}
                    </div>
                    <p className="text-sm text-muted-foreground">Per month</p>
                  </div>
                  {university.scholarships_available && (
                    <Badge className="bg-green-100 text-green-800">
                      Scholarships Available
                    </Badge>
                  )}
                </CardContent>
              </Card>

              {/* Language Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Language Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {university.language_requirements?.ielts_min && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">IELTS</span>
                      <Badge variant="secondary">{university.language_requirements.ielts_min}+</Badge>
                    </div>
                  )}
                  {university.language_requirements?.toefl_min && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">TOEFL</span>
                      <Badge variant="secondary">{university.language_requirements.toefl_min}+</Badge>
                    </div>
                  )}
                  {university.language_requirements?.french_min && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">French</span>
                      <Badge variant="secondary">{university.language_requirements.french_min}+</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="space-y-4">
              {programs.map((program) => (
                <Card key={program.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xl font-semibold text-gray-900">{program.name}</h3>
                          <Badge variant="outline">{program.level}</Badge>
                        </div>
                        <p className="text-gray-600">{program.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            {program.duration_months} months
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                            {program.tuition_fee?.toLocaleString()} {program.currency}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {new Date(program.application_deadline).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                            {program.field_of_study}
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleApply(program.id)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="admissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(university.application_deadlines || {}).map(([season, date]) => (
                    <div key={season} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium capitalize">{season}</span>
                      <span className="text-sm text-gray-600">{date as string}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
                <CardDescription>
                  {university.total_reviews} reviews • {university.rating} average rating
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No reviews yet. Be the first to review this university!</p>
                  <Button className="mt-4">Write a Review</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
