import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Edit, 
  Save, 
  X, 
  ArrowLeft,
  FileText,
  Heart,
  MessageSquare,
  Settings,
  Bell,
  Shield,
  Globe
} from 'lucide-react';
import { supabase } from '../../supabaseClient';

interface UserProfilePageProps {
  onNavigateToPage: (page: string) => void;
  onNavigateHome: () => void;
}

export function UserProfilePage({ onNavigateToPage, onNavigateHome }: UserProfilePageProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('profile');

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    educationLevel: '',
    fieldOfStudy: '',
    bio: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: ''
  });

  useEffect(() => {
    loadUserProfile();
    loadUserData();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (currentUser) {
        // In a real app, fetch user profile from profiles table
        const mockUser = {
          id: currentUser.id,
          fullName: 'Ahmed Benali',
          email: currentUser.email,
          phone: '+213 123 456 789',
          location: 'Algiers, Algeria',
          educationLevel: 'High School',
          fieldOfStudy: 'Computer Science',
          bio: 'Passionate student interested in studying abroad. Looking for opportunities in engineering and technology.',
          linkedinUrl: 'https://linkedin.com/in/ahmed-benali',
          githubUrl: 'https://github.com/ahmed-benali',
          portfolioUrl: 'https://ahmed-benali.dev',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          createdAt: '2024-01-15',
          lastActive: '2024-01-20'
        };
        
        setUser(mockUser);
        setFormData({
          fullName: mockUser.fullName,
          email: mockUser.email,
          phone: mockUser.phone,
          location: mockUser.location,
          educationLevel: mockUser.educationLevel,
          fieldOfStudy: mockUser.fieldOfStudy,
          bio: mockUser.bio,
          linkedinUrl: mockUser.linkedinUrl,
          githubUrl: mockUser.githubUrl,
          portfolioUrl: mockUser.portfolioUrl
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async () => {
    // Mock data for applications and favorites
    const mockApplications = [
      {
        id: 1,
        universityName: 'University of Toronto',
        program: 'Computer Science',
        status: 'In Review',
        submittedDate: '2024-01-15',
        deadline: '2024-02-15'
      },
      {
        id: 2,
        universityName: 'Sorbonne University',
        program: 'Engineering',
        status: 'Submitted',
        submittedDate: '2024-01-10',
        deadline: '2024-03-01'
      }
    ];

    const mockFavorites = [
      {
        id: 1,
        universityName: 'MIT',
        program: 'Computer Science',
        addedDate: '2024-01-05'
      },
      {
        id: 2,
        universityName: 'University of Oxford',
        program: 'Engineering',
        addedDate: '2024-01-12'
      }
    ];

    setApplications(mockApplications);
    setFavorites(mockFavorites);
  };

  const handleSaveProfile = async () => {
    try {
      // In a real app, update user profile in Supabase
      setUser({ ...user, ...formData });
      setEditing(false);
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
      // Show error message
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      location: user.location,
      educationLevel: user.educationLevel,
      fieldOfStudy: user.fieldOfStudy,
      bio: user.bio,
      linkedinUrl: user.linkedinUrl,
      githubUrl: user.githubUrl,
      portfolioUrl: user.portfolioUrl
    });
    setEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateHome}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600">Manage your account and applications</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigateToPage('application')}
              >
                <FileText className="w-4 h-4 mr-2" />
                New Application
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigateToPage('dashboard')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                    <AvatarFallback>{user.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {editing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-xl">{user.fullName}</CardTitle>
                <p className="text-gray-600">{user.fieldOfStudy}</p>
                <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{applications.length}</div>
                    <div className="text-sm text-gray-600">Applications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{favorites.length}</div>
                    <div className="text-sm text-gray-600">Favorites</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Personal Information</CardTitle>
                      {!editing ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditing(true)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={handleSaveProfile}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="educationLevel">Education Level</Label>
                        <Select
                          value={formData.educationLevel}
                          onValueChange={(value) => setFormData({ ...formData, educationLevel: value })}
                          disabled={!editing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High School">High School</SelectItem>
                            <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                            <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                            <SelectItem value="PhD">PhD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="fieldOfStudy">Field of Study</Label>
                        <Input
                          id="fieldOfStudy"
                          value={formData.fieldOfStudy}
                          onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                          disabled={!editing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        disabled={!editing}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>Social Links</Label>
                      <div className="grid md:grid-cols-3 gap-4 mt-2">
                        <div>
                          <Label htmlFor="linkedinUrl" className="text-sm">LinkedIn</Label>
                          <Input
                            id="linkedinUrl"
                            value={formData.linkedinUrl}
                            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                            disabled={!editing}
                            placeholder="https://linkedin.com/in/..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="githubUrl" className="text-sm">GitHub</Label>
                          <Input
                            id="githubUrl"
                            value={formData.githubUrl}
                            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                            disabled={!editing}
                            placeholder="https://github.com/..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="portfolioUrl" className="text-sm">Portfolio</Label>
                          <Input
                            id="portfolioUrl"
                            value={formData.portfolioUrl}
                            onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                            disabled={!editing}
                            placeholder="https://your-portfolio.com"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>My Applications</CardTitle>
                      <Button onClick={() => onNavigateToPage('application')}>
                        <FileText className="w-4 h-4 mr-2" />
                        New Application
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {applications.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                        <p className="text-gray-600 mb-4">Start your journey by applying to universities</p>
                        <Button onClick={() => onNavigateToPage('application')}>
                          Create First Application
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {applications.map((application) => (
                          <div
                            key={application.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{application.universityName}</h4>
                              <p className="text-sm text-gray-600">{application.program}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span>Submitted: {new Date(application.submittedDate).toLocaleDateString()}</span>
                                <span>Deadline: {new Date(application.deadline).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge className={getStatusColor(application.status)}>
                                {application.status}
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onNavigateToPage('application')}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Universities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {favorites.length === 0 ? (
                      <div className="text-center py-8">
                        <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                        <p className="text-gray-600 mb-4">Save universities you're interested in</p>
                        <Button onClick={() => onNavigateToPage('universities-list')}>
                          Browse Universities
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {favorites.map((favorite) => (
                          <div
                            key={favorite.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{favorite.universityName}</h4>
                              <p className="text-sm text-gray-600">{favorite.program}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                Added: {new Date(favorite.addedDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onNavigateToPage('university-detail')}
                              >
                                View Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onNavigateToPage('application')}
                              >
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card>
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
                          <p className="text-sm text-gray-900">Profile updated</p>
                          <p className="text-xs text-gray-500">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
