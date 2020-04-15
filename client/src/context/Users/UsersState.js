import React, { createContext, useReducer } from "react";
import UsersReducer from "./UsersReducer";
import axios from "axios";

// Initial State
const initialState = {
  users: [],
  usersSuccess: false,
  usersError: null,
};

// Create context
export const UsersContext = createContext(initialState);

// Provider component
export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsersReducer, initialState);

  const createConfig = () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  };

  async function getUsers() {
    const config = createConfig();

    try {
      const res = await axios.get("/api/users", config);

      dispatch({
        type: "GET_USERS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "USERS_ERROR",
        payload: error.response.data,
      });
    }
  }

  async function getOperators() {
    const config = createConfig();

    try {
      const res = await axios.get("/api/users/operators", config);

      dispatch({
        type: "GET_OPERATORS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "OPERATORS_ERROR",
        payload: error.response.data,
      });
    }
  }

  return (
    <UsersContext.Provider
      value={{
        users: state.users,
        usersSuccess: state.usersSuccess,
        usersError: state.usersError,
        getUsers,
        getOperators,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
