import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Users, 
  GraduationCap, 
  FileText, 
  BookOpen, 
  Plus, 
  MessageSquare, 
  Search, 
  ArrowRight,
  User,
  Settings,
  Bell
} from 'lucide-react';

interface DashboardProps {
  onNavigateToPage?: (page: string) => void;
}

interface DashboardStats {
  totalUsers: number;
  totalUniversities: number;
  totalApplications: number;
  totalResources: number;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToPage }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalUniversities: 0,
    totalApplications: 0,
    totalResources: 0
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchDashboardStats();
    fetchCurrentUser();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch basic statistics
      const [usersResult, universitiesResult, applicationsResult, resourcesResult] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact' }),
        supabase.from('universities').select('id', { count: 'exact' }),
        supabase.from('applications').select('id', { count: 'exact' }),
        supabase.from('study_resources').select('id', { count: 'exact' })
      ]);

      setStats({
        totalUsers: usersResult.count || 0,
        totalUniversities: universitiesResult.count || 0,
        totalApplications: applicationsResult.count || 0,
        totalResources: resourcesResult.count || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Set mock data for development
      setStats({
        totalUsers: 1250,
        totalUniversities: 500,
        totalApplications: 3400,
        totalResources: 150
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const handleNavigation = (page: string) => {
    if (onNavigateToPage) {
      onNavigateToPage(page);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.email ? user.email.split('@')[0] : 'Student'}!
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Your gateway to international education opportunities
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigation('profile')}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigation('application')}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Application
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25 }} whileHover={{ y: -2 }}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.05 }} whileHover={{ y: -2 }}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Universities</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalUniversities.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.1 }} whileHover={{ y: -2 }}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalApplications.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.15 }} whileHover={{ y: -2 }}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Resources</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalResources.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </div>

        {/* Feature Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Universities Section */}
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Featured Universities</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('universities-list')}
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div whileHover={{ scale: 1.01 }}
                className="flex items-center p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => handleNavigation('university-detail')}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">U</span>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">University of Toronto</h3>
                  <p className="text-sm text-gray-500">Canada • World Ranking: #18</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className="text-xs">Scholarships Available</Badge>
                  </div>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.01 }}
                className="flex items-center p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => handleNavigation('university-detail')}
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-semibold">S</span>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">Sorbonne University</h3>
                  <p className="text-sm text-gray-500">France • World Ranking: #43</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className="text-xs">Low Tuition</Badge>
                  </div>
                </div>
              </motion.div>
              <Button 
                className="w-full"
                onClick={() => handleNavigation('universities-list')}
              >
                <Search className="w-4 h-4 mr-2" />
                Browse All Universities
              </Button>
            </CardContent>
          </Card>
          </motion.div>

          {/* Resources Section */}
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.05 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Study Resources</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('resources')}
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div whileHover={{ scale: 1.01 }}
                className="flex items-center p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => handleNavigation('resources')}
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">IELTS Preparation Guide</h3>
                  <p className="text-sm text-gray-500">Complete guide to ace your IELTS exam</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className="text-xs">Free</Badge>
                  </div>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.01 }}
                className="flex items-center p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => handleNavigation('resources')}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">Application Essay Templates</h3>
                  <p className="text-sm text-gray-500">Professional templates for your applications</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className="text-xs">Premium</Badge>
                  </div>
                </div>
              </motion.div>
              <Button 
                className="w-full"
                onClick={() => handleNavigation('resources')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Explore Resources
              </Button>
            </CardContent>
          </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex items-center justify-center p-6 h-auto hover:bg-blue-50 hover:border-blue-300 transition-colors"
                onClick={() => handleNavigation('application')}
              >
                <div className="text-center">
                  <Plus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium">Start Application</div>
                  <div className="text-sm text-gray-500 mt-1">Apply to universities</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center justify-center p-6 h-auto hover:bg-green-50 hover:border-green-300 transition-colors"
                onClick={() => handleNavigation('community')}
              >
                <div className="text-center">
                  <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium">Find Mentor</div>
                  <div className="text-sm text-gray-500 mt-1">Connect with experts</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center justify-center p-6 h-auto hover:bg-purple-50 hover:border-purple-300 transition-colors"
                onClick={() => handleNavigation('community')}
              >
                <div className="text-center">
                  <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-medium">Join Discussion</div>
                  <div className="text-sm text-gray-500 mt-1">Connect with peers</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Application submitted to University of Toronto</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Added MIT to favorites</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Downloaded IELTS preparation guide</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
