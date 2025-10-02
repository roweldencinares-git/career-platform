'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    targetJobTitle: '',
    experienceLevel: 'entry',
    resumeFile: null as File | null,
    company: '',
    jobTitle: '',
    jobDescription: '',
  })

  const handleContinueStep1 = () => {
    if (!formData.targetJobTitle) {
      alert('Please enter your target job title')
      return
    }
    setCurrentStep(2)
  }

  const handleContinueStep2 = () => {
    setCurrentStep(3)
  }

  const handleFinish = async () => {
    // Show loading screen
    setCurrentStep(4)

    // Initialize client record with onboarding data
    await fetch('/api/clients/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetJobTitle: formData.targetJobTitle,
        experienceLevel: formData.experienceLevel,
      }),
    })

    // If they added a job, save it
    if (formData.company && formData.jobTitle) {
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: formData.company,
          job_title: formData.jobTitle,
          job_url: '',
          status: 'applied',
          applied_date: new Date().toISOString(),
          notes: formData.jobDescription,
        }),
      })
    }

    // Simulate setup time
    setTimeout(() => {
      router.push('/dashboard/client')
    }, 3000)
  }

  const handleSkipToApp = async () => {
    await fetch('/api/clients/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetJobTitle: formData.targetJobTitle,
        experienceLevel: formData.experienceLevel,
      }),
    })
    router.push('/dashboard/client/applications')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-white border-r border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Sage!</h2>
          <p className="text-gray-600">
            Experience the full power of Sage by completing three simple steps. We'll use your details to:
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Build your Base Resume</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Run an AI Resume Review on it</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Connect with top career coaches</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Book coaching sessions</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Track your job applications</span>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-12">
        {/* Step Indicators */}
        <div className="flex justify-center gap-4 mb-12">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            currentStep === 1 ? 'bg-yellow-400 text-gray-900' : currentStep > 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {currentStep > 1 ? '✓' : '1'}
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            currentStep === 2 ? 'bg-yellow-400 text-gray-900' : currentStep > 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {currentStep > 2 ? '✓' : '2'}
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            currentStep === 3 ? 'bg-yellow-400 text-gray-900' : currentStep > 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {currentStep > 3 ? '✓' : '3'}
          </div>
        </div>

        {/* Step 1: Target Job */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Enter Your Target Job</h1>
            <p className="text-gray-600 mb-8">
              Tell us the job title and experience level you're targeting. Have a few in mind?
              Start with your top choice for now. We'll use it to personalize your experience.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={formData.targetJobTitle}
                  onChange={(e) => setFormData({ ...formData, targetJobTitle: e.target.value })}
                  placeholder="e.g. AI Engineer"
                  className="w-full px-4 py-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Experience Level
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="experience"
                      value="entry"
                      checked={formData.experienceLevel === 'entry'}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-5 h-5 text-purple-600"
                    />
                    <span className="text-gray-700">Entry • 0-2 years of exp.</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="experience"
                      value="mid"
                      checked={formData.experienceLevel === 'mid'}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-5 h-5 text-purple-600"
                    />
                    <span className="text-gray-700">Mid Level • 2-5 years of exp.</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="experience"
                      value="senior"
                      checked={formData.experienceLevel === 'senior'}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-5 h-5 text-purple-600"
                    />
                    <span className="text-gray-700">Senior • 5+ years of exp.</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleContinueStep1}
                className="w-full bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 text-lg mt-8"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Resume Upload */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Import Your Professional Information</h1>
            <p className="text-gray-600 mb-8">
              This will be the foundation for your base resume and every job tailored resume.
              The fastest way is to upload a resume you already have.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Upload an existing resume</h3>
                <p className="text-sm text-gray-600 mb-4">We suggest this method for the best results.</p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-500 transition cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({ ...formData, resumeFile: e.target.files?.[0] || null })}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="text-gray-500">
                      <p className="font-medium">Drag & drop your resume</p>
                      <p className="text-sm">.pdf, .docx, .doc</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">LinkedIn Profile</h3>
                <p className="text-sm text-gray-600 mb-4">Enter your LinkedIn username to import your professional profile.</p>

                <input
                  type="text"
                  placeholder="linkedin.com/in/"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <input type="checkbox" id="scratch" className="w-4 h-4" />
              <label htmlFor="scratch" className="text-sm text-gray-600">
                or <span className="font-medium italic">Start from Scratch</span>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-8 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleContinueStep2}
                className="flex-1 bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: First Job */}
        {currentStep === 3 && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Save Your First Job</h1>
            <p className="text-gray-600 mb-8">
              Find a job you are excited about or considering applying for, then bring the details back here.
              We will tailor your resume for this job and write a cover letter for it too!
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title <span className="text-red-500">Required</span>
                    </label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder={`i.e. ${formData.targetJobTitle || 'AI engineer'}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company <span className="text-red-500">Required</span>
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description <span className="text-red-500">Required</span>
                  </label>
                  <textarea
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                    rows={10}
                    placeholder="Paste the job description here..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFinish}
                    className="flex-1 bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700"
                  >
                    Finish
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Need Inspiration?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Search for <span className="font-medium">{formData.targetJobTitle || 'AI engineer'}</span> jobs in one of these job search sites
                  </p>

                  <div className="space-y-2">
                    <a href="https://linkedin.com/jobs" target="_blank" className="flex items-center gap-2 text-blue-600 hover:underline">
                      <span>🔗</span> LinkedIn
                    </a>
                    <a href="https://indeed.com" target="_blank" className="flex items-center gap-2 text-blue-600 hover:underline">
                      <span>📋</span> Indeed
                    </a>
                    <a href="https://google.com/search?q=jobs" target="_blank" className="flex items-center gap-2 text-blue-600 hover:underline">
                      <span>🔍</span> Google
                    </a>
                    <p className="text-sm text-gray-500 italic mt-2">or any other job board</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Don't Have a Job Handy?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    No problem. You can <button onClick={handleSkipToApp} className="text-purple-600 font-medium underline">skip this step</button> to get started.
                    This will help speed up your setup. The real journey begins with jobs you find on your favorite sites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Loading/Processing */}
        {currentStep === 4 && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <h1 className="text-5xl font-bold text-purple-600 mb-4">Setting Things Up...</h1>
            <p className="text-xl text-gray-600 mb-12">Are we there yet? ...Nearly</p>

            <div className="space-y-4 max-w-xl mx-auto">
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg border-2 border-purple-200">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-gray-900">Importing your Resume</span>
              </div>

              <div className="flex items-center gap-4 bg-white p-4 rounded-lg border-2 border-purple-200">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-gray-900">Building Your <strong>Base Resume</strong></span>
              </div>

              <div className="flex items-center gap-4 bg-white p-4 rounded-lg border-2 border-purple-400 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <span className="text-lg font-medium text-gray-900">Running an <strong>AI Resume Review</strong></span>
              </div>

              <div className="flex items-center gap-4 bg-white p-4 rounded-lg border-2 border-gray-200 opacity-60">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm text-gray-500">○</span>
                </div>
                <span className="text-lg font-medium text-gray-500">
                  Tailoring your Resume for the <strong>{formData.targetJobTitle || 'target position'}</strong>
                </span>
              </div>

              <div className="flex items-center gap-4 bg-white p-4 rounded-lg border-2 border-gray-200 opacity-60">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm text-gray-500">○</span>
                </div>
                <span className="text-lg font-medium text-gray-500">
                  Setting up your job tracker board <strong>Job Search 2025</strong>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
