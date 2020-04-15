export default (state, action) => {
  switch (action.type) {
    case "GET_SESSIONS":
      return {
        ...state,
        sessions: action.payload.data,
        sessionsSuccess: true,
      };
    case "CREATE_SESSION":
      return {
        ...state,
        sessions: [...state.sessions, action.payload.data],
        sessionsSuccess: true,
      };
    case "JOIN_SESSIONS":
      return {
        ...state,
        sessionsSuccess: true,
      };
    case "GET_SESSION_STUDENTS":
      return {
        ...state,
        // students: action.payload.data,
        students: action.students.data,
        sessionsSuccess: true,
      };
    case "SESSIONS_ERROR":
      return {
        ...state,
        sessionsError: action.payload,
        sessionsSuccess: false,
      };
    default:
      return state;
  }
};
