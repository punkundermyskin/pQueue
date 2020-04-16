import React, { createContext, useReducer, useEffect } from "react";
import io from "socket.io-client";
import QueueReducer from "./QueueReducer";

export const socket = io("http://localhost:5000", {
  // change to local ip
  // query: {
  //     token: localStorage.getItem("token")
  // },
  // forceNew: true
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
});

// Initial State
const initialState = {
  members: [],
  session: null,
  isLoading: true,
  setSpinner: false,
  sessionsError: null,
};

// Create context
export const QueueContext = createContext(initialState);

// Provider component
export const QueueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(QueueReducer, initialState);

  useEffect(() => {
    socket.on("queueInfo", (data) => {
      console.log("get info from server");
      dispatch({
        type: "GET_QUEUE_INFO",
        payload: data,
      });
    });

    socket.on("update", (data) => {
      console.log("update");
      dispatch({
        type: "UPDATE_QUEUE",
        payload: data,
      });
    });

    socket.on("message", (data) => {
      dispatch({
        type: "SOCKET_ERROR",
        payload: data,
      });
    });

    socket.on("remove", (id) => {
      dispatch({
        type: "REMOVE_MEMBER",
        payload: id,
      });
    });
  }, []);

  function getQueueInfo(id) {
    setLoader();
    socket.emit("getQueueInfo", id);
    console.log("send request to server");
  }

  function joinSocketSession(id) {
    socket.emit("joinSessionRoom", {
      id: id,
      token: localStorage.getItem("token"),
    });
    console.log("join Session Room sent");
  }

  function leaveSession() {
    socket.emit("leaveSessionRoom", localStorage.getItem("token"));
    console.log("leave sent");
  }

  // ------ STUDENTS part ------------

  async function joinLine() {
    await socket.emit("joinLine", localStorage.getItem("token"));
    console.log("join line sent");
  }

  async function leaveLine() {
    await socket.emit("leaveLine", localStorage.getItem("token"));
    console.log("leave line sent");
  }

  // ---------------------------------

  // ------ OPERATORS part ------------

  function approveMember(member) {
    setLoader();
    socket.emit("approveMember", {
      token: localStorage.getItem("token"),
      memberID: member._id,
    });
    console.log("approve member sent");
  }

  async function setFreeOperator() {
    await socket.emit("freeOperator", localStorage.getItem("token"));
    console.log("freeOperator sent");
  }

  async function setUnreadyOperator() {
    await socket.emit("unreadyOperator", localStorage.getItem("token"));
    console.log("unreadyOperator sent");
  }

  function requestStudentForProcess() {
    setLoader();
    const token = localStorage.getItem("token")
    socket.emit("requestStudentForProcess", token);
    console.log("request Student For Process sent");
  }

  function returnStudentToQueue() {
    setLoader();
    const token = localStorage.getItem("token")
    socket.emit("returnStudentToQueue", token);
    console.log("return Student To Queue sent");
  }

  function finishServeringStudent() {
    setLoader();
    const token = localStorage.getItem("token")
    socket.emit("finishServeringStudent", token);
    console.log("finish Servering Student sent");
  }


  // ---------------------------------

  function setLoader() {
    dispatch({
      type: "QUEUE_LOADING",
    });
  }

  return (
    <QueueContext.Provider
      value={{
        members: state.members,
        session: state.session,
        isLoading: state.isLoading,
        setSpinner: state.setSpinner,
        sessionsError: state.sessionsError,
        getQueueInfo,
        joinSocketSession,
        joinLine,
        leaveLine,
        leaveSession,
        approveMember,
        requestStudentForProcess,
        setFreeOperator,
        setUnreadyOperator,
        finishServeringStudent,
        returnStudentToQueue
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};
