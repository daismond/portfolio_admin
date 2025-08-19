import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Save, X } from 'lucide-react'

const EducationForm = ({ education, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    degree: '',
    school: '',
    location: '',
    period: '',
    specialization: '',
    order_index: 0
  })

  useEffect(() => {
    if (education) {
      setFormData({
        degree: education.degree || '',
        school: education.school || '',
        location: education.location || '',
        period: education.period || '',
        specialization: education.specialization || '',
        order_index: education.order_index || 0
      })
    }
  }, [education])

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
        {education ? 'Modifier la formation' : 'Ajouter une formation'}
      </h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Diplôme/Formation *
            </label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: Master en Informatique, Licence Pro..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              École/Université *
            </label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: Université Paris-Saclay, EPITECH..."
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
              placeholder="Ex: Paris, France"
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
              placeholder="Ex: 2018 - 2020, Sept 2019 - Juin 2022"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Spécialisation/Mention
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: Développement Mobile, Intelligence Artificielle, Mention Très Bien..."
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
            {education ? 'Modifier' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EducationForm

