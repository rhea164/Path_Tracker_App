import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({headerText, errorMessage, submitBtnTitle, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            <Input label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                autoCorrect={false} />
            <Spacer />
            <Input label="Password"
                secureTextEntry
                value={password}
                onChangeText={(newText) => { setPassword(newText) }}
                autoCapitalize='none'
                autoCorrect={false} />
            {errorMessage
                ? <Text style={styles.errorMessage}> {errorMessage}</Text>
                : null}
            <Spacer>
                <Button title={submitBtnTitle} onPress={() => onSubmit({ email, password })} />
            </Spacer>
        </>
    )

}

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 20
    }
});

export default AuthForm;