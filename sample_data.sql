-- =====================================================
-- SAMPLE DATA FOR ALGERIAN OVERSEAS EDUCATION PLATFORM
-- =====================================================
-- This script adds realistic sample data to make the platform functional

-- =====================================================
-- SAMPLE CITIES
-- =====================================================

INSERT INTO cities (name, country_id) VALUES
-- Canada
('Toronto', 1), ('Montreal', 1), ('Vancouver', 1), ('Ottawa', 1), ('Calgary', 1),
-- France
('Paris', 2), ('Lyon', 2), ('Marseille', 2), ('Toulouse', 2), ('Bordeaux', 2),
-- Germany
('Berlin', 3), ('Munich', 3), ('Hamburg', 3), ('Frankfurt', 3), ('Cologne', 3),
-- UK
('London', 4), ('Manchester', 4), ('Birmingham', 4), ('Edinburgh', 4), ('Liverpool', 4),
-- USA
('New York', 5), ('Los Angeles', 5), ('Chicago', 5), ('Boston', 5), ('San Francisco', 5),
-- Australia
('Sydney', 6), ('Melbourne', 6), ('Brisbane', 6), ('Perth', 6), ('Adelaide', 6),
-- Netherlands
('Amsterdam', 7), ('Rotterdam', 7), ('The Hague', 7), ('Utrecht', 7), ('Eindhoven', 7),
-- Sweden
('Stockholm', 8), ('Gothenburg', 8), ('Malmö', 8), ('Uppsala', 8), ('Linköping', 8),
-- Switzerland
('Zurich', 9), ('Geneva', 9), ('Basel', 9), ('Bern', 9), ('Lausanne', 9),
-- Norway
('Oslo', 10), ('Bergen', 10), ('Trondheim', 10), ('Stavanger', 10), ('Tromsø', 10);

-- =====================================================
-- SAMPLE UNIVERSITIES
-- =====================================================

INSERT INTO universities (name, slug, country_id, city_id, website, description, founded_year, student_population, international_student_percentage, world_ranking, acceptance_rate, tuition_range, living_costs, language_requirements, application_deadlines, scholarships_available, visa_support, rating, is_featured) VALUES
-- Canada
('University of Toronto', 'university-of-toronto', 1, 1, 'https://www.utoronto.ca', 'Canada''s leading university, known for research and innovation', 1827, 95000, 25.5, 18, 43.0, '{"min": 45000, "max": 55000, "currency": "CAD"}', '{"monthly": 1500, "currency": "CAD"}', '{"ielts_min": 6.5, "toefl_min": 100}', '{"fall": "2024-01-15", "spring": "2024-09-01"}', true, true, 4.8, true),
('McGill University', 'mcgill-university', 1, 2, 'https://www.mcgill.ca', 'Renowned for medical research and international diversity', 1821, 40000, 30.2, 27, 46.3, '{"min": 42000, "max": 52000, "currency": "CAD"}', '{"monthly": 1400, "currency": "CAD"}', '{"ielts_min": 6.5, "toefl_min": 90}', '{"fall": "2024-01-15", "spring": "2024-09-01"}', true, true, 4.7, true),
('University of British Columbia', 'university-of-british-columbia', 1, 3, 'https://www.ubc.ca', 'Leading research university with stunning campus', 1908, 66000, 28.7, 34, 52.4, '{"min": 40000, "max": 50000, "currency": "CAD"}', '{"monthly": 1600, "currency": "CAD"}', '{"ielts_min": 6.5, "toefl_min": 90}', '{"fall": "2024-01-15", "spring": "2024-09-01"}', true, true, 4.6, true),

-- France
('Sorbonne University', 'sorbonne-university', 2, 6, 'https://www.sorbonne-universite.fr', 'Historic university with world-class humanities and sciences', 1257, 55000, 20.1, 43, 15.8, '{"min": 200, "max": 400, "currency": "EUR"}', '{"monthly": 1200, "currency": "EUR"}', '{"french_min": "B2", "ielts_min": 6.0}', '{"fall": "2024-04-15", "spring": "2024-10-15"}', true, true, 4.5, true),
('École Normale Supérieure', 'ecole-normale-superieure', 2, 6, 'https://www.ens.fr', 'Elite institution for research and teaching', 1794, 2400, 25.0, 99, 8.5, '{"min": 200, "max": 400, "currency": "EUR"}', '{"monthly": 1300, "currency": "EUR"}', '{"french_min": "C1", "ielts_min": 7.0}', '{"fall": "2024-03-01", "spring": "2024-09-01"}', true, true, 4.9, true),
('Sciences Po Paris', 'sciences-po-paris', 2, 6, 'https://www.sciencespo.fr', 'Leading institution for political science and international relations', 1872, 14000, 47.0, 242, 12.3, '{"min": 10000, "max": 15000, "currency": "EUR"}', '{"monthly": 1400, "currency": "EUR"}', '{"french_min": "B2", "ielts_min": 6.5}', '{"fall": "2024-02-01", "spring": "2024-08-01"}', true, true, 4.4, true),

-- Germany
('Technical University of Munich', 'technical-university-munich', 3, 12, 'https://www.tum.de', 'Excellence in engineering and technology', 1868, 42000, 24.8, 37, 8.9, '{"min": 0, "max": 300, "currency": "EUR"}', '{"monthly": 1000, "currency": "EUR"}', '{"german_min": "B2", "ielts_min": 6.5}', '{"fall": "2024-07-15", "spring": "2024-01-15"}', true, true, 4.6, true),
('Ludwig Maximilian University of Munich', 'lmu-munich', 3, 12, 'https://www.lmu.de', 'Comprehensive research university with rich history', 1472, 52000, 17.2, 59, 10.1, '{"min": 0, "max": 300, "currency": "EUR"}', '{"monthly": 1100, "currency": "EUR"}', '{"german_min": "B2", "ielts_min": 6.5}', '{"fall": "2024-07-15", "spring": "2024-01-15"}', true, true, 4.5, true),
('Heidelberg University', 'heidelberg-university', 3, 15, 'https://www.uni-heidelberg.de', 'Germany''s oldest university with strong research focus', 1386, 31000, 20.5, 66, 15.7, '{"min": 0, "max": 300, "currency": "EUR"}', '{"monthly": 950, "currency": "EUR"}', '{"german_min": "B2", "ielts_min": 6.5}', '{"fall": "2024-07-15", "spring": "2024-01-15"}', true, true, 4.4, true),

-- UK
('University of Oxford', 'university-of-oxford', 4, 16, 'https://www.ox.ac.uk', 'World''s oldest English-speaking university', 1096, 24000, 42.0, 1, 17.5, '{"min": 25000, "max": 45000, "currency": "GBP"}', '{"monthly": 1200, "currency": "GBP"}', '{"ielts_min": 7.0, "toefl_min": 110}', '{"fall": "2024-10-15", "spring": "2024-01-15"}', true, true, 4.9, true),
('University of Cambridge', 'university-of-cambridge', 4, 16, 'https://www.cam.ac.uk', 'Historic university with exceptional research output', 1209, 23000, 40.8, 3, 21.0, '{"min": 25000, "max": 45000, "currency": "GBP"}', '{"monthly": 1200, "currency": "GBP"}', '{"ielts_min": 7.0, "toefl_min": 110}', '{"fall": "2024-10-15", "spring": "2024-01-15"}', true, true, 4.9, true),
('Imperial College London', 'imperial-college-london', 4, 16, 'https://www.imperial.ac.uk', 'Leading science, engineering, and medicine institution', 1907, 20000, 58.0, 6, 14.0, '{"min": 30000, "max": 50000, "currency": "GBP"}', '{"monthly": 1500, "currency": "GBP"}', '{"ielts_min": 6.5, "toefl_min": 92}', '{"fall": "2024-10-15", "spring": "2024-01-15"}', true, true, 4.7, true),

-- USA
('Massachusetts Institute of Technology', 'mit', 5, 24, 'https://www.mit.edu', 'Global leader in science and technology', 1861, 11500, 42.0, 2, 7.3, '{"min": 50000, "max": 60000, "currency": "USD"}', '{"monthly": 2000, "currency": "USD"}', '{"ielts_min": 7.0, "toefl_min": 100}', '{"fall": "2024-01-01", "spring": "2024-09-01"}', true, true, 4.9, true),
('Stanford University', 'stanford-university', 5, 28, 'https://www.stanford.edu', 'Innovation hub in Silicon Valley', 1885, 17000, 24.0, 4, 4.3, '{"min": 50000, "max": 60000, "currency": "USD"}', '{"monthly": 2200, "currency": "USD"}', '{"ielts_min": 7.0, "toefl_min": 100}', '{"fall": "2024-01-01", "spring": "2024-09-01"}', true, true, 4.8, true),
('Harvard University', 'harvard-university', 5, 24, 'https://www.harvard.edu', 'America''s oldest institution of higher learning', 1636, 31000, 23.0, 5, 4.6, '{"min": 50000, "max": 60000, "currency": "USD"}', '{"monthly": 2000, "currency": "USD"}', '{"ielts_min": 7.0, "toefl_min": 100}', '{"fall": "2024-01-01", "spring": "2024-09-01"}', true, true, 4.9, true),

-- Australia
('University of Melbourne', 'university-of-melbourne', 6, 27, 'https://www.unimelb.edu.au', 'Australia''s leading research university', 1853, 48000, 42.0, 33, 70.0, '{"min": 35000, "max": 45000, "currency": "AUD"}', '{"monthly": 1800, "currency": "AUD"}', '{"ielts_min": 6.5, "toefl_min": 79}', '{"fall": "2024-05-31", "spring": "2024-10-31"}', true, true, 4.6, true),
('University of Sydney', 'university-of-sydney', 6, 26, 'https://www.sydney.edu.au', 'Australia''s first university with global reputation', 1850, 73000, 43.0, 41, 70.0, '{"min": 35000, "max": 45000, "currency": "AUD"}', '{"monthly": 1800, "currency": "AUD"}', '{"ielts_min": 6.5, "toefl_min": 85}', '{"fall": "2024-05-31", "spring": "2024-10-31"}', true, true, 4.5, true),
('Australian National University', 'anu', 6, 26, 'https://www.anu.edu.au', 'National university with research excellence', 1946, 20000, 35.0, 30, 35.0, '{"min": 35000, "max": 45000, "currency": "AUD"}', '{"monthly": 1600, "currency": "AUD"}', '{"ielts_min": 6.5, "toefl_min": 80}', '{"fall": "2024-05-31", "spring": "2024-10-31"}', true, true, 4.7, true);

-- =====================================================
-- SAMPLE UNIVERSITY PROGRAMS
-- =====================================================

INSERT INTO university_programs (university_id, name, level, field_of_study, duration_months, tuition_fee, currency, language_of_instruction, application_deadline, start_date, requirements, description) VALUES
-- Computer Science Programs
(1, 'Master of Computer Science', 'Master', 'Computer Science', 24, 45000, 'CAD', ARRAY['English'], '2024-01-15', '2024-09-01', 'Bachelor in CS or related field, GPA 3.5+, GRE scores', 'Advanced program in computer science with research focus'),
(1, 'Bachelor of Computer Science', 'Bachelor', 'Computer Science', 48, 42000, 'CAD', ARRAY['English'], '2024-01-15', '2024-09-01', 'High school diploma, strong math background', 'Comprehensive undergraduate program in computer science'),
(4, 'Master in Computer Science', 'Master', 'Computer Science', 24, 300, 'EUR', ARRAY['French', 'English'], '2024-04-15', '2024-09-01', 'Bachelor degree, French B2 level', 'Research-oriented master program in computer science'),

-- Engineering Programs
(7, 'Master of Science in Engineering', 'Master', 'Engineering', 24, 0, 'EUR', ARRAY['German', 'English'], '2024-07-15', '2024-10-01', 'Bachelor in engineering, German B2 level', 'Advanced engineering program with industry focus'),
(10, 'Master of Engineering', 'Master', 'Engineering', 24, 35000, 'GBP', ARRAY['English'], '2024-10-15', '2024-10-01', 'Bachelor in engineering, strong academic record', 'World-class engineering education at Oxford'),

-- Business Programs
(6, 'Master in International Business', 'Master', 'Business Administration', 18, 12000, 'EUR', ARRAY['French', 'English'], '2024-02-01', '2024-09-01', 'Bachelor degree, French B2, work experience', 'International business program with global perspective'),
(13, 'Master of Business Administration', 'Master', 'Business Administration', 24, 55000, 'USD', ARRAY['English'], '2024-01-01', '2024-09-01', 'Bachelor degree, GMAT scores, work experience', 'Elite MBA program at MIT Sloan'),

-- Medical Programs
(2, 'Doctor of Medicine', 'Master', 'Medicine', 60, 45000, 'CAD', ARRAY['English'], '2024-01-15', '2024-09-01', 'Bachelor degree, MCAT scores, interviews', 'Medical program with clinical training'),
(11, 'Bachelor of Medicine', 'Bachelor', 'Medicine', 72, 35000, 'GBP', ARRAY['English'], '2024-10-15', '2024-10-01', 'A-levels in sciences, BMAT scores', 'Traditional medical education at Cambridge'),

-- Arts and Humanities
(5, 'Master in Political Science', 'Master', 'Political Science', 24, 10000, 'EUR', ARRAY['French', 'English'], '2024-02-01', '2024-09-01', 'Bachelor degree, French B2, motivation letter', 'Political science with international relations focus'),
(4, 'Master in Literature', 'Master', 'Literature', 24, 300, 'EUR', ARRAY['French'], '2024-04-15', '2024-09-01', 'Bachelor in literature, French C1 level', 'Advanced studies in French and comparative literature');

-- =====================================================
-- SAMPLE USERS (for testing)
-- =====================================================

INSERT INTO users (email, full_name, location, current_education_level, field_of_study, graduation_year, gpa, language_proficiency, is_verified) VALUES
('ahmed.benali@email.com', 'Ahmed Benali', 'Algiers, Algeria', 'Bachelor', 'Computer Science', 2024, 3.8, '{"ielts": 7.5, "toefl": 105, "french": "B2"}', true),
('fatima.meziane@email.com', 'Fatima Meziane', 'Oran, Algeria', 'Master', 'Engineering', 2023, 3.9, '{"ielts": 7.0, "toefl": 95, "french": "C1"}', true),
('karim.toumi@email.com', 'Karim Toumi', 'Constantine, Algeria', 'High School', 'Mathematics', 2025, 3.7, '{"ielts": 6.5, "toefl": 85, "french": "B1"}', false),
('sara.bouazza@email.com', 'Sara Bouazza', 'Annaba, Algeria', 'Bachelor', 'Business Administration', 2024, 3.6, '{"ielts": 7.0, "toefl": 90, "french": "B2"}', true),
('youssef.hamidi@email.com', 'Youssef Hamidi', 'Tlemcen, Algeria', 'Master', 'Medicine', 2023, 3.8, '{"ielts": 7.5, "toefl": 100, "french": "C1"}', true);

-- =====================================================
-- SAMPLE MENTORS
-- =====================================================

INSERT INTO mentors (user_id, university, field_of_study, current_position, years_of_experience, hourly_rate, currency, availability_schedule, specialties, languages, rating, total_sessions, total_students, is_verified) VALUES
(1, 'University of Toronto', 'Computer Science', 'Software Engineer at Google', 5, 50.00, 'USD', '{"monday": ["18:00-20:00"], "wednesday": ["18:00-20:00"], "saturday": ["10:00-14:00"]}', ARRAY['Application Strategy', 'Technical Interviews', 'Resume Review'], ARRAY['English', 'Arabic', 'French'], 4.8, 45, 12, true),
(2, 'McGill University', 'Engineering', 'Senior Engineer at Tesla', 8, 60.00, 'USD', '{"tuesday": ["19:00-21:00"], "thursday": ["19:00-21:00"], "sunday": ["14:00-18:00"]}', ARRAY['Engineering Applications', 'Research Proposals', 'Career Guidance'], ARRAY['English', 'Arabic', 'French'], 4.9, 67, 18, true),
(5, 'Harvard University', 'Medicine', 'Resident Physician', 3, 40.00, 'USD', '{"friday": ["20:00-22:00"], "saturday": ["15:00-19:00"]}', ARRAY['Medical School Applications', 'MCAT Preparation', 'Interview Coaching'], ARRAY['English', 'Arabic'], 4.7, 34, 9, true);

-- =====================================================
-- SAMPLE STUDY RESOURCES
-- =====================================================

INSERT INTO study_resources (title, description, category_id, resource_type, language, difficulty_level, tags, author_id, download_count, view_count, rating, total_ratings, is_featured) VALUES
('Complete IELTS Preparation Guide', 'Comprehensive guide covering all IELTS sections with practice tests and strategies', 1, 'document', 'English', 'intermediate', ARRAY['IELTS', 'English', 'Language Test'], 1, 156, 890, 4.7, 45, true),
('University Application Essay Templates', 'Professional templates for personal statements and motivation letters', 3, 'template', 'English', 'beginner', ARRAY['Application', 'Essay', 'Template'], 2, 234, 1200, 4.8, 67, true),
('French Language Test Preparation', 'Complete guide for DELF/DALF French proficiency tests', 1, 'document', 'French', 'intermediate', ARRAY['French', 'DELF', 'DALF'], 3, 89, 456, 4.5, 23, true),
('Scholarship Application Guide', 'Step-by-step guide to finding and applying for scholarships', 4, 'guide', 'English', 'beginner', ARRAY['Scholarship', 'Financial Aid', 'Funding'], 4, 178, 678, 4.6, 34, true),
('Visa Application Checklist', 'Comprehensive checklist for student visa applications', 5, 'tool', 'English', 'beginner', ARRAY['Visa', 'Immigration', 'Checklist'], 5, 267, 1100, 4.9, 78, true),
('Resume Writing for International Students', 'Professional resume templates and writing tips', 6, 'template', 'English', 'intermediate', ARRAY['Resume', 'CV', 'Career'], 1, 145, 567, 4.4, 29, true),
('Academic Writing Style Guide', 'Guide to academic writing standards for international students', 2, 'guide', 'English', 'advanced', ARRAY['Academic Writing', 'Research', 'Papers'], 2, 98, 345, 4.3, 19, true),
('Budget Calculator for International Students', 'Interactive tool to calculate living costs and budget planning', 4, 'tool', 'English', 'beginner', ARRAY['Budget', 'Calculator', 'Financial Planning'], 3, 123, 456, 4.7, 41, true);

-- =====================================================
-- SAMPLE DISCUSSIONS
-- =====================================================

INSERT INTO discussions (author_id, category_id, title, content, tags, view_count, reply_count, like_count) VALUES
(1, 2, 'Best universities for Computer Science in Canada?', 'I''m planning to apply for a Master''s in Computer Science in Canada. Which universities would you recommend? I have a 3.8 GPA and 7.5 IELTS score.', ARRAY['Canada', 'Computer Science', 'Masters'], 156, 8, 12),
(2, 3, 'Student visa requirements for France', 'What documents do I need for a French student visa? I''m Algerian and planning to study at Sorbonne University.', ARRAY['France', 'Visa', 'Sorbonne'], 234, 15, 18),
(3, 1, 'IELTS vs TOEFL for US universities', 'Which test should I take for US universities? I''m more comfortable with British English but want to maximize my chances.', ARRAY['IELTS', 'TOEFL', 'USA'], 189, 12, 9),
(4, 5, 'Scholarship opportunities for Algerian students', 'Are there any specific scholarships available for Algerian students studying abroad? Looking for funding options.', ARRAY['Scholarship', 'Algeria', 'Funding'], 312, 20, 25),
(5, 6, 'Medical school application timeline', 'When should I start preparing for medical school applications? I''m currently in my final year of high school.', ARRAY['Medicine', 'Application', 'Timeline'], 145, 7, 11);

-- =====================================================
-- SAMPLE COMPANIES
-- =====================================================

INSERT INTO companies (name, slug, description, website, industry, company_size, founded_year, headquarters, is_sponsor) VALUES
('Google', 'google', 'Global technology company specializing in internet services', 'https://www.google.com', 'Technology', 'enterprise', 1998, 'Mountain View, CA', true),
('Microsoft', 'microsoft', 'Leading software and cloud services company', 'https://www.microsoft.com', 'Technology', 'enterprise', 1975, 'Redmond, WA', true),
('Tesla', 'tesla', 'Electric vehicle and clean energy company', 'https://www.tesla.com', 'Automotive', 'large', 2003, 'Austin, TX', true),
('Amazon', 'amazon', 'E-commerce and cloud computing giant', 'https://www.amazon.com', 'Technology', 'enterprise', 1994, 'Seattle, WA', true),
('Apple', 'apple', 'Consumer electronics and software company', 'https://www.apple.com', 'Technology', 'enterprise', 1976, 'Cupertino, CA', true);

-- =====================================================
-- SAMPLE JOB OPPORTUNITIES
-- =====================================================

INSERT INTO job_opportunities (company_id, title, description, requirements, job_type, experience_level, location, remote_work, salary_min, salary_max, currency, benefits, skills_required, languages_required, visa_sponsorship) VALUES
(1, 'Software Engineer', 'Join our team to build innovative software solutions', 'Bachelor in CS, 2+ years experience, Python/Java', 'full_time', 'mid', 'Mountain View, CA', false, 120000, 180000, 'USD', ARRAY['Health Insurance', '401k', 'Stock Options'], ARRAY['Python', 'Java', 'JavaScript'], ARRAY['English'], true),
(2, 'Data Scientist', 'Work on cutting-edge machine learning projects', 'Master in CS/Statistics, Python, SQL, ML frameworks', 'full_time', 'senior', 'Redmond, WA', true, 140000, 200000, 'USD', ARRAY['Health Insurance', '401k', 'Remote Work'], ARRAY['Python', 'SQL', 'Machine Learning'], ARRAY['English'], true),
(3, 'Mechanical Engineer', 'Design next-generation electric vehicles', 'Bachelor in Mechanical Engineering, CAD experience', 'full_time', 'junior', 'Fremont, CA', false, 80000, 120000, 'USD', ARRAY['Health Insurance', 'Stock Options'], ARRAY['CAD', 'SolidWorks', 'Engineering'], ARRAY['English'], true),
(4, 'Product Manager', 'Lead product development for cloud services', 'MBA or technical degree, 5+ years PM experience', 'full_time', 'senior', 'Seattle, WA', true, 150000, 220000, 'USD', ARRAY['Health Insurance', '401k', 'Stock Options'], ARRAY['Product Management', 'Agile', 'Cloud'], ARRAY['English'], true),
(5, 'iOS Developer', 'Build amazing iOS applications', 'Bachelor in CS, Swift, iOS development experience', 'full_time', 'mid', 'Cupertino, CA', false, 130000, 190000, 'USD', ARRAY['Health Insurance', '401k', 'Stock Options'], ARRAY['Swift', 'iOS', 'Objective-C'], ARRAY['English'], true);

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

SELECT '🎉 Sample data loaded successfully! Your platform now has:' as status;
SELECT '📊 ' || COUNT(*) || ' universities' as universities_count FROM universities;
SELECT '👥 ' || COUNT(*) || ' users' as users_count FROM users;
SELECT '🎓 ' || COUNT(*) || ' programs' as programs_count FROM university_programs;
SELECT '📚 ' || COUNT(*) || ' resources' as resources_count FROM study_resources;
SELECT '💬 ' || COUNT(*) || ' discussions' as discussions_count FROM discussions;
SELECT '💼 ' || COUNT(*) || ' job opportunities' as jobs_count FROM job_opportunities;
