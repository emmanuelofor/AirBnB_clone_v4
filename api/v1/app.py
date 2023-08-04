#!/usr/bin/python3
""" Flask Application """

# Import necessary modules and classes
from models import storage
from api.v1.views import app_views
from os import environ
from flask import Flask, render_template, make_response, jsonify
from flask_cors import CORS
from flasgger import Swagger
from flasgger.utils import swag_from

# Initialize the Flask application
app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

# Register blueprint for views
app.register_blueprint(app_views)

# Enable CORS for the application
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

# Define a function to close the database session after each request
@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()

# Define a custom error handler for 404 Not Found
@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: A resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)

# Configure Swagger for the API documentation
app.config['SWAGGER'] = {
    'title': 'AirBnB clone Restful API',
    'uiversion': 3
}
Swagger(app)

# Run the application if this script is executed directly
if __name__ == "__main__":
    host = environ.get('HBNB_API_HOST')
    port = environ.get('HBNB_API_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '5000'
    app.run(host=host, port=port, threaded=True)
