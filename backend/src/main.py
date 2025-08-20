import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# Explicitly load .env file with UTF-8 encoding to prevent errors on Windows
from dotenv import load_dotenv
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path=dotenv_path, encoding='utf-8')

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_mail import Mail, Message
from src.models.portfolio import db
from src.routes.user import user_bp
from src.routes.portfolio import portfolio_bp
from src.routes.upload import upload_bp
from src.routes.blog import blog_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')

# Mail Configuration
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', '1', 't']
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')

mail = Mail(app)

# CORS configuration is now managed by environment variables for flexibility and clarity.
# See the .env.example or README.md for details on setting FRONTEND_ORIGINS.
frontend_origins_str = os.environ.get('FRONTEND_ORIGINS')
if frontend_origins_str:
    # If the variable is set from the .env file, use those origins.
    # The expected format is a comma-separated string of URLs.
    origins = [origin.strip() for origin in frontend_origins_str.split(',')]
    print(f"INFO: Allowing CORS for configured origins: {origins}")
else:
    # If the variable is not set, use default origins suitable for local development.
    origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
    print(f"INFO: FRONTEND_ORIGINS not set. Defaulting to local development CORS: {origins}")

CORS(app, origins=origins, supports_credentials=True, methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"], allow_headers=["Content-Type", "Authorization"])

app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(portfolio_bp, url_prefix='/api')
app.register_blueprint(upload_bp, url_prefix='/api')
app.register_blueprint(blog_bp, url_prefix='/api')

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Database Configuration - Supabase/PostgreSQL or fallback to SQLite
DATABASE_URL = os.environ.get('DATABASE_URL')

if DATABASE_URL:
    # If DATABASE_URL is set, use it for the remote PostgreSQL database.
    print("INFO: DATABASE_URL detected. Connecting to external PostgreSQL database...")
    # Ensure the URI scheme is 'postgresql' for SQLAlchemy compatibility.
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
else:
    # If DATABASE_URL is not set, fall back to the local SQLite database for development.
    db_path = os.path.join(os.path.dirname(__file__), 'database', 'app.db')
    print(f"INFO: DATABASE_URL not set. Falling back to SQLite database at {db_path}")
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# In a production environment with PostgreSQL, it is better to manage database
# creation and migrations with a dedicated tool like Flask-Migrate or Alembic.
# The following lines are commented out to prevent accidental table creation/deletion.
# with app.app_context():
#     db.create_all()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
