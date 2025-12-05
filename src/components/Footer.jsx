import { useEffect, useState } from 'react'


const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({
    email: '',
    instagram: '',
    linkedin: '',
    x: ''
  })

  useEffect(() => {
    setSocialLinks({
      instagram: 'https://www.instagram.com/ismailsn_12',
      linkedin: 'https://www.linkedin.com/in/ismailsanouni/',
      x: 'https://twitter.com/ismailsanouni'
    })
  }, [])


  const socialIcons = [
    {
      name: 'Instagram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: socialLinks.instagram,
      color: 'hover:text-pink-500'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: socialLinks.linkedin,
      color: 'hover:text-blue-500'
    },
    {
      name: 'X (Twitter)',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: socialLinks.x,
      color: 'hover:text-gray-300'
    }
  ]

  return (
    <footer className="bg-dark border-t border-highlight/30 py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-6">
          
          <div className="flex items-center justify-center gap-6">
            {socialIcons.map((social) => {
              if (!social.url) return null
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-text/60 ${social.color} transition-all transform hover:scale-110`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              )
            })}
          </div>
          
          <div className="flex flex-col items-center gap-2 mt-6">
          <p className="text-text/60 text-center">
            © {new Date().getFullYear()} Ismail Sanouni. All rights reserved.
          </p>
            <span className="flex items-center gap-2 text-xl font-semibold text-white tracking-wide">
              Developed by <span className="text-secondary font-bold">Mohamed Labjaoui</span>
              <span title="Verified" className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 bg-opacity-90">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.5c.516 0 1.021.141 1.45.406l1.01.647c.292.187.662.187.954 0l1.01-.647A2.5 2.5 0 0 1 17.5 3.2l-.08 1.205c-.03.445.122.89.425 1.203l.91.917a2.5 2.5 0 0 1-.208 3.575l-.948.638a1.167 1.167 0 0 0-.419 1.321l.308 1.1a2.5 2.5 0 0 1-2.068 3.155l-1.193.207a.968.968 0 0 0-.723.542L11 17a2.5 2.5 0 0 1-2 0l-.798-1.385a.968.968 0 0 0-.723-.542l-1.193-.206a2.5 2.5 0 0 1-2.068-3.156l.308-1.1a1.167 1.167 0 0 0-.418-1.32l-.948-.639A2.5 2.5 0 0 1 2.246 6.52l.91-.917a1.51 1.51 0 0 0 .425-1.204l-.08-1.204A2.5 2.5 0 0 1 5.576 2.55l1.01.647c.292.187.662.187.954 0l1.01-.647A2.5 2.5 0 0 1 10 1.5Zm2.472 7.31a.75.75 0 0 0-1.194-.91L9.31 10.143 8.717 9.58a.75.75 0 0 0-1.025 1.095l1.146 1.073a.75.75 0 0 0 1.087-.1l2.548-3.837Z" clipRule="evenodd" />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

