import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Save, X, Plus, Trash2 } from 'lucide-react'
import { parseTechnologies, parseAchievements } from '@/lib/utils'

const ExperienceForm = ({ experience, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    period: '',
    employment_type: '',
    description: '',
    achievements: [],
    technologies: [],
    color: '#00bcd4',
    order_index: 0
  })

  const [newAchievement, setNewAchievement] = useState('')
  const [newTechnology, setNewTechnology] = useState('')

  useEffect(() => {
    if (experience) {
      setFormData({
        title: experience.title || '',
        company: experience.company || '',
        location: experience.location || '',
        period: experience.period || '',
        employment_type: experience.employment_type || '',
        description: experience.description || '',
        achievements: parseAchievements(experience.achievements),
        technologies: parseTechnologies(experience.technologies),
        color: experience.color || '#00bcd4',
        order_index: experience.order_index || 0
      })
    }
  }, [experience])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }))
  }

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }))
      setNewAchievement('')
    }
  }

  const removeAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }))
  }

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }))
      setNewTechnology('')
    }
  }

  const removeTechnology = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      achievements: JSON.stringify(formData.achievements),
      technologies: JSON.stringify(formData.technologies)
    })
  }

  return (
    <div className="bg-card p-6 rounded-lg border border-border mb-6">
      <h4 className="text-lg font-semibold mb-4">
        {experience ? 'Modifier l\'expérience' : 'Ajouter une expérience'}
      </h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Titre du poste *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: Développeur Mobile Senior"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Entreprise *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: Google, Microsoft, Startup XYZ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Localisation
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: Paris, France / Remote"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Période *
            </label>
            <input
              type="text"
              name="period"
              value={formData.period}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: Jan 2020 - Présent, 2019 - 2021"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Type d'emploi
            </label>
            <select
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
            >
              <option value="">Sélectionner un type</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Freelance">Freelance</option>
              <option value="Stage">Stage</option>
              <option value="Alternance">Alternance</option>
              <option value="Temps partiel">Temps partiel</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Couleur
            </label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full h-12 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Description détaillée du poste et des responsabilités..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Ordre d'affichage
            </label>
            <input
              type="number"
              name="order_index"
              value={formData.order_index}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="0"
            />
          </div>
        </div>

        {/* Achievements */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Réalisations principales
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              className="flex-1 px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: Augmentation des performances de 30%..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
            />
            <Button
              type="button"
              onClick={addAchievement}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus size={16} />
            </Button>
          </div>
          <div className="space-y-1">
            {formData.achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 bg-accent/50 rounded-lg"
              >
                <span className="text-sm text-foreground">{achievement}</span>
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Technologies utilisées
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              className="flex-1 px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: React Native, Flutter, Swift..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
            />
            <Button
              type="button"
              onClick={addTechnology}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus size={16} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-primary/20 text-primary text-sm rounded-full"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(index)}
                  className="ml-2 text-primary hover:text-primary/70"
                >
                  <Trash2 size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-border hover:bg-accent"
          >
            <X size={20} className="mr-2" />
            Annuler
          </Button>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Save size={20} className="mr-2" />
            {experience ? 'Modifier' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ExperienceForm

