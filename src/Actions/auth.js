import { fb } from "../firebase";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";


const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

const loginError = (message) => {
  return {
    type: LOGIN_ERROR,
    message
  };
};

export const loginUser = (email, password) => dispatch => {
  fb.auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(receiveLogin(user));
    })
    .catch(error => {
      dispatch(loginError(error.message));
    });
};

export const logoutUser = () => dispatch => {
  fb.auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
    });
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  fb.auth()
    .onAuthStateChanged(user => {
      if (user !== null) {
        dispatch(receiveLogin(user));
      }
      dispatch(verifySuccess());
    });
};