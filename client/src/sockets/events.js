import { socket } from './index';

export const socketEvents = ({ setValue }) => {
    socket.on('queueInfo', ({ data }) => {
        const members = data.members
        const status = data.status
        setValue(state => { return { ...state, members, status } });
    });

    // socket.on('positionInLine', ({ positionInLine }) => {
    //     setValue(state => { return { ...state, positionInLine } });
    // });
};