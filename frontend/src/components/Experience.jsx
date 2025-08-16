import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase, Award } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Lead Mobile Developer',
      company: 'TechInnovate Solutions',
      location: 'Paris, France',
      period: '2022 - Présent',
      type: 'CDI',
      description: 'Direction de l\'équipe mobile et développement d\'applications innovantes pour des clients internationaux.',
      achievements: [
        'Management d\'une équipe de 6 développeurs mobiles',
        'Développement de 15+ applications mobiles à succès',
        'Mise en place d\'une architecture micro-services',
        'Amélioration des performances de 40% sur les apps existantes'
      ],
      technologies: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'AWS'],
      color: '#00D4FF'
    },
    {
      id: 2,
      title: 'Senior Mobile Developer',
      company: 'StartupLab',
      location: 'Lyon, France',
      period: '2020 - 2022',
      type: 'CDI',
      description: 'Développement d\'applications mobiles pour startups en phase de croissance rapide.',
      achievements: [
        'Développement de 8 applications mobiles de zéro',
        'Intégration de solutions de paiement complexes',
        'Optimisation des performances et de l\'UX',
        'Formation de développeurs juniors'
      ],
      technologies: ['Flutter', 'React Native', 'Node.js', 'MongoDB', 'Stripe'],
      color: '#FF6B35'
    },
    {
      id: 3,
      title: 'Mobile Developer',
      company: 'DigitalCorp',
      location: 'Marseille, France',
      period: '2019 - 2020',
      type: 'CDI',
      description: 'Développement d\'applications mobiles pour des clients du secteur bancaire et financier.',
      achievements: [
        'Développement d\'apps bancaires sécurisées',
        'Implémentation de l\'authentification biométrique',
        'Respect des normes de sécurité bancaire',
        'Tests automatisés et intégration continue'
      ],
      technologies: ['Swift', 'Kotlin', 'Java', 'SQLite', 'REST APIs'],
      color: '#8B5CF6'
    },
    {
      id: 4,
      title: 'Junior Mobile Developer',
      company: 'WebAgency Pro',
      location: 'Nice, France',
      period: '2018 - 2019',
      type: 'CDI',
      description: 'Premier poste en développement mobile, focus sur l\'apprentissage et la contribution aux projets clients.',
      achievements: [
        'Développement de 5 applications mobiles',
        'Apprentissage des bonnes pratiques',
        'Collaboration étroite avec les designers UX/UI',
        'Participation aux code reviews'
      ],
      technologies: ['React Native', 'JavaScript', 'Firebase', 'Git'],
      color: '#10B981'
    }
  ]

  const education = [
    {
      degree: 'Master en Informatique',
      school: 'École Supérieure d\'Informatique',
      location: 'Paris, France',
      period: '2016 - 2018',
      specialization: 'Spécialisation Développement Mobile et Applications Distribuées'
    },
    {
      degree: 'Licence Informatique',
      school: 'Université de Technologie',
      location: 'Lyon, France',
      period: '2013 - 2016',
      specialization: 'Programmation et Systèmes d\'Information'
    }
  ]

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

            {experiences.map((exp, index) => (
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
                  style={{ backgroundColor: exp.color }}
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

                  {/* Réalisations */}
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                      <Award size={16} className="mr-2 text-secondary" />
                      Principales réalisations:
                    </h5>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium neon-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
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
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
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
            ))}
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

