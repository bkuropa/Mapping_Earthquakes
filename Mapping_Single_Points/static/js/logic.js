// Add console.log to check to see if our code is working:
console.log("Working");

// Create the map object with a centre [,] and zoom ,4 level:
let map = L.map('mapid').setView([40.7, -94.5], 4);

// Add a marker for Los Angeles, California
/*circle1 = L.circle([34.0522, -118.2437], 300).addTo(map);
circle1.setStyle({color: 'black', fillColor: 'yellow'}); */
L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: "black",
    fillColor: '#ffffa1'
}).addTo(map);

// The tile layer is the background of the map:
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/dark-v10',
    //tileSize: 512,
    //zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
