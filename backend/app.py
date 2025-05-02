from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import numpy as np
import cv2
import io
import base64
import db
from db import SessionLocal, Room 
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def hello():
    return "hello world"

def get_room_image(room_id):
    try:
        # Make GET request to the screenshot server
        res = requests.get("http://10.120.10.93:5000/screenshot")
        
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
        return jasonify({"message": "There is no suche room"})




    if room.updated == False:

        room.updated = True
        session.commit(room)

    time_counter = 0
    while True:
    
        time.sleep(.5)
        time_counter += 1

        session.refresh(room)

    
        if room.updated == False or time_counter == 120: # if the database was updated or this ran for about 1 minute.
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
        "total_occupancy": room.total_occupancy,
        "computer_access": room.computer_access,
        "location": room.location,
        "permitted_volume": room.permitted_volume,
        "status": "Open"
    }
    
    room_data["picture"]= room.picture
    img_base64 = get_room_image('daedalus_lounge')
    if img_base64:
        room_data['image'] = f"data:image/jpeg;base64,{img_base64}"
    
    return jsonify(room_data)

@app.route('/west_lobby', methods=['GET'])
def west_lobby():
    room_data = {
        "name": "West 3rd Floor Lobby",
        "capacity": 75,
        "current_occupancy": 40,
        "status": "Busy"
    }
    img_base64 = get_room_image('west_lobby')
    if img_base64:
        room_data['image'] = f"data:image/jpeg;base64,{img_base64}"
    
    return jsonify(room_data)

@app.route('/east_library', methods=['GET'])
def east_library():
    room_data = {
        "name": "East Library",
        "capacity": 100,
        "current_occupancy": 60,
        "status": "Available"
    }
    img_base64 = get_room_image('east_library')
    if img_base64:
        room_data['image'] = f"data:image/jpeg;base64,{img_base64}"
    
    return jsonify(room_data)

if __name__ == '__main__':
    app.run(port=5001, debug=True)