export default (state, action) => {
  switch (action.type) {
    case "GET_QUEUE_INFO":
      console.log('reducer get info')
      return {
        ...state,
        members: action.payload.members,
        session: action.payload.session,
        isLoading: false
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
    case "REMOVE_MEMBER":
      const id = action.payload
      const updatedMembers = state.members.filter(member => member._id != id);
      return {
        ...state,
        members: updatedMembers
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

function findUserByName(members, username) {
  return members.find((element) => {
    return element.username === username;
  })
}

function updateMembers(members, member) {
  for (var x = 0; x < members.length; x++) {
    if (members[x]._id === member._id) {
      members[x] = member
    }
    return members
  }
  // return members.map((item, index) => {
  //   if (item._id === member._id) {
  //     return {
  //       member
  //     }
  //   }
  //   return item;
  // });
}