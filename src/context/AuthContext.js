import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': {
            return { ...state, errorMessage: action.payload }
        }
        case 'signin': {
            return { errorMessage: '', token: action.payload }
        }
        case 'clear_error_message': {
            return { ...state, errorMessage: '' }
        }
        case 'signout': {
            return {token: null, errorMessage:'' }
        }
        default:
            return state;
    }
}

const signup = (dispatch) => {
    return async ({ email, password }) => {
        try {
            //make api request to sign up w that email and password
            const response = await trackerApi.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            //if we sign up, modify our state and say that we are authenticated
            dispatch({ type: 'signin', payload: response.data.token });

            //navigate to main flow
            navigate('TrackList');
        } catch (err) {
            //if signing up fails, we probably need to reflect an error message somewhere.
            dispatch({ type: 'add_error', payload: 'something went wrong with signup' })
        };
    };
};

const signin = (dispatch) => {
    return async ({ email, password }) => {

        try { //try to sign in
            const response = await trackerApi.post('/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            //handle success by updating state
            dispatch({ type: 'signin', payload: response.data.token });
            //handle failure by showing error message (somehow)
            navigate('TrackList');
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with signin' });

        }
    }
}

const clearErrorMessage = (dispatch) => {
    return () => {
        dispatch({ type: 'clear_error_message' });
    }
}

const tryLocalSignin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            dispatch({ type: 'signin', payload: token });
            navigate('TrackList');
        } else {
            navigate('loginFlow');
        }
    }
}

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow');
}


export const { Context, Provider } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);