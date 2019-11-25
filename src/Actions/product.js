import { db } from "../firebase";

export const PRODUCT_ADDED_SUCCESS = "PRODUCT_ADDED_SUCCESS";
export const PRODUCT_ADDED_ERROR = "PRODUCT_ADDED_ERROR";
export const PRODUCT_RECIVED_SUCCESS = "PRODUCT_RECIVED_SUCCESS";
export const PRODUCT_RECIVED_ERROR = "PRODUCT_RECIVED_ERROR";


const AddProductSuccess = product => {
  return {
    type: PRODUCT_ADDED_SUCCESS,
    product
  };
};

const GetProductSuccess = products => {
  return {
    type: PRODUCT_RECIVED_SUCCESS,
    products
  };
};

const AddProductError = message => {
  return {
    type: PRODUCT_ADDED_ERROR,
    message
  };
};

const GetProductError = message => {
  return {
    type: PRODUCT_RECIVED_ERROR,
    message
  };
};

export const AddProduct = (productName, productImage, productDesc) => dispatch => {
  db
    .collection('products').add({ productName, productImage, productDesc })
    .then(productDetails => {
      dispatch(AddProductSuccess(productDetails));
    })
    .catch(error => {
      dispatch(AddProductError(error.message));
    });
};

export const GetProducts = () => dispatch => {
  db
    .collection('/products')
    .get()
    .then(querySnapshot => {      
      let product = [];
      querySnapshot.docs.forEach(doc => {
        product.push(doc.data());       
        dispatch(GetProductSuccess(product));
      })
    }).catch(error => {
      dispatch(GetProductError(error.message));
    });
}
