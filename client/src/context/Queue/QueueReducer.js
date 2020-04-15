export default (state, action) => {
  switch (action.type) {
    case "GET_QUEUE_INFO":
      console.log("reducer get info");
      return {
        ...state,
        members: action.payload.members,
        session: action.payload.session,
        isLoading: false,
        setSpinner: false,
      };
    case "UPDATE_QUEUE":
      const member = action.payload;
      const existingMember = findUserByName(state.members, member.username);
      if (!existingMember) {
        return {
          ...state,
          members: [...state.members, action.payload],
          setSpinner: false,
        };
      } else {
        const updatedMembers = updateMembers(state.members, member);
        return {
          ...state,
          members: updatedMembers,
          setSpinner: false,
        };
      }
    case "REMOVE_MEMBER":
      const id = action.payload;
      const updatedMembers = state.members.filter(
        (member) => member._id !== id
      );
      return {
        ...state,
        members: updatedMembers,
        setSpinner: false,
      };
    case "QUEUE_LOADING":
      return {
        ...state,
        setSpinner: true,
      };
    case "QUEUE_FINISH_LOADING":
      return {
        ...state,
        setSpinner: false,
      };
    case "SOCKET_ERROR":
      return {
        ...state,
        sessionsError: action.payload,
        setSpinner: false,
      };
    default:
      return state;
  }
};

function findUserByName(members, username) {
  return members.find((element) => {
    return element.username === username;
  });
}

function updateMembers(members, member) {
  var updatedMembers = members.filter((item) => item._id !== member._id);
  updatedMembers.push(member);
  console.log("updatedMembers");
  return updatedMembers;
}
