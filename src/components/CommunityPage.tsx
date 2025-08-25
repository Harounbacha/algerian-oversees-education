import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Star, 
  Search,
  Filter,
  Heart,
  Award,
  GraduationCap,
  ArrowLeft,
  Plus,
  BookOpen,
  Globe,
  Coffee,
  Video,
  User,
  MessageCircle,
  ThumbsUp,
  Share,
  Eye
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CommunityPageProps {
  onNavigateHome: () => void;
}

export function CommunityPage({ onNavigateHome }: CommunityPageProps) {
  const mentors = [
    {
      id: 1,
      name: "Amina Benaissa",
      university: "MIT",
      field: "Computer Science",
      location: "Boston, USA",
      year: "PhD Student",
      avatar: "AB",
      rating: 4.9,
      sessions: 45,
      specialties: ["AI/ML", "Research", "PhD Applications"]
    },
    {
      id: 2,
      name: "Yacine Khaled",
      university: "University of Oxford",
      field: "Economics",
      location: "Oxford, UK",
      year: "Master's Graduate",
      avatar: "YK",
      rating: 4.8,
      sessions: 32,
      specialties: ["Economics", "Finance", "UK Applications"]
    },
    {
      id: 3,
      name: "Lina Meziane",
      university: "Sorbonne University",
      field: "International Relations",
      location: "Paris, France",
      year: "Final Year",
      avatar: "LM",
      rating: 4.7,
      sessions: 28,
      specialties: ["IR", "French Universities", "Exchange Programs"]
    },
    {
      id: 4,
      name: "Karim Boutaiba",
      university: "Technical University of Munich",
      field: "Engineering",
      location: "Munich, Germany",
      year: "Master's Student",
      avatar: "KB",
      rating: 4.9,
      sessions: 38,
      specialties: ["Engineering", "DAAD Scholarships", "Germany"]
    }
  ];

  const discussions = [
    {
      id: 1,
      title: "IELTS Preparation - Study Group for January 2024",
      author: "Sara Boudjerda",
      university: "University of Toronto",
      replies: 24,
      likes: 18,
      views: 156,
      timeAgo: "2 hours ago",
      tags: ["IELTS", "Study Group", "Test Prep"],
      category: "Language Tests"
    },
    {
      id: 2,
      title: "Scholarship Opportunities for Engineering Students 2024",
      author: "Ahmed Benali",
      university: "ETH Zurich",
      replies: 42,
      likes: 67,
      views: 324,
      timeAgo: "5 hours ago",
      tags: ["Scholarships", "Engineering", "2024"],
      category: "Funding"
    },
    {
      id: 3,
      title: "Living in Canada - Housing Tips for Algerian Students",
      author: "Fatima Cherif",
      university: "McGill University",
      replies: 18,
      likes: 29,
      views: 198,
      timeAgo: "1 day ago",
      tags: ["Canada", "Housing", "Living Abroad"],
      category: "Life Abroad"
    },
    {
      id: 4,
      title: "Research Opportunities in AI - Connect with Professors",
      author: "Mohamed Ziani",
      university: "Stanford University",
      replies: 31,
      likes: 45,
      views: 287,
      timeAgo: "2 days ago",
      tags: ["Research", "AI", "Networking"],
      category: "Research"
    }
  ];

  const events = [
    {
      id: 1,
      title: "Virtual Career Fair - Tech Companies in Europe",
      date: "March 15, 2024",
      time: "14:00 GMT",
      type: "Virtual",
      attendees: 127,
      description: "Connect with recruiters from top European tech companies",
      organizer: "Tech Alumni Network"
    },
    {
      id: 2,
      title: "Study in Germany Info Session",
      date: "March 20, 2024",
      time: "19:00 CET",
      type: "Virtual",
      attendees: 89,
      description: "DAAD representatives and current students share insights",
      organizer: "Germany Study Group"
    },
    {
      id: 3,
      title: "London Meetup - Algerian Students & Professionals",
      date: "March 25, 2024",
      time: "18:30 GMT",
      type: "In-Person",
      location: "London, UK",
      attendees: 34,
      description: "Networking event for Algerians in London area",
      organizer: "UK Alumni Chapter"
    },
    {
      id: 4,
      title: "PhD Application Workshop",
      date: "April 2, 2024",
      time: "16:00 GMT",
      type: "Virtual",
      attendees: 156,
      description: "Complete guide to PhD applications with current PhD students",
      organizer: "PhD Mentors Group"
    }
  ];

  const countryGroups = [
    {
      name: "United States",
      members: 342,
      activeToday: 28,
      description: "Connect with Algerians studying across the US",
      color: "bg-blue-500"
    },
    {
      name: "United Kingdom",
      members: 198,
      activeToday: 15,
      description: "UK students and graduates community",
      color: "bg-red-500"
    },
    {
      name: "Germany",
      members: 156,
      activeToday: 12,
      description: "German universities and DAAD scholars",
      color: "bg-yellow-500"
    },
    {
      name: "France",
      members: 234,
      activeToday: 21,
      description: "French higher education community",
      color: "bg-blue-600"
    },
    {
      name: "Canada",
      members: 178,
      activeToday: 18,
      description: "Canadian universities and immigration info",
      color: "bg-red-600"
    },
    {
      name: "Australia",
      members: 89,
      activeToday: 7,
      description: "Down under study experiences",
      color: "bg-green-600"
    }
  ];

  const successStories = [
    {
      id: 1,
      name: "Nassim Beltaief",
      achievement: "Secured PhD at Harvard Medical School",
      story: "From Algiers to Boston - how community support helped me navigate the complex PhD application process",
      field: "Medicine",
      year: "2023",
      likes: 89
    },
    {
      id: 2,
      name: "Rania Ouadah",
      achievement: "Landed Software Engineer Role at Google",
      story: "Community connections led to my dream job in Silicon Valley",
      field: "Computer Science",
      year: "2023",
      likes: 76
    },
    {
      id: 3,
      name: "Bilal Hamadi",
      achievement: "Received Chevening Scholarship",
      story: "How peer review and mentorship helped me win the prestigious UK scholarship",
      field: "International Relations",
      year: "2024",
      likes: 92
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
                  Student Community
                </h1>
                <p className="text-lg sm:text-xl opacity-90">
                  Connect with fellow Algerian students worldwide. Share experiences, find mentors, and build lasting friendships on your international education journey.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                  <Users className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">1,200+ Members</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                  <Globe className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">45+ Countries</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                  <MessageSquare className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">Active Daily</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  <Plus className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Join Community
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary">
                  Find a Mentor
                </Button>
              </div>
            </div>
            
            <div className="relative order-first lg:order-last">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNvbW11bml0eXxlbnwxfHx8fDE3NTU3NzgwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Student community gathering"
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
          {/* Community Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Users className="w-6 sm:w-8 h-6 sm:h-8 text-primary mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-primary">1,247</div>
                <p className="text-xs sm:text-sm text-gray-600">Active Members</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <MessageSquare className="w-6 sm:w-8 h-6 sm:h-8 text-teal-600 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-teal-600">3,892</div>
                <p className="text-xs sm:text-sm text-gray-600">Discussions</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Award className="w-6 sm:w-8 h-6 sm:h-8 text-accent mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-accent">156</div>
                <p className="text-xs sm:text-sm text-gray-600">Mentors Available</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Calendar className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-green-600">24</div>
                <p className="text-xs sm:text-sm text-gray-600">Upcoming Events</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Community Tabs */}
          <Tabs defaultValue="discussions" className="space-y-6 sm:space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 h-auto">
              <TabsTrigger value="discussions" className="text-xs sm:text-sm py-2 sm:py-3">Discussions</TabsTrigger>
              <TabsTrigger value="mentors" className="text-xs sm:text-sm py-2 sm:py-3">Mentors</TabsTrigger>
              <TabsTrigger value="events" className="text-xs sm:text-sm py-2 sm:py-3">Events</TabsTrigger>
              <TabsTrigger value="countries" className="text-xs sm:text-sm py-2 sm:py-3 col-span-1 lg:col-span-1">Countries</TabsTrigger>
              <TabsTrigger value="stories" className="text-xs sm:text-sm py-2 sm:py-3 col-span-2 lg:col-span-1">Stories</TabsTrigger>
            </TabsList>

            {/* Discussions Tab */}
            <TabsContent value="discussions" className="space-y-4 sm:space-y-6 mt-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search discussions..." className="pl-10" />
                  </div>
                  <Button variant="outline" className="sm:w-auto">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <Button className="bg-primary hover:bg-primary/90 sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  New Discussion
                </Button>
              </div>

              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="text-xs">{discussion.category}</Badge>
                            {discussion.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-base sm:text-lg font-medium text-gray-900 hover:text-primary cursor-pointer leading-tight">
                            {discussion.title}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                            <span>By {discussion.author}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="truncate">{discussion.university}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{discussion.timeAgo}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{discussion.replies} replies</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{discussion.likes} likes</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{discussion.views} views</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 w-full sm:w-auto">
                            <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Like
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                              <Share className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Mentors Tab */}
            <TabsContent value="mentors" className="space-y-4 sm:space-y-6 mt-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search by field, university, or location..." className="pl-10" />
                  </div>
                  <Button variant="outline" className="sm:w-auto">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <Button className="bg-accent hover:bg-accent/90 sm:w-auto">
                  <User className="w-4 h-4 mr-2" />
                  Become a Mentor
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {mentors.map((mentor) => (
                  <Card key={mentor.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <Avatar className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                            <AvatarImage src="" alt={mentor.name} />
                            <AvatarFallback className="bg-primary text-white text-sm sm:text-lg">
                              {mentor.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0 space-y-2">
                            <div>
                              <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">{mentor.name}</h3>
                              <p className="text-sm text-gray-600 truncate">{mentor.field} • {mentor.year}</p>
                              <p className="text-sm text-gray-600 truncate">{mentor.university}</p>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-600 truncate">{mentor.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-medium">{mentor.rating}</span>
                              <span className="text-gray-600">({mentor.sessions} sessions)</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {mentor.specialties.map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 pt-4">
                          <Button className="flex-1 bg-primary hover:bg-primary/90">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Connect
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Video className="w-4 h-4 mr-2" />
                            Book Session
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-4 sm:space-y-6 mt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900">Upcoming Events</h3>
                  <p className="text-sm sm:text-base text-gray-600">Connect, learn, and grow with fellow students</p>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <Badge variant={event.type === 'Virtual' ? 'secondary' : 'default'} className="self-start">
                              {event.type}
                            </Badge>
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees} attending</span>
                            </div>
                          </div>
                          <h3 className="text-base sm:text-lg font-medium text-gray-900 leading-tight">{event.title}</h3>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span>Organized by {event.organizer}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                            Join Event
                          </Button>
                          <Button variant="outline" className="w-auto">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Countries Tab */}
            <TabsContent value="countries" className="space-y-6 mt-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Connect by Country</h3>
                <p className="text-sm sm:text-base text-gray-600">Join country-specific groups for localized support and advice</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {countryGroups.map((country, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 ${country.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">{country.name}</h3>
                            <p className="text-sm text-gray-600">{country.description}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Members</span>
                            <span className="font-medium">{country.members}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Active today</span>
                            <span className="font-medium text-green-600">{country.activeToday}</span>
                          </div>
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Join Group
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Success Stories Tab */}
            <TabsContent value="stories" className="space-y-6 mt-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Success Stories</h3>
                <p className="text-sm sm:text-base text-gray-600">Be inspired by fellow Algerians who achieved their dreams</p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {successStories.map((story) => (
                  <Card key={story.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="secondary">{story.field}</Badge>
                              <Badge variant="outline">{story.year}</Badge>
                            </div>
                            <h3 className="text-lg sm:text-xl font-medium text-gray-900 leading-tight">{story.achievement}</h3>
                            <p className="text-sm text-gray-600">by {story.name}</p>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 self-start">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>{story.likes}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{story.story}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4 mr-1" />
                            Like
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Comment
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" className="bg-accent/10 border-accent text-accent hover:bg-accent hover:text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Share Your Success Story
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Community Guidelines */}
          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-muted to-primary/5 rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Community Guidelines</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Our community thrives on respect, support, and collaboration. Help us maintain a positive environment for all members.
                </p>
                
                <div className="space-y-2 sm:space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>Be respectful and supportive of fellow members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>Share accurate and helpful information</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>Keep discussions relevant and constructive</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>Protect personal and sensitive information</span>
                  </div>
                </div>
                
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white w-full sm:w-auto">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Full Guidelines
                </Button>
              </div>
              
              <div className="relative order-first lg:order-last">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NTU3NzgwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Team collaboration"
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