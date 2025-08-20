import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'

// Composants
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import ParticleBackground from './components/ParticleBackground'
import AdminApp from './components/Admin/AdminApp'

function PortfolioHome() {
  const [dataVersion, setDataVersion] = useState(0)

  useEffect(() => {
    const handleDataChanged = () => {
      setDataVersion(prevVersion => prevVersion + 1)
    }

    window.addEventListener('data-changed', handleDataChanged)

    return () => {
      window.removeEventListener('data-changed', handleDataChanged)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
      <Navigation />
      
      <main>
        <section id="hero">
          <Hero key={dataVersion} />
        </section>
        
        <section id="about">
          <About key={dataVersion} />
        </section>
        
        <section id="skills">
          <Skills key={dataVersion} />
        </section>
        
        <section id="projects">
          <Projects key={dataVersion} />
        </section>
        
        <section id="experience">
          <Experience key={dataVersion} />
        </section>
        
        <section id="contact">
          <Contact key={dataVersion} />
        </section>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/admin" element={<AdminApp />} />
      </Routes>
    </Router>
  )
}

export default App

