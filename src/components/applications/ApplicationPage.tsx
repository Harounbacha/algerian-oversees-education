import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  ArrowLeft,
  Upload,
  FileText,
  Calendar,
  DollarSign,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  Eye,
  Download,
  Send,
  Save,
  Loader2
} from "lucide-react";
import { supabase } from '../../supabaseClient';

interface ApplicationPageProps {
  onNavigateToPage: (page: string) => void;
  onNavigateHome: () => void;
}

interface Application {
  id: string;
  university_id: number;
  program_id: number;
  status_id: number;
  application_year: number;
  intake_season: string;
  personal_statement: string;
  research_proposal: string;
  intended_start_date: string;
  intended_duration_months: number;
  budget_range: any;
  scholarship_applied: boolean;
  scholarship_amount: number;
  application_fee_paid: boolean;
  application_fee_amount: number;
  documents_submitted: boolean;
  interview_scheduled: boolean;
  interview_date: string;
  decision_date: string;
  decision_notes: string;
  created_at: string;
  updated_at: string;
  university: any;
  program: any;
  status: any;
}

interface Document {
  id: string;
  application_id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  is_verified: boolean;
  uploaded_at: string;
}

export function ApplicationPage({ onNavigateToPage, onNavigateHome }: ApplicationPageProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form state for new application
  const [formData, setFormData] = useState({
    university_id: '',
    program_id: '',
    intake_season: '',
    personal_statement: '',
    research_proposal: '',
    intended_start_date: '',
    intended_duration_months: '',
    budget_min: '',
    budget_max: '',
    scholarship_applied: false,
    scholarship_amount: ''
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      // Fetch user's applications with related data
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select(`
          *,
          university:universities(name, slug),
          program:university_programs(name, level, field_of_study),
          status:application_statuses(name, color)
        `)
        .order('created_at', { ascending: false });

      if (applicationsError) throw applicationsError;

      setApplications(applicationsData || []);

      // Fetch documents for all applications
      if (applicationsData && applicationsData.length > 0) {
        const applicationIds = applicationsData.map(app => app.id);
        const { data: documentsData, error: documentsError } = await supabase
          .from('application_documents')
          .select('*')
          .in('application_id', applicationIds);

        if (documentsError) throw documentsError;
        setDocuments(documentsData || []);
      }

    } catch (err) {
      setError('Failed to load applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, applicationId: string, documentType: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${applicationId}/${documentType}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('application-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('application-documents')
        .getPublicUrl(fileName);

      // Save document record to database
      const { error: documentError } = await supabase
        .from('application_documents')
        .insert({
          application_id: applicationId,
          document_type: documentType,
          file_name: file.name,
          file_url: urlData.publicUrl,
          file_size: file.size,
          mime_type: file.type
        });

      if (documentError) throw documentError;

      // Refresh documents
      fetchApplications();

    } catch (err) {
      setError('Failed to upload document');
      console.error('Error uploading file:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('applications')
        .insert({
          university_id: parseInt(formData.university_id),
          program_id: parseInt(formData.program_id),
          status_id: 1, // Draft status
          application_year: new Date().getFullYear(),
          intake_season: formData.intake_season,
          personal_statement: formData.personal_statement,
          research_proposal: formData.research_proposal,
          intended_start_date: formData.intended_start_date,
          intended_duration_months: parseInt(formData.intended_duration_months),
          budget_range: {
            min: parseFloat(formData.budget_min),
            max: parseFloat(formData.budget_max),
            currency: 'USD'
          },
          scholarship_applied: formData.scholarship_applied,
          scholarship_amount: formData.scholarship_amount ? parseFloat(formData.scholarship_amount) : null
        })
        .select()
        .single();

      if (error) throw error;

      setShowNewApplicationForm(false);
      setFormData({
        university_id: '',
        program_id: '',
        intake_season: '',
        personal_statement: '',
        research_proposal: '',
        intended_start_date: '',
        intended_duration_months: '',
        budget_min: '',
        budget_max: '',
        scholarship_applied: false,
        scholarship_amount: ''
      });

      fetchApplications();

    } catch (err) {
      setError('Failed to create application');
      console.error('Error creating application:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (statusName: string) => {
    const colors: { [key: string]: string } = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Submitted': 'bg-blue-100 text-blue-800',
      'Under Review': 'bg-yellow-100 text-yellow-800',
      'Interview Scheduled': 'bg-purple-100 text-purple-800',
      'Waitlisted': 'bg-orange-100 text-orange-800',
      'Accepted': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Withdrawn': 'bg-gray-100 text-gray-800'
    };
    return colors[statusName] || 'bg-gray-100 text-gray-800';
  };

  const getApplicationProgress = (application: Application) => {
    const steps = [
      { name: 'Draft', completed: application.status?.name !== 'Draft' },
      { name: 'Documents', completed: application.documents_submitted },
      { name: 'Submitted', completed: ['Submitted', 'Under Review', 'Interview Scheduled', 'Waitlisted', 'Accepted', 'Rejected'].includes(application.status?.name) },
      { name: 'Decision', completed: ['Accepted', 'Rejected'].includes(application.status?.name) }
    ];
    
    const completedSteps = steps.filter(step => step.completed).length;
    return (completedSteps / steps.length) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>
            
            <Button
              onClick={() => setShowNewApplicationForm(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Application
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* New Application Form */}
        {showNewApplicationForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>New Application</CardTitle>
              <CardDescription>Fill out the details for your new university application</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="university_id">University</Label>
                    <select
                      id="university_id"
                      name="university_id"
                      value={formData.university_id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select University</option>
                      {/* TODO: Fetch universities from database */}
                      <option value="1">University of Toronto</option>
                      <option value="2">McGill University</option>
                      <option value="3">University of British Columbia</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="program_id">Program</Label>
                    <select
                      id="program_id"
                      name="program_id"
                      value={formData.program_id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select Program</option>
                      {/* TODO: Fetch programs based on selected university */}
                      <option value="1">Master of Computer Science</option>
                      <option value="2">Bachelor of Computer Science</option>
                      <option value="3">Master in Computer Science</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="intake_season">Intake Season</Label>
                    <select
                      id="intake_season"
                      name="intake_season"
                      value={formData.intake_season}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select Season</option>
                      <option value="Fall">Fall</option>
                      <option value="Spring">Spring</option>
                      <option value="Summer">Summer</option>
                      <option value="Winter">Winter</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="intended_start_date">Intended Start Date</Label>
                    <Input
                      id="intended_start_date"
                      name="intended_start_date"
                      type="date"
                      value={formData.intended_start_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personal_statement">Personal Statement</Label>
                  <Textarea
                    id="personal_statement"
                    name="personal_statement"
                    placeholder="Write your personal statement..."
                    value={formData.personal_statement}
                    onChange={handleInputChange}
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="research_proposal">Research Proposal (Optional)</Label>
                  <Textarea
                    id="research_proposal"
                    name="research_proposal"
                    placeholder="Write your research proposal..."
                    value={formData.research_proposal}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget_min">Budget Range (Min)</Label>
                    <Input
                      id="budget_min"
                      name="budget_min"
                      type="number"
                      placeholder="0"
                      value={formData.budget_min}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget_max">Budget Range (Max)</Label>
                    <Input
                      id="budget_max"
                      name="budget_max"
                      type="number"
                      placeholder="0"
                      value={formData.budget_max}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scholarship_amount">Scholarship Amount (Optional)</Label>
                    <Input
                      id="scholarship_amount"
                      name="scholarship_amount"
                      type="number"
                      placeholder="0"
                      value={formData.scholarship_amount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="scholarship_applied"
                    name="scholarship_applied"
                    type="checkbox"
                    checked={formData.scholarship_applied}
                    onChange={handleInputChange}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="scholarship_applied">I have applied for scholarships</Label>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Application
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewApplicationForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Applications List */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Total Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{applications.length}</div>
                  <p className="text-sm text-gray-600">Applications submitted</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {applications.filter(app => app.documents_submitted).length}
                  </div>
                  <p className="text-sm text-gray-600">With documents uploaded</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    In Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">
                    {applications.filter(app => !app.documents_submitted).length}
                  </div>
                  <p className="text-sm text-gray-600">Pending completion</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            {applications.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                  <p className="text-gray-600 mb-4">Start your journey by creating your first application</p>
                  <Button onClick={() => setShowNewApplicationForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Application
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {applications.map((application) => (
                  <Card key={application.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {application.university?.name}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {application.program?.name} • {application.program?.level}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Intake: {application.intake_season}</span>
                            <span>Year: {application.application_year}</span>
                            <span>Created: {new Date(application.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(application.status?.name)}>
                          {application.status?.name}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{Math.round(getApplicationProgress(application))}%</span>
                          </div>
                          <Progress value={getApplicationProgress(application)} className="h-2" />
                        </div>

                        <div className="flex space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onNavigateToPage('university-detail')}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActiveTab('documents')}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Documents
                          </Button>
                          {application.status?.name === 'Draft' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onNavigateToPage('application')}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Submit
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
                <CardDescription>
                  Upload and manage your application documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No applications to upload documents for</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {applications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-4">
                          {application.university?.name} - {application.program?.name}
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {['transcript', 'recommendation', 'passport', 'cv', 'essay', 'certificate'].map((docType) => {
                            const existingDoc = documents.find(doc => 
                              doc.application_id === application.id && doc.document_type === docType
                            );
                            
                            return (
                              <div key={docType} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium capitalize">{docType}</span>
                                  {existingDoc && (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  )}
                                </div>
                                
                                {existingDoc ? (
                                  <div className="space-y-2">
                                    <p className="text-xs text-gray-600">{existingDoc.file_name}</p>
                                    <div className="flex space-x-2">
                                      <Button variant="outline" size="sm">
                                        <Eye className="w-3 h-3 mr-1" />
                                        View
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Download className="w-3 h-3 mr-1" />
                                        Download
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Trash2 className="w-3 h-3 mr-1" />
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <input
                                      type="file"
                                      id={`${application.id}-${docType}`}
                                      onChange={(e) => handleFileUpload(e, application.id, docType)}
                                      className="hidden"
                                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    />
                                    <label
                                      htmlFor={`${application.id}-${docType}`}
                                      className="block w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-primary transition-colors"
                                    >
                                      {uploading ? (
                                        <Loader2 className="w-4 h-4 mx-auto animate-spin" />
                                      ) : (
                                        <Upload className="w-4 h-4 mx-auto" />
                                      )}
                                      <span className="text-sm text-gray-600 mt-1 block">
                                        Upload {docType}
                                      </span>
                                    </label>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
