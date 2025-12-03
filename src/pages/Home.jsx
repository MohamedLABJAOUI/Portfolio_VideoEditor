import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import CircularText from '../components/CircularText'
import Squares from '../components/Squares'
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
import skill12 from '../assets/skills/skill12.png';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const Home = () => {
  const windowSize = useWindowSize()
  const isMobile = windowSize.width < 768
  const circularSize = isMobile ? 280 : 400

  const [content, setContent] = useState({
    name: 'Ismail Sanouni',
    title: 'Video Editor & Motion Designer',
    slogan: 'Transforming ideas into compelling visual stories with precision, creativity, and technical mastery. From concept to final cut, I bring your vision to life through innovative editing, seamless storytelling, and cinematic-quality production.',
    about: `I am a Video Editor and Content Creator dedicated to helping YouTubers turn raw footage into dynamic, engaging, and professional videos. I specialize in smooth storytelling, precise cuts, and captivating visuals that keep audiences hooked from start to finish.

Whether it’s gaming, vlogs, tech, or tutorials, I deliver fast, high-quality edits tailored to your unique style, ensuring your content stands out and resonates with viewers.`
  })

  const skillsArr = [
    { icon: skill01, name: 'Adobe Premiere Pro', description: 'Industry-standard video editing software for fast, precise edits and professional output.' },
    { icon: skill02, name: 'Adobe After Effects', description: 'Professional motion graphics and visual effects software for creating dynamic compositions and stunning animations.' },
    { icon: skill03, name: 'Adobe Illustrator', description: 'Professional vector graphics software for designing precise, scalable illustrations, logos, and graphics.' },
    { icon: skill04, name: 'Canva Pro', description: 'Easy-to-use online design tool for quickly creating visuals, presentations, and engaging content.' },
    { icon: skill05, name: 'Adobe Photoshop', description: 'Professional image editing and creation software for precise and creative visuals.' },
    { icon: skill06, name: 'Final Cut Pro', description: 'Professional video editing software for fast, precise, and cinematic-quality edits.' },
    { icon: skill07, name: 'DaVinci Resolve', description: 'Professional video editing and color grading software for precise, cinematic-quality videos.' },
    { icon: skill08, name: 'Avid Media Composer', description: 'Professional video editing software used in film and TV for precise, collaborative editing.' },
    { icon: skill09, name: 'Adobe Lightroom', description: 'Professional photo editing software to quickly adjust, organize, and enhance your images.' },
    { icon: skill10, name: 'Adobe Audition', description: 'Professional audio editing and mixing software for clear, precise, studio-quality sound.' },
    { icon: skill11, name: 'Color Grading', description: 'Professional technique to adjust colors and mood in a video for a consistent and impactful visual look.' },
    { icon: skill12, name: 'YouTube Advertising', description: 'YouTube advertising to reach a wide audience, increase visibility, and drive effective conversions.' }

  ];

  

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      
      <div className="fixed inset-0 z-0 opacity-30">
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction='diagonal'
          borderColor='rgba(155, 74, 254, 0.3)'
          hoverFillColor='rgba(155, 74, 254, 0.4)'
        />
      </div>
      
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <motion.div 
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Hi, I'm{' '}
              <span className="text-secondary">{content.name}</span>
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl text-text/80 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {content.title}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-text/70 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {content.slogan}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link
                to="/work"
                className="px-8 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all transform hover:scale-105"
              >
                My Work
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white transition-all transform hover:scale-105"
              >
                Contact
              </Link>
            </motion.div>
          </motion.div>

          
          <motion.div 
            className="flex-1 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative flex items-center justify-center">
              
              <div className="absolute" style={{ width: `${circularSize}px`, height: `${circularSize}px` }}>
                <CircularText
                  text="VIDEO EDITOR * MOTION DESIGNER * CREATIVE *"
                  onHover="speedUp"
                  spinDuration={20}
                  size={circularSize}
                  className="w-full h-full"
                />
              </div>
              
              
              <div className="relative z-10">
                <div className="absolute inset-0 bg-secondary rounded-full blur-2xl opacity-20"></div>
                <img
                  src="/profileismail.jpeg"
                  alt={content.name}
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-secondary"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

     
      <section id="about" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-12 text-center">
              About <span className="text-secondary">Me</span>
            </h1>
            
            <div 
              className="relative p-8 md:p-12 mt-12 rounded-2xl"
              style={{
                border: '2px solid rgba(155, 74, 254, 0.3)',
                background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(53, 42, 135, 0.3) 100%)',
                boxShadow: '0 8px 32px rgba(155, 74, 254, 0.1), inset 0 0 0 1px rgba(207, 174, 255, 0.1)'
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full rounded-2xl opacity-20"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(155, 74, 254, 0.2) 0%, transparent 70%)'
                }}
              />
              <div className="relative z-10">
                <p className="text-lg md:text-xl text-text leading-relaxed whitespace-pre-line">
                  {content.about || 'Loading...'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      
      <section id="skills" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              My <span className="text-secondary">Skills</span>
            </h2>
            <p className="text-text/70 text-center mb-12 max-w-2xl mx-auto">
              A selection of the tools and technologies I use to bring projects to life.
            </p>

            <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {skillsArr.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="flex flex-col items-center text-center"
                >
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

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {skill.name}
                  </h3>

                  <p className="text-sm text-text/70 max-w-xs">
                    {skill.description ||
                      `This skill represents my experience and confidence working with ${skill.name}.`}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

