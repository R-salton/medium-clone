'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileUploader } from './filePicker/file-picker'

export default function NewPostForm() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTitle('')
      setSubtitle('')
      setContent('')
    }, 1200)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col gap-6 mt-10"
    >
      <h2 className="text-3xl font-bold text-primary mb-2 text-center">Create New Post</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font-semibold text-gray-700 dark:text-gray-200">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="Enter your post title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="subtitle" className="font-semibold text-gray-700 dark:text-gray-200">
          Subtitle
        </label>
        <input
          id="subtitle"
          type="text"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="Add a catchy subtitle"
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-semibold text-gray-700 dark:text-gray-200">
          Content
        </label>
        <textarea
          id="content"
          rows={6}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition resize-vertical"
          placeholder="Write your post content here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <FileUploader />
      </div>
      <Button
        type="submit"
        className="w-full  text-white dark:text-gray-400 font-semibold py-2 bg-[#000319] rounded-lg hover:bg-sky-950  hover:text-gray-700 dark:hover:text- transition duration-300 text-lg"
        disabled={loading}
      >
        {loading ? 'Publishing...' : 'Publish Post'}
      </Button>
      {success && (
        <div className="text-green-600 text-center font-medium mt-2">
          🎉 Post published successfully!
        </div>
      )}
    </form>
  )
}