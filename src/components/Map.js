import React, { useContext } from 'react';
import {StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';

const Map = () => {
    const { state: { currentLocation, locations } } = useContext(LocationContext)

    if (!currentLocation) {
        return <ActivityIndicator size='large' style={{ marginTop: 200 }} />
    }

    const initialLocation={
        longitude: 55.14277713380265,
        latitude: 25.072439051524697 
    };

    return <>
        <MapView
            style={styles.map}
            initialRegion={{
                ...initialLocation,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
            // initialRegion={{
            //     ...currentLocation.coords,
            //     latitudeDelta: 0.01,
            //     longitudeDelta: 0.01
            // }}
           >

            {/* <Polyline coordinates={points} /> */}
            <Circle
                center={currentLocation.coords}
                radius={30} //radius of the circle is 30 meters on the map.
                strokeColor='rgba(158,158,255,1.0)'
                fillColor='rgba(158,158,255,0.3)'
            />
            <Polyline coordinates={locations.map(loc=> loc.coords)} />

        </MapView>
    </>
}

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default Map;

// const points = [];
// for (let i = 0; i < 20; i++) {
//     points.push({
//         latitude: 25.0724508 +i * 0.001,
//         longitude: 55.140581 +i * 0.001
//     })
// }

// region={{
//     ...currentLocation.coords,
//     latitudeDelta: 0.001,
//     longitudeDelta: 0.001

// }}