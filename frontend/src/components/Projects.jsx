import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Smartphone, Star, Users, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { API_BASE_URL } from '@/config'
import { parseTechnologies } from '@/lib/utils'

const ProjectCardSkeleton = () => (
  <div className="bg-card rounded-lg overflow-hidden neon-border">
    <Skeleton className="h-48 w-full" />
    <div className="p-6">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="flex gap-3 mt-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  </div>
)

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchProjects = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/projects`)
          const data = await response.json()
          setProjects(data)
        } catch (error) {
          console.error('Erreur lors du chargement des projets:', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchProjects()
    }, 1000) // Simulate loading for 1 second
    return () => clearTimeout(timer)
  }, [])

  const filters = useMemo(() => [
    { id: 'all', label: 'Tous les projets' },
    ...Array.from(new Set(projects.map(p => p.category))).map(category => ({
      id: category,
      label: category
    }))
  ], [projects])

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Mes Projets</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez une sélection de mes applications mobiles les plus récentes, 
            chacune conçue avec passion et expertise technique
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground glow-effect'
                  : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground neon-border hover-glow'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Grille des projets */}
        <div className="grid md:grid-cols-2 gap-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg overflow-hidden neon-border hover-glow group"
                whileHover={{ scale: 1.02 }}
              >
                {/* Image du projet */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Publié'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <Smartphone size={20} className="text-primary" />
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {parseTechnologies(project.technologies).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Liens */}
                  <div className="flex gap-3 mt-6">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground neon-border"
                      asChild
                    >
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      asChild
                    >
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        Démo
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Intéressé par mes projets ? Discutons de votre prochaine application mobile !
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 hover-glow"
            onClick={() => {
              const element = document.querySelector('#contact')
              if (element) element.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Démarrer un projet
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

