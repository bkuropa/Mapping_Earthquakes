// Add console.log to check to see if our code is working:
console.log("Working");

// The tile layer is the background of the map:
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Secondary background map by satellite
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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

// Making the earthquake layer for the map.
let earthquakes = new L.layerGroup();
// Define an object that contains the overlays.
// Make it visible at all times.
let overlays = {
  Earthquakes: earthquakes
};

// Pass the map layers into the layer control to add controls to the map
L.control.layers(baseMaps, overlays).addTo(map);

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
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}  

// Determine the color inside each circle via earthquake magnitudes
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

// Create the layer for the map
  L.geoJSON(data, {
      // Each feature will become of circleMarker on the map
      pointToLayer: function(feature, latlng) {
          console.log(data);
          return L.circleMarker(latlng);
      },
      // Set the style for each cirleMarker to show magnitude & location
    style: styleInfo,
    // Make a popup for each circleMarker
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(earthquakes);  
  
  // Push the earthquake layer to the map.
  earthquakes.addTo(map);

  // Build the legend for the map
  let legend = L.control({
    position: 'bottomright'
  });

  legend.onAdd = function () {

    let div = L.DomUtil.create('div', 'info legend');
    const magnitudes = [0,1,2,3,4,5];
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];
    // Loop through intervals to make a label for each magnitude
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
       magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };
  
  legend.addTo(map);

});