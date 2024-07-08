

// console.log("Good to go chif.")

const socket = io()

if (navigator.geolocation) {

    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;

            socket.emit("send-location", { latitude, longitude });
        },
        (err) => console.log(err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        }
    )

} else {
    alert("Please give location permission to this web.")
}



var map = L.map("map").setView([0, 0], 10);

// // // https://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png
// // // https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://akp23.vercel.app/">Ashish</a>'
}).addTo(map)


// // // Make circle in map by below code ----------->
// L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);



const marker = {}

socket.on("recive-location", (data) => {
    const { id, latitude, longitude } = data;

    // console.log(data)

    map.setView([latitude, longitude]);

    // marker[id] = L.marker([ 26.8466937, 79.0616]).addTo(map);

    // console.log(marker)

    if (marker[id]) {


        // console.log(marker[id])

        marker[id].setLatLag([latitude, longitude]);


        // L.marker([26.8, 81]).addTo(map);

        // L.marker([+latitude + .015, +longitude + .015]).addTo(map);


        // marker[id] = L.marker([+latitude, +longitude]).addTo(map);

        // marker[id] = L.marker([latitude, longitude]).addTo(map);

        // marker[id] = L.setLatLag([latitude, longitude])
        // marker[id] = L.marker([latitude, longitude]).addTo(MAP);
    }
    else {
        marker[id] = L.marker([latitude, longitude]).addTo(map);
    }

    // // // Experiment here ----------->

    // L.circle([latitude, longitude], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 500
    // }).addTo(map);




})





socket.on("user-disconnected", (id) => {

    map.removeLayer(marker[id])
    delete marker[id]

})