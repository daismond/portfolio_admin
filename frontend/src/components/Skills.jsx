import React from 'react'
import { motion } from 'framer-motion'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Développement Mobile',
      skills: [
        { name: 'React Native', level: 95, color: '#61DAFB' },
        { name: 'Swift (iOS)', level: 90, color: '#FA7343' },
        { name: 'Kotlin (Android)', level: 88, color: '#7F52FF' },
        { name: 'Flutter', level: 85, color: '#02569B' },
        { name: 'Xamarin', level: 75, color: '#3498DB' }
      ]
    },
    {
      title: 'Technologies Web',
      skills: [
        { name: 'JavaScript/TypeScript', level: 92, color: '#F7DF1E' },
        { name: 'React.js', level: 90, color: '#61DAFB' },
        { name: 'Node.js', level: 85, color: '#339933' },
        { name: 'Next.js', level: 82, color: '#000000' },
        { name: 'GraphQL', level: 78, color: '#E10098' }
      ]
    },
    {
      title: 'Backend & Base de Données',
      skills: [
        { name: 'Firebase', level: 90, color: '#FFCA28' },
        { name: 'MongoDB', level: 85, color: '#47A248' },
        { name: 'PostgreSQL', level: 80, color: '#336791' },
        { name: 'AWS', level: 75, color: '#FF9900' },
        { name: 'Docker', level: 70, color: '#2496ED' }
      ]
    },
    {
      title: 'Outils & Méthodologies',
      skills: [
        { name: 'Git/GitHub', level: 95, color: '#F05032' },
        { name: 'Agile/Scrum', level: 90, color: '#00D4FF' },
        { name: 'CI/CD', level: 85, color: '#FF6B35' },
        { name: 'Testing', level: 82, color: '#8DD6F9' },
        { name: 'Figma/Design', level: 78, color: '#F24E1E' }
      ]
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
            <span className="gradient-text">Mes Compétences</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une expertise technique complète pour créer des applications mobiles 
            performantes et innovantes
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg neon-border hover-glow"
            >
              <h3 className="text-2xl font-semibold mb-8 text-center gradient-text">
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
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
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` 
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
          ))}
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

