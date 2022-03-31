// Add console.log to check to see if our code is working:
console.log("Working");

// Create the map object with a centre [,] and zoom ,4 level:
let map = L.map('mapid').setView([37.5,-122.5], 10);

// Add GeoJSON data.
let sanFranAirport = 
{"type": "FeatureCollection", "features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}
    }
]};

L.geoJson(sanFranAirport, {
/*    pointToLayer: function(feature, latlng) {
        console.log(feature);
        return L.marker(latlng)
        .bindPopup("<h2>" + feature.properties.city + "</h2>");
    } */
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup();
    }
}).addTo(map);

L.geoJSON(sanFranAirport).addTo(map);

// The tile layer is the background of the map:
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/satellite-streets-v11',
    //tileSize: 512,
    //zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
