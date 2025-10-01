-- Career Platform Database Schema
-- Based on booking-app patterns, adapted for career coaching

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- CLIENTS TABLE (Job Seekers)
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  phone text,
  timezone text DEFAULT 'America/New_York',
  profile_status text DEFAULT 'incomplete' CHECK (profile_status IN ('incomplete', 'active', 'paused')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- COACHES TABLE (Similar to booking-app users)
CREATE TABLE IF NOT EXISTS coaches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  timezone text DEFAULT 'America/New_York',
  role text DEFAULT 'coach' CHECK (role IN ('admin', 'coach', 'employee')),
  google_calendar_connected boolean DEFAULT false,
  google_access_token text,
  google_refresh_token text,
  google_token_expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- APPLICATIONS TABLE (Core client workflow)
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  job_title text NOT NULL,
  job_url text,
  status text DEFAULT 'applied' CHECK (status IN ('applied', 'interviewing', 'offer', 'rejected', 'accepted')),
  applied_date timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RESUMES TABLE (Document management)
CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  version_name text NOT NULL,
  file_url text NOT NULL,
  ai_feedback_requested boolean DEFAULT false,
  ai_feedback_status text DEFAULT 'pending' CHECK (ai_feedback_status IN ('pending', 'processing', 'complete')),
  ai_feedback_result jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- INTERVIEW TYPES (Like booking_types)
CREATE TABLE IF NOT EXISTS interview_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  duration integer NOT NULL, -- minutes
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- INTERVIEWS TABLE (Booking-app pattern)
CREATE TABLE IF NOT EXISTS interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE SET NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  coach_id uuid REFERENCES coaches(id),
  interview_type_id uuid REFERENCES interview_types(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  meeting_url text,
  meeting_id text,
  google_calendar_event_id text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- COACH AVAILABILITY (Like availability table)
CREATE TABLE IF NOT EXISTS coach_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id uuid REFERENCES coaches(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(coach_id, day_of_week)
);

-- FEEDBACK TABLE (AI + Coach feedback)
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  feedback_type text NOT NULL CHECK (feedback_type IN ('resume', 'interview', 'application')),
  reference_id uuid,
  provider text CHECK (provider IN ('ai', 'coach')),
  coach_id uuid REFERENCES coaches(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_clients_clerk_id ON clients(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_coaches_clerk_id ON coaches(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_coaches_email ON coaches(email);
CREATE INDEX IF NOT EXISTS idx_applications_client_id ON applications(client_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);
CREATE INDEX IF NOT EXISTS idx_interviews_client_id ON interviews(client_id);
CREATE INDEX IF NOT EXISTS idx_interviews_coach_id ON interviews(coach_id);
CREATE INDEX IF NOT EXISTS idx_interviews_start_time ON interviews(start_time);
CREATE INDEX IF NOT EXISTS idx_interviews_status ON interviews(status);
CREATE INDEX IF NOT EXISTS idx_resumes_client_id ON resumes(client_id);
CREATE INDEX IF NOT EXISTS idx_feedback_client_id ON feedback(client_id);
CREATE INDEX IF NOT EXISTS idx_coach_availability_coach_id ON coach_availability(coach_id);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coaches_updated_at BEFORE UPDATE ON coaches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON resumes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_interview_types_updated_at BEFORE UPDATE ON interview_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_interviews_updated_at BEFORE UPDATE ON interviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coach_availability_updated_at BEFORE UPDATE ON coach_availability FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Insert default interview types
INSERT INTO interview_types (name, duration, description, is_active) VALUES
  ('Resume Review', 30, 'Quick review and feedback on resume', true),
  ('Mock Interview', 60, 'Full mock interview session', true),
  ('Career Consultation', 45, 'Career strategy and planning', true),
  ('Interview Prep', 30, 'Preparation for upcoming interview', true)
ON CONFLICT DO NOTHING;
