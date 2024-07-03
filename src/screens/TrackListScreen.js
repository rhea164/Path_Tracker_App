import React, { useContext } from 'react';
import { NavigationEvents } from 'react-navigation';
import { Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';
const TrackListScreen = ({ navigation }) => {
    const { state, fetchTracks } = useContext(TrackContext)
    console.log(state);
    return <>
        <NavigationEvents onWillFocus={fetchTracks} />

        <FlatList
            data={state}
            keyExtractor={track => track._id}
            //first argument to the function in renderItem is an object inside of which there is an item property
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={()=>
                    navigation.navigate('TrackDetail',{_id: item._id} )
                    } >
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                )
            }}
        />
    </>
}

TrackListScreen.navigationOptions=()=>{
    return {
        title: 'Tracks',
    }
}

const styles = StyleSheet.create({});

export default TrackListScreen;