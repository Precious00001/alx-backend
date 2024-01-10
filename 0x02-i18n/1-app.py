#!/usr/bin/env python3
""" 0-app module """

from flask import Flask
from routes.routes_0 import app_routes

# Creating a Flask web application instance
app = Flask(__name__)

# Registering the defined routes with the app
app.register_blueprint(app_routes)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
    # Running the app on 0.0.0.0:5000 if this script is the main entry point
