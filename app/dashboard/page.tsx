import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // For MVP, redirect to client dashboard
  // Later we'll add role-based routing
  redirect('/dashboard/client')
}
