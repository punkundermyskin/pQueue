export default function (state, action) {
  switch (action.type) {
    case "USER_LOADING":
      return {
        ...state,
        authLoading: true,
      };
    case "USER_LOADED":
      return {
        ...state,
        isAuth: true,
        authLoading: false,
        user: action.payload.data,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        authLoading: false,
        user: action.payload.data,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
        authLoading: false
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
        authLoading: false,
        authError: action.payload.error,
      };
    default:
      return state;
  }
}
