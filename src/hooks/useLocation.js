import { useEffect, useState } from 'react';
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);


    useEffect(() => {
        let subscriber = null;
        const startWatching = async () => {
            try {
                const { granted } = await requestForegroundPermissionsAsync();
                if (!granted) {
                    throw new Error('Location permission not granted');
                }
                subscriber = await watchPositionAsync({ //will watch the user's location and see it change over time
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000, //try to get an update once every second. 
                    distanceInterval: 10 //try to get an update once every 10 meters.
                },
                    callback
                );

            } catch (e) {
                setErr(e);
            }
        }

        if (shouldTrack) {
            startWatching();
        } else {
            if (subscriber) {
                subscriber.remove(); //stops the watching process entirely
            }
            subscriber = null; //dont have a subscriber so don't have anything to stop . dont need access to that subscriber anymore
        }

        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };
    }, [shouldTrack, callback]);

    return [err];
}

// (location) => {
//     addLocation(location);
// }

//if the value in the variable inside the array of useEffect changes then run the function that has been passed as the first argument.

//if u leave the createTrack page and then revisit it, the tracking does stop when u leave the page and restarts when u come back to createTrack page
//but the circle seems to jump to a farther location. this is because the location keeps updating ONLY INSIDE MOCKLOCATION bc the setInterval keeps running.
//it does not get updated in the circle in Map.js bc we stop the watching process.
//no matter what whether on tracking location or not, I'm always changing my position in the background.