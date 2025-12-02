import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

const AdminDashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('content')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [contentSaving, setContentSaving] = useState(false)

  // Content state
  const [content, setContent] = useState({
    name: '',
    title: '',
    slogan: '',
    about: '',
    profile_image: '',
    instagram: '',
    linkedin: ''
  })

  // Skills state
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState({ name: '', level: '', description: '', icon: '' })
  const [editingSkillId, setEditingSkillId] = useState(null)
  const [editingSkill, setEditingSkill] = useState({ name: '', level: '', description: '', icon: '' })

  // Projects state
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState({
    title: '',
    image: '',
    video_url: '',
    description: '',
    category: ''
  })
  const [editingProject, setEditingProject] = useState(null)

  // Messages state
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [contentRes, skillsRes, projectsRes, messagesRes] = await Promise.all([
        api.get('/content'),
        api.get('/skills'),
        api.get('/projects'),
        api.get('/messages')
      ])

      if (contentRes.data.success) {
        setContent(contentRes.data.data)
      }
      if (skillsRes.data.success) {
        setSkills(skillsRes.data.data)
      }
      if (projectsRes.data.success) {
        setProjects(projectsRes.data.data)
      }
      if (messagesRes.data.success) {
        setMessages(messagesRes.data.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const showStatus = (type, message) => {
    setStatus({ type, message })
    setTimeout(() => setStatus(null), 5000)
  }

  // Content handlers
  const handleContentChange = (key, value) => {
    setContent({ ...content, [key]: value })
  }

  const handleProfileImageUpload = (file) => {
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result
      // Store as data URL string in content (will be saved with "Save Changes" button)
      handleContentChange('profile_image', result)
    }
    reader.readAsDataURL(file)
  }

  const saveAllContent = async () => {
    try {
      setContentSaving(true)
      const entries = Object.entries(content).filter(
        ([key]) => !['email', 'facebook', 'youtube', 'x'].includes(key)
      )

      await Promise.all(
        entries.map(([key, value]) =>
          api.post('/content/update', { key, value: value ?? '' })
        )
      )

      showStatus('success', 'All content saved successfully!')
    } catch (error) {
      showStatus('error', 'Error saving content')
    } finally {
      setContentSaving(false)
    }
  }

  const saveContent = async (key, value) => {
    try {
      await api.post('/content/update', { key, value })
      showStatus('success', 'Content updated successfully!')
    } catch (error) {
      showStatus('error', 'Error updating content')
    }
  }

  // Skills handlers
  const addSkill = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/skills', {
        name: newSkill.name,
        level: newSkill.level ? parseInt(newSkill.level) : null,
        icon: newSkill.icon || null,
        description: newSkill.description || ''
      })
      if (response.data.success) {
        setSkills([...skills, response.data.data])
        setNewSkill({ name: '', level: '', description: '', icon: '' })
        showStatus('success', 'Skill added successfully!')
      }
    } catch (error) {
      showStatus('error', 'Error adding skill')
    }
  }

  const deleteSkill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return
    try {
      await api.delete(`/skills/${id}`)
      setSkills(skills.filter(s => s.id !== id))
      showStatus('success', 'Skill deleted successfully!')
    } catch (error) {
      showStatus('error', 'Error deleting skill')
    }
  }

  const startEditSkill = (skill) => {
    setEditingSkillId(skill.id)
    setEditingSkill({
      name: skill.name,
      level: skill.level ?? '',
      description: skill.description ?? '',
      icon: skill.icon ?? ''
    })
  }

  const cancelEditSkill = () => {
    setEditingSkillId(null)
    setEditingSkill({ name: '', level: '', description: '', icon: '' })
  }

  const updateSkill = async (id) => {
    try {
      const payload = {
        name: editingSkill.name,
        level: editingSkill.level === '' ? null : parseInt(editingSkill.level, 10),
        description: editingSkill.description || '',
        icon: editingSkill.icon || null
      }
      await api.put(`/skills/${id}`, payload)
      setSkills(skills.map(s => (s.id === id ? { ...s, ...payload } : s)))
      cancelEditSkill()
      showStatus('success', 'Skill updated successfully!')
    } catch (error) {
      showStatus('error', 'Error updating skill')
    }
  }

  // Projects handlers
  const addProject = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/projects', newProject)
      if (response.data.success) {
        setProjects([...projects, response.data.data])
        setNewProject({ title: '', image: '', video_url: '', description: '', category: '' })
        showStatus('success', 'Project added successfully!')
      }
    } catch (error) {
      showStatus('error', 'Error adding project')
    }
  }

  const updateProject = async (id, data) => {
    try {
      await api.put(`/projects/${id}`, data)
      setProjects(projects.map(p => p.id === id ? { ...p, ...data } : p))
      setEditingProject(null)
      showStatus('success', 'Project updated successfully!')
    } catch (error) {
      showStatus('error', 'Error updating project')
    }
  }

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    try {
      await api.delete(`/projects/${id}`)
      setProjects(projects.filter(p => p.id !== id))
      showStatus('success', 'Project deleted successfully!')
    } catch (error) {
      showStatus('error', 'Error deleting project')
    }
  }

  // Messages handlers
  const markAsRead = async (id) => {
    try {
      await api.put(`/messages/${id}/read`)
      setMessages(messages.map(m => m.id === id ? { ...m, read_status: true } : m))
      showStatus('success', 'Message marked as read')
    } catch (error) {
      showStatus('error', 'Error updating message')
    }
  }

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return
    try {
      await api.delete(`/messages/${id}`)
      setMessages(messages.filter(m => m.id !== id))
      showStatus('success', 'Message deleted successfully!')
    } catch (error) {
      showStatus('error', 'Error deleting message')
    }
  }

  const tabs = [
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'messages', label: 'Messages', icon: '💬' }
  ]

  return (
    <div className="min-h-screen bg-dark pt-16 px-2 md:px-0">
      <div className="container mx-auto px-2 sm:px-4 py-4 md:py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Admin <span className="text-secondary">Dashboard</span>
          </h1>
            <p className="text-text/60">Manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-600/20 text-red-400 border border-red-600/50 rounded-lg hover:bg-red-600/30 transition-all font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-card/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/20 rounded-lg">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-secondary mb-1">{projects.length}</h3>
            <p className="text-text/60 text-sm">Total Projects</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-card/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/20 rounded-lg">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-secondary mb-1">{skills.length}</h3>
            <p className="text-text/60 text-sm">Total Skills</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-card/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/20 rounded-lg">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-secondary mb-1">{Object.keys(content).filter(k => content[k]).length}</h3>
            <p className="text-text/60 text-sm">Content Fields</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-card/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/20 rounded-lg">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-secondary mb-1">{messages.length}</h3>
            <p className="text-text/60 text-sm">Total Messages</p>
            {messages.filter(m => !m.read_status).length > 0 && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
                  {messages.filter(m => !m.read_status).length} unread
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Status Message */}
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex items-center gap-3 p-4 rounded-xl mb-6 border backdrop-blur-sm ${
              status.type === 'success'
                ? 'bg-green-900/30 text-green-300 border-green-700/50'
                : 'bg-red-900/30 text-red-300 border-red-700/50'
            }`}
          >
            {status.type === 'success' ? (
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium">{status.message}</span>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap space-x-0 space-y-2 sm:space-y-0 sm:space-x-2 mb-8 bg-card/30 backdrop-blur-sm rounded-xl p-2 border border-card/50 justify-start sm:justify-normal overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 font-semibold capitalize transition-all rounded-lg whitespace-nowrap w-full sm:w-auto
                ${activeTab === tab.id ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-text/60 hover:text-text hover:bg-card/50'}
              `}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
          </div>
        )}

        {/* Content Tab */}
        {!loading && activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-card/50 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Edit Content</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(content).map(([key, value]) => {
                if (["email", "facebook", "youtube", "x"].includes(key)) return null; // Hide x field
                // Restore the profile image upload
                if (key === 'profile_image') {
                  return (
                    <div key={key} className="md:col-span-2">
                      <label className="block text-sm font-medium text-text/80 mb-2 flex items-center gap-2">
                        Profile Image
                        <span className="text-xs text-text/40">(Upload image)</span>
                      </label>
                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => {
                              const file = e.target.files?.[0]
                              if (!file) return
                              const reader = new FileReader()
                              reader.onloadend = () => {
                                handleContentChange('profile_image', reader.result)
                              }
                              reader.readAsDataURL(file)
                            }}
                            className="w-full text-sm text-text/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary/20 file:text-secondary hover:file:bg-secondary/30 cursor-pointer"
                          />
                          <p className="mt-2 text-xs text-text/40">
                            Recommended: square image for best appearance.
                          </p>
                        </div>
                        {value && (
                          <div className="w-24 h-24 rounded-full overflow-hidden border border-card/50 flex-shrink-0">
                            <img
                              src={value}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                }
                // For all other fields...
                const label = key === 'x' ? 'X (Twitter)' : key.replace('_', ' ');
                return (
                  <div key={key} className={key === 'about' ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-text/80 mb-2 capitalize flex items-center gap-2">
                      {label}
                      {/* Add note for 'about' field only */}
                      {key === 'about' && (
                        <span className="text-xs text-text/40">(Long text)</span>
                      )}
                    </label>
                    {key === 'about' ? (
                      <textarea
                        value={value || ''}
                        onChange={e => handleContentChange(key, e.target.value)}
                        rows="6"
                        className="w-full px-4 py-3 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-text transition-all"
                        placeholder={`Enter ${label}...`}
                      />
                    ) : (
                      <input
                        type={key.includes('url') || key === 'x' ? 'url' : 'text'}
                        value={value || ''}
                        onChange={e => handleContentChange(key, e.target.value)}
                        className="w-full px-4 py-3 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-text transition-all"
                        placeholder={`Enter ${label}...`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={saveAllContent}
                disabled={contentSaving}
                className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {contentSaving ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h7.586a1 1 0 01.707.293l3.414 3.414A1 1 0 0120 7.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v6m0 0l-3-3m3 3l3-3" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Skills Tab */}
        {!loading && activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Add Skill Form */}
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-card/50 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Add New Skill</h2>
              </div>
              <form onSubmit={addSkill} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text/80 mb-1">
                      Skill name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Premiere Pro"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-text transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text/80 mb-1">
                      Level (0-100)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 90"
                      min="0"
                      max="100"
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-text transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-[2fr,1fr] gap-4 items-start">
                  <div>
                    <label className="block text-sm font-medium text-text/80 mb-1">
                      Description
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Short paragraph describing this skill..."
                      value={newSkill.description}
                      onChange={(e) =>
                        setNewSkill({ ...newSkill, description: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-text transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text/80 mb-1">
                      Icon image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setNewSkill((prev) => ({ ...prev, icon: reader.result?.toString() || '' }))
                        }
                        reader.readAsDataURL(file)
                      }}
                      className="w-full text-sm text-text/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary/20 file:text-secondary hover:file:bg-secondary/30 cursor-pointer"
                    />
                    <p className="mt-1 text-xs text-text/40">
                      Optional. Small square image works best.
                    </p>
                    {newSkill.icon && (
                      <div className="mt-2 w-12 h-12 rounded-full overflow-hidden border border-card/60">
                        <img
                          src={newSkill.icon}
                          alt="New skill icon preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Skill
                  </button>
                </div>
              </form>
            </div>

            {/* Skills List */}
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-card/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.35-.821 3.42 3.42 0 014.63 0 3.42 3.42 0 001.35.821 3.42 3.42 0 013.469 3.469 3.42 3.42 0 00.821 1.35 3.42 3.42 0 010 4.63 3.42 3.42 0 00-.821 1.35 3.42 3.42 0 01-3.469 3.469 3.42 3.42 0 00-1.35.821 3.42 3.42 0 01-4.63 0 3.42 3.42 0 00-1.35-.821 3.42 3.42 0 01-3.469-3.469 3.42 3.42 0 00-.821-1.35 3.42 3.42 0 010-4.63 3.42 3.42 0 00.821-1.35 3.42 3.42 0 013.469-3.469z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">All Skills ({skills.length})</h2>
                </div>
              </div>
              {skills.length === 0 ? (
                <div className="text-center py-12 text-text/40">
                  <p>No skills added yet. Add your first skill above!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((skill) => {
                    const isEditing = editingSkillId === skill.id
                    return (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card rounded-lg p-4 border border-card/50 hover:border-secondary/50 transition-all group"
                      >
                        <div className="flex flex-col gap-3">
                          {/* Icon */}
                          <div className="flex items-center gap-3">
                            {isEditing ? (
                              <>
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-card/60 flex-shrink-0 bg-card/80 flex items-center justify-center">
                                  {editingSkill.icon ? (
                                    <img
                                      src={editingSkill.icon}
                                      alt="Skill icon preview"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-lg font-semibold text-secondary">
                                      {editingSkill.name?.[0] || skill.name?.[0]}
                                    </span>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (!file) return
                                      const reader = new FileReader()
                                      reader.onloadend = () => {
                                        setEditingSkill((prev) => ({
                                          ...prev,
                                          icon: reader.result?.toString() || ''
                                        }))
                                      }
                                      reader.readAsDataURL(file)
                                    }}
                                    className="w-full text-xs text-text/80 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-secondary/20 file:text-secondary hover:file:bg-secondary/30 cursor-pointer"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-card/60 flex-shrink-0 bg-card/80 flex items-center justify-center">
                                  {skill.icon ? (
                                    <img
                                      src={skill.icon}
                                      alt={`${skill.name} icon`}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-lg font-semibold text-secondary">
                                      {skill.name?.[0]}
                                    </span>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs text-text/50">
                                    Icon shown on Skills page.
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                          {/* Name */}
                          <div>
                            <label className="block text-xs font-medium text-text/60 mb-1">
                              Skill name
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editingSkill.name}
                                onChange={(e) =>
                                  setEditingSkill({ ...editingSkill, name: e.target.value })
                                }
                                className="w-full px-3 py-2 bg-card/80 border border-card/60 rounded-lg text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                              />
                            ) : (
                              <p className="font-semibold text-secondary">
                                {skill.name}
                              </p>
                            )}
                          </div>

                          {/* Level */}
                          <div>
                            <label className="block text-xs font-medium text-text/60 mb-1">
                              Level (0-100)
                            </label>
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={editingSkill.level}
                                onChange={(e) =>
                                  setEditingSkill({ ...editingSkill, level: e.target.value })
                                }
                                className="w-full px-3 py-2 bg-card/80 border border-card/60 rounded-lg text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                              />
                            ) : skill.level != null ? (
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-card/50 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-secondary rounded-full transition-all"
                                    style={{ width: `${skill.level}%` }}
                                  />
                                </div>
                                <span className="text-sm text-text/60 font-medium">
                                  {skill.level}%
                                </span>
                              </div>
                            ) : (
                              <p className="text-xs text-text/50 italic">No level set</p>
                            )}
                          </div>

                          {/* Description */}
                          <div>
                            <label className="block text-xs font-medium text-text/60 mb-1">
                              Description
                            </label>
                            {isEditing ? (
                              <textarea
                                rows="3"
                                value={editingSkill.description}
                                onChange={(e) =>
                                  setEditingSkill({ ...editingSkill, description: e.target.value })
                                }
                                className="w-full px-3 py-2 bg-card/80 border border-card/60 rounded-lg text-xs focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 resize-none"
                              />
                            ) : (
                              <p className="text-xs text-text/70 line-clamp-3">
                                {skill.description || 'No description set for this skill yet.'}
                              </p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex justify-end gap-2 pt-1">
                            {isEditing ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => updateSkill(skill.id)}
                                  className="px-3 py-1.5 bg-secondary/20 text-secondary text-xs font-semibold rounded-lg hover:bg-secondary hover:text-white transition-all"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEditSkill}
                                  className="px-3 py-1.5 bg-card/80 text-text/70 text-xs font-semibold rounded-lg hover:bg-card transition-all border border-card/60"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() => startEditSkill(skill)}
                                  className="px-3 py-1.5 bg-secondary/20 text-secondary text-xs font-semibold rounded-lg hover:bg-secondary hover:text-white transition-all"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteSkill(skill.id)}
                                  className="px-3 py-1.5 bg-red-600/20 text-red-400 text-xs font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-all"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {!loading && activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Add Project Form */}
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-card/50 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (editingProject) {
                    updateProject(editingProject.id, newProject)
                  } else {
                    addProject(e)
                  }
                }}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                    placeholder="Project Title *"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  required
                    className="w-full px-4 py-3 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-text transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Category (optional)"
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-text transition-all"
                  />
                </div>
              {/* Thumbnail (image upload only, required) */}
              <div>
                <label className="block text-sm font-medium text-text/80 mb-1">
                  Thumbnail Image <span className="text-xs text-red-400">(required)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required={!editingProject} // Required for creation, not for editing
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setNewProject(prev => ({ ...prev, image: reader.result?.toString() || '' }))
                    }
                    reader.readAsDataURL(file)
                  }}
                  className="w-full text-sm text-text/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary/20 file:text-secondary hover:file:bg-secondary/30 cursor-pointer"
                />
                <p className="mt-1 text-xs text-text/40">Upload a 16:9 thumbnail image. This will preview as your project cover.</p>
                {newProject.image && (
                  <div className="mt-2 w-48 h-28 rounded-lg overflow-hidden border border-card/60">
                    <img
                      src={newProject.image}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              {/* Remove any image_url text/url input! Only file upload remains. */}
              <input
                type="url"
                placeholder="Video URL (YouTube, Vimeo, etc.)"
                value={newProject.video_url}
                onChange={(e) => setNewProject({ ...newProject, video_url: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-text transition-all"
              />
              <textarea
                placeholder="Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 bg-card border border-card/50 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-text transition-all"
              />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(null)
                        setNewProject({ title: '', image: '', video_url: '', description: '', category: '' })
                      }}
                      className="px-6 py-3 bg-card text-text font-semibold rounded-lg hover:bg-card/80 transition-all border border-card/50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Projects List */}
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-card/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">All Projects ({projects.length})</h2>
                </div>
              </div>
              {projects.length === 0 ? (
                <div className="text-center py-12 text-text/40">
                  <p>No projects added yet. Add your first project above!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <motion.div
                    key={project.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-card rounded-xl p-6 border border-card/50 hover:border-secondary/50 transition-all group overflow-hidden"
                    >
                      {project.image && (
                        <div className="mb-4 rounded-lg overflow-hidden bg-card/50 aspect-video">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                      <div className="mb-4">
                        <h3 className="font-bold text-secondary text-lg mb-2">{project.title}</h3>
                    {project.category && (
                          <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-xs font-semibold rounded-full mb-2">
                            {project.category}
                          </span>
                        )}
                        {project.description && (
                          <p className="text-text/70 text-sm mt-2 line-clamp-2">{project.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(project)
                          setNewProject(project)
                        }}
                          className="flex-1 px-4 py-2 bg-secondary/20 text-secondary text-sm font-semibold rounded-lg hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                          className="px-4 py-2 bg-red-600/20 text-red-400 text-sm font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-all"
                      >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                      </button>
                    </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {!loading && activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-card/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Contact Messages ({messages.length})</h2>
                </div>
                {messages.filter(m => !m.read_status).length > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A1.932 1.932 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="font-semibold">{messages.filter(m => !m.read_status).length} Unread</span>
                  </div>
                )}
              </div>
              {messages.length === 0 ? (
                <div className="text-center py-12 text-text/40">
                  <svg className="w-16 h-16 mx-auto mb-4 text-text/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p>No messages yet. Messages from the contact form will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-card rounded-xl p-6 border transition-all ${
                        message.read_status 
                          ? 'border-card/50' 
                          : 'border-secondary/50 bg-secondary/5'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg text-secondary">{message.name}</h3>
                            {!message.read_status && (
                              <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs font-semibold rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-text/60 text-sm mb-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a 
                              href={`mailto:${message.email}`}
                              className="hover:text-secondary transition-colors"
                            >
                              {message.email}
                            </a>
                          </div>
                          <p className="text-text/80 leading-relaxed whitespace-pre-line">
                            {message.message}
                          </p>
                          <div className="mt-4 text-xs text-text/40">
                            {new Date(message.created_at).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          {!message.read_status && (
                            <button
                              onClick={() => markAsRead(message.id)}
                              className="p-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition-all"
                              title="Mark as read"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all"
                            title="Delete message"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
