import React, { createContext, useReducer } from "react";
import io from "socket.io-client";
import QueueReducer from "./QueueReducer";

export const socket = io('http://localhost:5000', {
    query: {
        token: localStorage.getItem("token")
    },
    forceNew: true
});

// Initial State
const initialState = {
    members: [],
    status: null
};

// Create context
export const QueueContext = createContext(initialState);

// Provider component
export const QueueProvider = ({ children }) => {
    const [state, dispatch] = useReducer(QueueReducer, initialState);

    function getQueueInfo(id) {
        try {
            socket.emit('queueInfoToSocket', {
                id: id
            });
            socket.on('queueInfo', (data) => {
                dispatch({
                    type: "GET_QUEUE_INFO",
                    payload: data
                });
            });
        } catch (error) {
            dispatch({
                type: "SOCKET_ERROR",
                payload: error
            });
        }
    }

    socket.on('newMember', (data) => {
        dispatch({
            type: "NEW_MEMBER_APPEAR",
            payload: data
        });
    });

    return (
        <QueueContext.Provider
            value={{
                members: state.members,
                status: state.status,
                getQueueInfo
            }}
        >
            {children}
        </QueueContext.Provider>
    );
};
