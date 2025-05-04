from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Date
from dotenv import load_dotenv


from sqlalchemy.ext.declarative import declarative_base


import datetime


load_dotenv()
print("DATABASE_URL =", os.getenv("DATABASE_URL"))


# Database URL (update this with your actual database connection string)
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
 #"postgresql://postgres:marci@localhost:5432/kingdom"
#DoodlerPasswordToDB
# Create the SQLAlchemy engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_size=1,        # Number of connections to keep in pool
    max_overflow=10,      # Extra connections beyond pool_size
    pool_timeout=30,      # Seconds to wait before giving up on a connection
    pool_recycle=1800,    # Recycle connections every 30 minutes
)




# Create a sessionmaker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



Base = declarative_base()




class Room(Base):
    __tablename__ = "rooms"
    
    id = Column(Integer, primary_key=True)
    name = Column(String , nullable=False )
    updating = Column(Boolean, default=False)
    description = Column(String, nullable=False)
    location = Column(String, nullable=False)
   
    last_updated = Column(DateTime(timezone=True), default=datetime.datetime.now, onupdate=datetime.datetime.now)

    current_occupancy= Column(Integer, nullable = True)
    total_occupancy = Column(Integer, nullable= False)

    computer_access = Column(Boolean, nullable = False)
    whiteboard_access= Column(Boolean, nullable= False)
    permitted_volume = Column(String, nullable = False)


    picture = Column(String, nullable = True)


    def __get__json__(self):
        return( 
            {
                "name": self.name,
                "description": self.description,
                "current_occupancy": self.current_occupancy,
                "capacity": self.total_occupancy,
                "computer_access": self.computer_access,
                "location": self.location,
                "permitted_volume": self.permitted_volume,
                "status": "Open"
            })

class Event(Base):
    __tablename__ = 'events'
    url = Column(String, primary_key=True)
    title = Column(Text, nullable=False)
    date = Column(Date)
    start_time = Column(String)
    end_time = Column(String)
    series = Column(String)
    description = Column(Text)
    image_url = Column(String)
    scraped_at = Column(DateTime)

    def __get__json__(self):
        return {
            "url": self.url,
            "title": self.title,
            "date": self.date.isoformat() if self.date else None,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "series": self.series,
            "description": self.description,
            "image_url": self.image_url,
            "scraped_at": self.scraped_at.isoformat() if self.scraped_at else None
        }


        

Base.metadata.create_all(engine)
   



