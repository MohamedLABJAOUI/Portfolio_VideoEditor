import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { path: '/', label: 'Home', isHome: true },
    { path: '/about', label: 'About', isScroll: true, sectionId: 'about' },
    { path: '/skills', label: 'Skills', isScroll: true, sectionId: 'skills' },
    { path: '/contact', label: 'Contact' }
  ]

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const offset = 80 
    const elementPosition = section.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }

  const handleNavClick = (e, link) => {
    
    setIsMobileMenuOpen(false)

   
    if (link.isHome) {
      e.preventDefault()
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 100)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    
    if (link.isScroll && link.sectionId) {
      e.preventDefault()
      if (location.pathname === '/') {
        scrollToSection(link.sectionId)
      } else {
        
        navigate('/')
        setTimeout(() => {
          scrollToSection(link.sectionId)
        }, 150)
      }
    }
  }

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-highlight/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold"
            style={{
              color: '#9B4AFE',
            }}
          >
            Ismail Sanouni
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link)}
                style={{
                  color: location.pathname === link.path 
                    ? '#9B4AFE' 
                    : 'rgba(245, 245, 247, 0.7)',
                  textShadow: location.pathname === link.path 
                    ? '0 0 10px #CFAEFF, 0 0 20px #CFAEFF, 0 0 30px #CFAEFF'
                    : 'none'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          
          <div className="md:hidden">
            <button
              className="text-secondary focus:outline-none"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        
        {isMobileMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-2 bg-dark/95 border border-highlight/30 rounded-xl px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className="py-2 text-sm"
                  style={{
                    color: location.pathname === link.path
                      ? '#9B4AFE'
                      : 'rgba(245, 245, 247, 0.9)',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar

