import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Search, 
  FileText, 
  Users, 
  Briefcase, 
  BookOpen, 
  ArrowRight,
  GraduationCap,
  Heart,
  MapPin
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Search,
      title: "University Finder",
      description: "Search and compare global universities and programs tailored to your interests and qualifications.",
      highlights: ["500+ Universities", "Advanced Filters", "Program Matching"],
      color: "bg-teal-50 text-teal-600",
      href: "#universities"
    },
    {
      icon: FileText,
      title: "Application Guidance",
      description: "Step-by-step assistance with admission and scholarship applications from experienced mentors.",
      highlights: ["Personal Essays", "Document Review", "Interview Prep"],
      color: "bg-blue-50 text-blue-600",
      href: "/ApplicationGuidancePage"
    },
    {
      icon: Users,
      title: "Student Community",
      description: "Connect with Algerian students already studying abroad for mentorship and support.",
      highlights: ["2,000+ Members", "City Groups", "Peer Support"],
      color: "bg-purple-50 text-purple-600",
      href: "#community"
    },
    {
      icon: Briefcase,
      title: "Career Support",
      description: "Guidance for internships, part-time jobs, and post-graduation career opportunities.",
      highlights: ["Job Placement", "CV Review", "Interview Skills"],
      color: "bg-orange-50 text-orange-600",
      href: "#careers"
    },
    {
      icon: BookOpen,
      title: "Resource Hub",
      description: "Access comprehensive information on visas, cultural tips, and study guides.",
      highlights: ["Visa Guides", "Cultural Tips", "Study Materials"],
      color: "bg-gray-50 text-gray-600",
      href: "#resources"
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Everything You Need to Study Abroad
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-7 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and support you need to successfully navigate your international education journey.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.3, delay: index * 0.05 }}>
              <Card className="group hover:shadow-lg transition-all duration-300 border border-border bg-card shadow-sm">
                <CardHeader className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl tracking-tight mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-primary hover:text-primary hover:bg-primary/5"
                    onClick={() => document.querySelector(feature.href)?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Success Stories Preview */}
        <motion.div className="bg-card border border-border rounded-2xl p-8 shadow-sm" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Success Stories from Algeria
            </h3>
            <p className="text-muted-foreground">
              Real stories from Algerian students who achieved their dreams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Amina K.</h4>
                <p className="text-sm text-muted-foreground">PhD in Engineering, MIT</p>
                <p className="text-xs text-muted-foreground mt-1">"The guidance was invaluable"</p>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full mx-auto flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Youssef M.</h4>
                <p className="text-sm text-muted-foreground">Medical School, University of Toronto</p>
                <p className="text-xs text-muted-foreground mt-1">"Found my perfect program"</p>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Fatima L.</h4>
                <p className="text-sm text-muted-foreground">Business School, Oxford</p>
                <p className="text-xs text-muted-foreground mt-1">"Community support was amazing"</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}