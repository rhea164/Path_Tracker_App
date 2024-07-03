import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps'


const TrackDetailScreen = ({ navigation }) => {
    const _id = navigation.getParam('_id');
    const { state } = useContext(TrackContext);

    const track = state.find(t => t._id === _id);

    const initialCoords=track.locations[0].coords


    return (
        <>
            <Text style={{ fontSize: 40 }}></Text>
            <MapView style={styles.map}
                initialRegion={{
                    ...initialCoords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01

                }}
            >
                <Polyline coordinates={track.locations.map(loc => loc.coords)} />
            </MapView>
        </>
    )
    //polyline coordinates prop takes an array of coordinates.
}

// TrackDetailScreen.navigationOptions=()=>{
//     return {
//         title: {track.name},
//     }
// }

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default TrackDetailScreen;
