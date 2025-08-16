import React from 'react'
import { motion } from 'framer-motion'
import { Code, Smartphone, Zap, Users } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Code,
      title: 'Code de Qualité',
      description: 'J\'écris du code propre, maintenable et optimisé selon les meilleures pratiques.'
    },
    {
      icon: Smartphone,
      title: 'Multi-Plateforme',
      description: 'Expertise en développement natif iOS/Android et solutions cross-platform.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Applications rapides et fluides avec une attention particulière à l\'UX.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Travail en équipe agile avec une communication claire et efficace.'
    }
  ]

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
            <span className="gradient-text">À Propos de Moi</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texte de présentation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
              Passionné par l'innovation mobile
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Avec plus de 5 ans d'expérience dans le développement mobile, je me spécialise 
              dans la création d'applications iOS et Android performantes et intuitives. 
              Ma passion pour les nouvelles technologies me pousse constamment à explorer 
              les dernières innovations du secteur.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              J'ai eu l'opportunité de travailler sur des projets variés, des startups 
              innovantes aux grandes entreprises, en développant des solutions mobiles 
              qui touchent des millions d'utilisateurs. Mon approche combine expertise 
              technique et vision produit pour créer des expériences utilisateur exceptionnelles.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium neon-border"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Grille des caractéristiques */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card p-6 rounded-lg neon-border hover-glow group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/30 transition-colors">
                    <feature.icon size={24} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border"
        >
          {[
            { number: '50+', label: 'Projets Réalisés' },
            { number: '5+', label: 'Années d\'Expérience' },
            { number: '1M+', label: 'Utilisateurs Touchés' },
            { number: '98%', label: 'Satisfaction Client' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About

