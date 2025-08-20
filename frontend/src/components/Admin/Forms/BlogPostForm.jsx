import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Save, X } from 'lucide-react'

const BlogPostForm = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    is_published: false
  })

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        is_published: post.is_published || false
      })
    }
  }, [post])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="bg-card p-6 rounded-lg border border-border mb-6">
      <h4 className="text-lg font-semibold mb-4">
        {post ? 'Modifier l\'article' : 'Ajouter un article'}
      </h4>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Titre *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
            placeholder="Titre de l'article"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Contenu *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
            placeholder="Écrivez votre article ici..."
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_published"
            id="is_published"
            checked={formData.is_published}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="is_published" className="ml-2 block text-sm text-foreground">
            Publié
          </label>
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
            {post ? 'Modifier' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogPostForm
