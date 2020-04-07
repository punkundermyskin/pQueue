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
    session: null,
    isLoading: true
};

// Create context
export const QueueContext = createContext(initialState);

// Provider component
export const QueueProvider = ({ children }) => {
    const [state, dispatch] = useReducer(QueueReducer, initialState);

    async function getQueueInfo(id) {
        try {
            await socket.emit('getQueueInfo', id);
            console.log('send request to server')
            await socket.on('queueInfo', (data) => {
                console.log('get info from server')
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

    async function joinSocketSession(id) {
        await socket.emit('joinSessionRoom', {
            id: id,
            token: localStorage.getItem("token")
        });
        console.log('join Session Room sent')
    }

    async function joinLine() {
        await socket.emit('joinLine', localStorage.getItem("token"))
        console.log('join line sent')
    }

    async function leaveLine() {
        await socket.emit('leaveLine', localStorage.getItem("token"))
        console.log('leave line sent')
    }

    function leaveSession() {
        socket.emit('leave', localStorage.getItem("token"))
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

    // OPERATORS part !!!

    function approveMember(member) {
        socket.emit('approveMember', {
            token: localStorage.getItem("token"),
            memberID: member._id
        });
        console.log('approve member sent')
    }


    return (
        <QueueContext.Provider
            value={{
                members: state.members,
                session: state.session,
                isLoading: state.isLoading,
                getQueueInfo,
                joinSocketSession,
                joinLine,
                leaveLine,
                leaveSession,
                approveMember
            }}
        >
            {children}
        </QueueContext.Provider>
    );
};
