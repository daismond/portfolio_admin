import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { API_BASE_URL } from '@/config'
import { Skeleton } from '@/components/ui/skeleton'

const SkillCategorySkeleton = () => (
  <div className="bg-card p-8 rounded-lg neon-border">
    <Skeleton className="h-8 w-3/4 mx-auto mb-8" />
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-1/4" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
      ))}
    </div>
  </div>
)

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchSkills = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/skills`)
          const data = await response.json()
          setSkills(data)
        } catch (error) {
          console.error('Erreur lors du chargement des compétences:', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchSkills()
    }, 1000) // Simulate loading for 1 second
    return () => clearTimeout(timer)
  }, [])

  const skillCategories = skills.reduce((acc, skill) => {
    const category = skill.category || 'Autres'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {})

  const colors = ['#61DAFB', '#FA7343', '#7F52FF', '#02569B', '#3498DB', '#F7DF1E', '#339933', '#000000', '#E10098', '#FFCA28', '#47A248', '#336791', '#FF9900', '#2496ED', '#F05032', '#00D4FF', '#FF6B35', '#8DD6F9', '#F24E1E']

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Mes Compétences</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une expertise technique complète pour créer des applications mobiles 
            performantes et innovantes
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <SkillCategorySkeleton key={index} />
            ))
          ) : (
            Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-lg neon-border hover-glow"
              >
                <h3 className="text-2xl font-semibold mb-8 text-center gradient-text">
                  {category}
                </h3>

                <div className="space-y-6">
                  {skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: categoryIndex * 0.2 + skillIndex * 0.1
                      }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full relative"
                          style={{
                            background: `linear-gradient(90deg, ${colors[skillIndex % colors.length]}, ${colors[skillIndex % colors.length]}80)`
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1.5,
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: "easeOut"
                          }}
                          viewport={{ once: true }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Certifications et formations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 gradient-text">
            Certifications & Formations
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Google Developer Certified',
                subtitle: 'Android Development',
                year: '2023'
              },
              {
                title: 'Apple Developer Program',
                subtitle: 'iOS Development',
                year: '2022'
              },
              {
                title: 'AWS Certified',
                subtitle: 'Cloud Practitioner',
                year: '2023'
              }
            ].map((cert, index) => (
              <motion.div
                key={cert.title}
                className="bg-card p-6 rounded-lg neon-border hover-glow"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{cert.year}</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {cert.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {cert.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

