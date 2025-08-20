from flask import Blueprint, request, jsonify, current_app
from flask_mail import Message
from src.models.portfolio import db, PersonalInfo, Skill, Project, Experience, Education, AdminUser
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import json
import jwt
from datetime import datetime, timedelta

portfolio_bp = Blueprint('portfolio', __name__)

# Configuration JWT
JWT_SECRET = 'your-secret-key-change-in-production'
JWT_ALGORITHM = 'HS256'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token manquant'}), 401
        
        try:
            if token.startswith('Bearer '):
                token = token[7:]
            data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            current_user_id = data['user_id']
        except:
            return jsonify({'message': 'Token invalide'}), 401
        
        return f(current_user_id, *args, **kwargs)
    return decorated

# Routes d'authentification
@portfolio_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'message': 'Username et password requis'}), 400
    
    user = AdminUser.query.filter_by(username=username).first()
    
    if user and check_password_hash(user.password_hash, password):
        # Mettre à jour la dernière connexion
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        # Générer le token JWT
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, JWT_SECRET, algorithm=JWT_ALGORITHM)
        
        return jsonify({
            'token': token,
            'user': user.to_dict()
        }), 200
    
    return jsonify({'message': 'Identifiants invalides'}), 401

@portfolio_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    
    if not username or not password or not email:
        return jsonify({'message': 'Username, password et email requis'}), 400
    
    # Vérifier si l'utilisateur existe déjà
    if AdminUser.query.filter_by(username=username).first():
        return jsonify({'message': 'Username déjà utilisé'}), 400
    
    if AdminUser.query.filter_by(email=email).first():
        return jsonify({'message': 'Email déjà utilisé'}), 400
    
    # Créer le nouvel utilisateur
    user = AdminUser(
        username=username,
        password_hash=generate_password_hash(password),
        email=email
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'Utilisateur créé avec succès'}), 201

# Routes pour les informations personnelles
@portfolio_bp.route('/personal-info', methods=['GET'])
def get_personal_info():
    info = PersonalInfo.query.first()
    if info:
        return jsonify(info.to_dict()), 200
    return jsonify({'message': 'Aucune information trouvée'}), 404

@portfolio_bp.route('/personal-info', methods=['POST', 'PUT'])
@token_required
def update_personal_info(current_user_id):
    data = request.get_json()
    
    info = PersonalInfo.query.first()
    if not info:
        info = PersonalInfo()
        db.session.add(info)
    
    # Mettre à jour les champs
    for field in ['name', 'title', 'description', 'email', 'phone', 'location', 
                  'github_url', 'linkedin_url', 'twitter_url']:
        if field in data:
            setattr(info, field, data[field])
    
    info.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(info.to_dict()), 200

# Routes pour les compétences
@portfolio_bp.route('/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.order_by(Skill.order_index, Skill.category, Skill.name).all()
    return jsonify([skill.to_dict() for skill in skills]), 200

@portfolio_bp.route('/skills', methods=['POST'])
@token_required
def create_skill(current_user_id):
    data = request.get_json()
    
    skill = Skill(
        name=data.get('name'),
        category=data.get('category'),
        level=data.get('level', 0),
        color=data.get('color'),
        order_index=data.get('order_index', 0)
    )
    
    db.session.add(skill)
    db.session.commit()
    
    return jsonify(skill.to_dict()), 201

@portfolio_bp.route('/skills/<int:skill_id>', methods=['PUT'])
@token_required
def update_skill(current_user_id, skill_id):
    skill = Skill.query.get_or_404(skill_id)
    data = request.get_json()
    
    for field in ['name', 'category', 'level', 'color', 'order_index']:
        if field in data:
            setattr(skill, field, data[field])
    
    skill.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(skill.to_dict()), 200

@portfolio_bp.route('/skills/<int:skill_id>', methods=['DELETE'])
@token_required
def delete_skill(current_user_id, skill_id):
    skill = Skill.query.get_or_404(skill_id)
    db.session.delete(skill)
    db.session.commit()
    
    return jsonify({'message': 'Compétence supprimée'}), 200

@portfolio_bp.route('/skills/reorder', methods=['POST'])
@token_required
def reorder_skills(current_user_id):
    data = request.get_json()
    skill_ids = data.get('skill_ids', [])

    for index, skill_id in enumerate(skill_ids):
        skill = Skill.query.get(skill_id)
        if skill:
            skill.order_index = index

    db.session.commit()

    return jsonify({'message': 'Compétences réorganisées'}), 200

# Routes pour les projets
@portfolio_bp.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.order_by(Project.order_index, Project.created_at.desc()).all()
    return jsonify([project.to_dict() for project in projects]), 200

@portfolio_bp.route('/projects', methods=['POST'])
@token_required
def create_project(current_user_id):
    data = request.get_json()
    
    project = Project(
        title=data.get('title'),
        description=data.get('description'),
        category=data.get('category'),
        image_url=data.get('image_url'),
        technologies=json.dumps(data.get('technologies', [])),
        features=json.dumps(data.get('features', [])),
        downloads=data.get('downloads'),
        rating=data.get('rating'),
        users=data.get('users'),
        status=data.get('status', 'En développement'),
        github_url=data.get('github_url'),
        demo_url=data.get('demo_url'),
        store_url=data.get('store_url'),
        order_index=data.get('order_index', 0)
    )
    
    db.session.add(project)
    db.session.commit()
    
    return jsonify(project.to_dict()), 201

@portfolio_bp.route('/projects/<int:project_id>', methods=['PUT'])
@token_required
def update_project(current_user_id, project_id):
    project = Project.query.get_or_404(project_id)
    data = request.get_json()
    
    for field in ['title', 'description', 'category', 'image_url', 'downloads', 
                  'rating', 'users', 'status', 'github_url', 'demo_url', 'store_url', 'order_index']:
        if field in data:
            setattr(project, field, data[field])
    
    if 'technologies' in data:
        project.technologies = json.dumps(data['technologies'])
    if 'features' in data:
        project.features = json.dumps(data['features'])
    
    project.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(project.to_dict()), 200

@portfolio_bp.route('/projects/<int:project_id>', methods=['DELETE'])
@token_required
def delete_project(current_user_id, project_id):
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    
    return jsonify({'message': 'Projet supprimé'}), 200

@portfolio_bp.route('/projects/reorder', methods=['POST'])
@token_required
def reorder_projects(current_user_id):
    data = request.get_json()
    project_ids = data.get('project_ids', [])

    for index, project_id in enumerate(project_ids):
        project = Project.query.get(project_id)
        if project:
            project.order_index = index

    db.session.commit()

    return jsonify({'message': 'Projets réorganisés'}), 200

# Routes pour les expériences
@portfolio_bp.route('/experiences', methods=['GET'])
def get_experiences():
    experiences = Experience.query.order_by(Experience.order_index, Experience.created_at.desc()).all()
    return jsonify([exp.to_dict() for exp in experiences]), 200

@portfolio_bp.route('/experiences', methods=['POST'])
@token_required
def create_experience(current_user_id):
    data = request.get_json()
    
    experience = Experience(
        title=data.get('title'),
        company=data.get('company'),
        location=data.get('location'),
        period=data.get('period'),
        employment_type=data.get('employment_type'),
        description=data.get('description'),
        achievements=json.dumps(data.get('achievements', [])),
        technologies=json.dumps(data.get('technologies', [])),
        color=data.get('color'),
        order_index=data.get('order_index', 0)
    )
    
    db.session.add(experience)
    db.session.commit()
    
    return jsonify(experience.to_dict()), 201

@portfolio_bp.route('/experiences/<int:exp_id>', methods=['PUT'])
@token_required
def update_experience(current_user_id, exp_id):
    experience = Experience.query.get_or_404(exp_id)
    data = request.get_json()
    
    for field in ['title', 'company', 'location', 'period', 'employment_type', 
                  'description', 'color', 'order_index']:
        if field in data:
            setattr(experience, field, data[field])
    
    if 'achievements' in data:
        experience.achievements = json.dumps(data['achievements'])
    if 'technologies' in data:
        experience.technologies = json.dumps(data['technologies'])
    
    experience.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(experience.to_dict()), 200

@portfolio_bp.route('/experiences/<int:exp_id>', methods=['DELETE'])
@token_required
def delete_experience(current_user_id, exp_id):
    experience = Experience.query.get_or_404(exp_id)
    db.session.delete(experience)
    db.session.commit()
    
    return jsonify({'message': 'Expérience supprimée'}), 200

@portfolio_bp.route('/experiences/reorder', methods=['POST'])
@token_required
def reorder_experiences(current_user_id):
    data = request.get_json()
    experience_ids = data.get('experience_ids', [])

    for index, exp_id in enumerate(experience_ids):
        experience = Experience.query.get(exp_id)
        if experience:
            experience.order_index = index

    db.session.commit()

    return jsonify({'message': 'Expériences réorganisées'}), 200

# Routes pour l'éducation
@portfolio_bp.route('/education', methods=['GET'])
def get_education():
    education = Education.query.order_by(Education.order_index, Education.created_at.desc()).all()
    return jsonify([edu.to_dict() for edu in education]), 200

@portfolio_bp.route('/education', methods=['POST'])
@token_required
def create_education(current_user_id):
    data = request.get_json()
    
    education = Education(
        degree=data.get('degree'),
        school=data.get('school'),
        location=data.get('location'),
        period=data.get('period'),
        specialization=data.get('specialization'),
        order_index=data.get('order_index', 0)
    )
    
    db.session.add(education)
    db.session.commit()
    
    return jsonify(education.to_dict()), 201

@portfolio_bp.route('/education/<int:edu_id>', methods=['PUT'])
@token_required
def update_education(current_user_id, edu_id):
    education = Education.query.get_or_404(edu_id)
    data = request.get_json()
    
    for field in ['degree', 'school', 'location', 'period', 'specialization', 'order_index']:
        if field in data:
            setattr(education, field, data[field])
    
    education.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(education.to_dict()), 200

@portfolio_bp.route('/education/<int:edu_id>', methods=['DELETE'])
@token_required
def delete_education(current_user_id, edu_id):
    education = Education.query.get_or_404(edu_id)
    db.session.delete(education)
    db.session.commit()
    
    return jsonify({'message': 'Formation supprimée'}), 200

@portfolio_bp.route('/education/reorder', methods=['POST'])
@token_required
def reorder_education(current_user_id):
    data = request.get_json()
    education_ids = data.get('education_ids', [])

    for index, edu_id in enumerate(education_ids):
        education = Education.query.get(edu_id)
        if education:
            education.order_index = index

    db.session.commit()

    return jsonify({'message': 'Formations réorganisées'}), 200

@portfolio_bp.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    if not name or not email or not subject or not message:
        return jsonify({'error': 'Tous les champs sont requis'}), 400

    try:
        msg = Message(subject=f"Contact Portfolio: {subject}",
                      sender=current_app.config['MAIL_DEFAULT_SENDER'],
                      recipients=[current_app.config['MAIL_DEFAULT_SENDER']])
        msg.body = f"De: {name} <{email}>\n\n{message}"
        mail = current_app.extensions.get('mail')
        mail.send(msg)
        return jsonify({'message': 'Message envoyé avec succès'}), 200
    except Exception as e:
        current_app.logger.error(f"Erreur lors de l'envoi de l'email: {e}")
        return jsonify({'error': 'Erreur lors de l\'envoi du message'}), 500
