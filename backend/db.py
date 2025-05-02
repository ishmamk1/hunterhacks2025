from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from sqlalchemy import Column, Integer, String, Boolean, DateTime


from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
import datetime
# Database URL (update this with your actual database connection string)
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
 #"postgresql://postgres:marci@localhost:5432/kingdom"
#DoodlerPasswordToDB
# Create the SQLAlchemy engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_size=15,        # Number of connections to keep in pool
    max_overflow=10,      # Extra connections beyond pool_size
    pool_timeout=30,      # Seconds to wait before giving up on a connection
    pool_recycle=1800,    # Recycle connections every 30 minutes
)


# Create a sessionmaker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)






Base = declarative_base()


class Room(Base):
    __tablename__ = "Room"
    updated = Column(Boolean, default=True)


    id = Column(Integer, primary_key=True)
    description = Column(String, nullable=False)
    location = Column(String, nullable=False)
    last_updated = Column(DateTime, nullable = False)
   
    whiteboard = Column(Boolean, nullable= False)
    volume = Column(String, nullable = False)


    last_updated = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)


    current_occupancy= Column(Integer, nullable = True)
    total_occupancy = Column(Integer, nullable= False)
    computer_access = Column(Boolean, nullable = False)


    picture = Column(String, nullable = True)








Base.metadata.create_all(engine)
   


# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
