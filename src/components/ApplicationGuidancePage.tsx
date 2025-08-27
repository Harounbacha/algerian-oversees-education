import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import React from "react";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  MessageSquare, 
  Users, 
  Target,
  Download,
  Star,
  Calendar,
  ArrowRight,
  Award,
  GraduationCap,
  Globe,
  ArrowLeft
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface ApplicationGuidancePageProps {
  onNavigateHome: () => void;
}

export function ApplicationGuidancePage({ onNavigateHome }: ApplicationGuidancePageProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const applicationSteps = [
    {
      id: 1,
      title: "Research & University Selection",
      description: "Identify programs and universities that match your goals",
      duration: "2-3 weeks",
      tasks: [
        "Research university rankings and programs",
        "Check admission requirements",
        "Verify language requirements (IELTS/TOEFL)",
        "Compare tuition costs and living expenses",
        "Review scholarship opportunities"
      ]
    },
    {
      id: 2,
      title: "Document Preparation",
      description: "Gather and prepare all required documents",
      duration: "3-4 weeks",
      tasks: [
        "Obtain official transcripts",
        "Request letters of recommendation",
        "Prepare passport and photos",
        "Get documents translated and certified",
        "Prepare financial statements"
      ]
    },
    {
      id: 3,
      title: "Application Submission",
      description: "Complete and submit your applications",
      duration: "2-3 weeks",
      tasks: [
        "Complete online application forms",
        "Write personal statements/essays",
        "Upload all required documents",
        "Pay application fees",
        "Submit before deadlines"
      ]
    },
    {
      id: 4,
      title: "Follow-up & Interviews",
      description: "Prepare for interviews and follow up on applications",
      duration: "4-8 weeks",
      tasks: [
        "Prepare for interviews",
        "Submit additional documents if requested",
        "Follow up on application status",
        "Prepare for entrance exams if required",
        "Complete visa applications"
      ]
    }
  ];

  const essayTips = [
    {
      title: "Personal Statement",
      description: "Tell your unique story and why you're passionate about your field",
      tips: [
        "Start with a compelling hook",
        "Show, don't just tell your experiences",
        "Connect your past to your future goals",
        "Be authentic and personal",
        "End with your vision for the future"
      ]
    },
    {
      title: "Statement of Purpose",
      description: "Focus on your academic and professional goals",
      tips: [
        "Clearly state your research interests",
        "Demonstrate knowledge of the program",
        "Highlight relevant experience",
        "Explain why this university/program",
        "Discuss your career objectives"
      ]
    },
    {
      title: "Motivation Letter",
      description: "Explain your motivation for studying abroad",
      tips: [
        "Express genuine interest in the country/culture",
        "Highlight what you'll contribute",
        "Show cultural awareness",
        "Demonstrate language skills",
        "Explain how it fits your career path"
      ]
    }
  ];

  const scholarships = [
    {
      name: "Erasmus+ Scholarships",
      region: "Europe",
      amount: "€1,000-1,500/month",
      deadline: "February 2024",
      eligibility: "EU partnership programs"
    },
    {
      name: "Chevening Scholarships",
      region: "United Kingdom",
      amount: "Full tuition + living costs",
      deadline: "November 2024",
      eligibility: "Leadership potential required"
    },
    {
      name: "DAAD Scholarships",
      region: "Germany",
      amount: "€850-1,200/month",
      deadline: "October 2024",
      eligibility: "Academic excellence"
    },
    {
      name: "Fulbright Program",
      region: "United States",
      amount: "Full funding available",
      deadline: "May 2024",
      eligibility: "Research/teaching focus"
    }
  ];

  const toggleStepCompletion = (stepId: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const progressPercentage = (completedSteps.length / applicationSteps.length) * 100;

  return (
    <div className="min-h-screen">
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
                  Application Guidance
                </h1>
                <p className="text-lg sm:text-xl opacity-90">
                  Your comprehensive guide to successfully applying to international universities. Get step-by-step assistance from application to acceptance.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                  <Users className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">Expert Mentorship</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                  <FileText className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">Document Review</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                  <Award className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">Scholarship Help</span>
                </div>
              </div>
            </div>
            
            <div className="relative order-first lg:order-last">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1753613648191-4771cf76f034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU1Nzc3OTMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students in consultation session"
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
          {/* Progress Tracker */}
                     <div className="rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                             <h3 className="text-xl sm:text-2xl font-bold text-foreground">Your Application Progress</h3>
              <Badge variant="secondary" className="text-base sm:text-lg px-3 sm:px-4 py-2 self-start sm:self-auto">
                {completedSteps.length}/{applicationSteps.length} Steps
              </Badge>
            </div>
            
            <Progress value={progressPercentage} className="h-2 sm:h-3 mb-4 sm:mb-6" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {applicationSteps.map((step) => (
                <Card 
                  key={step.id} 
                  className={`cursor-pointer transition-all duration-300 ${
                    completedSteps.includes(step.id) 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleStepCompletion(step.id)}
                >
                  <CardHeader className="space-y-2 p-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                        completedSteps.includes(step.id)
                                                 ? 'bg-primary text-white'
                       : 'bg-muted text-muted-foreground'
                      }`}>
                        {completedSteps.includes(step.id) ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <span className="text-xs sm:text-sm font-medium">{step.id}</span>
                        )}
                      </div>
                      <CardTitle className="text-base sm:text-lg leading-tight">{step.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                                         <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{step.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Detailed Guidance Tabs */}
          <Tabs defaultValue="steps" className="mb-12 sm:mb-16">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
              <TabsTrigger value="steps" className="text-xs sm:text-sm py-2 sm:py-3">Application Steps</TabsTrigger>
              <TabsTrigger value="documents" className="text-xs sm:text-sm py-2 sm:py-3">Documents</TabsTrigger>
              <TabsTrigger value="essays" className="text-xs sm:text-sm py-2 sm:py-3">Essays & Writing</TabsTrigger>
              <TabsTrigger value="scholarships" className="text-xs sm:text-sm py-2 sm:py-3">Scholarships</TabsTrigger>
            </TabsList>

            <TabsContent value="steps" className="space-y-6 sm:space-y-8 mt-6">
              {applicationSteps.map((step, index) => (
                <Card key={step.id}>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm sm:text-base">{step.id}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg sm:text-xl">{step.title}</CardTitle>
                        <CardDescription className="text-sm sm:text-base mt-1">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="space-y-4">
                                             <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                        <Clock className="w-4 h-4" />
                        <span>Estimated time: {step.duration}</span>
                      </div>
                      
                      <div className="space-y-3">
                        {step.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-start space-x-3">
                            <Checkbox className="mt-0.5 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-foreground">{task}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <Download className="w-4 h-4 mr-2" />
                          Download Checklist
                        </Button>
                        <Button variant="outline" size="sm">
                          Get Help
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <span>Required Documents</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4 sm:p-6 pt-0">
                    {[
                      "Academic transcripts (official)",
                      "Bachelor's/Master's degree certificate",
                      "Letters of recommendation (2-3)",
                      "Personal statement/motivation letter",
                      "CV/Resume",
                      "Language proficiency certificate",
                      "Passport copy",
                      "Financial proof",
                      "Research proposal (for PhD)"
                    ].map((doc, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                 <span className="text-sm sm:text-base text-foreground">{doc}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-accent" />
                      <span>Important Notes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                                             <p className="text-sm text-foreground">
                         <strong>Translation:</strong> All documents in Arabic or French must be officially translated to English.
                       </p>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                                             <p className="text-sm text-foreground">
                         <strong>Certification:</strong> Academic documents may need to be verified by the Algerian Ministry of Education.
                       </p>
                    </div>
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                                             <p className="text-sm text-foreground">
                         <strong>Deadlines:</strong> Start document preparation at least 3 months before application deadlines.
                       </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="essays" className="space-y-8 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {essayTips.map((essay, index) => (
                  <Card key={index}>
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <span>{essay.title}</span>
                      </CardTitle>
                      <CardDescription>{essay.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 p-4 sm:p-6 pt-0">
                      {essay.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="flex items-start space-x-2">
                          <Star className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{tip}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span>Essay Review Service</span>
                  </CardTitle>
                  <CardDescription>
                    Get your essays reviewed by experienced mentors and university graduates
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="space-y-2">
                      <p className="text-sm text-foreground">✓ Professional feedback and suggestions</p>
                      <p className="text-sm text-foreground">✓ Grammar and structure improvements</p>
                      <p className="text-sm text-foreground">✓ 48-hour turnaround time</p>
                    </div>
                    <Button className="bg-accent hover:bg-accent/90 w-full lg:w-auto">
                      Submit Essay for Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scholarships" className="space-y-8 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {scholarships.map((scholarship, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                        <Badge variant="secondary">{scholarship.region}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Amount:</span>
                          <span className="font-medium text-primary text-sm sm:text-base">{scholarship.amount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Deadline:</span>
                          <span className="font-medium text-accent text-sm sm:text-base">{scholarship.deadline}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Eligibility:</span>
                          <span className="text-sm text-right">{scholarship.eligibility}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-teal-50 to-primary/5">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Scholarship Application Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Before Applying:</h4>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li>• Research eligibility criteria thoroughly</li>
                        <li>• Prepare all required documents early</li>
                        <li>• Understand the application process</li>
                        <li>• Connect with previous recipients</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Application Strategy:</h4>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li>• Apply to multiple scholarships</li>
                        <li>• Tailor essays to each scholarship</li>
                        <li>• Highlight unique experiences</li>
                        <li>• Submit well before deadlines</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Expert Support Section */}
          <div className="bg-gradient-to-r from-primary to-teal-600 rounded-2xl p-6 sm:p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold">Need Personalized Guidance?</h3>
                <p className="text-base sm:text-lg opacity-90">
                  Connect with our experienced mentors who have successfully navigated the application process and are now studying or working abroad.
                </p>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>1-on-1 mentoring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Essay reviews</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>Interview prep</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>Country-specific advice</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                     <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-muted">
                    Book a Consultation
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary">
                    Join Group Session
                  </Button>
                </div>
              </div>
              
              <div className="relative order-first lg:order-last">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1753613648191-4771cf76f034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU1Nzc3OTMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Students in consultation session"
                  className="rounded-lg shadow-xl w-full h-48 sm:h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}