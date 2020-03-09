export default (state, action) => {
  switch (action.type) {
    case "GET_SESSIONS":
      return {
        ...state,
        sessions: action.payload.data
      };
    // case "DELETE_TRANSACTION":
    //   return {
    //     ...state,
    //     transactions: state.transactions.filter(
    //       transaction => transaction._id !== action.payload
    //     )
    //   };
    case "CREATE_SESSION":
      return {
        ...state,
        sessions: [...state.sessions, action.payload.data]
      };
    case "SESSIONS_ERROR":
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
