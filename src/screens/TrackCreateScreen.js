import "../_mockLocation";
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import Map from '../components/Map';
import TrackForm from "../components/TrackForm";
import { FontAwesome } from '@expo/vector-icons';

const TrackCreateScreen = ({ isFocused }) => {
    const { state:{recording, currentLocation}, addLocation } = useContext(LocationContext);
    const callback= useCallback( (location) => {
        addLocation(location, recording)
    }, [recording])
    const [err] = useLocation(isFocused || recording, callback); //we check what is displayed in the jsx block from the useLocation hook and destructure that from the hook.
    console.log(currentLocation);
    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h3>Create a track</Text>
            <Map />
            {err ? <Text>Please enable location services</Text> : null}
            <TrackForm />
        </SafeAreaView>
    )
}

TrackCreateScreen.navigationOptions=()=>{
    return {
        title: 'Add Track',
        tabBarIcon: <FontAwesome name="plus" size={25}/>
    }
}

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);

//every second new location object is passed from _mockLocation which resembles an object which would be passed by 
//expo-location's watchPositionAsync when the user's location would change. 
//watchPositionAsync function detects this new object and then passes the new location in the callback which is its second argument. 
//this callback then triggers a dispatch in useLocation which updates the currentLocation value of its state.
//the currentLocation's coordinates are accessed thru its coords object and used to update the circle's position in Map.js

//getting a location out of expo location library

