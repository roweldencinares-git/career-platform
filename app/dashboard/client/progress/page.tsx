import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import ClientLayout from '@/components/ClientLayout'

export default async function ProgressPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <ClientLayout currentPath="/dashboard/client/progress">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Progress</h1>
          <p className="text-gray-600">Track your job search journey and insights</p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-sm">
            <div className="text-sm mb-1 opacity-90">Applications Sent</div>
            <div className="text-4xl font-bold mb-2">24</div>
            <div className="text-sm opacity-75">+8 this month</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-sm">
            <div className="text-sm mb-1 opacity-90">Response Rate</div>
            <div className="text-4xl font-bold mb-2">33%</div>
            <div className="text-sm opacity-75">Above average!</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-sm">
            <div className="text-sm mb-1 opacity-90">Interviews</div>
            <div className="text-4xl font-bold mb-2">8</div>
            <div className="text-sm opacity-75">3 upcoming</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-sm">
            <div className="text-sm mb-1 opacity-90">Avg. Response Time</div>
            <div className="text-4xl font-bold mb-2">7d</div>
            <div className="text-sm opacity-75">Faster than 65%</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Application Pipeline */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Pipeline</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Applied (10)</span>
                  <span className="text-gray-900 font-medium">42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Interviewing (8)</span>
                  <span className="text-gray-900 font-medium">33%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Offers (3)</span>
                  <span className="text-gray-900 font-medium">13%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '13%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Rejected (3)</span>
                  <span className="text-gray-900 font-medium">13%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-400 h-2 rounded-full" style={{ width: '13%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🎉</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Received offer from BigTech Inc</div>
                  <div className="text-xs text-gray-500">2 days ago</div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🎯</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Interview completed with Tech Corp</div>
                  <div className="text-xs text-gray-500">5 days ago</div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">📤</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Applied to StartupXYZ</div>
                  <div className="text-xs text-gray-500">1 week ago</div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">📄</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Uploaded new resume</div>
                  <div className="text-xs text-gray-500">1 week ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h2>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="text-center">
                <div className="text-xs text-gray-500 mb-2">{day}</div>
                <div className={`h-20 rounded ${
                  i < 5 ? 'bg-blue-100' : 'bg-gray-100'
                } flex items-end justify-center p-2`}>
                  <div
                    className={`w-full rounded ${i < 5 ? 'bg-blue-600' : 'bg-gray-300'}`}
                    style={{ height: `${[60, 80, 40, 90, 70, 20, 30][i]}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-2">{[3, 4, 2, 5, 3, 1, 0][i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔥</span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Hot Streak!</h3>
                <p className="text-sm text-gray-700">You've applied to 8 jobs this week. Keep the momentum going!</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Response Rate Up</h3>
                <p className="text-sm text-gray-700">Your response rate improved by 12% this month!</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Recommendation</h3>
                <p className="text-sm text-gray-700">Schedule more mock interviews to prepare for upcoming rounds.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}
