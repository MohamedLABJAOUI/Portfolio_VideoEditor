import { motion } from 'framer-motion'
import skill01 from '../assets/skills/skill01.png';
import skill02 from '../assets/skills/skill02.png';
import skill03 from '../assets/skills/skill03.png';
import skill04 from '../assets/skills/skill04.png';
import skill05 from '../assets/skills/skill05.png';
import skill06 from '../assets/skills/skill06.png';
import skill07 from '../assets/skills/skill07.png';
import skill08 from '../assets/skills/skill08.png';
import skill09 from '../assets/skills/skill09.png';
import skill10 from '../assets/skills/skill10.png';
import skill11 from '../assets/skills/skill11.png';

const skillsArr = [
  { icon: skill01, name: 'Adobe Premiere Pro', description: 'Industry-standard video editing software for fast, precise edits and professional-grade output.' },
  { icon: skill02, name: 'Adobe After Effects', description: 'simo ional motion graphics and visual effects software for creating dynamic compositions and stunning animations.' },
  { icon: skill03, name: 'DaVinci Resolve', description: 'Color grading and editing suite for cinematic looks and advanced post-production.' },
  { icon: skill04, name: 'Final Cut Pro', description: 'Apple’s professional editing platform for smooth workflows and top-quality videos.' },
  { icon: skill05, name: 'CapCut', description: 'Rapid smartphone and social video editing for quick turnarounds and trendy effects.' },
  { icon: skill06, name: 'Photoshop', description: 'Powerful photo editing and asset creation for thumbnails and video elements.' },
  { icon: skill07, name: 'YouTube Optimization', description: 'Editing for retention—thumbnails, pacing, and hooks to boost channel growth.' },
  { icon: skill08, name: 'Sound Design', description: 'Clean audio, music syncing, and sound effects for an immersive viewing experience.' },
  { icon: skill09, name: 'Creative Storytelling', description: 'Visual narratives that make your videos memorable and binge-worthy.' },
  { icon: skill10, name: 'Multicam Editing', description: 'Sync and edit multiple camera angles for polished vlogs and podcasts.' },
  { icon: skill11, name: 'Fast Turnarounds', description: 'Efficient project delivery without sacrificing quality—always on schedule.' },
];

const Skills = () => {
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
            {skillsArr.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-card/80 border border-highlight/40 flex items-center justify-center mb-4 shadow-lg shadow-black/30 overflow-hidden">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {skill.name}
                </h3>
                <p className="text-sm text-text/70 max-w-xs">
                  {skill.description}
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

