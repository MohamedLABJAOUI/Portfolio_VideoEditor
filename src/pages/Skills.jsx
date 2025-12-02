import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import api from '../api/axios'

const Skills = () => {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await api.get('/skills')
      if (response.data.success) {
        setSkills(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching skills:', error)
    }
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
            My <span className="text-secondary">Skills</span>
          </h1>
          <p className="text-text/70 text-center mb-12 max-w-2xl mx-auto">
            A selection of the tools and technologies I use to bring projects to life.
          </p>

          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                {/* Circular icon (image or initial) */}
                <div className="w-20 h-20 rounded-full bg-card/80 border border-highlight/40 flex items-center justify-center mb-4 shadow-lg shadow-black/30 overflow-hidden">
                  {skill.icon ? (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-secondary">
                      {skill.name?.[0] || '?'}
                    </span>
                  )}
                </div>

                {/* Skill title */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {skill.name}
                  {skill.level != null && (
                    <span className="ml-1 text-secondary text-sm">
                      ({skill.level}%)
                    </span>
                  )}
                </h3>

                {/* Description text */}
                <p className="text-sm text-text/70 max-w-xs">
                  {skill.description ||
                    `This skill represents my experience and confidence working with ${skill.name}.`}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Skills

