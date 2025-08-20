import React from 'react'
import { motion } from 'framer-motion'
import { FolderOpen, Code, Briefcase, GraduationCap } from 'lucide-react'

const StatCard = ({ icon: Icon, title, value, color }) => (
  <motion.div
    className="bg-card p-6 rounded-lg neon-border flex items-center space-x-4"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <div className={`w-16 h-16 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}20`}}>
      <Icon size={32} style={{ color }} />
    </div>
    <div>
      <p className="text-muted-foreground">{title}</p>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </div>
  </motion.div>
)

const Dashboard = ({ data }) => {
  const stats = [
    {
      title: 'Projets',
      value: data.projects.length,
      icon: FolderOpen,
      color: '#3b82f6'
    },
    {
      title: 'Compétences',
      value: data.skills.length,
      icon: Code,
      color: '#10b981'
    },
    {
      title: 'Expériences',
      value: data.experiences.length,
      icon: Briefcase,
      color: '#f97316'
    },
    {
      title: 'Formations',
      value: data.education.length,
      icon: GraduationCap,
      color: '#8b5cf6'
    }
  ]

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
