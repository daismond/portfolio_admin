import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask
from src.models.portfolio import db, PersonalInfo, Skill, Project, Experience, Education, AdminUser
from werkzeug.security import generate_password_hash
import json

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    return app

def seed_data():
    app = create_app()
    
    with app.app_context():
        # Créer les tables
        db.create_all()
        
        # Créer un utilisateur admin par défaut
        if not AdminUser.query.filter_by(username='admin').first():
            admin = AdminUser(
                username='admin',
                password_hash=generate_password_hash('admin123'),
                email='admin@portfolio.com'
            )
            db.session.add(admin)
        
        # Ajouter les informations personnelles
        if not PersonalInfo.query.first():
            personal_info = PersonalInfo(
                name='Développeur Mobile',
                title='Développeur Mobile Passionné',
                description='Je crée des applications mobiles innovantes et performantes pour iOS et Android, en utilisant les dernières technologies et les meilleures pratiques du développement mobile.',
                email='contact@devmobile.fr',
                phone='+33 6 12 34 56 78',
                location='Paris, France',
                github_url='https://github.com',
                linkedin_url='https://linkedin.com',
                twitter_url='https://twitter.com'
            )
            db.session.add(personal_info)
        
        # Ajouter les compétences
        skills_data = [
            # Développement Mobile
            {'name': 'React Native', 'category': 'Développement Mobile', 'level': 95, 'color': '#61DAFB', 'order_index': 1},
            {'name': 'Swift (iOS)', 'category': 'Développement Mobile', 'level': 90, 'color': '#FA7343', 'order_index': 2},
            {'name': 'Kotlin (Android)', 'category': 'Développement Mobile', 'level': 88, 'color': '#7F52FF', 'order_index': 3},
            {'name': 'Flutter', 'category': 'Développement Mobile', 'level': 85, 'color': '#02569B', 'order_index': 4},
            {'name': 'Xamarin', 'category': 'Développement Mobile', 'level': 75, 'color': '#3498DB', 'order_index': 5},
            
            # Technologies Web
            {'name': 'JavaScript/TypeScript', 'category': 'Technologies Web', 'level': 92, 'color': '#F7DF1E', 'order_index': 1},
            {'name': 'React.js', 'category': 'Technologies Web', 'level': 90, 'color': '#61DAFB', 'order_index': 2},
            {'name': 'Node.js', 'category': 'Technologies Web', 'level': 85, 'color': '#339933', 'order_index': 3},
            {'name': 'Next.js', 'category': 'Technologies Web', 'level': 82, 'color': '#000000', 'order_index': 4},
            {'name': 'GraphQL', 'category': 'Technologies Web', 'level': 78, 'color': '#E10098', 'order_index': 5},
            
            # Backend & Base de Données
            {'name': 'Firebase', 'category': 'Backend & Base de Données', 'level': 90, 'color': '#FFCA28', 'order_index': 1},
            {'name': 'MongoDB', 'category': 'Backend & Base de Données', 'level': 85, 'color': '#47A248', 'order_index': 2},
            {'name': 'PostgreSQL', 'category': 'Backend & Base de Données', 'level': 80, 'color': '#336791', 'order_index': 3},
            {'name': 'AWS', 'category': 'Backend & Base de Données', 'level': 75, 'color': '#FF9900', 'order_index': 4},
            {'name': 'Docker', 'category': 'Backend & Base de Données', 'level': 70, 'color': '#2496ED', 'order_index': 5},
            
            # Outils & Méthodologies
            {'name': 'Git/GitHub', 'category': 'Outils & Méthodologies', 'level': 95, 'color': '#F05032', 'order_index': 1},
            {'name': 'Agile/Scrum', 'category': 'Outils & Méthodologies', 'level': 90, 'color': '#00D4FF', 'order_index': 2},
            {'name': 'CI/CD', 'category': 'Outils & Méthodologies', 'level': 85, 'color': '#FF6B35', 'order_index': 3},
            {'name': 'Testing', 'category': 'Outils & Méthodologies', 'level': 82, 'color': '#8DD6F9', 'order_index': 4},
            {'name': 'Figma/Design', 'category': 'Outils & Méthodologies', 'level': 78, 'color': '#F24E1E', 'order_index': 5},
        ]
        
        for skill_data in skills_data:
            if not Skill.query.filter_by(name=skill_data['name'], category=skill_data['category']).first():
                skill = Skill(**skill_data)
                db.session.add(skill)
        
        # Ajouter les projets
        projects_data = [
            {
                'title': 'EcoTrack',
                'category': 'react-native',
                'description': 'Application de suivi écologique permettant aux utilisateurs de monitorer leur empreinte carbone quotidienne.',
                'image_url': '/src/assets/images/mobile_app_dev.png',
                'technologies': ['React Native', 'Firebase', 'Redux', 'Maps API'],
                'features': ['Géolocalisation', 'Analytics', 'Notifications Push', 'Mode Offline'],
                'downloads': '50K+',
                'rating': 4.8,
                'users': '25K+',
                'status': 'Publié',
                'github_url': '#',
                'demo_url': '#',
                'store_url': '#',
                'order_index': 1
            },
            {
                'title': 'FitnessPro',
                'category': 'native',
                'description': 'Application de fitness complète avec suivi d\'entraînements, plans personnalisés et communauté.',
                'image_url': '/src/assets/images/mobile_app_dev.png',
                'technologies': ['Swift', 'Kotlin', 'Core Data', 'HealthKit'],
                'features': ['Suivi Santé', 'Plans Personnalisés', 'Communauté', 'Wearables'],
                'downloads': '100K+',
                'rating': 4.9,
                'users': '75K+',
                'status': 'Publié',
                'github_url': '#',
                'demo_url': '#',
                'store_url': '#',
                'order_index': 2
            },
            {
                'title': 'CryptoWallet',
                'category': 'flutter',
                'description': 'Portefeuille crypto sécurisé avec trading en temps réel et analytics avancés.',
                'image_url': '/src/assets/images/mobile_app_dev.png',
                'technologies': ['Flutter', 'Dart', 'Blockchain API', 'Biometrics'],
                'features': ['Trading', 'Sécurité Biométrique', 'Analytics', 'Multi-devises'],
                'downloads': '30K+',
                'rating': 4.7,
                'users': '15K+',
                'status': 'En développement',
                'github_url': '#',
                'demo_url': '#',
                'store_url': '#',
                'order_index': 3
            },
            {
                'title': 'FoodDelivery',
                'category': 'react-native',
                'description': 'Plateforme de livraison de nourriture avec géolocalisation en temps réel et paiements intégrés.',
                'image_url': '/src/assets/images/mobile_app_dev.png',
                'technologies': ['React Native', 'Node.js', 'MongoDB', 'Stripe'],
                'features': ['Géolocalisation', 'Paiements', 'Chat en temps réel', 'Notifications'],
                'downloads': '200K+',
                'rating': 4.6,
                'users': '120K+',
                'status': 'Publié',
                'github_url': '#',
                'demo_url': '#',
                'store_url': '#',
                'order_index': 4
            }
        ]
        
        for project_data in projects_data:
            if not Project.query.filter_by(title=project_data['title']).first():
                project_data['technologies'] = json.dumps(project_data['technologies'])
                project_data['features'] = json.dumps(project_data['features'])
                project = Project(**project_data)
                db.session.add(project)
        
        # Ajouter les expériences
        experiences_data = [
            {
                'title': 'Lead Mobile Developer',
                'company': 'TechInnovate Solutions',
                'location': 'Paris, France',
                'period': '2022 - Présent',
                'employment_type': 'CDI',
                'description': 'Direction de l\'équipe mobile et développement d\'applications innovantes pour des clients internationaux.',
                'achievements': [
                    'Management d\'une équipe de 6 développeurs mobiles',
                    'Développement de 15+ applications mobiles à succès',
                    'Mise en place d\'une architecture micro-services',
                    'Amélioration des performances de 40% sur les apps existantes'
                ],
                'technologies': ['React Native', 'Swift', 'Kotlin', 'Firebase', 'AWS'],
                'color': '#00D4FF',
                'order_index': 1
            },
            {
                'title': 'Senior Mobile Developer',
                'company': 'StartupLab',
                'location': 'Lyon, France',
                'period': '2020 - 2022',
                'employment_type': 'CDI',
                'description': 'Développement d\'applications mobiles pour startups en phase de croissance rapide.',
                'achievements': [
                    'Développement de 8 applications mobiles de zéro',
                    'Intégration de solutions de paiement complexes',
                    'Optimisation des performances et de l\'UX',
                    'Formation de développeurs juniors'
                ],
                'technologies': ['Flutter', 'React Native', 'Node.js', 'MongoDB', 'Stripe'],
                'color': '#FF6B35',
                'order_index': 2
            },
            {
                'title': 'Mobile Developer',
                'company': 'DigitalCorp',
                'location': 'Marseille, France',
                'period': '2019 - 2020',
                'employment_type': 'CDI',
                'description': 'Développement d\'applications mobiles pour des clients du secteur bancaire et financier.',
                'achievements': [
                    'Développement d\'apps bancaires sécurisées',
                    'Implémentation de l\'authentification biométrique',
                    'Respect des normes de sécurité bancaire',
                    'Tests automatisés et intégration continue'
                ],
                'technologies': ['Swift', 'Kotlin', 'Java', 'SQLite', 'REST APIs'],
                'color': '#8B5CF6',
                'order_index': 3
            },
            {
                'title': 'Junior Mobile Developer',
                'company': 'WebAgency Pro',
                'location': 'Nice, France',
                'period': '2018 - 2019',
                'employment_type': 'CDI',
                'description': 'Premier poste en développement mobile, focus sur l\'apprentissage et la contribution aux projets clients.',
                'achievements': [
                    'Développement de 5 applications mobiles',
                    'Apprentissage des bonnes pratiques',
                    'Collaboration étroite avec les designers UX/UI',
                    'Participation aux code reviews'
                ],
                'technologies': ['React Native', 'JavaScript', 'Firebase', 'Git'],
                'color': '#10B981',
                'order_index': 4
            }
        ]
        
        for exp_data in experiences_data:
            if not Experience.query.filter_by(title=exp_data['title'], company=exp_data['company']).first():
                exp_data['achievements'] = json.dumps(exp_data['achievements'])
                exp_data['technologies'] = json.dumps(exp_data['technologies'])
                experience = Experience(**exp_data)
                db.session.add(experience)
        
        # Ajouter l'éducation
        education_data = [
            {
                'degree': 'Master en Informatique',
                'school': 'École Supérieure d\'Informatique',
                'location': 'Paris, France',
                'period': '2016 - 2018',
                'specialization': 'Spécialisation Développement Mobile et Applications Distribuées',
                'order_index': 1
            },
            {
                'degree': 'Licence Informatique',
                'school': 'Université de Technologie',
                'location': 'Lyon, France',
                'period': '2013 - 2016',
                'specialization': 'Programmation et Systèmes d\'Information',
                'order_index': 2
            }
        ]
        
        for edu_data in education_data:
            if not Education.query.filter_by(degree=edu_data['degree'], school=edu_data['school']).first():
                education = Education(**edu_data)
                db.session.add(education)
        
        # Sauvegarder toutes les données
        db.session.commit()
        print("Données initialisées avec succès!")
        print("Utilisateur admin créé: username='admin', password='admin123'")

if __name__ == '__main__':
    seed_data()

