import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { API_BASE_URL } from '@/config'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'

const BlogPostPage = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blog/posts/${slug}`)
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error(`Erreur lors du chargement de l'article:`, error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold">Article non trouvé</h2>
          <Link to="/blog" className="text-primary hover:underline mt-4 inline-block">
            Retour au blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/blog" className="text-primary hover:underline mb-8 inline-flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Retour au blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {post.title}
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Publié le {new Date(post.created_at).toLocaleDateString()} par {post.author}
          </p>
          <div className="prose prose-invert max-w-none text-foreground leading-loose">
            {post.content}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogPostPage
