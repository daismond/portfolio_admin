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
import SkillForm from './Forms/SkillForm'
import ProjectForm from './Forms/ProjectForm'
import ExperienceForm from './Forms/ExperienceForm'
import EducationForm from './Forms/EducationForm'
import { API_BASE_URL } from '@/config'

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
        "personal-info",
        "skills",
        "projects",
        "experiences",
        "education"
      ].map(e => `${API_BASE_URL}/api/${e}`)

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
      const response = await fetch(`${API_BASE_URL}/api/personal-info`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const updatedData = await response.json()
        setData(prev => ({ ...prev, personalInfo: updatedData }))
        window.dispatchEvent(new Event('data-changed'))
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

  // Composant de gestion des compétences
  const SkillsManagement = () => {
    const [skills, setSkills] = useState(data.skills || [])
    const [editingSkill, setEditingSkill] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const handleSaveSkill = async (skillData) => {
      try {
        const url = editingSkill 
          ? `${API_BASE_URL}/api/skills/${editingSkill.id}`
          : `${API_BASE_URL}/api/skills`
        
        const response = await fetch(url, {
          method: editingSkill ? 'PUT' : 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(skillData)
        })

        if (response.ok) {
          const savedSkill = await response.json()
          if (editingSkill) {
            setSkills(skills.map(s => s.id === savedSkill.id ? savedSkill : s))
          } else {
            setSkills([...skills, savedSkill])
          }
          setEditingSkill(null)
          setShowForm(false)
          window.dispatchEvent(new Event('data-changed'))
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error)
      }
    }

    const handleDeleteSkill = async (skillId) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/skills/${skillId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          })

          if (response.ok) {
            setSkills(skills.filter(s => s.id !== skillId))
            window.dispatchEvent(new Event('data-changed'))
          }
        } catch (error) {
          console.error('Erreur lors de la suppression:', error)
        }
      }
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Gestion des Compétences</h3>
          <Button
            onClick={() => {
              setEditingSkill(null)
              setShowForm(true)
            }}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus size={20} className="mr-2" />
            Ajouter une compétence
          </Button>
        </div>

        {showForm && (
          <SkillForm
            skill={editingSkill}
            onSave={handleSaveSkill}
            onCancel={() => {
              setShowForm(false)
              setEditingSkill(null)
            }}
          />
        )}

        <div className="grid gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-accent/50 p-4 rounded-lg border border-border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{skill.name}</h4>
                  <p className="text-sm text-muted-foreground">{skill.category}</p>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Niveau: {skill.level}%</span>
                      <div className="flex-1 bg-background rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-primary" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingSkill(skill)
                      setShowForm(true)
                    }}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Composant de gestion des projets
  const ProjectsManagement = () => {
    const [projects, setProjects] = useState(data.projects || [])
    const [editingProject, setEditingProject] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const handleSaveProject = async (projectData) => {
      try {
        const url = editingProject 
          ? `${API_BASE_URL}/api/projects/${editingProject.id}`
          : `${API_BASE_URL}/api/projects`
        
        const response = await fetch(url, {
          method: editingProject ? 'PUT' : 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(projectData)
        })

        if (response.ok) {
          const savedProject = await response.json()
          if (editingProject) {
            setProjects(projects.map(p => p.id === savedProject.id ? savedProject : p))
          } else {
            setProjects([...projects, savedProject])
          }
          setEditingProject(null)
          setShowForm(false)
          window.dispatchEvent(new Event('data-changed'))
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error)
      }
    }

    const handleDeleteProject = async (projectId) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          })

          if (response.ok) {
            setProjects(projects.filter(p => p.id !== projectId))
            window.dispatchEvent(new Event('data-changed'))
          }
        } catch (error) {
          console.error('Erreur lors de la suppression:', error)
        }
      }
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Gestion des Projets</h3>
          <Button
            onClick={() => {
              setEditingProject(null)
              setShowForm(true)
            }}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus size={20} className="mr-2" />
            Ajouter un projet
          </Button>
        </div>

        {showForm && (
          <ProjectForm
            project={editingProject}
            onSave={handleSaveProject}
            onCancel={() => {
              setShowForm(false)
              setEditingProject(null)
            }}
          />
        )}

        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-accent/50 p-4 rounded-lg border border-border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{project.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{project.category}</p>
                  <p className="text-sm text-foreground">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(() => {
                      try {
                        return JSON.parse(project.technologies).map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                            {tech}
                          </span>
                        ));
                      } catch (e) {
                        return (project.technologies || '').split(',').map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                            {tech.trim()}
                          </span>
                        ));
                      }
                    })()}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingProject(project)
                      setShowForm(true)
                    }}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Composant de gestion des expériences
  const ExperiencesManagement = () => {
    const [experiences, setExperiences] = useState(data.experiences || [])
    const [editingExperience, setEditingExperience] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const handleSaveExperience = async (experienceData) => {
      try {
        const url = editingExperience 
          ? `${API_BASE_URL}/api/experiences/${editingExperience.id}`
          : `${API_BASE_URL}/api/experiences`
        
        const response = await fetch(url, {
          method: editingExperience ? 'PUT' : 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(experienceData)
        })

        if (response.ok) {
          const savedExperience = await response.json()
          if (editingExperience) {
            setExperiences(experiences.map(e => e.id === savedExperience.id ? savedExperience : e))
          } else {
            setExperiences([...experiences, savedExperience])
          }
          setEditingExperience(null)
          setShowForm(false)
          window.dispatchEvent(new Event('data-changed'))
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error)
      }
    }

    const handleDeleteExperience = async (experienceId) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/experiences/${experienceId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          })

          if (response.ok) {
            setExperiences(experiences.filter(e => e.id !== experienceId))
            window.dispatchEvent(new Event('data-changed'))
          }
        } catch (error) {
          console.error('Erreur lors de la suppression:', error)
        }
      }
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Gestion des Expériences</h3>
          <Button
            onClick={() => {
              setEditingExperience(null)
              setShowForm(true)
            }}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus size={20} className="mr-2" />
            Ajouter une expérience
          </Button>
        </div>

        {showForm && (
          <ExperienceForm
            experience={editingExperience}
            onSave={handleSaveExperience}
            onCancel={() => {
              setShowForm(false)
              setEditingExperience(null)
            }}
          />
        )}

        <div className="grid gap-4">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-accent/50 p-4 rounded-lg border border-border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{experience.title}</h4>
                  <p className="text-sm text-muted-foreground">{experience.company} • {experience.period}</p>
                  <p className="text-sm text-foreground mt-2">{experience.description}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingExperience(experience)
                      setShowForm(true)
                    }}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteExperience(experience.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Composant de gestion de l'éducation
  const EducationManagement = () => {
    const [education, setEducation] = useState(data.education || [])
    const [editingEducation, setEditingEducation] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const handleSaveEducation = async (educationData) => {
      try {
        const url = editingEducation 
          ? `${API_BASE_URL}/api/education/${editingEducation.id}`
          : `${API_BASE_URL}/api/education`
        
        const response = await fetch(url, {
          method: editingEducation ? 'PUT' : 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(educationData)
        })

        if (response.ok) {
          const savedEducation = await response.json()
          if (editingEducation) {
            setEducation(education.map(e => e.id === savedEducation.id ? savedEducation : e))
          } else {
            setEducation([...education, savedEducation])
          }
          setEditingEducation(null)
          setShowForm(false)
          window.dispatchEvent(new Event('data-changed'))
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error)
      }
    }

    const handleDeleteEducation = async (educationId) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/education/${educationId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          })

          if (response.ok) {
            setEducation(education.filter(e => e.id !== educationId))
            window.dispatchEvent(new Event('data-changed'))
          }
        } catch (error) {
          console.error('Erreur lors de la suppression:', error)
        }
      }
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Gestion de la Formation</h3>
          <Button
            onClick={() => {
              setEditingEducation(null)
              setShowForm(true)
            }}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus size={20} className="mr-2" />
            Ajouter une formation
          </Button>
        </div>

        {showForm && (
          <EducationForm
            education={editingEducation}
            onSave={handleSaveEducation}
            onCancel={() => {
              setShowForm(false)
              setEditingEducation(null)
            }}
          />
        )}

        <div className="grid gap-4">
          {education.map((edu) => (
            <div key={edu.id} className="bg-accent/50 p-4 rounded-lg border border-border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">{edu.school} • {edu.period}</p>
                  {edu.specialization && (
                    <p className="text-sm text-foreground mt-1">Spécialisation: {edu.specialization}</p>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingEducation(edu)
                      setShowForm(true)
                    }}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteEducation(edu.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm />
      case 'skills':
        return <SkillsManagement />
      case 'projects':
        return <ProjectsManagement />
      case 'experiences':
        return <ExperiencesManagement />
      case 'education':
        return <EducationManagement />
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

