import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import api from '../api/axios'

const MyWork = () => {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects')
      if (response.data.success) {
        setProjects(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const convertToEmbedUrl = (url) => {
    if (!url) return ''
    
    // YouTube URL conversion
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url
    }
    if (url.includes('youtube.com/embed')) {
      return url
    }
    
    // Vimeo URL conversion
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url
    }
    if (url.includes('player.vimeo.com')) {
      return url
    }
    
    return url
  }

  const openVideoModal = (project) => {
    setSelectedProject({
      ...project,
      embed_url: convertToEmbedUrl(project.video_url)
    })
  }

  const closeVideoModal = () => {
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-center">
            My <span className="text-secondary">Work</span>
          </h1>
          <p className="text-text/70 text-center mb-12 max-w-2xl mx-auto">
            A collection of my video editing projects and creative work
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-card/50 rounded-xl overflow-hidden border border-highlight/30 hover:border-highlight transition-all cursor-pointer group"
                onClick={() => project.video_url && openVideoModal(project)}
              >
                <div className="relative overflow-hidden aspect-video bg-black">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 absolute inset-0"
                    />
                  )}
                  {project.video_url && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-opacity">
                      <div className="bg-secondary rounded-full p-4 shadow-xl">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {project.category && (
                    <span className="text-xs text-secondary font-semibold uppercase">
                      {project.category}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mt-2 mb-2">{project.title}</h3>
                  {project.description && (
                    <p className="text-text/70 text-sm line-clamp-2">{project.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text/70">No projects available yet.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Video Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-card rounded-lg p-4 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-secondary">{selectedProject.title}</h3>
              <button
                onClick={closeVideoModal}
                className="text-text/60 hover:text-text transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={selectedProject.embed_url || selectedProject.video_url}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default MyWork

