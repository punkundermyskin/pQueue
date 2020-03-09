export default (state, action) => {
  switch (action.type) {
    case "GET_SESSIONS":
      return {
        ...state,
        sessions: action.payload.data,
        sessionsSuccess: true
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
        sessions: [...state.sessions, action.payload.data],
        sessionsSuccess: true
      };
    case "SESSIONS_ERROR":
      return {
        ...state,
        sessionsError: action.payload,
        sessionsSuccess: false
      };
    default:
      return state;
  }
};
