import { db, fb } from "../firebase";

export const PRODUCT_RECIVED_SUCCESS = "PRODUCT_RECIVED_SUCCESS";
export const PRODUCT_RECIVED_ERROR = "PRODUCT_RECIVED_ERROR";
export const CART_UPDATE_SUCCESS = "CART_UPDATE_SUCCESS";
export const CART_UPDATE_ERROR = "CART_UPDATE_ERROR";
export const CART_FETCHED_SUCCESS = "CART_FETCHED_SUCCESS";
export const CART_FETCHED_ERROR = "CART_FETCHED_ERROR";
export const CART_LOADED_SUCCESS = "CART_LOADED_SUCCESS";
export const CART_LOADED_ERROR = "CART_LOADED_ERROR";

const GetProductSuccess = (products) => {
  return {
    type: PRODUCT_RECIVED_SUCCESS,
    products
  };
};

const AddToCartSuccess = message => {
  return {
    type: CART_UPDATE_SUCCESS,
    message
  };
};

const CartUpdateSuccess = cart => {
  return {
    type: CART_FETCHED_SUCCESS,
    cart
  };
};

const AddToCartError = message => {
  return {
    type: CART_UPDATE_ERROR,
    message
  };
};

const GetProductError = message => {
  return {
    type: PRODUCT_RECIVED_ERROR,
    message
  };
};

const CartUpdateError = message => {
  return {
    type: CART_FETCHED_ERROR,
    message
  };
};

const CartLoadedSuccess = () => {
  return {
    type: CART_LOADED_SUCCESS
  };
};

const CartLoadedError = () => {
  return {
    type: CART_LOADED_ERROR
  };
};

export const GetProducts = () => dispatch => {
  db
    .collection('products')
    .get()
    .then(querySnapshot => {
      let product = [];
      querySnapshot.docs.forEach(doc => {
        product.push({ ...doc.data(), productId: doc.id });
        dispatch(GetProductSuccess(product));
      })
    }).catch(error => {
      dispatch(GetProductError(error.message));
    });
}

export const AddToCart = (productId) => dispatch => {
  fb.auth()
    .onAuthStateChanged(user => {
      if (user) {
        let userId = user.uid;
        fb.firestore().collection('products').doc(productId)
          .get()
          .then(querySnapshot => {
            let cartValue = querySnapshot.data();
            fb.firestore().collection('cart' + userId).doc(productId).set({ ...cartValue })
              .then(result => {
                dispatch(AddToCartSuccess('Product added successfully'));
              }).catch(error => {
                dispatch(AddToCartError(error.message));
              })
          });
      }
    })
}

export const GetCartProducts = () => dispatch => {

  fb.auth()
    .onAuthStateChanged(user => {
      if (user) {
        dispatch(CartLoadedSuccess());
        let userId = user.uid;
        db
          .collection('cart' + userId)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              let cart = [];
              querySnapshot.docs.forEach(doc => {
                cart.push({ ...doc.data(), productId: doc.id });
                dispatch(CartUpdateSuccess(cart));
              })
            }
            else {
              dispatch(CartUpdateError());
            }

          }).catch(error => {
            dispatch(CartUpdateError(error.message));
          })
      }
      else {
        dispatch(CartLoadedError());
      }
    })
}

export const RemoveFromCart = (productId) => dispatch => {
  fb.auth()
    .onAuthStateChanged(user => {
      if (user) {
        let userId = user.uid;
        fb.firestore().collection('cart' + userId).doc(productId).delete()
          .then(result => {
            db
              .collection('cart' + userId)
              .get()
              .then(querySnapshot => {
                let cart = [];
                querySnapshot.docs.forEach(doc => {
                  cart.push({ ...doc.data(), productId: doc.id });
                  dispatch(CartUpdateSuccess(cart));
                })
              })
          }).catch(error => {
            dispatch(CartUpdateError(error.message));
          })
      }
    })
}
