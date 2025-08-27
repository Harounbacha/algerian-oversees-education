-- =====================================================
-- ALGERIAN OVERSEAS EDUCATION PLATFORM - CLEAN DATABASE SCHEMA
-- =====================================================
-- This script will DROP all existing tables and recreate them fresh
-- WARNING: This will delete all existing data!

-- =====================================================
-- DROP EXISTING TABLES (in reverse dependency order)
-- =====================================================

-- Drop tables with foreign key dependencies first
DROP TABLE IF EXISTS resource_ratings CASCADE;
DROP TABLE IF EXISTS resource_access CASCADE;
DROP TABLE IF EXISTS study_resources CASCADE;
DROP TABLE IF EXISTS resource_categories CASCADE;

DROP TABLE IF EXISTS event_registrations CASCADE;
DROP TABLE IF EXISTS career_events CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS job_opportunities CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

DROP TABLE IF EXISTS discussion_reactions CASCADE;
DROP TABLE IF EXISTS discussion_replies CASCADE;
DROP TABLE IF EXISTS discussions CASCADE;
DROP TABLE IF EXISTS discussion_categories CASCADE;

DROP TABLE IF EXISTS mentorship_sessions CASCADE;
DROP TABLE IF EXISTS mentors CASCADE;

DROP TABLE IF EXISTS application_checklist CASCADE;
DROP TABLE IF EXISTS application_documents CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS application_statuses CASCADE;

DROP TABLE IF EXISTS university_media CASCADE;
DROP TABLE IF EXISTS university_programs CASCADE;
DROP TABLE IF EXISTS universities CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS countries CASCADE;

DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS notification_types CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS user_activities CASCADE;
DROP TABLE IF EXISTS platform_analytics CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- =====================================================
-- CREATE FRESH DATABASE SCHEMA
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CORE USER MANAGEMENT
-- =====================================================

-- Users table (extends Supabase auth)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    phone TEXT,
    date_of_birth DATE,
    nationality TEXT DEFAULT 'Algerian',
    current_education_level TEXT CHECK (current_education_level IN ('High School', 'Bachelor', 'Master', 'PhD', 'Graduate')),
    field_of_study TEXT,
    graduation_year INTEGER,
    gpa DECIMAL(3,2),
    language_proficiency JSONB, -- {ielts: 7.5, toefl: 100, french: "B2"}
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);

-- User profiles for additional information
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    profile_type TEXT CHECK (profile_type IN ('student', 'mentor', 'alumni', 'professional')),
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    social_media JSONB, -- {twitter: "...", instagram: "..."}
    skills TEXT[],
    interests TEXT[],
    achievements TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- UNIVERSITY MANAGEMENT
-- =====================================================

-- Countries table
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    code TEXT UNIQUE NOT NULL,
    flag_emoji TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Cities table
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country_id INTEGER REFERENCES countries(id),
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(name, country_id)
);

-- Universities table
CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    country_id INTEGER REFERENCES countries(id),
    city_id INTEGER REFERENCES cities(id),
    website TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    description TEXT,
    logo_url TEXT,
    banner_url TEXT,
    founded_year INTEGER,
    student_population INTEGER,
    international_student_percentage DECIMAL(5,2),
    world_ranking INTEGER,
    acceptance_rate DECIMAL(5,2),
    tuition_range JSONB, -- {min: 5000, max: 50000, currency: "USD"}
    living_costs JSONB, -- {monthly: 1200, currency: "USD"}
    language_requirements JSONB, -- {ielts_min: 6.5, toefl_min: 90}
    application_deadlines JSONB, -- {fall: "2024-01-15", spring: "2024-09-01"}
    scholarships_available BOOLEAN DEFAULT FALSE,
    visa_support BOOLEAN DEFAULT FALSE,
    algerian_students_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2),
    total_reviews INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- University programs/fields of study
CREATE TABLE university_programs (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    level TEXT CHECK (level IN ('Bachelor', 'Master', 'PhD', 'Diploma')),
    field_of_study TEXT NOT NULL,
    duration_months INTEGER,
    tuition_fee DECIMAL(10,2),
    currency TEXT DEFAULT 'USD',
    language_of_instruction TEXT[],
    application_deadline DATE,
    start_date DATE,
    requirements TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- University images and media
CREATE TABLE university_media (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    media_type TEXT CHECK (media_type IN ('image', 'video', 'document')),
    url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- APPLICATION MANAGEMENT
-- =====================================================

-- Application status tracking
CREATE TABLE application_statuses (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#6B7280',
    is_active BOOLEAN DEFAULT TRUE
);

-- User applications to universities
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    university_id INTEGER REFERENCES universities(id),
    program_id INTEGER REFERENCES university_programs(id),
    status_id INTEGER REFERENCES application_statuses(id),
    application_year INTEGER NOT NULL,
    intake_season TEXT CHECK (intake_season IN ('Fall', 'Spring', 'Summer', 'Winter')),
    
    -- Application details
    personal_statement TEXT,
    research_proposal TEXT,
    intended_start_date DATE,
    intended_duration_months INTEGER,
    
    -- Financial information
    budget_range JSONB, -- {min: 10000, max: 50000, currency: "USD"}
    scholarship_applied BOOLEAN DEFAULT FALSE,
    scholarship_amount DECIMAL(10,2),
    
    -- Application tracking
    application_fee_paid BOOLEAN DEFAULT FALSE,
    application_fee_amount DECIMAL(10,2),
    documents_submitted BOOLEAN DEFAULT FALSE,
    interview_scheduled BOOLEAN DEFAULT FALSE,
    interview_date TIMESTAMPTZ,
    decision_date DATE,
    decision_notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Application documents
CREATE TABLE application_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    document_type TEXT CHECK (document_type IN ('transcript', 'recommendation', 'passport', 'cv', 'essay', 'certificate', 'other')),
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Application timeline/checklist
CREATE TABLE application_checklist (
    id SERIAL PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    step_name TEXT NOT NULL,
    step_description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    due_date DATE,
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- COMMUNITY & MENTORSHIP
-- =====================================================

-- Mentors table
CREATE TABLE mentors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    university TEXT NOT NULL,
    field_of_study TEXT NOT NULL,
    current_position TEXT,
    years_of_experience INTEGER,
    hourly_rate DECIMAL(8,2),
    currency TEXT DEFAULT 'USD',
    availability_schedule JSONB, -- {monday: ["09:00-12:00"], tuesday: ["14:00-18:00"]}
    specialties TEXT[],
    languages TEXT[],
    rating DECIMAL(3,2) DEFAULT 0,
    total_sessions INTEGER DEFAULT 0,
    total_students INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mentorship sessions
CREATE TABLE mentorship_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID REFERENCES mentors(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_type TEXT CHECK (session_type IN ('consultation', 'review', 'mock_interview', 'essay_review', 'general')),
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    status TEXT CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')) DEFAULT 'scheduled',
    meeting_link TEXT,
    notes TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community discussions/forums
CREATE TABLE discussion_categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT DEFAULT '#6B7280',
    is_active BOOLEAN DEFAULT TRUE
);

-- Discussion topics
CREATE TABLE discussions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES discussion_categories(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[],
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Discussion replies
CREATE TABLE discussion_replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    discussion_id UUID REFERENCES discussions(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    parent_reply_id UUID REFERENCES discussion_replies(id),
    content TEXT NOT NULL,
    is_solution BOOLEAN DEFAULT FALSE,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Discussion reactions
CREATE TABLE discussion_reactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    discussion_id UUID REFERENCES discussions(id) ON DELETE CASCADE,
    reply_id UUID REFERENCES discussion_replies(id) ON DELETE CASCADE,
    reaction_type TEXT CHECK (reaction_type IN ('like', 'love', 'helpful', 'insightful')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, discussion_id, reply_id)
);

-- =====================================================
-- CAREER SUPPORT
-- =====================================================

-- Companies table
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    website TEXT,
    logo_url TEXT,
    industry TEXT,
    company_size TEXT CHECK (company_size IN ('startup', 'small', 'medium', 'large', 'enterprise')),
    founded_year INTEGER,
    headquarters TEXT,
    is_sponsor BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job opportunities
CREATE TABLE job_opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id INTEGER REFERENCES companies(id),
    posted_by UUID REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    responsibilities TEXT,
    job_type TEXT CHECK (job_type IN ('full_time', 'part_time', 'internship', 'contract', 'freelance')),
    experience_level TEXT CHECK (experience_level IN ('entry', 'junior', 'mid', 'senior', 'lead', 'executive')),
    location TEXT NOT NULL,
    remote_work BOOLEAN DEFAULT FALSE,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    currency TEXT DEFAULT 'USD',
    benefits TEXT[],
    skills_required TEXT[],
    languages_required TEXT[],
    visa_sponsorship BOOLEAN DEFAULT FALSE,
    application_deadline DATE,
    is_active BOOLEAN DEFAULT TRUE,
    view_count INTEGER DEFAULT 0,
    application_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job applications
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES job_opportunities(id) ON DELETE CASCADE,
    applicant_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('applied', 'reviewing', 'interviewing', 'offered', 'rejected', 'withdrawn')) DEFAULT 'applied',
    cover_letter TEXT,
    resume_url TEXT,
    portfolio_url TEXT,
    expected_salary DECIMAL(10,2),
    available_start_date DATE,
    notes TEXT,
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Career events (webinars, workshops, etc.)
CREATE TABLE career_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT CHECK (event_type IN ('webinar', 'workshop', 'networking', 'career_fair', 'interview_prep')),
    host_id UUID REFERENCES users(id),
    company_id INTEGER REFERENCES companies(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    timezone TEXT DEFAULT 'UTC',
    meeting_link TEXT,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    is_free BOOLEAN DEFAULT TRUE,
    price DECIMAL(8,2),
    currency TEXT DEFAULT 'USD',
    tags TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event registrations
CREATE TABLE event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES career_events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    registration_status TEXT CHECK (registration_status IN ('registered', 'attended', 'no_show', 'cancelled')) DEFAULT 'registered',
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- =====================================================
-- RESOURCES & CONTENT
-- =====================================================

-- Resource categories
CREATE TABLE resource_categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT DEFAULT '#6B7280',
    parent_category_id INTEGER REFERENCES resource_categories(id),
    is_active BOOLEAN DEFAULT TRUE
);

-- Study resources
CREATE TABLE study_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES resource_categories(id),
    resource_type TEXT CHECK (resource_type IN ('document', 'video', 'audio', 'template', 'tool', 'guide')),
    file_url TEXT,
    file_size INTEGER,
    mime_type TEXT,
    duration_minutes INTEGER, -- for videos/audio
    language TEXT DEFAULT 'English',
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    tags TEXT[],
    author_id UUID REFERENCES users(id),
    download_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    total_ratings INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    price DECIMAL(8,2),
    currency TEXT DEFAULT 'USD',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resource downloads/access
CREATE TABLE resource_access (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource_id UUID REFERENCES study_resources(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    access_type TEXT CHECK (access_type IN ('download', 'view', 'purchase')) DEFAULT 'view',
    accessed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resource ratings
CREATE TABLE resource_ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource_id UUID REFERENCES study_resources(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    review TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(resource_id, user_id)
);

-- =====================================================
-- NOTIFICATIONS & MESSAGING
-- =====================================================

-- Notification types
CREATE TABLE notification_types (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    template TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- User notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type_id INTEGER REFERENCES notification_types(id),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB, -- Additional data for the notification
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Direct messages
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject TEXT,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ANALYTICS & TRACKING
-- =====================================================

-- User activity tracking
CREATE TABLE user_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    activity_data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Platform analytics
CREATE TABLE platform_analytics (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    metric_name TEXT NOT NULL,
    metric_value INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(date, metric_name)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_location ON users(location);

-- Universities indexes
CREATE INDEX idx_universities_country ON universities(country_id);
CREATE INDEX idx_universities_city ON universities(city_id);
CREATE INDEX idx_universities_rating ON universities(rating);
CREATE INDEX idx_universities_featured ON universities(is_featured);

-- Applications indexes
CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_university ON applications(university_id);
CREATE INDEX idx_applications_status ON applications(status_id);
CREATE INDEX idx_applications_year ON applications(application_year);

-- Discussions indexes
CREATE INDEX idx_discussions_category ON discussions(category_id);
CREATE INDEX idx_discussions_author ON discussions(author_id);
CREATE INDEX idx_discussions_created ON discussions(created_at);

-- Job opportunities indexes
CREATE INDEX idx_jobs_company ON job_opportunities(company_id);
CREATE INDEX idx_jobs_location ON job_opportunities(location);
CREATE INDEX idx_jobs_type ON job_opportunities(job_type);
CREATE INDEX idx_jobs_sponsorship ON job_opportunities(visa_sponsorship);

-- Resources indexes
CREATE INDEX idx_resources_category ON study_resources(category_id);
CREATE INDEX idx_resources_type ON study_resources(resource_type);
CREATE INDEX idx_resources_rating ON study_resources(rating);

-- =====================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_universities_updated_at BEFORE UPDATE ON universities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentors_updated_at BEFORE UPDATE ON mentors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_opportunities_updated_at BEFORE UPDATE ON job_opportunities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_study_resources_updated_at BEFORE UPDATE ON study_resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- Insert default application statuses
INSERT INTO application_statuses (name, description, color) VALUES
('Draft', 'Application is being prepared', '#6B7280'),
('Submitted', 'Application has been submitted', '#3B82F6'),
('Under Review', 'Application is being reviewed', '#F59E0B'),
('Interview Scheduled', 'Interview has been scheduled', '#8B5CF6'),
('Waitlisted', 'Application is on waitlist', '#F97316'),
('Accepted', 'Application has been accepted', '#10B981'),
('Rejected', 'Application has been rejected', '#EF4444'),
('Withdrawn', 'Application has been withdrawn', '#6B7280');

-- Insert default discussion categories
INSERT INTO discussion_categories (name, description, icon, color) VALUES
('General Discussion', 'General topics about studying abroad', 'message-circle', '#3B82F6'),
('University Applications', 'Questions about university applications', 'graduation-cap', '#10B981'),
('Visa & Immigration', 'Visa and immigration related discussions', 'passport', '#F59E0B'),
('Language Tests', 'IELTS, TOEFL, and other language tests', 'languages', '#8B5CF6'),
('Scholarships', 'Scholarship opportunities and applications', 'award', '#F97316'),
('Career Advice', 'Career guidance and job search', 'briefcase', '#06B6D4'),
('Student Life', 'Life as an international student', 'users', '#84CC16'),
('Technical Support', 'Platform and technical issues', 'settings', '#6B7280');

-- Insert default resource categories
INSERT INTO resource_categories (name, description, icon, color) VALUES
('Language Tests', 'IELTS, TOEFL, and French language resources', 'languages', '#3B82F6'),
('Academic Writing', 'Essay writing, research papers, and academic guides', 'file-text', '#10B981'),
('Application Guides', 'Step-by-step application guides', 'book-open', '#F59E0B'),
('Financial Planning', 'Budgeting, scholarships, and financial aid', 'dollar-sign', '#8B5CF6'),
('Visa & Immigration', 'Visa application guides and requirements', 'passport', '#F97316'),
('Career Development', 'Resume writing, interview prep, and career advice', 'briefcase', '#06B6D4'),
('Study Materials', 'Subject-specific study resources', 'library', '#84CC16'),
('Tools & Calculators', 'Useful tools and calculators', 'calculator', '#6B7280');

-- Insert default notification types
INSERT INTO notification_types (name, description, template) VALUES
('Application Update', 'Updates on application status', 'Your application to {university} has been {status}'),
('New Message', 'New message from another user', 'You have a new message from {sender}'),
('Mentorship Request', 'New mentorship session request', '{student} has requested a mentorship session'),
('Job Opportunity', 'New job opportunity matching your profile', 'New {job_title} position at {company}'),
('Resource Available', 'New study resource available', 'New {resource_type}: {title}'),
('Event Reminder', 'Upcoming event reminder', 'Reminder: {event_title} starts in {time}'),
('Community Activity', 'Activity in your community', '{user} {action} in {discussion}');

-- Insert some sample countries
INSERT INTO countries (name, code, flag_emoji) VALUES
('Canada', 'CA', '🇨🇦'),
('France', 'FR', '🇫🇷'),
('Germany', 'DE', '🇩🇪'),
('United Kingdom', 'GB', '🇬🇧'),
('United States', 'US', '🇺🇸'),
('Australia', 'AU', '🇦🇺'),
('Netherlands', 'NL', '🇳🇱'),
('Sweden', 'SE', '🇸🇪'),
('Switzerland', 'CH', '🇨🇭'),
('Norway', 'NO', '🇳🇴');

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Applications policies
CREATE POLICY "Users can view own applications" ON applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own applications" ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON applications FOR UPDATE USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE users IS 'Main user table extending Supabase auth';
COMMENT ON TABLE universities IS 'Universities and institutions for study abroad';
COMMENT ON TABLE applications IS 'Student applications to universities';
COMMENT ON TABLE mentors IS 'Mentors providing guidance to students';
COMMENT ON TABLE discussions IS 'Community discussions and forums';
COMMENT ON TABLE job_opportunities IS 'Job opportunities for students and graduates';
COMMENT ON TABLE study_resources IS 'Educational resources and study materials';

COMMENT ON COLUMN users.language_proficiency IS 'JSON object containing language test scores';
COMMENT ON COLUMN universities.tuition_range IS 'JSON object with min/max tuition and currency';
COMMENT ON COLUMN applications.budget_range IS 'JSON object with budget constraints';
COMMENT ON COLUMN mentors.availability_schedule IS 'JSON object with weekly availability';
COMMENT ON COLUMN notifications.data IS 'Additional JSON data for notification context';

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

-- This will show in the SQL editor when the script completes successfully
SELECT '🎉 Database schema created successfully! All tables, indexes, and initial data have been set up.' as status;
-- Merge adjustments to align app and existing schema

-- 1) Universities compatibility columns (for app seeding/reads)
alter table public.universities
  add column if not exists country text,
  add column if not exists domain text,
  add column if not exists website text,
  add column if not exists world_ranking int;

-- 2) Upsert helper unique index
create unique index if not exists universities_name_country_unique
on public.universities (name, country);

-- 3) Scholarships, admission requirements, deadlines (if missing)
create table if not exists public.scholarships (
  id bigserial primary key,
  name text not null,
  provider text,
  country text,
  url text,
  description text,
  amount_min numeric,
  amount_max numeric,
  currency text,
  eligibility jsonb,
  deadline date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.university_scholarships (
  id bigserial primary key,
  university_id bigint references public.universities(id) on delete cascade,
  scholarship_id bigint references public.scholarships(id) on delete cascade,
  created_at timestamptz default now(),
  unique(university_id, scholarship_id)
);

create table if not exists public.admission_requirements (
  id bigserial primary key,
  university_id bigint references public.universities(id) on delete cascade,
  level text,
  requirements jsonb,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.application_deadlines (
  id bigserial primary key,
  university_id bigint references public.universities(id) on delete cascade,
  level text,
  intake text,
  deadline date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4) Public read RLS for universities
alter table public.universities enable row level security;
drop policy if exists "Public read universities" on public.universities;
create policy "Public read universities"
on public.universities
for select
to anon, authenticated
using (true);


-- Schema extensions for real-world university data (migrated from supabase/schema_extensions.sql)

-- Scholarships table
create table if not exists public.scholarships (
  id bigserial primary key,
  name text not null,
  provider text,
  country text,
  url text,
  description text,
  amount_min numeric,
  amount_max numeric,
  currency text,
  eligibility jsonb,
  deadline date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Link scholarships to universities (many-to-many)
create table if not exists public.university_scholarships (
  id bigserial primary key,
  university_id bigint references public.universities(id) on delete cascade,
  scholarship_id bigint references public.scholarships(id) on delete cascade,
  created_at timestamptz default now(),
  unique(university_id, scholarship_id)
);

-- Admission requirements per university (structured but flexible)
create table if not exists public.admission_requirements (
  id bigserial primary key,
  university_id bigint references public.universities(id) on delete cascade,
  level text,
  requirements jsonb,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Application deadlines per university and level/intake
create table if not exists public.application_deadlines (
  id bigserial primary key,
  university_id bigint references public.universities(id) on delete cascade,
  level text,
  intake text,
  deadline date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Minimal columns for universities if missing (safe-guards)
alter table public.universities
  add column if not exists country text,
  add column if not exists website text,
  add column if not exists domain text,
  add column if not exists world_ranking int;

-- Helpful indexes
create index if not exists idx_universities_country on public.universities(country);
create index if not exists idx_universities_name on public.universities using gin (to_tsvector('simple', coalesce(name,'')));
create index if not exists idx_scholarships_country on public.scholarships(country);


