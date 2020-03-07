import React, { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer';
import axios from 'axios';

// Initial State
const initialState = {
    isAuth: false,
    token: localStorage.getItem('token'),
    user: null,
    loading: false,
    error: null
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Actions
    async function loadUser() {
        const token = state.token
        if (!token) {
            return
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        // config.headers['Authorization'] = state.token;


        try {
            const res = await axios.get('/api/auth/me', config);

            dispatch({
                type: 'USER_LOADED',
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: 'AUTH_ERROR',
                payload: error.response.error
            });
        }
    }

    // Actions
    async function registerUser(username, firstName, lastName, group, machineID, password) {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ username, firstName, lastName, group, machineID, password });

        try {
            const res = await axios.post('/api/auth', body, config);

            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: 'REGISTER_FAIL',
                payload: error.response.error
            });
        }
    }

    // Actions
    async function loginUser(username, password) {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ username, password });

        try {
            const res = await axios.post('/api/auth/login', body, config);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: 'LOGIN_FAIL',
                payload: error.response.error
            });
        }
    }

    // Actions
    async function logoutUser() {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const token = state.token

        if (token) {
            config.headers['Authorization'] = token;
        }

        const body = JSON.stringify({ token });

        try {
            const res = await axios.post('/api/auth/me/logout', body, config);

            dispatch({
                type: 'LOGOUT_SUCCESS',
                payload: res.data
            });
        } catch (error) {
            // TODO: Check this stuff
            dispatch({
                type: 'LOGOUT_SUCCESS',
                payload: error.response.error
            });
        }
    }


    return (<GlobalContext.Provider value={{
        isAuth: state.isAuth,
        user: state.user,
        error: state.error,
        loading: state.loading,
        loadUser,
        registerUser,
        loginUser,
        logoutUser
    }}>
        {children}
    </GlobalContext.Provider>);
}
