from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from datetime import datetime

class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=True)
    name = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True)
    name = db.Column(db.String(50), nullable=False)
    dob = db.Column(db.DateTime, nullable=False)
    password = db.Column(db.String(150))

class Follow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    current_user = db.Column(db.String(150), unique=False)
    username = db.Column(db.String(150), unique=False)


