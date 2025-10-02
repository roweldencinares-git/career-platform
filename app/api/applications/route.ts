import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

// Validation schema
const createApplicationSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  job_title: z.string().min(1, 'Job title is required'),
  job_url: z.string().url().optional().or(z.literal('')),
  status: z.enum(['applied', 'interviewing', 'offer', 'rejected', 'accepted']).default('applied'),
  applied_date: z.string().optional(),
  notes: z.string().optional(),
})

// POST /api/applications - Create new application
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = createApplicationSchema.parse(body)

    // Get client_id from database using clerk_user_id
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('clerk_user_id', user.id)
      .single()

    if (clientError || !client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Create application
    const { data: application, error: applicationError } = await supabase
      .from('applications')
      .insert({
        client_id: client.id,
        company_name: validatedData.company_name,
        job_title: validatedData.job_title,
        job_url: validatedData.job_url || null,
        status: validatedData.status,
        applied_date: validatedData.applied_date || new Date().toISOString(),
        notes: validatedData.notes || null,
      })
      .select()
      .single()

    if (applicationError) {
      console.error('Application creation error:', applicationError)
      return NextResponse.json({ error: 'Failed to create application' }, { status: 500 })
    }

    return NextResponse.json({ data: application }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/applications - Get all applications for current user
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get client_id from database
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('clerk_user_id', user.id)
      .single()

    if (clientError || !client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Get URL search params for filtering
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    // Build query
    let query = supabase
      .from('applications')
      .select('*')
      .eq('client_id', client.id)
      .order('created_at', { ascending: false })

    // Apply status filter if provided
    if (status) {
      query = query.eq('status', status)
    }

    const { data: applications, error: applicationsError } = await query

    if (applicationsError) {
      console.error('Applications fetch error:', applicationsError)
      return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
    }

    // Calculate stats
    const stats = {
      total: applications?.length || 0,
      applied: applications?.filter(app => app.status === 'applied').length || 0,
      interviewing: applications?.filter(app => app.status === 'interviewing').length || 0,
      offer: applications?.filter(app => app.status === 'offer').length || 0,
      rejected: applications?.filter(app => app.status === 'rejected').length || 0,
      accepted: applications?.filter(app => app.status === 'accepted').length || 0,
    }

    return NextResponse.json({ data: applications, stats }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
