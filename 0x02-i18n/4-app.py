#!/usr/bin/env python3
""" 4-app module -
Flask web application with internationalization (i18n)
"""

from typing import Union
from flask import Flask, request
from flask_babel import Babel
from config import Config
from routes.routes_4 import app_routes

# Create a Flask web application instance
app = Flask(__name__)

# Initialize Flask-Babel extension for internationalization (i18n)
babel = Babel(app)

# Load configuration from the Config class
app.config.from_object(Config)

# Register the defined routes for the application
app.register_blueprint(app_routes)


@babel.localeselector
def get_locale() -> Union[str, None]:
    """ Function to determine the user's preferred locale.

    Returns:
    - Union[str, None]: The selected locale or None if not available.
    """
    # Get the locale from the request parameters
    locale = request.args.get('locale')

    # Check if the requested locale is available in the conf langs
    if locale and locale in Config.LANGUAGES:
        return locale

    # Use the best match based on the user's accepted langs
    return request.accept_languages.best_match(Config.LANGUAGES)


# Run the Flask application if executed directly
if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
