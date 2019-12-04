import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  REGISTARION_SUCCESS,
  REGISTARION_ERROR,
  GET_USER_DETAILS_SUCCESS
} from "../Actions";

export default (
  state = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    isSignUpCompleted: false,
    errorMsg: '',
    user: {},
    userData:{}
  },
  action
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: true,
        isAuthenticated: false,
        errorMsg:action.message,
        user: {},
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {}
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false
      };
    case REGISTARION_SUCCESS:
      return {
        ...state,
        isSignUpCompleted: true,
        errorMsg: 'Successfully Registered',
        user: action.user
      };
    case REGISTARION_ERROR:
      return {
        ...state,
        isSignUpCompleted: false,
        errorMsg: action.message,
        user: {}
      };
      case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userData: action.data
      };
    default:
      return state;
  }
};