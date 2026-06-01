"use client"

import { useState } from "react"

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    setTimeout(() => {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
    }, 500)
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-[#ff6a3d] flex items-center gap-3">
        💬 Send Us Your Feedback or Query
      </h2>

      {/* Hidden iframe absorbs Google Forms redirect */}
      <iframe name="hidden_iframe" style={{ display: "none" }} />

      <form
        action="https://docs.google.com/forms/d/e/1FAIpQLSdX_bjvDTga8eW73n2V9tWYzRIBGc6jCqYvEzJcDMDCqFEKGA/formResponse"
        method="POST"
        target="hidden_iframe"
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Your Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="entry.883842801"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[#ff6a3d] transition-colors placeholder-gray-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="entry.853407300"
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[#ff6a3d] transition-colors placeholder-gray-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="entry.972094944"
              placeholder="+91 XXXXX-XXXXX"
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[#ff6a3d] transition-colors placeholder-gray-500"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Subject <span className="text-red-400">*</span>
            </label>
            <select
              name="entry.764362584"
              required
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[#ff6a3d] transition-colors"
            >
              <option value="">Select a subject</option>
              <option value="Admission Query">Admission Query</option>
              <option value="Feedback">Feedback</option>
              <option value="Event Inquiry">Event Inquiry</option>
              <option value="Complaint">Complaint</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              name="entry.584151901"
              placeholder="Share your feedback, query, or concern here..."
              rows={5}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[#ff6a3d] transition-colors placeholder-gray-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-[#ff6a3d] to-[#ff8a5d] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#ff6a3d]/50 transition-all duration-300 hover:scale-105"
            >
              ✉️ Send Message
            </button>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="md:col-span-2">
              <p className="text-green-400 text-sm font-semibold text-center bg-green-900/30 border border-green-700 rounded-lg px-4 py-3">
                ✅ Thank you! Your message has been sent successfully.
              </p>
            </div>
          )}

          {/* Terms */}
          <div className="md:col-span-2 text-xs text-gray-400">
            <p>By submitting this form, you agree to our privacy policy. All submissions are stored securely in Google Forms.</p>
          </div>

        </div>
      </form>
    </div>
  )
}