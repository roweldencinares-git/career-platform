import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'

// POST /api/clients/init - Initialize client record for current user
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get onboarding data from request body (optional)
    const body = await request.json().catch(() => ({}))
    const { targetJobTitle, experienceLevel } = body

    // Check if client already exists
    const { data: existingClient } = await supabase
      .from('clients')
      .select('id, onboarding_completed')
      .eq('clerk_user_id', user.id)
      .single()

    if (existingClient) {
      // Update with onboarding data if provided
      if (targetJobTitle || experienceLevel) {
        const { data: updatedClient } = await supabase
          .from('clients')
          .update({
            target_job_title: targetJobTitle,
            experience_level: experienceLevel,
            onboarding_completed: true,
            onboarding_completed_at: new Date().toISOString(),
            profile_status: 'active',
          })
          .eq('id', existingClient.id)
          .select()
          .single()

        return NextResponse.json({
          message: 'Client updated with onboarding data',
          data: updatedClient
        }, { status: 200 })
      }

      return NextResponse.json({
        message: 'Client already exists',
        data: existingClient
      }, { status: 200 })
    }

    // Create new client record
    const { data: newClient, error: createError } = await supabase
      .from('clients')
      .insert({
        clerk_user_id: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        first_name: user.firstName || null,
        last_name: user.lastName || null,
        profile_status: targetJobTitle ? 'active' : 'incomplete',
        target_job_title: targetJobTitle || null,
        experience_level: experienceLevel || null,
        onboarding_completed: !!targetJobTitle,
        onboarding_completed_at: targetJobTitle ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (createError) {
      console.error('Client creation error:', createError)
      return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Client created successfully',
      data: newClient
    }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
