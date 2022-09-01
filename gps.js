"use strict";
let id;

const locationSpace = document.getElementById("location");

let options = {
    timeout: 2000,
    enableHighAccuracy: true,
    maximumAge: 0
};

let showLocation = (position) => {
    let altitude = position.coords.altitude;
    if(!altitude){
        altitude = "unavailable";
    }
    locationSpace.innerHTML = `Latitude: ${position.coords.latitude}<br>
    Longitude: ${position.coords.longitude}<br>
    Accuracy: ${position.coords.accuracy}<br>
    Altitude: ${altitude}`;
}

let handleErrors = (error) => {
    switch(error.code){
        case error.PERMISSION_DENIED:
            locationSpace.innerHTML = "Access to your location was denied";
            break;
        case error.POSITION_UNAVAILABLE:
            locationSpace.innerHTML = "Your position is unavailable";
            break;
        case error.TIMEOUT:
            locationSpace.innerHTML = "The location request timed out";
            break;
        case error.UNKNOWN_ERROR:
            locationSpace.innerHTML = "An unknown error occured";
            break;
    }
}

async function watchLocation(){
    let requestAccess = new Promise(function(resolve){
        resolve(navigator.geolocation);
    })

    let result = await requestAccess;
    if(result){
        id = navigator.geolocation.watchPosition(showLocation, handleErrors, options);
    }else{
        locationSpace.innerHTML = "This browser does not support geolocation";
    }
}

function stopWatching(){
    navigator.geolocation.clearWatch(id);
}