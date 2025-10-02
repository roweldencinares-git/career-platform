import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ClientLayout from '@/components/ClientLayout'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function ApplicationsPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // Fetch client data
  const { data: client } = await supabase
    .from('clients')
    .select('id')
    .eq('clerk_user_id', user.id)
    .single()

  if (!client) {
    redirect('/sign-in')
  }

  // Fetch applications from database
  const { data: applications } = await supabase
    .from('applications')
    .select('*')
    .eq('client_id', client.id)
    .order('created_at', { ascending: false })

  // Calculate stats
  const stats = {
    total: applications?.length || 0,
    applied: applications?.filter(app => app.status === 'applied').length || 0,
    interviewing: applications?.filter(app => app.status === 'interviewing').length || 0,
    offer: applications?.filter(app => app.status === 'offer').length || 0,
    rejected: applications?.filter(app => app.status === 'rejected').length || 0,
    accepted: applications?.filter(app => app.status === 'accepted').length || 0,
  }

  const statusColors = {
    applied: 'bg-blue-100 text-blue-700',
    interviewing: 'bg-purple-100 text-purple-700',
    offer: 'bg-green-100 text-green-700',
    rejected: 'bg-gray-100 text-gray-700',
    accepted: 'bg-emerald-100 text-emerald-700',
  }

  const statusIcons = {
    applied: '📤',
    interviewing: '🎯',
    offer: '🎉',
    rejected: '❌',
    accepted: '✅',
  }

  return (
    <ClientLayout currentPath="/dashboard/client/applications">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
              <p className="text-gray-600">Track and manage your job applications</p>
            </div>
            <Link
              href="/dashboard/client/applications/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Application
            </Link>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
              <div className="text-sm text-blue-700">Applied</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{stats.interviewing}</div>
              <div className="text-sm text-purple-700">Interviewing</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{stats.offer}</div>
              <div className="text-sm text-green-700">Offers</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-600">{stats.rejected}</div>
              <div className="text-sm text-gray-700">Rejected</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
            All ({stats.total})
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            Applied ({stats.applied})
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            Interviewing ({stats.interviewing})
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            Offers ({stats.offer})
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            Rejected ({stats.rejected})
          </button>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company & Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary Range
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications && applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{app.company_name}</div>
                        <div className="text-sm text-gray-500">{app.job_title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status as keyof typeof statusColors]}`}>
                        <span className="mr-1">{statusIcons[app.status as keyof typeof statusIcons]}</span>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.job_url ? (
                        <a href={app.job_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Job
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.applied_date ? new Date(app.applied_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/dashboard/client/applications/${app.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                        View
                      </Link>
                      <button className="text-gray-600 hover:text-gray-900">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium mb-2">No applications yet</p>
                      <p className="text-sm">Get started by adding your first job application!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Application Tips */}
        <div className="mt-6 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Pro Tip</h3>
              <p className="text-sm text-gray-700">
                Follow up on applications 3-5 days after applying. Companies appreciate proactive candidates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}
