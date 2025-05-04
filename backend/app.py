from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import numpy as np
import cv2
import io
import base64
import db
from db import SessionLocal, Room, Event
import time
from flask_sock import Sock
import asyncio
import json
from chatBot import prompt_maker, ask_gemini
from aws.scraper import scrape_past_events

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def hello():
    return "hello world"

def get_room_image(picture_url):
    try:
        # Make GET request to the screenshot server
        res = requests.get(picture_url)
        
        # Convert bytes to a NumPy array
        img_array = np.frombuffer(res.content, dtype=np.uint8)
        
        # Decode image using OpenCV
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        
        # Convert image to base64
        _, buffer = cv2.imencode('.jpg', img)
        img_base64 = base64.b64encode(buffer).decode('utf-8')
        
        return img_base64
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

@app.route('/daedalus_lounge', methods=['GET'])
def daedalus_lounge():
    session = SessionLocal()

    room = session.query(Room).filter(Room.name == "Daedalus Lounge").first()
    if not room: 
        return jsonify({"message": "There is no suche room"})

    if room.updating == False:

        room.updating = True
        session.commit()

    time_counter = 0
    while True:
    
        time.sleep(.5)
        time_counter += 1

        session.refresh(room)

    
        if room.updating == False or time_counter == 120: # if the database was updated or this ran for about 1 minute.
            print("Room was updated in the DB!")
            break


    # room_data = {
    #     "name": "Daedalus Lounge",
    #     "capacity": 50,
    #     "current_occupancy": 25,
    #     "status": "Open"
    # }

    room_data = {
        "name": room.name,
        "description": room.description,
        "current_occupancy": room.current_occupancy,
        "capacity": room.total_occupancy,
        "computer_access": room.computer_access,
        "location": room.location,
        "permitted_volume": room.permitted_volume,
        "status": "Open"
    }
    
  
    img_base64 = get_room_image(room.picture)
    if img_base64:
        room_data['image'] = f"data:image/jpeg;base64,{img_base64}"
    
    return jsonify(room_data)

@app.route('/west_lobby', methods=['GET'])
def west_lobby():
    session = SessionLocal()

    
    room = session.query(Room).filter(Room.name == "West Lobby").first()
    if not room: 
        return jsonify({"message": "There is no suche room"})


    if room.updating == False:

        room.updating = True
        session.commit()

    time_counter = 0
    while True:
    
        time.sleep(.5)
        time_counter += 1

        session.refresh(room)

    
        if room.updating == False or time_counter == 120: # if the database was updated or this ran for about 1 minute.
            print("Room was updated in the DB!")
            break

    # room_data = {
    #     "name": "Daedalus Lounge",
    #     "capacity": 50,
    #     "current_occupancy": 25,
    #     "status": "Open"
    # }

    room_data = {
        "name": room.name,
        "description": room.description,
        "current_occupancy": room.current_occupancy,
        "capacity": room.total_occupancy,
        "computer_access": room.computer_access,
        "location": room.location,
        "permitted_volume": room.permitted_volume,
        "status": "Open"
    }
    
  
    img_base64 = get_room_image(room.picture)
    if img_base64:
        room_data['image'] = f"data:image/jpeg;base64,{img_base64}"
    
    return jsonify(room_data)

@app.route('/east_library', methods=['GET'])
def east_library():
    session = SessionLocal()

    
    room = session.query(Room).filter(Room.name == "East Library").first()
    if not room: 
        print("No such room", room)
        return jsonify({"message": "There is no such room"})

    if room.updating == False:

        room.updating = True
        session.commit()

    time_counter = 0
    while True:
    
        time.sleep(.5)
        time_counter += 1

        session.refresh(room)

    
        if room.updating == False or time_counter == 120: # if the database was updated or this ran for about 1 minute.
            print("Room was updated in the DB!")
            break

    # room_data = {
    #     "name": "Daedalus Lounge",
    #     "capacity": 50,
    #     "current_occupancy": 25,
    #     "status": "Open"
    # }

    room_data = {
        "name": room.name,
        "description": room.description,
        "current_occupancy": room.current_occupancy,
        "capacity": room.total_occupancy,
        "computer_access": room.computer_access,
        "location": room.location,
        "permitted_volume": room.permitted_volume,
        "status": "Open"
    }
    
    img_base64 = get_room_image(room.picture)
    if img_base64:
        room_data['image'] = f"data:image/jpeg;base64,{img_base64}"
    
    return jsonify(room_data)

@app.route('/events', methods=['GET'])
def get_events():
    db = SessionLocal()

    # Check last scraped time
    latest = db.query(Event).order_by(Event.scraped_at.desc()).first()
    now = datetime.utcnow()

    if not latest or (now - latest.scraped_at) > timedelta(days=1):
        print("Refreshing events...")

        # Delete existing events
        db.query(Event).delete()
        db.commit()

        # Scrape new events
        scraped_data = scrape_past_events()
        new_events = []

        for e in scraped_data:
            try:
                event = Event(
                    url=e['url'],
                    title=e['title'],
                    date=datetime.strptime(e['date'], '%Y-%m-%d').date() if e['date'] else None,
                    start_time=e['start_time'],
                    end_time=e['end_time'],
                    series=e['series'],
                    description=e['description'],
                    image_url=e['image_url'],
                    scraped_at=datetime.utcnow()
                )
                new_events.append(event)
            except Exception as err:
                print(f"Skipping event due to error: {err}")

        db.add_all(new_events)
        db.commit()

    # Return events as JSON
    events = db.query(Event).order_by(Event.date.desc()).all()
    return jsonify([event.__get__json__() for event in events][::-1])


sock = Sock(app)
@sock.route('/ask')
def ask(ws):
    print("WebSocket connection received.")

    try:
        while True:
            data = ws.receive()
            parsed_data = json.loads(data)
            query = parsed_data.get("query", "")
            role = parsed_data.get("role", "")

            session = SessionLocal()
            rooms = session.query(Room).all()

            research = ""
            for room in rooms:
                research += json.dumps(room.__get__json__())

            prompt = prompt_maker(
                question=query,
                context=research,
                role="Please provide a detailed response using all the research in the 'CONTEXT' section and try to add on any information you may know that is not outdated or reliant on current events."
            )

            print("THIS IS MY PROMPT:\n", prompt)

            for message in ask_gemini(prompt):
                if not message["done"]:
                    ws.send(json.dumps({"response": message["response"], "done": False}))
                else:
                    ws.send(json.dumps({"done": True}))
                    ws.close()
                    return

    except Exception as e:
        print("WebSocket error:", e)
        ws.send(json.dumps({"error": str(e), "done": True}))
        ws.close()

if __name__ == '__main__':
    app.run(port=5001, debug=True)