import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ClientLayout from '@/components/ClientLayout'

export default async function ClientDashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <ClientLayout currentPath="/dashboard/client">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.firstName || 'there'}!</h1>
          <p className="text-gray-600">Track your applications and continue your job search journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Applications</div>
              <span className="text-2xl">📋</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">0</div>
            <div className="text-xs text-gray-500 mt-1">+0 this week</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Interviewing</div>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-xs text-gray-500 mt-1">Active pipeline</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Offers</div>
              <span className="text-2xl">🎉</span>
            </div>
            <div className="text-3xl font-bold text-green-600">0</div>
            <div className="text-xs text-gray-500 mt-1">Pending decisions</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Response Rate</div>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">--%</div>
            <div className="text-xs text-gray-500 mt-1">Need more data</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/dashboard/client/applications/new"
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">➕</span>
                <div>
                  <h3 className="font-semibold">Add Application</h3>
                  <p className="text-sm text-blue-100">Track a new job application</p>
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/client/resumes"
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">📄</span>
                <div>
                  <h3 className="font-semibold">Upload Resume</h3>
                  <p className="text-sm text-purple-100">Get AI-powered feedback</p>
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/client/sessions"
              className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎓</span>
                <div>
                  <h3 className="font-semibold">Book Session</h3>
                  <p className="text-sm text-green-100">Schedule with a coach</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                <Link href="/dashboard/client/applications" className="text-sm text-blue-600 hover:text-blue-700">
                  View all →
                </Link>
              </div>
            </div>
            <div className="p-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600 mb-4">Start tracking your job applications to see them here</p>
              <Link
                href="/dashboard/client/applications/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Your First Application
              </Link>
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h2>
                <Link href="/dashboard/client/interviews" className="text-sm text-blue-600 hover:text-blue-700">
                  View all →
                </Link>
              </div>
            </div>
            <div className="p-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews scheduled</h3>
              <p className="text-gray-600 mb-4">Book a mock interview session with a coach</p>
              <Link
                href="/dashboard/client/sessions"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Schedule a Session
              </Link>
            </div>
          </div>
        </div>

        {/* AI Tips */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-start gap-4">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily Tip</h3>
              <p className="text-gray-700 mb-3">
                Tailor your resume for each application by highlighting skills that match the job description.
                This can increase your response rate by up to 40%!
              </p>
              <Link href="/dashboard/client/tips" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                More tips →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}
