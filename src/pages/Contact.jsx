import { motion } from 'framer-motion'
import { useState } from 'react'
import api from '../api/axios'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const response = await api.post('/contact', formData)
      if (response.data.success) {
        setStatus({ type: 'success', message: response.data.message })
        setFormData({ name: '', email: '', message: '' })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Error sending message. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-1 text-center">
            Get In <span className="text-secondary">Touch</span>
          </h1>
          <p className="text-text/70 text-center mb-4 text-sm">
            Have a project in mind? Let's work together to bring your vision to life.
          </p>

          <div className="bg-card/50 rounded-2xl p-4 md:p-6 border border-card">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-text mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary text-text text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-text mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary text-text text-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-text mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary text-text resize-none text-sm"
                  placeholder="Tell me about your project..."
                />
              </div>

              {status && (
                <div
                  className={`p-3 text-sm rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-900/50 text-green-300 border border-green-700'
                      : 'bg-red-900/50 text-red-300 border border-red-700'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-2 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-secondary/90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact

