import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ClientLayout from '@/components/ClientLayout'

export default async function SessionsPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // Mock session data
  const upcomingSessions = [
    {
      id: '1',
      type: 'Mock Interview',
      coach: 'Sarah Johnson',
      date: '2025-10-05',
      time: '2:00 PM',
      duration: 60,
      meetingUrl: 'https://zoom.us/j/12345',
      status: 'confirmed',
    },
    {
      id: '2',
      type: 'Resume Review',
      coach: 'Michael Chen',
      date: '2025-10-08',
      time: '10:00 AM',
      duration: 30,
      meetingUrl: 'https://zoom.us/j/67890',
      status: 'confirmed',
    },
  ]

  const pastSessions = [
    {
      id: '3',
      type: 'Career Consultation',
      coach: 'Emily Rodriguez',
      date: '2025-09-25',
      duration: 45,
      status: 'completed',
      rating: 5,
    },
  ]

  const sessionTypes = [
    {
      name: 'Resume Review',
      duration: 30,
      description: 'Get expert feedback on your resume',
      icon: '📄',
      price: 'Free',
    },
    {
      name: 'Mock Interview',
      duration: 60,
      description: 'Practice with realistic interview scenarios',
      icon: '🎯',
      price: 'Free',
    },
    {
      name: 'Career Consultation',
      duration: 45,
      description: 'Discuss your career goals and strategy',
      icon: '💼',
      price: 'Free',
    },
    {
      name: 'Interview Prep',
      duration: 30,
      description: 'Prepare for an upcoming interview',
      icon: '📝',
      price: 'Free',
    },
  ]

  return (
    <ClientLayout currentPath="/dashboard/client/sessions">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Coaching Sessions</h1>
          <p className="text-gray-600">Book and manage your coaching sessions</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Upcoming Sessions</div>
            <div className="text-3xl font-bold text-blue-600">{upcomingSessions.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-600">{pastSessions.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Hours</div>
            <div className="text-3xl font-bold text-purple-600">2.25</div>
          </div>
        </div>

        {/* Book a Session */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Book a Session</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sessionTypes.map((type) => (
              <button
                key={type.name}
                className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
                onClick={() => alert(`Booking ${type.name}... (Demo mode)`)}
              >
                <div className="text-3xl mb-3">{type.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{type.duration} min</span>
                  <span className="text-green-600 font-medium">{type.price}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{session.type}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Confirmed
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">with {session.coach}</p>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500 mb-1">Date</div>
                        <div className="font-medium text-gray-900">
                          {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Time</div>
                        <div className="font-medium text-gray-900">{session.time}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Duration</div>
                        <div className="font-medium text-gray-900">{session.duration} min</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={session.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                    >
                      Join Meeting
                    </a>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Sessions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Sessions</h2>
          <div className="space-y-4">
            {pastSessions.map((session) => (
              <div key={session.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{session.type}</h3>
                    <p className="text-gray-600 mb-3">with {session.coach}</p>

                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-gray-500">Date: </span>
                        <span className="font-medium text-gray-900">
                          {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration: </span>
                        <span className="font-medium text-gray-900">{session.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < session.rating ? 'text-yellow-400' : 'text-gray-300'}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white text-sm font-medium">
                    View Notes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Session Tips</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Prepare questions ahead of time to maximize your session</li>
                <li>• Have your resume ready for review sessions</li>
                <li>• Practice speaking out loud before mock interviews</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}
