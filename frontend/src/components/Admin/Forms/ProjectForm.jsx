import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Save, X, Plus, Trash2, Upload } from 'lucide-react'
import { parseTechnologies, parseFeatures } from '@/lib/utils'
import { API_BASE_URL } from '@/config'

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    technologies: [],
    features: [],
    downloads: '',
    rating: '',
    users: '',
    status: 'En développement',
    github_url: '',
    demo_url: '',
    store_url: '',
    order_index: 0
  })

  const [newTechnology, setNewTechnology] = useState('')
  const [newFeature, setNewFeature] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: uploadFormData,
      })
      const data = await response.json()
      if (response.ok) {
        setFormData(prev => ({ ...prev, image_url: data.url }))
      } else {
        alert(data.error || 'Erreur lors du téléchargement de l\'image.')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Erreur lors du téléchargement de l\'image.')
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        category: project.category || '',
        image_url: project.image_url || '',
        technologies: parseTechnologies(project.technologies),
        features: parseFeatures(project.features),
        downloads: project.downloads || '',
        rating: project.rating || '',
        users: project.users || '',
        status: project.status || 'En développement',
        github_url: project.github_url || '',
        demo_url: project.demo_url || '',
        store_url: project.store_url || '',
        order_index: project.order_index || 0
      })
    }
  }, [project])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
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

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }))
      setNewFeature('')
    }
  }

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      technologies: JSON.stringify(formData.technologies),
      features: JSON.stringify(formData.features)
    })
  }

  return (
    <div className="bg-card p-6 rounded-lg border border-border mb-6">
      <h4 className="text-lg font-semibold mb-4">
        {project ? 'Modifier le projet' : 'Ajouter un projet'}
      </h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Titre du projet *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: Application E-commerce"
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
              <option value="Mobile">Application Mobile</option>
              <option value="Web">Application Web</option>
              <option value="Desktop">Application Desktop</option>
              <option value="API">API/Backend</option>
              <option value="Game">Jeu</option>
              <option value="Other">Autre</option>
            </select>
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
              rows="3"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Description détaillée du projet..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Image du projet
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="image-upload"
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
                disabled={isUploading}
              />
              <label
                htmlFor="image-upload"
                className={`flex-1 cursor-pointer bg-input border border-border rounded-lg p-4 text-center text-muted-foreground hover:bg-accent transition-colors ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <div className="flex items-center justify-center">
                  <Upload size={20} className="mr-2" />
                  {isUploading ? 'Téléchargement...' : 'Cliquer pour télécharger'}
                </div>
              </label>
              {formData.image_url && (
                <img
                  src={formData.image_url.startsWith('/') ? `${API_BASE_URL}${formData.image_url}` : formData.image_url}
                  alt="Aperçu"
                  className="w-24 h-24 object-cover rounded-lg border border-border"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Statut
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
            >
              <option value="En développement">En développement</option>
              <option value="Terminé">Terminé</option>
              <option value="En pause">En pause</option>
              <option value="Publié">Publié</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Demo URL
            </label>
            <input
              type="url"
              name="demo_url"
              value={formData.demo_url}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="https://demo.example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Store URL
            </label>
            <input
              type="url"
              name="store_url"
              value={formData.store_url}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="https://play.google.com/store/apps/details?id=..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Téléchargements
            </label>
            <input
              type="text"
              name="downloads"
              value={formData.downloads}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: 10K+, 1M+"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Note
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="4.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Utilisateurs
            </label>
            <input
              type="text"
              name="users"
              value={formData.users}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: 50K+, 1M+"
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
              placeholder="Ex: React, Flutter, Node.js..."
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

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Fonctionnalités principales
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="flex-1 px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              placeholder="Ex: Authentification, Paiement en ligne..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <Button
              type="button"
              onClick={addFeature}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus size={16} />
            </Button>
          </div>
          <div className="space-y-1">
            {formData.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 bg-accent/50 rounded-lg"
              >
                <span className="text-sm text-foreground">{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
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
            {project ? 'Modifier' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm

