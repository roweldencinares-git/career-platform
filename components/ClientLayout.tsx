'use client'

import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ClientLayoutProps {
  children: React.ReactNode
  currentPath?: string
}

export default function ClientLayout({ children, currentPath }: ClientLayoutProps) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const isActive = (path: string) => currentPath === path

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [isLoaded, user, router])

  if (isLoaded && !user) {
    return null
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <Link href="/" className="text-xl font-bold text-white">
            Career Platform
          </Link>
          <p className="text-sm text-white/90 mt-1">Job Seeker Dashboard</p>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName || user?.emailAddresses[0]?.emailAddress}
              </p>
              <p className="text-xs text-gray-500 truncate">
                Job Seeker
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          {/* Dashboard Section */}
          <div className="px-4 mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Dashboard</h3>
            <div className="space-y-1">
              <Link
                href="/dashboard/client"
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/dashboard/client')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="mr-3">🏠</span>
                Overview
              </Link>
            </div>
          </div>

          {/* Job Search Section */}
          <div className="px-4 mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Job Search</h3>
            <div className="space-y-1">
              <Link
                href="/dashboard/client/applications"
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/client/applications')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="mr-3">📋</span>
                Applications
              </Link>
              <Link
                href="/dashboard/client/resumes"
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/client/resumes')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="mr-3">📄</span>
                Resumes
              </Link>
              <Link
                href="/dashboard/client/interviews"
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/client/interviews')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="mr-3">📅</span>
                Interviews
              </Link>
            </div>
          </div>

          {/* Coaching Section */}
          <div className="px-4 mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Coaching</h3>
            <div className="space-y-1">
              <Link
                href="/dashboard/client/sessions"
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/client/sessions')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="mr-3">🎓</span>
                My Sessions
              </Link>
              <Link
                href="/dashboard/client/feedback"
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/client/feedback')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="mr-3">💬</span>
                Feedback
              </Link>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="px-4 mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Insights</h3>
            <div className="space-y-1">
              <Link
                href="/dashboard/client/progress"
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/client/progress')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="mr-3">📈</span>
                My Progress
              </Link>
              <Link
                href="/dashboard/client/tips"
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/client/tips')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="mr-3">💡</span>
                AI Tips
              </Link>
            </div>
          </div>
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 px-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Applications</span>
                <span className="font-semibold text-blue-600">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Interviews Scheduled</span>
                <span className="font-semibold text-green-600">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pending Feedback</span>
                <span className="font-semibold text-purple-600">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-4 px-4 pb-4 border-t border-gray-200 pt-4">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-2 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
