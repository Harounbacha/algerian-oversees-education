import type { ComponentType } from 'react';

// Core Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  education_level: string;
  field_of_study: string;
  location: string;
  created_at: string;
  updated_at: string;
}

export interface University {
  id: number;
  name: string;
  location: string;
  country: string;
  city: string;
  image: string;
  rating: number;
  programs: string[];
  tuition: number;
  tuition_currency: string;
  deadline: string;
  algerian_students: number;
  scholarships: boolean;
  low_tuition: boolean;
  open_applications: boolean;
  world_ranking: number;
  description?: string;
  website?: string;
  admission_requirements?: string[];
  language_requirements?: string[];
}

export interface Application {
  id: string;
  user_id: string;
  university_id: number;
  program_name: string;
  status: ApplicationStatus;
  documents: ApplicationDocument[];
  created_at: string;
  updated_at: string;
  deadline: string;
  notes?: string;
}

export interface ApplicationStatus {
  id: number;
  name: string;
  description: string;
  color: string;
}

export interface ApplicationDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploaded_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author_id: string;
  category: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  replies_count: number;
  views_count: number;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  level: 'entry' | 'mid' | 'senior' | 'student';
  description: string;
  requirements: string[];
  salary_range?: string;
  application_deadline: string;
  created_at: string;
}

export interface Country {
  id: number;
  name: string;
  code: string;
  flag_url?: string;
}

export interface City {
  id: number;
  name: string;
  country_id: number;
  country: Country;
}

// Component Props Types
export interface NavigationProps {
  currentPage: string;
  onNavigateToPage: (page: string) => void;
}

export interface PageProps {
  onNavigateToPage: (page: string) => void;
  onNavigateHome?: () => void;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  education_level: string;
  field_of_study: string;
  location: string;
}

export interface ApplicationForm {
  university_id: number;
  program_name: string;
  documents: File[];
  notes?: string;
}

// Filter Types
export interface UniversityFilters {
  search: string;
  country: string;
  field: string;
  tuition_range: string;
  rating: string;
  active_filters: string[];
}

export interface JobFilters {
  search: string;
  type: string;
  location: string;
  level: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

// UI State Types
export interface ViewMode {
  type: 'grid' | 'list';
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

// Theme Types
export interface Theme {
  name: 'light' | 'dark' | 'system';
  label: string;
  icon: ComponentType<{ className?: string }>;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Search Types
export interface SearchResult<T> {
  item: T;
  score: number;
  highlights: string[];
}

export interface SearchFilters {
  query: string;
  filters: Record<string, any>;
  sort: string;
  page: number;
  limit: number;
}

// Note: interfaces above are already exported; no need to re-export.

