import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import api from '../api/axios'

const About = () => {
  const [content, setContent] = useState({
    about: 'I am a passionate video editor with a diploma in electronics. My journey combines technical knowledge with creative storytelling, allowing me to deliver high-quality video content that captivates audiences. With expertise in professional editing software and a strong foundation in electronics, I bring a unique perspective to every project.'
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await api.get('/content')
      if (response.data.success) {
        setContent(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-4 text-center">
            About <span className="text-secondary">Me</span>
          </h1>
          
          <div className="bg-card/50 rounded-2xl p-8 md:p-12 mt-12 border border-card">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-text leading-relaxed whitespace-pre-line">
                {content.about || 'Loading...'}
              </p>
            </div>
            
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-lg p-6 border border-card/50"
              >
                <h3 className="text-xl font-semibold text-secondary mb-3">My Journey</h3>
                <p className="text-text/70">
                  Starting with a passion for both technology and creativity, I've combined my 
                  electronics background with video editing expertise to create compelling visual stories.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-lg p-6 border border-card/50"
              >
                <h3 className="text-xl font-semibold text-secondary mb-3">Education</h3>
                <p className="text-text/70">
                  Diploma in Electronics - Providing me with a strong technical foundation 
                  that enhances my understanding of video technology and equipment.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About

