import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  BookOpen, 
  Download, 
  FileText, 
  Globe, 
  Calculator,
  Languages,
  MapPin,
  Shield,
  Smartphone,
  GraduationCap,
  ArrowLeft,
  Search,
  Filter,
  Star,
  Eye,
  Heart,
  Share,
  ExternalLink,
  CheckCircle,
  Clock,
  Users,
  Award,
  Zap,
  Target,
  Video,
  Headphones,
  Library,
  Banknote,
  Plane,
  Home,
  Stethoscope,
  Scale,
  Wifi,
  MessageSquare,
  Calendar,
  Plus,
  TrendingUp
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ResourcesPageProps {
  onNavigateHome: () => void;
}

export function ResourcesPage({ onNavigateHome }: ResourcesPageProps) {
  const studyResources = [
    {
      id: 1,
      title: "IELTS Preparation Complete Guide",
      description: "Comprehensive study materials for IELTS exam preparation",
      type: "Study Guide",
      downloads: 2847,
      rating: 4.9,
      category: "Language Tests",
      format: "PDF",
      size: "15 MB",
      popular: true
    },
    {
      id: 2,
      title: "Academic Writing Templates",
      description: "Templates for essays, research papers, and thesis writing",
      type: "Templates",
      downloads: 1923,
      rating: 4.7,
      category: "Academic Writing",
      format: "DOCX",
      size: "8 MB",
      popular: false
    },
    {
      id: 3,
      title: "Scientific Research Methodology",
      description: "Guide to conducting and writing scientific research",
      type: "Handbook",
      downloads: 1456,
      rating: 4.8,
      category: "Research",
      format: "PDF",
      size: "22 MB",
      popular: true
    },
    {
      id: 4,
      title: "Mathematics Formula Reference",
      description: "Complete mathematical formulas for engineering students",
      type: "Reference",
      downloads: 3241,
      rating: 4.9,
      category: "Mathematics",
      format: "PDF",
      size: "12 MB",
      popular: false
    }
  ];

  const countryGuides = [
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      topics: ["Student Visa", "Banking", "Healthcare", "Housing", "Culture"],
      downloads: 1847,
      updated: "March 2024",
      featured: true
    },
    {
      country: "Germany",
      flag: "🇩🇪",
      topics: ["Student Visa", "Language", "University System", "Part-time Work"],
      downloads: 1523,
      updated: "February 2024",
      featured: false
    },
    {
      country: "France",
      flag: "🇫🇷",
      topics: ["Campus France", "Language Requirements", "Social Security", "Culture"],
      downloads: 1334,
      updated: "March 2024",
      featured: true
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      topics: ["Study Permit", "Immigration", "Healthcare", "Climate", "Banking"],
      downloads: 1678,
      updated: "January 2024",
      featured: false
    },
    {
      country: "United States",
      flag: "🇺🇸",
      topics: ["Student Visa", "Campus Life", "Healthcare", "Banking", "Culture"],
      downloads: 2156,
      updated: "February 2024",
      featured: true
    },
    {
      country: "Australia",
      flag: "🇦🇺",
      topics: ["Student Visa", "Cost of Living", "Healthcare", "Work Rights"],
      downloads: 987,
      updated: "March 2024",
      featured: false
    }
  ];

  const financialTools = [
    {
      title: "Cost of Living Calculator",
      description: "Compare living costs between Algeria and your destination",
      icon: Calculator,
      category: "Planning",
      popular: true
    },
    {
      title: "Scholarship Database",
      description: "Comprehensive database of scholarships for Algerian students",
      icon: Award,
      category: "Funding",
      popular: true
    },
    {
      title: "Currency Converter",
      description: "Real-time currency conversion with historical rates",
      icon: Banknote,
      category: "Finance",
      popular: false
    },
    {
      title: "Budget Planner",
      description: "Plan and track your student budget effectively",
      icon: Target,
      category: "Finance",
      popular: true
    },
    {
      title: "Loan Calculator",
      description: "Calculate student loan payments and interest",
      icon: Calculator,
      category: "Finance",
      popular: false
    },
    {
      title: "Exchange Rate Tracker",
      description: "Track DZD exchange rates and get alerts",
      icon: TrendingUp,
      category: "Finance",
      popular: false
    }
  ];

  const languageResources = [
    {
      language: "English",
      level: "All Levels",
      resources: ["Grammar Guide", "Vocabulary Builder", "Speaking Practice", "Writing Tips"],
      tools: 12,
      popular: true
    },
    {
      language: "German",
      level: "A1-C2",
      resources: ["Basic Phrases", "Grammar Rules", "Cultural Context", "TestDaF Prep"],
      tools: 8,
      popular: true
    },
    {
      language: "French",
      level: "A1-C2",
      resources: ["Academic French", "DELF/DALF", "Cultural Guide", "Pronunciation"],
      tools: 10,
      popular: false
    },
    {
      language: "Spanish",
      level: "A1-B2",
      resources: ["Basic Spanish", "Academic Terms", "Cultural Notes", "DELE Prep"],
      tools: 6,
      popular: false
    }
  ];

  const documentTemplates = [
    {
      title: "CV Template (European Format)",
      description: "Professional CV template following European standards",
      category: "Career",
      format: "DOCX/PDF",
      languages: ["English", "French", "German"],
      downloads: 3421
    },
    {
      title: "Cover Letter Templates",
      description: "Various cover letter templates for different purposes",
      category: "Career",
      format: "DOCX",
      languages: ["English", "French"],
      downloads: 2156
    },
    {
      title: "University Application Essays",
      description: "Sample essays and templates for university applications",
      category: "Academic",
      format: "DOCX/PDF",
      languages: ["English"],
      downloads: 1987
    },
    {
      title: "Reference Letter Templates",
      description: "Templates for requesting and writing reference letters",
      category: "Academic",
      format: "DOCX",
      languages: ["English", "French"],
      downloads: 1654
    },
    {
      title: "Scholarship Application Kit",
      description: "Complete kit for scholarship applications",
      category: "Financial",
      format: "DOCX/PDF",
      languages: ["English"],
      downloads: 2743
    },
    {
      title: "Housing Application Forms",
      description: "Standard forms for student accommodation applications",
      category: "Living",
      format: "PDF",
      languages: ["English", "French", "German"],
      downloads: 1432
    }
  ];

  const mobileApps = [
    {
      name: "Duolingo",
      category: "Language Learning",
      description: "Free language learning app with gamification",
      rating: 4.7,
      platform: "iOS/Android",
      price: "Free/Premium"
    },
    {
      name: "XE Currency",
      category: "Finance",
      description: "Real-time currency conversion and rate tracking",
      rating: 4.8,
      platform: "iOS/Android",
      price: "Free"
    },
    {
      name: "Google Translate",
      category: "Translation",
      description: "Instant translation with camera and voice support",
      rating: 4.5,
      platform: "iOS/Android",
      price: "Free"
    },
    {
      name: "Grammarly",
      category: "Writing",
      description: "Advanced grammar and writing assistant",
      rating: 4.6,
      platform: "iOS/Android/Web",
      price: "Free/Premium"
    },
    {
      name: "Splitwise",
      category: "Finance",
      description: "Split expenses with roommates and friends",
      rating: 4.6,
      platform: "iOS/Android",
      price: "Free/Premium"
    },
    {
      name: "Citymapper",
      category: "Transportation",
      description: "Public transport navigation in major cities",
      rating: 4.7,
      platform: "iOS/Android",
      price: "Free"
    }
  ];

  const webinarsAndEvents = [
    {
      title: "IELTS Masterclass: Writing Task 2",
      date: "March 25, 2024",
      time: "19:00 GMT",
      duration: "2 hours",
      instructor: "Sarah Thompson, IELTS Expert",
      attendees: 245,
      free: true
    },
    {
      title: "German University System Explained",
      date: "March 28, 2024",
      time: "18:00 CET",
      duration: "1.5 hours",
      instructor: "Dr. Mueller, DAAD Representative",
      attendees: 156,
      free: true
    },
    {
      title: "PhD Application Strategy Workshop",
      date: "April 2, 2024",
      time: "16:00 GMT",
      duration: "3 hours",
      instructor: "Prof. Ahmed Benali, Cambridge",
      attendees: 89,
      free: false
    },
    {
      title: "Student Finance Management",
      date: "April 5, 2024",
      time: "17:00 GMT",
      duration: "1 hour",
      instructor: "Financial Advisor Team",
      attendees: 198,
      free: true
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
                  Resource Hub
                </h1>
                <p className="text-lg sm:text-xl opacity-90">
                  Your comprehensive collection of tools, guides, and materials to succeed in your international education journey. Everything you need in one place.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                  <BookOpen className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">500+ Resources</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                  <Download className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">Free Downloads</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                  <Globe className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">45+ Countries</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  <Search className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Browse Resources
                </Button>
                <Button size="lg" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary">
                  <Download className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Download App
                </Button>
              </div>
            </div>
            
            <div className="relative order-first lg:order-last">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwc3R1ZHklMjBib29rc3xlbnwxfHx8fDE3NTU3NzgzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Study resources and library"
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
          {/* Resource Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 text-primary mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-primary">578</div>
                <p className="text-xs sm:text-sm text-gray-600">Study Resources</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Globe className="w-6 sm:w-8 h-6 sm:h-8 text-teal-600 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-teal-600">45</div>
                <p className="text-xs sm:text-sm text-gray-600">Country Guides</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Calculator className="w-6 sm:w-8 h-6 sm:h-8 text-accent mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-accent">24</div>
                <p className="text-xs sm:text-sm text-gray-600">Tools & Calculators</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Download className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-green-600">127K</div>
                <p className="text-xs sm:text-sm text-gray-600">Total Downloads</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Resources Tabs */}
          <Tabs defaultValue="study" className="space-y-6 sm:space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto">
              <TabsTrigger value="study" className="text-xs sm:text-sm py-2 sm:py-3">Study Materials</TabsTrigger>
              <TabsTrigger value="countries" className="text-xs sm:text-sm py-2 sm:py-3">Country Guides</TabsTrigger>
              <TabsTrigger value="finance" className="text-xs sm:text-sm py-2 sm:py-3">Financial Tools</TabsTrigger>
              <TabsTrigger value="language" className="text-xs sm:text-sm py-2 sm:py-3">Languages</TabsTrigger>
              <TabsTrigger value="templates" className="text-xs sm:text-sm py-2 sm:py-3 col-span-1 lg:col-span-1">Templates</TabsTrigger>
              <TabsTrigger value="apps" className="text-xs sm:text-sm py-2 sm:py-3 col-span-2 lg:col-span-1">Apps & Tools</TabsTrigger>
            </TabsList>

            {/* Study Materials Tab */}
            <TabsContent value="study" className="space-y-6 mt-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search resources..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger className="sm:w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="language">Language Tests</SelectItem>
                      <SelectItem value="academic">Academic Writing</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-primary hover:bg-primary/90 sm:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {studyResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base sm:text-lg font-medium text-gray-900">{resource.title}</h3>
                              {resource.popular && (
                                <Badge className="bg-accent text-white text-xs">Popular</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{resource.description}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                              <Badge variant="outline">{resource.category}</Badge>
                              <Badge variant="secondary">{resource.type}</Badge>
                              <span className="text-gray-500">{resource.format} • {resource.size}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Download className="w-4 h-4" />
                              <span>{resource.downloads}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{resource.rating}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              <Download className="w-4 h-4 mr-1" />
                              Download
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
                  Load More Resources
                </Button>
              </div>
            </TabsContent>

            {/* Country Guides Tab */}
            <TabsContent value="countries" className="space-y-6 mt-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Country-Specific Guides</h3>
                <p className="text-sm sm:text-base text-gray-600">Comprehensive guides for studying and living in different countries</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {countryGuides.map((guide, index) => (
                  <Card key={index} className={`hover:shadow-lg transition-shadow duration-300 ${guide.featured ? 'ring-2 ring-primary/20' : ''}`}>
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl sm:text-3xl">{guide.flag}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base sm:text-lg font-medium text-gray-900">{guide.country}</h3>
                              {guide.featured && (
                                <Badge className="bg-teal-600 text-white text-xs">Featured</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">Updated {guide.updated}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {guide.topics.map((topic, topicIndex) => (
                              <Badge key={topicIndex} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Download className="w-4 h-4" />
                              <span>{guide.downloads} downloads</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button className="flex-1 bg-primary hover:bg-primary/90">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Financial Tools Tab */}
            <TabsContent value="finance" className="space-y-6 mt-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Financial Planning Tools</h3>
                <p className="text-sm sm:text-base text-gray-600">Calculators and tools to manage your finances effectively</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {financialTools.map((tool, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <tool.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="text-base sm:text-lg font-medium text-gray-900">{tool.title}</h3>
                              {tool.popular && (
                                <Badge className="bg-accent text-white text-xs">Popular</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                            <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <Zap className="w-4 h-4 mr-2" />
                          Use Tool
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Language Resources Tab */}
            <TabsContent value="language" className="space-y-6 mt-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Language Learning Resources</h3>
                <p className="text-sm sm:text-base text-gray-600">Master the languages you need for your studies abroad</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {languageResources.map((lang, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                              <Languages className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-base sm:text-lg font-medium text-gray-900">{lang.language}</h3>
                                {lang.popular && (
                                  <Badge className="bg-accent text-white text-xs">Popular</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{lang.level}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg sm:text-xl font-bold text-teal-600">{lang.tools}</div>
                            <p className="text-xs text-gray-600">tools</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {lang.resources.map((resource, resourceIndex) => (
                              <Badge key={resourceIndex} variant="secondary" className="text-xs">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" className="flex-1">
                            <Video className="w-4 h-4 mr-2" />
                            Video Lessons
                          </Button>
                          <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                            <Headphones className="w-4 h-4 mr-2" />
                            Audio Practice
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Document Templates Tab */}
            <TabsContent value="templates" className="space-y-6 mt-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Document Templates</h3>
                <p className="text-sm sm:text-base text-gray-600">Professional templates for all your application needs</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {documentTemplates.map((template, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-base sm:text-lg font-medium text-gray-900">{template.title}</h3>
                          <p className="text-sm text-gray-600">{template.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <Badge variant="outline">{template.category}</Badge>
                            <Badge variant="secondary">{template.format}</Badge>
                            <div className="flex items-center space-x-1 text-gray-600">
                              <Download className="w-4 h-4" />
                              <span>{template.downloads}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Available in:</p>
                          <div className="flex flex-wrap gap-1">
                            {template.languages.map((language, langIndex) => (
                              <Badge key={langIndex} variant="secondary" className="text-xs">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 pt-4">
                          <Button variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button className="flex-1 bg-primary hover:bg-primary/90">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Apps & Tools Tab */}
            <TabsContent value="apps" className="space-y-6 mt-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Recommended Apps & Tools</h3>
                <p className="text-sm sm:text-base text-gray-600">Essential mobile apps and web tools for international students</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {mobileApps.map((app, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base sm:text-lg font-medium text-gray-900">{app.name}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{app.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{app.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <Badge variant="outline">{app.category}</Badge>
                            <Badge variant="secondary">{app.platform}</Badge>
                            <span className="text-green-600 font-medium">{app.price}</span>
                          </div>
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Get App
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Webinars and Events Section */}
          <div className="mt-12 sm:mt-16 space-y-6 sm:space-y-8">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Upcoming Webinars & Workshops</h3>
              <p className="text-sm sm:text-base text-gray-600">Join live sessions with experts and get your questions answered</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {webinarsAndEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-medium text-gray-900">{event.title}</h3>
                          {event.free && (
                            <Badge className="bg-green-600 text-white text-xs">Free</Badge>
                          )}
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{event.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} registered</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Instructor:</span> {event.instructor}
                        </p>
                      </div>

                      <Button className="w-full bg-teal-600 hover:bg-teal-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Register Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Resource Section */}
          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-primary to-teal-600 rounded-2xl p-6 sm:p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold">Student Success Toolkit</h3>
                <p className="text-base sm:text-lg opacity-90">
                  Get our comprehensive toolkit with all essential resources, templates, and guides in one downloadable package. Everything you need to succeed!
                </p>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>50+ Templates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Study Guides</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Country Guides</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Financial Tools</span>
                  </div>
                </div>
                
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
                  <Download className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Download Toolkit (Free)
                </Button>
              </div>
              
              <div className="relative order-first lg:order-last">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMGd1aWRlJTIwbm90ZXMlMjBsZWFybmluZ3xlbnwxfHx8fDE3NTU3NzgzNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Study toolkit and resources"
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