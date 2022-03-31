// Add console.log to check to see if our code is working:
console.log("Working");

// The tile layer is the background of the map:
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Secondary background map by satellite
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the map object with a centre [,] and zoom ,4 level:
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Create the base layer that will hold both maps
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};


// Pass the map layers into the layer control to add controls to the map
L.control.layers(baseMaps).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
// Determine the radius of each earthquake marker.
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// Return the style data for each earthquake plotted
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}  

// Create the layer for the map
  L.geoJSON(data, {
      // Each feature will become of circleMarker on the map
      pointToLayer: function(feature, latlng) {
          console.log(data);
          return L.circleMarker(latlng);
      },
    style: styleInfo
  }).addTo(map);  
});