import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Skills from './pages/Skills'
import MyWork from './pages/MyWork'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

// Component to handle /about route with scroll
const AboutPage = () => {
  useEffect(() => {
    // Scroll to about section after a short delay to ensure page is loaded
    const timer = setTimeout(() => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const offset = 80 // Navbar height
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
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-dark text-text">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={
              <>
                <Navbar />
                <Skills />
                <Footer />
              </>
            } />
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
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

