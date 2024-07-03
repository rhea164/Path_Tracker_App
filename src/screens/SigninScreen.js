import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';
import NavLink from '../components/NavLink';

const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);
    return <View style={styles.container} >
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <AuthForm
            headerText='Sign In to Your Account'
            errorMessage={state.errorMessage}
            submitBtnTitle='Sign in'
            onSubmit={({ email, password }) => signin({ email, password })}
        />
        <NavLink
            routeName='Signup'
            linkText='Already have an account? Sign up instead.'
        />
    </View>
}

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;