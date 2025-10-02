-- Add onboarding fields to clients table
ALTER TABLE clients
ADD COLUMN IF NOT EXISTS target_job_title text,
ADD COLUMN IF NOT EXISTS experience_level text CHECK (experience_level IN ('entry', 'mid', 'senior')),
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS onboarding_completed_at timestamptz;

-- Update existing clients to mark onboarding as incomplete
UPDATE clients SET onboarding_completed = false WHERE onboarding_completed IS NULL;
