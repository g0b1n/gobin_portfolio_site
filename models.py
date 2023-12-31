from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_login import UserMixin

db = SQLAlchemy()
bcrypt = Bcrypt()

def connect_db(app):
    db.app = app
    db.init_app(app)


#user models
class AdminUser(db.Model, UserMixin):
    """Table for user to save user data to the database"""

    __tablename__ = 'admin_users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    username = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    pin = db.Column(db.String, nullable=False, unique=True)

    
    @property
    def full_name(self):
        """Returns full name of a user"""
        return f"{self.first_name} {self.last_name}"

    @classmethod
    def register(cls, first_name, last_name, email, username, pwd, pin):
        """Register new user with hashed password and return user"""

        hashed_pwd = bcrypt.generate_password_hash(pwd).decode("utf8")
        hashed_pin = bcrypt.generate_password_hash(pin).decode("utf8")  # If PIN is secret
        # hashed_utf8 = hashed.decode("utf8")

        return cls(first_name=first_name, last_name=last_name,
                    email=email, username=username, password=hashed_pwd, pin=hashed_pin)

    @classmethod
    def authenticate(cls, username, pwd, pin):
        """Validate that user is registered and both password and pin are correct"""
        u = cls.query.filter_by(username=username).first()

        if u and bcrypt.check_password_hash(u.password, pwd) and bcrypt.check_password_hash(u.pin, pin):
            return u  # Return user instance if both password and pin match
        else:
            return None  # Authentication failed 
        

class Project(db.Model):
    """Table to store project info"""

    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    proj_name = db.Column(db.String, nullable=False)
    proj_img_url = db.Column(db.String, nullable=False)
    proj_short_desc = db.Column(db.String, nullable=False)
    proj_long_desc = db.Column(db.String, nullable=False)
    proj_start_date = db.Column(db.String, nullable=False)
    proj_end_date = db.Column(db.String, nullable=False)
    proj_challenge = db.Column(db.String)
    proj_solution = db.Column(db.String)
    proj_process = db.Column(db.String)
    github_url = db.Column(db.String)

class Photo(db.Model):
    """Table to store project info"""

    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    client_name = db.Column(db.String, nullable=False)
    pic_img_url = db.Column(db.String, nullable=False)
    pic_event_date = db.Column(db.String, nullable=False)
    pic_short_desc = db.Column(db.String, nullable=False)
    pic_long_desc = db.Column(db.String, nullable=False)


class WorkHistory(db.Model):
    """Table to store project info"""

    __tablename__ = 'work_history'

    id = db.Column(db.Integer, primary_key=True)

    company_name = db.Column(db.String, nullable=False)
    position = db.Column(db.String, nullable=False)
    company_ph = db.Column(db.String, nullable=False)
    work_start_date = db.Column(db.String, nullable=False)
    work_end_date = db.Column(db.String, nullable=False)
    company_street = db.Column(db.String, nullable=False)
    company_city = db.Column(db.String, nullable=False)
    company_state = db.Column(db.String, nullable=False)
    company_zip = db.Column(db.String, nullable=False)
    work_short_desc = db.Column(db.String, nullable=False)
    work_long_desc = db.Column(db.String, nullable=False)

    @property
    def address(self):
        """Returns full address of company"""
        return f"{self.company_street},  {self.company_city},  {self.company_state} {self.company_zip}"


class Education(db.Model):
    """Table to store project info"""

    __tablename__ = 'educations'

    id = db.Column(db.Integer, primary_key=True)
    school_name = db.Column(db.String, nullable=False)
    school_city = db.Column(db.String, nullable=False)
    school_state = db.Column(db.String, nullable=False)
    school_start_date = db.Column(db.String, nullable=False)
    school_end_date = db.Column(db.String, nullable=False)
    major_name = db.Column(db.String, default="NONE")
    degree = db.Column(db.String, default="NONE")
