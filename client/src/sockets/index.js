import io from "socket.io-client";
import { socketEvents } from "./events";
import { getQueueInfo } from "./emit";

export const socket = io('http://localhost:5000');

// export const socket = io('http://localhost:5000', {
//     extraHeaders: {
//       'x-auth-token': localStorage.getItem("token")
//     },
//     transportOptions: {
//       polling: {
//         extraHeaders: {
//           'x-auth-token': localStorage.getItem("token")
//         }
//       }
//     },
//   });

// export const socket = io('http://localhost:5000', {
//     extraHeaders: {
//       'x-auth-token': "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
//     },
//   });

export const initSockets = ({ setValue }) => {
    socketEvents({ setValue });
    getQueueInfo();
};