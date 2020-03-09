import React, { createContext, useReducer } from "react";
import SessionReducer from "./SessionsReducer";
import axios from "axios";

// Initial State
const initialState = {
    sessions: []
};

// Create context
export const SessionsContext = createContext(initialState);

// Provider component
export const SessionsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SessionReducer, initialState);

    const createConfig = () => {
        const token = state.token

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        if (token) {
            config.headers['Authorization'] = token
        }

        return config
    };

    async function getSessions() {
        const config = createConfig()

        try {
            const res = await axios.get("/api/sessions", config);

            dispatch({
                type: "GET_SESSIONS",
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: "SESSIONS_ERROR",
                payload: error.response.error
            });
        }
    }

    async function createSessions(session) {
        const config = createConfig()

        try {
            const res = await axios.post("/api/sessions", session, config);

            dispatch({
                type: "CREATE_SESSION",
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: "SESSIONS_ERROR",
                payload: error.response.error
            });
        }
    }

    return (
        <SessionsContext.Provider
            value={{
                sessions: state.sessions,
                getSessions,
                createSessions
            }}
        >
            {children}
        </SessionsContext.Provider>
    );
};
