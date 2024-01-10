#!/usr/bin/env python3
"""Basic route task 4"""
from flask import Blueprint, render_template, g


# Create a Flask Blueprint named 'app_routes'
app_routes = Blueprint('app_routes', __name__)


# Define a route for the home page ('/') with the GET method
@app_routes.route('/', methods=["GET"], strict_slashes=False)
def home():
    """ Home page

    Returns:
    - Flask Response: Render the HTML template '4-index.html' for the home page.
    """
    return render_template('5-index.html', user=g.user)
