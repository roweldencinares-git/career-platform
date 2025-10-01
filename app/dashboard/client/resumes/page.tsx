'use client'

import { useState } from 'react'
import ClientLayout from '@/components/ClientLayout'

export default function ResumesPage() {
  const [uploading, setUploading] = useState(false)

  // Mock resume data
  const resumes = [
    {
      id: '1',
      name: 'Resume_2025_FullStack.pdf',
      uploadedAt: '2025-09-28',
      aiFeedbackStatus: 'complete',
      score: 85,
    },
    {
      id: '2',
      name: 'Resume_General_V2.pdf',
      uploadedAt: '2025-09-15',
      aiFeedbackStatus: 'complete',
      score: 72,
    },
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploading(true)
      // Simulate upload
      setTimeout(() => {
        setUploading(false)
        alert(`Resume "${file.name}" uploaded successfully! (Demo mode)`)
      }, 1500)
    }
  }

  return (
    <ClientLayout currentPath="/dashboard/client/resumes">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Resumes</h1>
          <p className="text-gray-600">Upload and manage your resumes with AI-powered feedback</p>
        </div>

        {/* Upload Section */}
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg p-8 mb-8 text-white">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">Get AI Resume Feedback</h2>
            <p className="text-purple-100 mb-6">
              Upload your resume and receive instant AI-powered suggestions to improve your chances of getting hired
            </p>

            <div className="bg-white/10 backdrop-blur border-2 border-white/30 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer"
              >
                {uploading ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-lg font-medium">Uploading...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-lg font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-sm text-purple-200">PDF, DOC, or DOCX (max. 5MB)</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Resume List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Resumes</h2>

          <div className="grid gap-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{resume.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">
                        Uploaded {new Date(resume.uploadedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>

                      {/* AI Score */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-600">AI Score:</div>
                          <div className={`text-lg font-bold ${
                            resume.score >= 80 ? 'text-green-600' :
                            resume.score >= 60 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {resume.score}/100
                          </div>
                        </div>

                        {resume.aiFeedbackStatus === 'complete' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            ✓ Feedback Ready
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
                      onClick={() => alert('Viewing AI feedback... (Demo mode)')}
                    >
                      View Feedback
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>

                {/* Sample Feedback Preview */}
                {resume.aiFeedbackStatus === 'complete' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-700">
                      <div className="font-medium text-gray-900 mb-2">Key Recommendations:</div>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Add quantifiable achievements to work experience</li>
                        <li>• Include keywords from target job descriptions</li>
                        <li>• Optimize formatting for ATS compatibility</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Resume Tips</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Keep your resume to 1-2 pages</li>
                  <li>• Use action verbs (Built, Managed, Led)</li>
                  <li>• Include metrics and numbers</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">AI Feedback Features</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Grammar and spelling check</li>
                  <li>• ATS compatibility score</li>
                  <li>• Keyword optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}
