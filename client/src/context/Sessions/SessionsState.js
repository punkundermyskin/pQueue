import React, { createContext, useReducer } from "react";
import SessionReducer from "./SessionsReducer";
import axios from "axios";

// Initial State
const initialState = {
  sessions: [],
  students: [],
  sessionsSuccess: false,
  sessionsError: null,
};

// Create context
export const SessionsContext = createContext(initialState);

// Provider component
export const SessionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SessionReducer, initialState);

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

  async function getSessions() {
    const config = createConfig();

    try {
      const res = await axios.get("/api/sessions", config);

      dispatch({
        type: "GET_SESSIONS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "SESSIONS_ERROR",
        payload: error.response,
      });
    }
  }

  async function createSessions(session) {
    const config = createConfig();

    try {
      const res = await axios.post("/api/sessions", session, config);

      dispatch({
        type: "CREATE_SESSION",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "SESSIONS_ERROR",
        payload: error.response.data,
      });
    }
  }

  async function joinSession(id) {
    const config = createConfig();

    try {
      await axios.post("/api/sessions/" + id, null, config);

      dispatch({
        type: "JOIN_SESSIONS",
      });
    } catch (error) {
      dispatch({
        type: "SESSIONS_ERROR",
        payload: error.response,
      });
    }
  }

  async function getStudents(id) {
    const config = createConfig();

    try {
      const res = await axios.get("/api/sessions/" + id + "/students", config);

      dispatch({
        type: "GET_SESSION_STUDENTS",
        students: res.data,
      });
    } catch (error) {
      dispatch({
        type: "SESSIONS_ERROR",
        payload: error.response,
      });
    }
  }

  return (
    <SessionsContext.Provider
      value={{
        sessions: state.sessions,
        sessionsSuccess: state.sessionsSuccess,
        sessionsError: state.sessionsError,
        students: state.students,
        getSessions,
        createSessions,
        joinSession,
        getStudents,
      }}
    >
      {children}
    </SessionsContext.Provider>
  );
};
