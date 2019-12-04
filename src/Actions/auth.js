import { fb, db } from "../firebase";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const LOGIN_TEST = "LOGIN_TEST";
export const GET_USER_DETAILS_SUCCESS = "GET_USER_DETAILS_SUCCESS";
export const GET_USER_DETAILS_ERROR = "GET_USER_DETAILS_ERROR";


const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const receiveLogout = () => {
  console.log('aasasas');
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

const gettUserDetailsSuccess = data => {
  return {
    type: GET_USER_DETAILS_SUCCESS,
    data
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
  dispatch(receiveLogout());
  fb.auth()
    .signOut();
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

export const getUserDetails = () => dispatch => {
  fb.auth()
    .onAuthStateChanged(user => {
      if (user) {
        let userId = user.uid;
        db
          .collection('users')
          .doc(userId)
          .get()
          .then(querySnapshot => {
            dispatch(gettUserDetailsSuccess(querySnapshot.data()));
          }).catch(error => {
          })
      }
    })
}