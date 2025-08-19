import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Save, X } from 'lucide-react'

const SkillForm = ({ skill, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: 50,
    color: '#00bcd4',
    order_index: 0
  })

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || '',
        category: skill.category || '',
        level: skill.level || 50,
        color: skill.color || '#00bcd4',
        order_index: skill.order_index || 0
      })
    }
  }, [skill])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="bg-card p-6 rounded-lg border border-border mb-6">
      <h4 className="text-lg font-semibold mb-4">
        {skill ? 'Modifier la compétence' : 'Ajouter une compétence'}
      </h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nom de la compétence *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: React, Flutter, Python..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Catégorie *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Mobile">Mobile</option>
              <option value="Database">Base de données</option>
              <option value="DevOps">DevOps</option>
              <option value="Design">Design</option>
              <option value="Tools">Outils</option>
              <option value="Other">Autre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Niveau (%) *
            </label>
            <input
              type="range"
              name="level"
              min="0"
              max="100"
              value={formData.level}
              onChange={handleChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>0%</span>
              <span className="font-medium text-primary">{formData.level}%</span>
              <span>100%</span>
            </div>
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
            {skill ? 'Modifier' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SkillForm

