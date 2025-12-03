import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import Squares from '../components/Squares'

const MyWork = () => {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    
    const staticProjects = [
      { id: 1, title: "YouTube Video 1", video_url: "https://www.youtube.com/watch?v=SFpqILrea3g", type: 'video', editor: 'Premiere Pro' },
      { id: 2, title: "YouTube Video 2", video_url: "https://www.youtube.com/watch?v=x89fLNpfCjk", type: 'video', editor: 'Premiere Pro' },
      { id: 3, title: "YouTube Video 3", video_url: "https://www.youtube.com/watch?v=N8ea8Q0yKVM", type: 'video', editor: 'Premiere Pro' },
      { id: 4, title: "YouTube Video 4", video_url: "https://www.youtube.com/watch?v=QmyH15xocnI", type: 'video', editor: 'Premiere Pro' },
      { id: 5, title: "YouTube Video 5", video_url: "https://www.youtube.com/watch?v=nA82QtQsgns", type: 'video', editor: 'Premiere Pro' },
      { id: 6, title: "YouTube Video 6", video_url: "https://www.youtube.com/watch?v=EaPb5i7uxv4", type: 'video', editor: 'Premiere Pro' },
      { id: 7, title: "YouTube Shorts 1", video_url: "https://www.youtube.com/shorts/_SR_R7K4WLg", type: 'short', editor: 'Premiere Pro' },
      { id: 8, title: "YouTube Shorts 2", video_url: "https://www.youtube.com/shorts/LBRSwmcOFV4", type: 'short', editor: 'Premiere Pro' },
      { id: 9, title: "YouTube Shorts 3", video_url: "https://www.youtube.com/shorts/o4kTj0D3j6M", type: 'short', editor: 'Premiere Pro' },
      { id: 10, title: "YouTube Shorts 4", video_url: "https://www.youtube.com/shorts/76BRkjpcXF0", type: 'short', editor: 'Premiere Pro' },
      { id: 11, title: "YouTube Video 7", video_url: "https://www.youtube.com/watch?v=WwzxcgKU_2c", type: 'video', editor: 'Premiere Pro' },
      { id: 12, title: "YouTube Video 8", video_url: "https://www.youtube.com/watch?v=arjK0I-HzkM", type: 'video', editor: 'Premiere Pro' },
      { id: 13, title: "YouTube Video 9", video_url: "https://www.youtube.com/watch?v=K_t8o9vKT70", type: 'video', editor: 'Premiere Pro' },
      { id: 14, title: "YouTube Video 10", video_url: "https://www.youtube.com/watch?v=uVDxLbEfn1U", type: 'video', editor: 'Premiere Pro' },
      { id: 15, title: "YouTube Video 11", video_url: "https://www.youtube.com/watch?v=4GjFOSwf-hI", type: 'video', editor: 'Premiere Pro' },
    ];
    setProjects(staticProjects);
  }, [])

  

  const convertToEmbedUrl = (url) => {
    if (!url) return ''
    
    
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

  const videos = projects.filter(p => p.type === 'video');
  const shorts = projects.filter(p => p.type === 'short');

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Animated Squares Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction='diagonal'
          borderColor='rgba(155, 74, 254, 0.3)'
          hoverFillColor='rgba(155, 74, 254, 0.4)'
        />
      </div>
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

          <h2 className="text-2xl font-bold mb-4 text-secondary mt-8">YouTube Videos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {videos.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-card/50 rounded-xl overflow-hidden border border-highlight/30 hover:border-highlight transition-all cursor-pointer group"
                onClick={() => project.video_url && openVideoModal(project)}
              >
                <div className="relative overflow-hidden aspect-video bg-black">
                  {project.video_url && (
                    <iframe
                      src={convertToEmbedUrl(project.video_url)}
                      title={project.title}
                      className="w-full h-full object-cover absolute inset-0 rounded-t-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    ></iframe>
                  )}
                  {project.video_url && (
                    <div className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded shadow">
                      {project.editor}
                    </div>
                  )}
                  {/* Play button overlay for hint */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-opacity pointer-events-none">
                    <div className="bg-secondary rounded-full p-4 shadow-xl">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  
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

