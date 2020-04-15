export default (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload.data,
        usersSuccess: true,
      };
    case "GET_OPERATORS":
      return {
        ...state,
        users: action.payload.data,
        usersSuccess: true,
      };
    case "USERS_ERROR":
    case "OPERATORS_ERROR":
      return {
        ...state,
        usersSuccess: false,
        usersError: action.payload.error,
      };
    default:
      return state;
  }
};
