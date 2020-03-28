import { socket } from "./index";

// export const addClientToQueue = () => {
//     socket.emit('addClientIdToQueue');
// };

export const getQueueInfo = (id) => {
    socket.emit('queueInfoToSocket', {
        id: id
    });
};

// export const removeUserFromQueue = () => {
//     socket.emit('removeUserFromQueue');
// };