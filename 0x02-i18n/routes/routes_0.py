#!/usr/bin/env python3
"""Basic route task 0"""
from flask import Blueprint, render_template

# Create a Blueprint instance named 'app_routes'
app_routes = Blueprint('app_routes', __name__)

# Define a route for the home page
@app_routes.route('/', methods=["GET"], strict_slashes=False)
def home():
    """ Home page route function.

    Returns:
    - Response: Renders the '0-index.html' template.
    """
    return render_template('0-index.html')
