import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Settings, 
  Code, 
  Briefcase, 
  GraduationCap, 
  FolderOpen,
  LogOut,
  Save,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('personal')
  const [data, setData] = useState({
    personalInfo: null,
    skills: [],
    projects: [],
    experiences: [],
    education: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const tabs = [
    { id: 'personal', label: 'Infos Personnelles', icon: User },
    { id: 'skills', label: 'Compétences', icon: Code },
    { id: 'projects', label: 'Projets', icon: FolderOpen },
    { id: 'experiences', label: 'Expériences', icon: Briefcase },
    { id: 'education', label: 'Formation', icon: GraduationCap }
  ]

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token')
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const endpoints = [
        "https://xlhyimcl6wjk.manus.space/api/personal-info",
        "https://xlhyimcl6wjk.manus.space/api/skills",
        "https://xlhyimcl6wjk.manus.space/api/projects",
        "https://xlhyimcl6wjk.manus.space/api/experiences",
        "https://xlhyimcl6wjk.manus.space/api/education"
      ]

      const responses = await Promise.all(
        endpoints.map(endpoint => fetch(endpoint))
      )

      const results = await Promise.all(
        responses.map(response => response.json())
      )

      setData({
        personalInfo: results[0],
        skills: results[1],
        projects: results[2],
        experiences: results[3],
        education: results[4]
      })
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    onLogout()
  }

  const savePersonalInfo = async (formData) => {
    setIsSaving(true)
    try {
      const response = await fetch("https://xlhyimcl6wjk.manus.space/api/personal-info", {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const updatedData = await response.json()
        setData(prev => ({ ...prev, personalInfo: updatedData }))
        alert('Informations sauvegardées avec succès!')
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setIsSaving(false)
    }
  }

  const PersonalInfoForm = () => {
    const [formData, setFormData] = useState(data.personalInfo || {
      name: '',
      title: '',
      description: '',
      email: '',
      phone: '',
      location: '',
      github_url: '',
      linkedin_url: '',
      twitter_url: ''
    })

    useEffect(() => {
      if (data.personalInfo) {
        setFormData(data.personalInfo)
      }
    }, [data.personalInfo])

    const handleSubmit = (e) => {
      e.preventDefault()
      savePersonalInfo(formData)
    }

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Titre professionnel
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Localisation
            </label>
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              name="github_url"
              value={formData.github_url || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin_url"
              value={formData.linkedin_url || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Twitter URL
            </label>
            <input
              type="url"
              name="twitter_url"
              value={formData.twitter_url || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 hover-glow disabled:opacity-50"
          >
            {isSaving ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                Sauvegarde...
              </div>
            ) : (
              <div className="flex items-center">
                <Save size={20} className="mr-2" />
                Sauvegarder
              </div>
            )}
          </Button>
        </div>
      </form>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm />
      case 'skills':
        return <div className="text-center py-8 text-muted-foreground">Gestion des compétences - En développement</div>
      case 'projects':
        return <div className="text-center py-8 text-muted-foreground">Gestion des projets - En développement</div>
      case 'experiences':
        return <div className="text-center py-8 text-muted-foreground">Gestion des expériences - En développement</div>
      case 'education':
        return <div className="text-center py-8 text-muted-foreground">Gestion de la formation - En développement</div>
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des données...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings size={24} className="text-primary mr-3" />
              <h1 className="text-xl font-bold gradient-text">
                Administration Portfolio
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => window.open('/', '_blank')}
                variant="outline"
                className="border-border hover:bg-accent"
              >
                <Eye size={20} className="mr-2" />
                Voir le site
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <LogOut size={20} className="mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground neon-border'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                  >
                    <Icon size={20} className="mr-3" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card p-6 rounded-lg neon-border"
            >
              <h2 className="text-2xl font-bold gradient-text mb-6">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

