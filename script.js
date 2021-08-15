//making a map and tiles 
const mymap = L.map('mapid').setView([0, 0], 1);
const marker = L.marker([0, 0]).addTo(mymap);
const attribution =
'&copy; <a href =""https://www.openstreetmaps.org/copyright">OpenStreetMap</a> contributors'
const tileUrl = " https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap)

//name a variable to store url to consume fetch
const api_url = "https://api.wheretheiss.at/v1/satellites/25544"

let firstTime = true

//async function to fetch and get reponse
async function getISS() {
    setInterval(async () => {
    const response = await fetch(api_url)
    const data = await response.json();
    const {latitude, longitude} = data; //extracts the lat & lon from api
   
   marker.setLatLng([latitude, longitude])
   if (firstTime) {
   mymap.setView([latitude, longitude], 2) // location in map
   firstTime = false
   } 
    document.getElementById('lat').innerHTML = latitude.toFixed(2);
    document.getElementById('lon').innerHTML = longitude.toFixed(2);
    console.log(latitude)
    console.log(longitude)
}, 1000)
}
//
getISS();