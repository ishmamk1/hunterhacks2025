from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def hello():
    return "hello world"

@app.route('/daedalus_lounge', methods=['GET'])
def daedalus_lounge():
    room_data = {
        "name": "Daedalus Lounge",
        "capacity": 50,
        "current_occupancy": 25,
        "status": "Open"
    }
    return jsonify(room_data)

@app.route('/west_lobby', methods=['GET'])
def west_lobby():
    room_data = {
        "name": "West 3rd Floor Lobby",
        "capacity": 75,
        "current_occupancy": 40,
        "status": "Busy"
    }
    return jsonify(room_data)

@app.route('/east_library', methods=['GET'])
def east_library():
    room_data = {
        "name": "East Library",
        "capacity": 100,
        "current_occupancy": 60,
        "status": "Available"
    }
    return jsonify(room_data)

if __name__ == '__main__':
    app.run(port=5001, debug=True)