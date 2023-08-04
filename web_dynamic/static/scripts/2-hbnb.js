/* Script that listens for changes on each INPUT checkbox tag */
$('document').ready(function () {
  // Get the URL for checking the API status
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  
  // Make a GET request to check the API status
  $.get(url, function (res) {
    // If the API status is 'OK', add the 'available' class to the element with id 'api_status'
    if (res.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      // If the API status is not 'OK', remove the 'available' class from the element with id 'api_status'
      $('#api_status').removeClass('available');
    }
  });

  // Initialize an object to store selected amenities' ids and names
  const amenities = {};
  
  // Function to handle checkbox change event
  $('INPUT[type="checkbox"]').change(function () {
    // If the checkbox is checked, add the selected amenity to the amenities object
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      // If the checkbox is unchecked, remove the deselected amenity from the amenities object
      delete amenities[$(this).attr('data-id')];
    }
    
    // Update the text of the '.amenities H4' element to display the selected amenities
    $('.amenities H4').text(Object.values(amenities).join(', '));
  });
});
