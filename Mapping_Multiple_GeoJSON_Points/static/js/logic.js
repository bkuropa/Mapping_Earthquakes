// Add console.log to check to see if our code is working:
console.log("Working");

// Create the map object with a centre [,] and zoom ,4 level:
let map = L.map('mapid').setView([30,30], 2);

// The tile layer is the background of the map:
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/satellite-streets-v11',
    //tileSize: 512,
    //zoomOffset: -1,
    accessToken: API_KEY
});

// Access the airport GeoJSON URL from GitHub
let airportData = "https://github.com/bkuropa/Mapping_Earthquakes/blob/Mapping_Multiple_GeoJSON_Points/Mapping_Multiple_GeoJSON_Points/majorAirports.json"
// airportData = "https://raw.githubusercontent.com/bkuropa/Mapping_Earthquakes/blob/Mapping_Multiple_GeoJSON_Points/Mapping_Multiple_GeoJSON_Points/majorAirports.json"
// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});
