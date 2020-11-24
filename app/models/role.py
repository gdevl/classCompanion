from .db import db
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class Role(db.Model):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True)
    type = Column(String, nullable=False)

    user = relationship('User', back_populates='role')
    

