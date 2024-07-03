import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
    const { state: { name, recording, locations, currentLocation },
        changeName,
        startRecording,
        stopRecording } = useContext(LocationContext)
    const [saveTrack] = useSaveTrack();

    // console.log(locations.length);
    // console.log(currentLocation)
    return <>
        <Input placeholder='Enter track name' value={name} onChangeText={(newText) => { changeName(newText) }} />
        <Spacer>
            {recording
                ? (<Button title='stop' onPress={() => { stopRecording() }} />)
                : (<Button title="Start recording" onPress={() => { startRecording() }} />)
            }
        </Spacer>
        <Spacer>
            {!recording && locations.length
                ? <Button title='save recording' onPress={saveTrack} />
                : null
            }
        </Spacer>
    </>

}

export default TrackForm;