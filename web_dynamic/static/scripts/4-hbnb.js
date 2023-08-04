/* Dynamic Functionality: Listen for changes on the page load */
$('document').ready(function () {
  /* Initialize an object to store selected amenities' ids and names */
  const amenitiesId = {};

  /* Listen for changes on each INPUT checkbox tag */
  $('INPUT[type="checkbox"]').click(function () {
    if ($(this).prop('checked')) {
      /* Add the selected amenity to the amenitiesId object */
      amenitiesId[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      /* Remove the deselected amenity from the amenitiesId object */
      delete amenitiesId[$(this).attr('data-id')];
    }
    /* Update the text of the '.amenities h4' element to display the selected amenities */
    $('.amenities h4').text(Object.values(amenitiesId).join(', '));
  });

  /* Get the status of the API and change the class if the API is not available
     Request status every 10 seconds */
  const callout = function () {
    $.ajax({
      type: 'get',
      url: `http://${window.location.hostname}:5001/api/v1/status/`,
      timeout: 5000,
      success: function (status) {
        if (status.status === 'OK') {
          $('DIV#api_status').addClass('available');
        } else {
          $('DIV#api_status').removeClass('available');
        }
      },
      error: function () {
        $('DIV#api_status').removeClass('available');
      },
      complete: function () {
        setTimeout(callout, 10000);
      }
    });
  };
  callout();

  /*
    Retrieve all places and create an article tag for each of them
  */
  const getPlaces = function () {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: '{}',
      dataType: 'json',
      success: function (places) {
        $.each(places, function (index, place) {
          $('.places').append(
            '<article>' +
              '<div class="title_box">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">' + '$' + place.price_by_night +
              '</div>' +
              '</div>' +
              '<div class="information">' +
              '<div class="max_guest">' +
              '<br />' + place.max_guest + ' Guests' +
              '</div>' +
              '<div class="number_rooms">' +
              '<br />' + place.number_rooms + ' Bedrooms' +
              '</div>' +
              '<div class="number_bathrooms">' +
              '<br />' + place.number_bathrooms + ' Bathroom' +
              '</div>' +
              '</div>' +
              '<div class="description">' + place.description +
              '</div>' +
              '</article>');
        });
      }
    });
  };
  getPlaces();

  /*
    Filter places by amenities on button search click
  */
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(amenitiesId) }),
      dataType: 'json',
      success: function (places) {
        $('.places').empty();
        $.each(places, function (index, place) {
          $('.places').append(
            '<article>' +
              '<div class="title_box">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">' + '$' + place.price_by_night +
              '</div>' +
              '</div>' +
              '<div class="information">' +
              '<div class="max_guest">' +
              '<br />' + place.max_guest + ' Guests' +
              '</div>' +
              '<div class="number_rooms">' +
              '<br />' + place.number_rooms + ' Bedrooms' +
              '</div>' +
              '<div class="number_bathrooms">' +
              '<br />' + place.number_bathrooms + ' Bathroom' +
              '</div>' +
              '</div>' +
              '<div class="description">' + place.description +
              '</div>' +
              '</article>');
        });
      }
    });
  });
});
