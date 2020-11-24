from .db import db
from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .class_user import class_user

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = Column(Integer, primary_key=True)
  username = Column(String(40), nullable=True)
  first_name = Column(String(40), nullable=False)
  last_name = Column(String(40), nullable=False)
  email = Column(String(255), nullable=False, unique=True)
  avatar_url = Column(Text, nullable=True)
  role_id = Column(Integer, ForeignKey('roles.id'), nullable=False)
  hashed_password = Column(String(255), nullable=False)

  role = relationship('Role', back_populates='user')
  classroom = relationship('Class', secondary=class_user, back_populates='member')

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }
