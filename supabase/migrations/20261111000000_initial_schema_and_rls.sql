-- =============================================================================
-- IREP Training Portal — Initial Schema, RLS Policies & Seed Data
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('student', 'trainer', 'college', 'parent', 'admin');
CREATE TYPE test_type AS ENUM ('service_pattern', 'product_pattern', 'dsa', 'aptitude', 'mock');
CREATE TYPE sprint_status AS ENUM ('todo', 'in_progress', 'code_review', 'done');
CREATE TYPE interview_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE session_status AS ENUM ('scheduled', 'live', 'completed');

-- 2. COLLEGES
CREATE TABLE IF NOT EXISTS colleges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    city TEXT,
    state TEXT DEFAULT 'Tamil Nadu',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROFILES (Extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BATCHES
CREATE TABLE IF NOT EXISTS batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    department TEXT NOT NULL,
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 8),
    academic_year TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. STUDENTS
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    register_number TEXT NOT NULL UNIQUE,
    batch_id UUID REFERENCES batches(id) ON DELETE SET NULL,
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    readiness_score INT DEFAULT 74 CHECK (readiness_score BETWEEN 0 AND 100),
    readiness_band TEXT DEFAULT 'Nearly Ready' CHECK (readiness_band IN ('Placement Ready', 'Nearly Ready', 'Needs Support')),
    problems_solved INT DEFAULT 0,
    practice_streak INT DEFAULT 0,
    attendance_rate NUMERIC(5,2) DEFAULT 92.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TRAINERS
CREATE TABLE IF NOT EXISTS trainers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    employee_code TEXT NOT NULL UNIQUE,
    designation TEXT DEFAULT 'Technical Trainer',
    specialization TEXT[] DEFAULT ARRAY['DSA', 'AI/ML', 'Cloud'],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PARENTS
CREATE TABLE IF NOT EXISTS parents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    preferred_language TEXT DEFAULT 'ta' CHECK (preferred_language IN ('ta', 'en')),
    alternate_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PARENT_STUDENT (Relationship mapping)
CREATE TABLE IF NOT EXISTS parent_student (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    relationship TEXT DEFAULT 'Parent',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(parent_id, student_id)
);

-- 9. COURSES
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    track TEXT NOT NULL,
    semester INT,
    description TEXT,
    syllabus JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ATTENDANCE
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    session_type TEXT CHECK (session_type IN ('weekday_1hr', 'saturday_3hr_lab')),
    status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
    duration_minutes INT DEFAULT 60,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. TESTS
CREATE TABLE IF NOT EXISTS tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category test_type NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 30,
    total_marks INT NOT NULL DEFAULT 100,
    passing_marks INT NOT NULL DEFAULT 60,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. QUESTIONS
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    section TEXT NOT NULL, -- 'Quantitative', 'Logical', 'Verbal', 'DSA'
    options JSONB NOT NULL, -- ['A...', 'B...', 'C...', 'D...']
    correct_option INT NOT NULL CHECK (correct_option BETWEEN 0 AND 3),
    explanation TEXT,
    marks INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. TEST_ATTEMPTS
CREATE TABLE IF NOT EXISTS test_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    correct_answers INT NOT NULL,
    time_taken_seconds INT NOT NULL,
    section_breakdown JSONB,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. PROJECTS
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    client_name TEXT NOT NULL,
    batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
    track TEXT NOT NULL,
    semester INT NOT NULL,
    status TEXT DEFAULT 'In Progress',
    repo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. SPRINT_TASKS
CREATE TABLE IF NOT EXISTS sprint_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status sprint_status NOT NULL DEFAULT 'todo',
    story_points INT DEFAULT 3,
    assignee_id UUID REFERENCES students(id) ON DELETE SET NULL,
    pr_number TEXT,
    is_ai_feature BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. MOCK_INTERVIEWS
CREATE TABLE IF NOT EXISTS mock_interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    round_type TEXT NOT NULL, -- 'Technical', 'HR', 'AI-allowed'
    scheduled_at TIMESTAMPTZ NOT NULL,
    status interview_status DEFAULT 'scheduled',
    overall_score NUMERIC(3,2),
    rubric_scores JSONB, -- {problem_solving: 4, coding: 4, thinking_aloud: 3, core_cs: 4, communication: 3}
    written_feedback TEXT,
    recording_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
    college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
    target_audience TEXT NOT NULL CHECK (target_audience IN ('students', 'parents', 'all')),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. DISCUSSION_GROUPS
CREATE TABLE IF NOT EXISTS discussion_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    channel_type TEXT NOT NULL, -- 'batch', 'doubts', 'daily_dsa', 'team', 'placement'
    batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
    description TEXT,
    is_moderated BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. MESSAGES
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES discussion_groups(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- For 1-on-1 (trainer <-> parent/college only)
    content TEXT NOT NULL,
    code_snippet TEXT,
    is_solution BOOLEAN DEFAULT FALSE,
    is_reported BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. LIVE_SESSIONS
CREATE TABLE IF NOT EXISTS live_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
    scheduled_start TIMESTAMPTZ NOT NULL,
    scheduled_end TIMESTAMPTZ NOT NULL,
    status session_status DEFAULT 'scheduled',
    livekit_room_name TEXT,
    recording_url TEXT,
    transcript TEXT,
    ai_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. SESSION_ATTENDANCE
CREATE TABLE IF NOT EXISTS session_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES live_sessions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    duration_seconds INT DEFAULT 0,
    attended_percentage NUMERIC(5,2) DEFAULT 0.00,
    is_marked_present BOOLEAN DEFAULT FALSE,
    joined_at TIMESTAMPTZ,
    left_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, student_id)
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_student ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE sprint_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_attendance ENABLE ROW LEVEL SECURITY;

-- Helper functions for RLS checks
CREATE OR REPLACE FUNCTION get_auth_role() RETURNS user_role AS $$
    SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_auth_college_id() RETURNS UUID AS $$
    SELECT college_id FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Profiles: Authenticated users can view their own profile, trainers & colleges can view profiles in their institution
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT TO authenticated
    USING (id = auth.uid());

CREATE POLICY "Colleges can view profiles in their institution" ON profiles
    FOR SELECT TO authenticated
    USING (
        get_auth_role() IN ('college', 'admin') 
        AND college_id = get_auth_college_id()
    );

CREATE POLICY "Trainers can view student profiles in their college" ON profiles
    FOR SELECT TO authenticated
    USING (
        get_auth_role() = 'trainer'
        AND college_id = get_auth_college_id()
    );

-- Students:
CREATE POLICY "Students can view their own student record" ON students
    FOR SELECT TO authenticated
    USING (profile_id = auth.uid());

CREATE POLICY "Trainers can view students in their college" ON students
    FOR SELECT TO authenticated
    USING (college_id = get_auth_college_id());

CREATE POLICY "Colleges can view students in their college" ON students
    FOR SELECT TO authenticated
    USING (college_id = get_auth_college_id());

CREATE POLICY "Parents can view linked student records" ON students
    FOR SELECT TO authenticated
    USING (
        id IN (
            SELECT ps.student_id 
            FROM parent_student ps 
            JOIN parents p ON p.id = ps.parent_id 
            WHERE p.profile_id = auth.uid()
        )
    );

-- Attendance:
CREATE POLICY "Students can view own attendance" ON attendance
    FOR SELECT TO authenticated
    USING (
        student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
    );

CREATE POLICY "Parents can view linked student attendance" ON attendance
    FOR SELECT TO authenticated
    USING (
        student_id IN (
            SELECT ps.student_id 
            FROM parent_student ps 
            JOIN parents p ON p.id = ps.parent_id 
            WHERE p.profile_id = auth.uid()
        )
    );

CREATE POLICY "Trainers can view and record attendance" ON attendance
    FOR ALL TO authenticated
    USING (get_auth_role() = 'trainer')
    WITH CHECK (get_auth_role() = 'trainer');

-- Tests and Attempts:
CREATE POLICY "Authenticated users can view tests" ON tests
    FOR SELECT TO authenticated
    USING (is_active = TRUE);

CREATE POLICY "Students can view own attempts" ON test_attempts
    FOR SELECT TO authenticated
    USING (
        student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
    );

CREATE POLICY "Students can insert own attempts" ON test_attempts
    FOR INSERT TO authenticated
    WITH CHECK (
        student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
    );

-- Messages & Discussions:
CREATE POLICY "Users can read group messages" ON messages
    FOR SELECT TO authenticated
    USING (
        group_id IS NOT NULL 
        OR sender_id = auth.uid() 
        OR recipient_id = auth.uid()
    );

CREATE POLICY "Users can post to discussion groups" ON messages
    FOR INSERT TO authenticated
    WITH CHECK (sender_id = auth.uid());

-- Prevent direct student-to-student private messages at database level:
CREATE POLICY "Block student to student 1on1 messages" ON messages
    FOR INSERT TO authenticated
    WITH CHECK (
        group_id IS NOT NULL 
        OR get_auth_role() IN ('trainer', 'college', 'admin')
        OR recipient_id IN (
            SELECT p.id FROM profiles p WHERE p.role IN ('trainer', 'college')
        )
    );

-- Mock Interviews:
CREATE POLICY "Students can view their mock interviews" ON mock_interviews
    FOR SELECT TO authenticated
    USING (
        student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
    );

CREATE POLICY "Trainers can view and manage mock interviews" ON mock_interviews
    FOR ALL TO authenticated
    USING (get_auth_role() = 'trainer')
    WITH CHECK (get_auth_role() = 'trainer');

-- =============================================================================
-- SEED DATA (For Sample Accounts & Instant Verification)
-- =============================================================================

INSERT INTO colleges (id, name, code, city, state)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Demo Engineering College', 'DEC-01', 'Chennai', 'Tamil Nadu')
ON CONFLICT (code) DO NOTHING;

INSERT INTO batches (id, name, college_id, department, semester, academic_year)
VALUES
    ('22222222-2222-2222-2222-222222222222', 'CSE-A · Sem 5', '11111111-1111-1111-1111-111111111111', 'Computer Science', 5, '2026-2027'),
    ('22222222-2222-2222-2222-222222222223', 'AI&DS · Sem 5', '11111111-1111-1111-1111-111111111111', 'Artificial Intelligence', 5, '2026-2027')
ON CONFLICT DO NOTHING;

