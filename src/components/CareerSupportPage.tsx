import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Star, 
  Search,
  Filter,
  Building,
  Users,
  TrendingUp,
  FileText,
  Video,
  Target,
  Award,
  Globe,
  ArrowLeft,
  Plus,
  BookOpen,
  MessageSquare,
  Clock,
  DollarSign,
  GraduationCap,
  Zap,
  Download,
  Eye,
  Heart,
  Share,
  ExternalLink,
  CheckCircle
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CareerSupportPageProps {
  onNavigateHome: () => void;
}

export function CareerSupportPage({ onNavigateHome }: CareerSupportPageProps) {
  const jobOpportunities = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "London, UK",
      type: "Full-time",
      experience: "Entry Level",
      salary: "£45,000 - £65,000",
      posted: "2 days ago",
      description: "Join our engineering team working on cutting-edge technologies",
      skills: ["React", "TypeScript", "Python", "Cloud Computing"],
      sponsor: true
    },
    {
      id: 2,
      title: "Data Scientist Intern",
      company: "Microsoft",
      location: "Paris, France",
      type: "Internship",
      experience: "Student",
      salary: "€1,500/month",
      posted: "1 week ago",
      description: "6-month internship in AI and machine learning",
      skills: ["Python", "Machine Learning", "SQL", "Statistics"],
      sponsor: false
    },
    {
      id: 3,
      title: "Marketing Associate",
      company: "Amazon",
      location: "Berlin, Germany",
      type: "Full-time",
      experience: "Mid Level",
      salary: "€50,000 - €70,000",
      posted: "3 days ago",
      description: "Drive marketing campaigns for European markets",
      skills: ["Digital Marketing", "Analytics", "German", "Project Management"],
      sponsor: true
    },
    {
      id: 4,
      title: "Research Assistant",
      company: "CERN",
      location: "Geneva, Switzerland",
      type: "Contract",
      experience: "PhD Student",
      salary: "CHF 4,500/month",
      posted: "5 days ago",
      description: "Contribute to groundbreaking physics research",
      skills: ["Physics", "Data Analysis", "Programming", "Research"],
      sponsor: false
    }
  ];

  const companies = [
    {
      name: "Google",
      industry: "Technology",
      locations: ["London", "Paris", "Zurich"],
      openings: 12,
      sponsored: true,
      logo: "G"
    },
    {
      name: "Airbus",
      industry: "Aerospace",
      locations: ["Toulouse", "Hamburg", "Madrid"],
      openings: 8,
      sponsored: false,
      logo: "A"
    },
    {
      name: "Siemens",
      industry: "Engineering",
      locations: ["Munich", "Berlin", "Vienna"],
      openings: 15,
      sponsored: true,
      logo: "S"
    },
    {
      name: "L'Oréal",
      industry: "Consumer Goods",
      locations: ["Paris", "London", "Milan"],
      openings: 6,
      sponsored: false,
      logo: "L"
    }
  ];

  const careerResources = [
    {
      title: "CV Builder Tool",
      description: "Create professional CVs tailored for international markets",
      type: "Tool",
      duration: "30 min",
      icon: FileText,
      action: "Create CV",
      popular: true
    },
    {
      title: "Interview Preparation Course",
      description: "Master technical and behavioral interviews",
      type: "Course",
      duration: "2 hours",
      icon: Video,
      action: "Start Course",
      popular: false
    },
    {
      title: "LinkedIn Optimization Guide",
      description: "Optimize your LinkedIn profile for recruiters",
      type: "Guide",
      duration: "45 min",
      icon: Target,
      action: "Read Guide",
      popular: true
    },
    {
      title: "Salary Negotiation Workshop",
      description: "Learn to negotiate your worth effectively",
      type: "Workshop",
      duration: "1.5 hours",
      icon: DollarSign,
      action: "Join Workshop",
      popular: false
    }
  ];

  const mentors = [
    {
      name: "Sarah Benchohra",
      position: "Senior Software Engineer",
      company: "Meta",
      location: "London, UK",
      field: "Technology",
      experience: "5+ years",
      rating: 4.9,
      sessions: 67,
      specialties: ["Tech Interviews", "Career Growth", "UK Market"]
    },
    {
      name: "Karim Djellab",
      position: "Investment Banking Analyst",
      company: "Goldman Sachs",
      location: "Frankfurt, Germany",
      field: "Finance",
      experience: "3+ years",
      rating: 4.8,
      sessions: 34,
      specialties: ["Finance Career", "German Market", "Networking"]
    },
    {
      name: "Amira Boudoukha",
      position: "Product Manager",
      company: "Spotify",
      location: "Stockholm, Sweden",
      field: "Product",
      experience: "4+ years",
      rating: 4.9,
      sessions: 52,
      specialties: ["Product Management", "Scandinavian Market", "Leadership"]
    }
  ];

  const industryInsights = [
    {
      title: "Tech Industry Outlook 2024",
      author: "Career Research Team",
      readTime: "8 min",
      category: "Technology",
      summary: "AI and cloud computing driving demand for skilled professionals",
      trending: true,
      views: 1247
    },
    {
      title: "European Job Market Trends",
      author: "Market Analysts",
      readTime: "12 min",
      category: "General",
      summary: "Remote work and sustainability focus shaping career opportunities",
      trending: false,
      views: 892
    },
    {
      title: "Breaking into Consulting",
      author: "Former McKinsey Consultant",
      readTime: "15 min",
      category: "Consulting",
      summary: "A comprehensive guide to landing consulting roles in Europe",
      trending: true,
      views: 1567
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-teal-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={onNavigateHome}
            className="text-white hover:bg-white/10 mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  Career Support
                </h1>
                <p className="text-lg sm:text-xl opacity-90">
                  Launch your international career with confidence. Access job opportunities, build professional skills, and connect with industry mentors.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                  <Briefcase className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">500+ Jobs</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                  <Building className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">100+ Companies</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                  <Users className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">Expert Mentors</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  <Search className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Find Jobs
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary">
                  <FileText className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Build CV
                </Button>
              </div>
            </div>
            
            <div className="relative order-first lg:order-last">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNvbW11bml0eXxlbnwxfHx8fDE3NTU3NzgwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional networking event"
                className="rounded-lg shadow-xl w-full h-48 sm:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Career Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Briefcase className="w-6 sm:w-8 h-6 sm:h-8 text-primary mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-primary">547</div>
                <p className="text-xs sm:text-sm text-gray-600">Active Job Postings</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Building className="w-6 sm:w-8 h-6 sm:h-8 text-teal-600 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-teal-600">128</div>
                <p className="text-xs sm:text-sm text-gray-600">Partner Companies</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Users className="w-6 sm:w-8 h-6 sm:h-8 text-accent mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-accent">89</div>
                <p className="text-xs sm:text-sm text-gray-600">Career Mentors</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-green-600">87%</div>
                <p className="text-xs sm:text-sm text-gray-600">Placement Success</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Career Support Tabs */}
          <Tabs defaultValue="jobs" className="space-y-6 sm:space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 h-auto">
              <TabsTrigger value="jobs" className="text-xs sm:text-sm py-2 sm:py-3">Jobs</TabsTrigger>
              <TabsTrigger value="companies" className="text-xs sm:text-sm py-2 sm:py-3">Companies</TabsTrigger>
              <TabsTrigger value="resources" className="text-xs sm:text-sm py-2 sm:py-3">Resources</TabsTrigger>
              <TabsTrigger value="mentors" className="text-xs sm:text-sm py-2 sm:py-3 col-span-1 lg:col-span-1">Mentors</TabsTrigger>
              <TabsTrigger value="insights" className="text-xs sm:text-sm py-2 sm:py-3 col-span-2 lg:col-span-1">Insights</TabsTrigger>
            </TabsList>

            {/* Jobs Tab */}
            <TabsContent value="jobs" className="space-y-6 mt-6">
              <div className="flex flex-col xl:flex-row gap-6">
                <div className="xl:w-1/3 space-y-4">
                  <Card>
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-lg">Filter Jobs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Job Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="All Locations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="germany">Germany</SelectItem>
                            <SelectItem value="france">France</SelectItem>
                            <SelectItem value="netherlands">Netherlands</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Experience Level</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="All Levels" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level</SelectItem>
                            <SelectItem value="mid">Mid Level</SelectItem>
                            <SelectItem value="senior">Senior Level</SelectItem>
                            <SelectItem value="student">Student/Intern</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Search</label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input placeholder="Keywords, skills..." className="pl-10" />
                        </div>
                      </div>

                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Apply Filters
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="xl:w-2/3 space-y-4">
                  {jobOpportunities.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="space-y-2 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg sm:text-xl font-medium text-gray-900">{job.title}</h3>
                                {job.sponsor && (
                                  <Badge className="bg-accent text-white">Sponsored</Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Building className="w-4 h-4" />
                                  <span>{job.company}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{job.posted}</span>
                                </div>
                              </div>
                              <p className="text-sm sm:text-base text-gray-700">{job.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="space-y-3">
                              <div className="flex flex-wrap gap-1">
                                {job.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-sm">
                                <Badge variant="outline">{job.type}</Badge>
                                <Badge variant="outline">{job.experience}</Badge>
                                <span className="font-medium text-primary">{job.salary}</span>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                              <Button variant="ghost" size="sm" className="sm:w-auto">
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="sm:w-auto">
                                <Share className="w-4 h-4" />
                              </Button>
                              <Button className="bg-primary hover:bg-primary/90">
                                Apply Now
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="text-center pt-6">
                    <Button variant="outline" size="lg">
                      Load More Jobs
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Companies Tab */}
            <TabsContent value="companies" className="space-y-6 mt-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Featured Companies</h3>
                <p className="text-sm sm:text-base text-gray-600">Discover leading employers actively hiring Algerian talent</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {companies.map((company, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 text-center p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-lg flex items-center justify-center mx-auto">
                          <span className="text-white text-lg sm:text-2xl font-bold">{company.logo}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-base sm:text-lg font-medium text-gray-900">{company.name}</h3>
                          <p className="text-sm text-gray-600">{company.industry}</p>
                          {company.sponsored && (
                            <Badge className="bg-accent text-white">Premium Partner</Badge>
                          )}
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-center space-x-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="truncate">{company.locations.join(", ")}</span>
                          </div>
                          <div className="flex items-center justify-center space-x-1">
                            <Briefcase className="w-4 h-4 text-gray-400" />
                            <span>{company.openings} open positions</span>
                          </div>
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90">
                          View Jobs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-gradient-to-r from-muted to-primary/5 rounded-2xl p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Partner with Us</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-6 max-w-2xl mx-auto">
                  Are you a company looking to hire talented Algerian graduates? Join our partner network and connect with top-tier international talent.
                </p>
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-5 h-5 mr-2" />
                  Become a Partner
                </Button>
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-6 mt-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Career Development Resources</h3>
                <p className="text-sm sm:text-base text-gray-600">Tools and guides to accelerate your career growth</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {careerResources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <resource.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="text-base sm:text-lg font-medium text-gray-900">{resource.title}</h3>
                              {resource.popular && (
                                <Badge className="bg-accent text-white text-xs">Popular</Badge>
                              )}
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 mb-3">{resource.description}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                              <Badge variant="outline">{resource.type}</Badge>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{resource.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          {resource.action}
                          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
                <Card className="bg-gradient-to-br from-primary/5 to-teal-50">
                  <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        <h3 className="text-lg sm:text-xl font-medium text-gray-900">Skills Assessment</h3>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700">
                        Discover your strengths and identify areas for improvement with our comprehensive skills assessment.
                      </p>
                      <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                        Take Assessment
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-accent/5 to-orange-50">
                  <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                        <h3 className="text-lg sm:text-xl font-medium text-gray-900">Certification Courses</h3>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700">
                        Earn industry-recognized certifications to boost your profile and stand out to employers.
                      </p>
                      <Button className="bg-accent hover:bg-accent/90 w-full sm:w-auto">
                        Browse Courses
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Mentors Tab */}
            <TabsContent value="mentors" className="space-y-6 mt-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Career Mentors</h3>
                <p className="text-sm sm:text-base text-gray-600">Get guidance from successful Algerian professionals worldwide</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {mentors.map((mentor, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                            <span className="text-white text-sm sm:text-lg font-medium">
                              {mentor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-medium text-gray-900">{mentor.name}</h3>
                            <p className="text-sm text-gray-600">{mentor.position}</p>
                            <p className="text-sm text-gray-600">{mentor.company}</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="truncate ml-2">{mentor.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Experience:</span>
                            <span>{mentor.experience}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Rating:</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{mentor.rating}</span>
                              <span className="text-gray-500">({mentor.sessions})</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {mentor.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button className="flex-1 bg-primary hover:bg-primary/90">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Connect
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Video className="w-4 h-4 mr-2" />
                            Book Call
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Industry Insights Tab */}
            <TabsContent value="insights" className="space-y-6 mt-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Industry Insights</h3>
                <p className="text-sm sm:text-base text-gray-600">Stay informed about market trends and career opportunities</p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {industryInsights.map((insight, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg sm:text-xl font-medium text-gray-900 hover:text-primary cursor-pointer">
                                {insight.title}
                              </h3>
                              {insight.trending && (
                                <Badge className="bg-accent text-white">Trending</Badge>
                              )}
                            </div>
                            <p className="text-sm sm:text-base text-gray-700">{insight.summary}</p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
                              <span>By {insight.author}</span>
                              <span>•</span>
                              <span>{insight.readTime} read</span>
                              <span>•</span>
                              <Badge variant="outline">{insight.category}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Eye className="w-4 h-4" />
                            <span>{insight.views} views</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Heart className="w-4 h-4 mr-1" />
                              Save
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Read More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" size="lg">
                  View All Insights
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Success Stories */}
          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-primary to-teal-600 rounded-2xl p-6 sm:p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold">Career Success Stories</h3>
                <p className="text-base sm:text-lg opacity-90">
                  "The career support platform helped me land my dream job at a top tech company. The CV builder and interview prep were game-changers!"
                </p>
                <div className="space-y-2">
                  <p className="font-medium">- Reda Mestoui</p>
                  <p className="text-sm opacity-75">Software Engineer at Apple, London</p>
                </div>
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
                  <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Read More Stories
                </Button>
              </div>
              
              <div className="relative order-first lg:order-last">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzdWNjZXNzfGVufDF8fHx8MTc1NTc3ODE0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Professional success story"
                  className="rounded-lg shadow-xl w-full h-36 sm:h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}