/* Script that listens for changes on each INPUT checkbox tag */
$('document').ready(function () {
   /* Initialize an object to store selected amenities' ids and names */
   const amenitiesId = {};

   /* Function to handle checkbox click event */
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
 });
