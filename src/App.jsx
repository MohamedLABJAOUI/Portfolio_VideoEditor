import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MyWork from './pages/MyWork'
import Contact from './pages/Contact'

const AboutPage = () => {
  useEffect(() => {
   
    const timer = setTimeout(() => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const offset = 80 
        const elementPosition = aboutSection.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  )
}

function App() {
  return (
    
    <Router>
      <div className="min-h-screen bg-dark text-text">
        <Routes>
          
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={
            <>
              <Navbar />
              <MyWork />
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App

