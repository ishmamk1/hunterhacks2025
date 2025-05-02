from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def hello():
    return "hello world"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)