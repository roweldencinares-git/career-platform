import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types based on database schema
export interface Client {
  id: string
  clerk_user_id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  timezone: string
  profile_status: 'incomplete' | 'active' | 'paused'
  created_at: string
  updated_at: string
}

export interface Coach {
  id: string
  clerk_user_id: string
  email: string
  first_name: string | null
  last_name: string | null
  timezone: string
  role: 'admin' | 'coach' | 'employee'
  google_calendar_connected: boolean
  google_access_token: string | null
  google_refresh_token: string | null
  google_token_expires_at: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  client_id: string
  company_name: string
  job_title: string
  job_url: string | null
  status: 'applied' | 'interviewing' | 'offer' | 'rejected' | 'accepted'
  applied_date: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Resume {
  id: string
  client_id: string
  version_name: string
  file_url: string
  ai_feedback_requested: boolean
  ai_feedback_status: 'pending' | 'processing' | 'complete'
  ai_feedback_result: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export interface Interview {
  id: string
  application_id: string | null
  client_id: string
  coach_id: string | null
  interview_type_id: string | null
  start_time: string
  end_time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  meeting_url: string | null
  meeting_id: string | null
  google_calendar_event_id: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface InterviewType {
  id: string
  name: string
  duration: number
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Feedback {
  id: string
  client_id: string
  feedback_type: 'resume' | 'interview' | 'application'
  reference_id: string | null
  provider: 'ai' | 'coach'
  coach_id: string | null
  content: string
  created_at: string
}
