import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '@/config'
import { Skeleton } from '@/components/ui/skeleton'

const BlogPostCard = ({ post }) => (
  <motion.div
    className="bg-card rounded-lg overflow-hidden neon-border hover-glow group"
    whileHover={{ scale: 1.02 }}
  >
    <Link to={`/blog/${post.slug}`}>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Publié le {new Date(post.created_at).toLocaleDateString()} par {post.author}
        </p>
        <p className="text-muted-foreground line-clamp-3">
          {post.content}
        </p>
      </div>
    </Link>
  </motion.div>
)

const BlogPage = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blog/posts`)
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Blog</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Retrouvez ici mes derniers articles sur le développement mobile et les nouvelles technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-card p-6 rounded-lg neon-border">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))
          ) : (
            posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default BlogPage
