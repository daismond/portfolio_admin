import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase, Award } from 'lucide-react'
import { API_BASE_URL } from '@/config'
import { Skeleton } from '@/components/ui/skeleton'

const ExperienceSkeleton = () => (
  <div className="relative mb-12 ml-16">
    <div className="absolute -left-20 top-6 w-4 h-4 rounded-full border-4 border-background bg-muted"></div>
    <div className="bg-card p-6 rounded-lg neon-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex flex-col md:items-end mt-2 md:mt-0">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6 mt-2" />
    </div>
  </div>
)

const EducationSkeleton = () => (
  <div className="bg-card p-6 rounded-lg neon-border">
    <Skeleton className="h-6 w-3/4 mb-2" />
    <Skeleton className="h-5 w-1/2 mb-3" />
    <div className="flex items-center mb-3">
      <Skeleton className="h-4 w-24 mr-4" />
      <Skeleton className="h-4 w-24" />
    </div>
    <Skeleton className="h-4 w-full" />
  </div>
)

const Experience = () => {
  const [experiences, setExperiences] = useState([])
  const [education, setEducation] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchData = async () => {
        try {
          const [expResponse, eduResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/api/experiences`),
            fetch(`${API_BASE_URL}/api/education`)
          ])
          const expData = await expResponse.json()
          const eduData = await eduResponse.json()
          setExperiences(expData)
          setEducation(eduData)
        } catch (error) {
          console.error('Erreur lors du chargement des données:', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchData()
    }, 1000) // Simulate loading for 1 second
    return () => clearTimeout(timer)
  }, [])

  const colors = ['#00D4FF', '#FF6B35', '#8B5CF6', '#10B981']

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
            <span className="gradient-text">Mon Parcours</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un parcours riche en expériences variées, de la startup à la grande entreprise, 
            toujours avec la passion du développement mobile
          </p>
        </motion.div>

        {/* Expériences professionnelles */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-12 flex items-center"
          >
            <Briefcase className="mr-3 text-primary" size={28} />
            Expérience Professionnelle
          </motion.h3>

          <div className="relative">
            {/* Ligne de temps */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary"></div>

            {isLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <ExperienceSkeleton key={index} />
              ))
            ) : (
              experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative mb-12 ml-16"
                >
                  {/* Point sur la timeline */}
                  <div
                    className="absolute -left-20 top-6 w-4 h-4 rounded-full border-4 border-background"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></div>

                  {/* Carte d'expérience */}
                  <motion.div
                    className="bg-card p-6 rounded-lg neon-border hover-glow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-foreground mb-1">
                          {exp.title}
                        </h4>
                        <p className="text-lg text-primary font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end mt-2 md:mt-0">
                        <div className="flex items-center text-muted-foreground mb-1">
                          <Calendar size={16} className="mr-2" />
                          <span className="text-sm">{exp.period}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin size={16} className="mr-2" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {exp.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Formation */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-12 flex items-center"
          >
            <Award className="mr-3 text-secondary" size={28} />
            Formation
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <EducationSkeleton key={index} />
              ))
            ) : (
              education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-lg neon-border hover-glow"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {edu.degree}
                  </h4>
                  <p className="text-primary font-medium mb-2">
                    {edu.school}
                  </p>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm mr-4">{edu.period}</span>
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{edu.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {edu.specialization}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Résumé des compétences acquises */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-card/50 p-8 rounded-lg neon-border"
        >
          <h3 className="text-2xl font-semibold mb-6 gradient-text">
            Bilan de mon parcours
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: '5+', label: 'Années d\'expérience' },
              { number: '30+', label: 'Applications développées' },
              { number: '4', label: 'Entreprises différentes' },
              { number: '10+', label: 'Technologies maîtrisées' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience

