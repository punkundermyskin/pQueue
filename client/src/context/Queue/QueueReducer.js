export default (state, action) => {
  switch (action.type) {
    case "GET_QUEUE_INFO":
      return {
        ...state,
        members: action.payload.members,
        status: action.payload.status
      };
    case "UPDATE_QUEUE":
      const member = action.payload
      const existingMember = findUserByName(state.members, member.username)
      if (!existingMember) {
        return {
          ...state,
          members: [...state.members, action.payload]
        };
      } else {
        const updatedMembers = updateMembers(state.members, member)
        return {
          ...state,
          members: updatedMembers
        };
      }
    case "SOCKET_ERROR":
      return {
        ...state,
        sessionsError: action.payload
      };
    default:
      return state;
  }
};

function findUserByName(members, username) {
  return members.find((element) => {
    return element.username === username;
  })
}

function updateMembers(members, member) {
  return members.map((item, index) => {
    if (item._id === member._id) {
      return {
        member
      }
    }
    return item;
  });
}