import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

// Initial State
const initialState = {
  isAuth: false,
  token: localStorage.getItem("token"),
  user: null,
  loading: false,
  error: null
};

// Create context
export const AuthContext = createContext(initialState);

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Setup config/headers and token
  const createConfig = () => {
    // Get token from localstorage
    const token = state.token

    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    // If token, add to headers
    if (token) {
      config.headers['Authorization'] = token
    }

    return config
  };

  async function loadUser() {
    const config = createConfig()
    try {
      const res = await axios.get("/api/auth/me", config);

      dispatch({
        type: "USER_LOADED",
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        // payload: error.response.error
        payload: error.response.data
      });
    }
  }

  async function registerUser(user) {
    const config = createConfig()

    try {
      const res = await axios.post("/api/auth", user, config);

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: error.response.error
      });
    }
  }

  async function loginUser(username, password) {
    const config = createConfig()

    const body = JSON.stringify({ username, password });

    try {
      const res = await axios.post("/api/auth/login", body, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAIL",
        // payload: error.response.error
        payload: error.response.data
      });
    }
  }

  async function logoutUser() {
    const config = createConfig()
    const token = state.token
    const body = JSON.stringify({ token });

    try {
      const res = await axios.post("/api/auth/me/logout", body, config);

      dispatch({
        type: "LOGOUT_SUCCESS",
        payload: res.data
      });
    } catch (error) {
      // TODO: Check this stuff
      dispatch({
        type: "LOGOUT_SUCCESS",
        payload: error.response.error
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: state.isAuth,
        user: state.user,
        error: state.error,
        loading: state.loading,
        loadUser,
        registerUser,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
