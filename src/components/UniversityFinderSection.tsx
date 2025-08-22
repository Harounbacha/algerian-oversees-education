import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, MapPin, Star, Users, DollarSign, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function UniversityFinderSection() {
  const universities = [
    {
      name: "University of Toronto",
      location: "Toronto, Canada",
      image: "https://images.unsplash.com/photo-1600239401291-385542139183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmdzJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NTc3NzkzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      programs: ["Engineering", "Medicine", "Business"],
      tuition: "$45,000/year",
      deadline: "Jan 15, 2024",
      algerianStudents: 120,
      scholarships: true
    },
    {
      name: "Sorbonne University",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1600239401291-385542139183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmdzJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NTc3NzkzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      programs: ["Literature", "Philosophy", "Sciences"],
      tuition: "€2,770/year",
      deadline: "Mar 1, 2024",
      algerianStudents: 85,
      scholarships: true
    },
    {
      name: "Technical University of Munich",
      location: "Munich, Germany",
      image: "https://images.unsplash.com/photo-1600239401291-385542139183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmdzJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NTc3NzkzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      programs: ["Engineering", "Computer Science", "Physics"],
      tuition: "Free (EU residents)",
      deadline: "Feb 28, 2024",
      algerianStudents: 65,
      scholarships: true
    }
  ];

  return (
    <section id="universities" className="py-20 bg-white">
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
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Field of Study" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="arts">Arts & Humanities</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="outline" size="sm" className="text-sm">
              🎓 Scholarships Available
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              🇩🇿 High Algerian Enrollment
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              💰 Low Tuition
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              📅 Open Applications
            </Button>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((university, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
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
                  {university.programs.map((program, idx) => (
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
                
                <Button className="w-full bg-primary hover:bg-primary/90">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
            View All 500+ Universities
          </Button>
        </div>
      </div>
    </section>
  );
}