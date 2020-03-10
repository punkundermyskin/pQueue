export default (state, action) => {
    switch (action.type) {
        case "GET_USERS":
            return {
                ...state,
                users: action.payload.data,
                usersSuccess: true
            };
        case "GET_OPERATORS":
            return {
                ...state,
                users: action.payload.data,
                usersSuccess: true
            };
        // case "DELETE_TRANSACTION":
        //   return {
        //     ...state,
        //     transactions: state.transactions.filter(
        //       transaction => transaction._id !== action.payload
        //     )
        //   };
        // case "CREATE_SESSION":
        //     return {
        //         ...state,
        //         users: [...state.sessions, action.payload.data],
        //         usersSuccess: true
        //     };
        case "USERS_ERROR":
        case "OPERATORS_ERROR":
            return {
                ...state,
                usersSuccess: false,
                usersError: action.payload.error
            };
        default:
            return state;
    }
};