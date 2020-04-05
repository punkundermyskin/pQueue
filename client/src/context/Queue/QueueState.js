import React, { createContext, useReducer } from "react";
import io from "socket.io-client";
import QueueReducer from "./QueueReducer";

export const socket = io('http://localhost:5000', {
    // query: {
    //     token: localStorage.getItem("token")
    // },
    // forceNew: true
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity
});

// Initial State
const initialState = {
    members: [],
    session: null
};

// Create context
export const QueueContext = createContext(initialState);

// Provider component
export const QueueProvider = ({ children }) => {
    const [state, dispatch] = useReducer(QueueReducer, initialState);

    function getQueueInfo(id) {
        try {
            socket.emit('queueInfoToSocket', id);
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

    function joinSocketSession(id) {
        socket.emit('join', {
            id: id,
            token: localStorage.getItem("token")
        });
        console.log('join sent')
    }

    function leaveSession(id) {
        socket.emit('leave', id);
        console.log('leave sent')
    }

    socket.on('update', (data) => {
        dispatch({
            type: "UPDATE_QUEUE",
            payload: data
        });
    });

    socket.on('remove', (id) => {
        dispatch({
            type: "REMOVE_MEMBER",
            payload: id
        });
    });

    return (
        <QueueContext.Provider
            value={{
                members: state.members,
                session: state.session,
                getQueueInfo,
                joinSocketSession,
                leaveSession
            }}
        >
            {children}
        </QueueContext.Provider>
    );
};
