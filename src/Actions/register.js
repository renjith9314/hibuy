import { fb } from "../firebase";

export const REGISTARION_SUCCESS = "REGISTARION_SUCCESS";
export const REGISTARION_ERROR = "REGISTARION_ERROR";


const signupSuccess = user => {
  return {
    type: REGISTARION_SUCCESS,
    user
  };
};

const signupError = message => {
  return {
    type: REGISTARION_ERROR,
    message
  };
};

export const registerUser = (email, password) => dispatch => {
  fb.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(signupSuccess(user));
    })
    .catch(error => {
      dispatch(signupError(error.message));
    });
};