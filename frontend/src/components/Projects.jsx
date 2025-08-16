import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Smartphone, Star, Users, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'EcoTrack',
      category: 'react-native',
      description: 'Application de suivi écologique permettant aux utilisateurs de monitorer leur empreinte carbone quotidienne.',
      image: '/src/assets/images/mobile_app_dev.png',
      technologies: ['React Native', 'Firebase', 'Redux', 'Maps API'],
      features: ['Géolocalisation', 'Analytics', 'Notifications Push', 'Mode Offline'],
      stats: {
        downloads: '50K+',
        rating: 4.8,
        users: '25K+'
      },
      links: {
        github: '#',
        demo: '#',
        store: '#'
      },
      status: 'Publié'
    },
    {
      id: 2,
      title: 'FitnessPro',
      category: 'native',
      description: 'Application de fitness complète avec suivi d\'entraînements, plans personnalisés et communauté.',
      image: '/src/assets/images/mobile_app_dev.png',
      technologies: ['Swift', 'Kotlin', 'Core Data', 'HealthKit'],
      features: ['Suivi Santé', 'Plans Personnalisés', 'Communauté', 'Wearables'],
      stats: {
        downloads: '100K+',
        rating: 4.9,
        users: '75K+'
      },
      links: {
        github: '#',
        demo: '#',
        store: '#'
      },
      status: 'Publié'
    },
    {
      id: 3,
      title: 'CryptoWallet',
      category: 'flutter',
      description: 'Portefeuille crypto sécurisé avec trading en temps réel et analytics avancés.',
      image: '/src/assets/images/mobile_app_dev.png',
      technologies: ['Flutter', 'Dart', 'Blockchain API', 'Biometrics'],
      features: ['Trading', 'Sécurité Biométrique', 'Analytics', 'Multi-devises'],
      stats: {
        downloads: '30K+',
        rating: 4.7,
        users: '15K+'
      },
      links: {
        github: '#',
        demo: '#',
        store: '#'
      },
      status: 'En développement'
    },
    {
      id: 4,
      title: 'FoodDelivery',
      category: 'react-native',
      description: 'Plateforme de livraison de nourriture avec géolocalisation en temps réel et paiements intégrés.',
      image: '/src/assets/images/mobile_app_dev.png',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe'],
      features: ['Géolocalisation', 'Paiements', 'Chat en temps réel', 'Notifications'],
      stats: {
        downloads: '200K+',
        rating: 4.6,
        users: '120K+'
      },
      links: {
        github: '#',
        demo: '#',
        store: '#'
      },
      status: 'Publié'
    }
  ]

  const filters = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'react-native', label: 'React Native' },
    { id: 'native', label: 'Natif iOS/Android' },
    { id: 'flutter', label: 'Flutter' }
  ]

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
          {filteredProjects.map((project, index) => (
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
                  src={project.image}
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
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Fonctionnalités */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Fonctionnalités clés:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-background/50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Download size={14} className="text-primary mr-1" />
                      <span className="text-sm font-semibold text-foreground">
                        {project.stats.downloads}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">Téléchargements</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star size={14} className="text-yellow-400 mr-1" />
                      <span className="text-sm font-semibold text-foreground">
                        {project.stats.rating}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">Note</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users size={14} className="text-green-400 mr-1" />
                      <span className="text-sm font-semibold text-foreground">
                        {project.stats.users}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">Utilisateurs</span>
                  </div>
                </div>

                {/* Liens */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground neon-border"
                    asChild
                  >
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    asChild
                  >
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="mr-2" />
                      Démo
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
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

