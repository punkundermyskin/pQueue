export default (state, action) => {
  switch (action.type) {
    case "GET_QUEUE_INFO":
      return {
        ...state,
        members: action.payload.members,
        status: action.payload.status
      };
    case "NEW_MEMBER_APPEAR":
      return {
        ...state,
        members: [...state.members, action.payload.newMember]
      };
    case "SOCKET_ERROR":
      return {
        ...state,
        sessionsError: action.payload
      };
    default:
      return state;
  }
};
