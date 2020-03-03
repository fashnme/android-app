import axios from 'axios';
import { Alert } from 'react-native';
import {
  MANAGE_CART_PAGE_SET_CART_ARRAY,
  USER_ADDED_PRODUCT_TO_CART,
  USER_REMOVED_PRODUCT_FROM_CART,
  USER_ADDED_PRODUCT_TO_WISHLIST,
  USER_REMOVED_PRODUCT_FROM_WISHLIST,
  SETTING_PAGE_GENERAL_LOADING_TOGGLE
} from '../types';

import {
  ManageCartGetUserCartURL,
  ManageCartAddProductToCartURL,
  ManageCartRemoveProductFromCartURL,
  ManageCartAddProductToWishlistURL,
  ManageCartPlaceOrderURL
} from '../URLS';

import { cartArray } from './dummyCartData';

// Fetch User Cart Details
export const manageCartGetUserCartDetails = ({ userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: MANAGE_CART_PAGE_SET_CART_ARRAY, payload: cartArray });

    axios({
        method: 'get',
        url: ManageCartGetUserCartURL,
        headers,
        })
        .then((response) => {
            console.log('manageCartGetUserCartDetails', response.data);
            // dispatch({ type: MANAGE_CART_PAGE_SET_CART_ARRAY, payload: cartArray });
            // TODO Fix this Fetching
        })
        .catch((error) => {
            console.log('manageCartGetUserCartDetails Actions Error ', error);
      });
  };
};

// Add Product To Cart
export const manageCartAddProductToCart = (item) => {
  // console.log('Product Added to Cart', item);
  const { productId, quantity, sizeSelected, postId, posterId, userToken } = item;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'post',
        url: ManageCartAddProductToCartURL,
        headers,
        data: { productId, quantity, size: sizeSelected, referrerPost: postId, referrerId: posterId }
        })
        .then((response) => {
            console.log('manageCartAddProductToCart Actions', response.data);
            dispatch({ type: USER_ADDED_PRODUCT_TO_CART, payload: productId });
        })
        .catch((error) => {
            console.log('manageCartAddProductToCart  Actions Error ', error);
        });
  };
};

// Remove Product From Cart
export const manageCartRemoveProductFromCart = (item) => {
  // console.log('manageCartRemoveFromCart', item);
  const { userToken, productId, addToWishlist } = item;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'post',
        url: ManageCartRemoveProductFromCartURL,
        headers,
        data: { productId }
        })
        .then((response) => {
            console.log('manageCartRemoveProductFromCart Actions', response.data);
            // TODO Fix This, get the update Cart in Response & dispatch it as new cart
            // dispatch({ type: MANAGE_CART_PAGE_SET_CART_ARRAY, payload: cartArray });
            dispatch({ type: USER_REMOVED_PRODUCT_FROM_CART, payload: productId });
        })
        .catch((error) => {
            console.log('manageCartRemoveProductFromCart Actions Error ', error);
        });

   if (addToWishlist) {
     // Moved the Product from Cart To Wishlist
     manageCartAddProductToWishlist({ productId, userToken });
   }
  };
};


// Add Product to Wishlist
export const manageCartAddProductToWishlist = ({ productId, userToken, posterId, postId }) => {
  let data = {};
  if (typeof posterId === 'undefined') {
    data = { productId };
  } else {
    data = { productId, referrerPost: postId, referrerId: posterId };
  }
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: USER_ADDED_PRODUCT_TO_WISHLIST, payload: productId });
    axios({
        method: 'post',
        url: ManageCartAddProductToWishlistURL,
        headers,
        data
        })
        .then((response) => {
            console.log('manageCartAddProductToWishlist resp', response.data);
        })
        .catch((error) => {
            console.log('manageCartAddProductToWishlist Actions Error ', error);
        });
  };
};

// Checkout Orders
export const manageCartPlaceOrder = (item) => {
  console.log('manageCartPlaceOrder', item);
  const { userToken, userCartArray, selectedAddress, totalCartValue, totalDeliveryCharges } = item;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: true });
    axios({
        method: 'post',
        url: ManageCartPlaceOrderURL,
        headers,
        data: { products: userCartArray,
              orderAmount: totalCartValue,
              deliveryAmount: totalDeliveryCharges,
              deliveryDetails: selectedAddress
            }
        })
        .then((response) => {
            // TODO Fix the Checkout 
            console.log('manageCartPlaceOrder resp', response.data);
            // Empty the Cart
            dispatch({ type: MANAGE_CART_PAGE_SET_CART_ARRAY, payload: [] });
            Alert.alert(
                 '',
                 'Order Placed Successfully!', [{
                     text: 'Ok',
                 }], {
                     cancelable: true
                 }
              );
        })
        .catch((error) => {
            console.log('manageCartPlaceOrder Actions Error ', error);
        })
        .finally(() => {
            dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: false });
        });
  };
};
