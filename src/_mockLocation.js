import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001; //represents 10 meters in longitude and latitude

const getLocation = (increment) => {
    return {
        timestamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: 55.14277713380265 + increment * tenMetersWithDegrees,
            latitude: 25.072439051524697 + increment * tenMetersWithDegrees
        }
    }
}

let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter++
}, 1000);

