// const initialState = {
//     token: localStorage.getItem('token'),
//     isAuthenticated: null,
//     isLoading: false,
//     user: null
// };

export default function (state, action) {
  switch (action.type) {
    case "USER_LOADING":
      return {
        ...state,
        isLoading: true
      };
    case "USER_LOADED":
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: action.payload.data
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false,
        user: action.payload.data
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT_SUCCESS":
    case "REGISTER_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
