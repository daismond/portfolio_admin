from flask import Blueprint, request, jsonify
from src.models.portfolio import db, BlogPost
from src.routes.portfolio import token_required
from datetime import datetime
import re

blog_bp = Blueprint('blog', __name__)

def create_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

@blog_bp.route('/blog/posts', methods=['GET'])
def get_blog_posts():
    posts = BlogPost.query.filter_by(is_published=True).order_by(BlogPost.created_at.desc()).all()
    return jsonify([post.to_dict() for post in posts]), 200

@blog_bp.route('/blog/posts/<slug>', methods=['GET'])
def get_blog_post(slug):
    post = BlogPost.query.filter_by(slug=slug, is_published=True).first_or_404()
    return jsonify(post.to_dict()), 200

@blog_bp.route('/admin/blog/posts', methods=['GET'])
@token_required
def get_admin_blog_posts(current_user_id):
    posts = BlogPost.query.order_by(BlogPost.created_at.desc()).all()
    return jsonify([post.to_dict() for post in posts]), 200

@blog_bp.route('/admin/blog/posts', methods=['POST'])
@token_required
def create_blog_post(current_user_id):
    data = request.get_json()

    slug = create_slug(data.get('title'))

    post = BlogPost(
        title=data.get('title'),
        slug=slug,
        content=data.get('content'),
        author_id=current_user_id,
        is_published=data.get('is_published', False)
    )

    db.session.add(post)
    db.session.commit()

    return jsonify(post.to_dict()), 201

@blog_bp.route('/admin/blog/posts/<int:post_id>', methods=['PUT'])
@token_required
def update_blog_post(current_user_id, post_id):
    post = BlogPost.query.get_or_404(post_id)
    data = request.get_json()

    for field in ['title', 'content', 'is_published']:
        if field in data:
            setattr(post, field, data[field])

    if 'title' in data:
        post.slug = create_slug(data['title'])

    post.updated_at = datetime.utcnow()
    db.session.commit()

    return jsonify(post.to_dict()), 200

@blog_bp.route('/admin/blog/posts/<int:post_id>', methods=['DELETE'])
@token_required
def delete_blog_post(current_user_id, post_id):
    post = BlogPost.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()

    return jsonify({'message': 'Article de blog supprimé'}), 200
