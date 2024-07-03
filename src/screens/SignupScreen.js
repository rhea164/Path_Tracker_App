import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);
    return <View style={styles.container} >
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <AuthForm
            headerText='Sign Up for Tracker'
            errorMessage={state.errorMessage}
            submitBtnTitle='Sign up'
            onSubmit={({ email, password }) => signup({ email, password })}
        />
        <NavLink
            routeName='Signin'
            linkText='Already have an account? Sign in instead.'
        />
    </View>
}
SignupScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 100,
        marginHorizontal: 10
    }
});

export default SignupScreen;