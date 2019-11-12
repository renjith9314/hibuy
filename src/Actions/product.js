import { db } from "../firebase";

export const PRODUCT_ADDED_SUCCESS = "PRODUCT_ADDED_SUCCESS";
export const PRODUCT_ADDED_ERROR = "PRODUCT_ADDED_ERROR";


const AddProductSuccess = product => {
  return {
    type: PRODUCT_ADDED_SUCCESS,
    product
  };
};

const AddProductError = message => {
  return {
    type: PRODUCT_ADDED_ERROR,
    message
  };
};

export const AddProduct = (productName, productImage, productDesc) => dispatch => {
  db
    .collection('products').add({productName, productImage, productDesc})
    .then(productDetails => {
      dispatch(AddProductSuccess(productDetails));
    })
    .catch(error => {
      dispatch(AddProductError(error.message));
    });
};