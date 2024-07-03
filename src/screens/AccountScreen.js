import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';
import {FontAwesome} from '@expo/vector-icons';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext)
    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text style={{ fontSize: 40 }}>AccountScreen</Text>
            <Spacer>
                <Button title='Sign out' onPress={signout} />
            </Spacer>
        </SafeAreaView>
    )
}

AccountScreen.navigationOptions=()=>{
    return {
        tabBarIcon: <FontAwesome name='gear' size={25}/>
    }
}
const styles = StyleSheet.create({});

export default AccountScreen;