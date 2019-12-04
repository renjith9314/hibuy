import { fb, storage } from "../firebase";

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

export const registerUser = (email, password, image, fName, lName) => dispatch => {
  fb.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      let userId = user.user.uid;
      const uploadTask = storage.ref(`ProfileImages/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => { },
        error => { },
        () => {
          storage
            .ref("ProfileImages")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              let userDetails = {
                'Profileimage' : url,
                'Email' : email,
                'FirstName' : fName,
                'LastName' : lName,
              }
              fb.firestore().collection('users').doc(userId).set(userDetails)
              .then(result => {
                console.log(result);
              })
            });
        })
      dispatch(signupSuccess(user));
    })
    .catch(error => {
      dispatch(signupError(error.message));
    });
};