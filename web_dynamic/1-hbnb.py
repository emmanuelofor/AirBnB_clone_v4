#!/usr/bin/python3
""" Starts a Flask Web Application """

# Import necessary modules and classes
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid

# Initialize the Flask application
app = Flask(__name__)

# Define a function to close the database session after each request
@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()

# Define a route to display the main page of the web application
@app.route('/1-hbnb/', strict_slashes=False)
def hbnb():
    """ Display the main page of the HBNB web application """
    # Get all states from the database and sort them by name
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    # Group each state with its cities and sort the cities by name
    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    # Get all amenities from the database and sort them by name
    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    # Get all places from the database and sort them by name
    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    # Render the template '1-hbnb.html' with the data to be displayed
    return render_template('1-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=uuid.uuid4())

# Run the application if this script is executed directly
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
