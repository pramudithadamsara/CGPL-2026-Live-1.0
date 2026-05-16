import argparse
import os
from flask import Flask, send_from_directory

app = Flask(__name__)

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public')

@app.route('/')
def serve_index():
    return send_from_directory(PUBLIC_DIR, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(PUBLIC_DIR, path)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Flask development server for static site')
    parser.add_argument('--port', type=int, default=5004, help='Port to run the server on (default: 5004)')
    args = parser.parse_args()
    
    print(f"Starting development server on http://127.0.0.1:{args.port}")
    app.run(host='0.0.0.0', port=args.port, debug=True)
