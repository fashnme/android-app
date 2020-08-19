import axios from 'axios';
import { Alert } from 'react-native';
import {
  MANAGE_CART_PAGE_SET_CART_ARRAY,
  USER_ADDED_PRODUCT_TO_CART,
  USER_REMOVED_PRODUCT_FROM_CART,
  USER_ADDED_PRODUCT_TO_WISHLIST,
  USER_REMOVED_PRODUCT_FROM_WISHLIST,
  SETTING_PAGE_GENERAL_LOADING_TOGGLE,
  SETTING_PAGE_SET_USER_WISHLIST
} from '../types';

import {
  ManageCartGetUserCartURL,
  ManageCartAddProductToCartURL,
  ManageCartRemoveProductFromCartURL,
  ManageCartPlaceOrderURL,
  SettingsPageGetUserWishlistURL,
  ManageCartAddProductToWishlistURL,
  ManageCartRemoveProductFromWishlistURL
} from '../URLS';

// import { wishlistArray } from './dummyCartData';

// Fetch User Cart Details
export const manageCartGetUserCartDetails = ({ userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'get',
        url: ManageCartGetUserCartURL,
        headers,
        })
        .then((response) => {
            const { products } = response.data;
            // console.log('manageCartGetUserCartDetails', response.data);
            dispatch({ type: MANAGE_CART_PAGE_SET_CART_ARRAY, payload: products });
        })
        .catch((error) => {
            console.log('manageCartGetUserCartDetails Actions Error ', error);
      });
  };
};

// Add Product To Cart
export const manageCartAddProductToCart = (item) => {
  // console.log('Product Added to Cart', item);
  const { productId, quantity, sizeSelected, postId, referrerId, posterId, userToken } = item;
  const headers = { 'Content-Type': 'application/json', Authorization: userToken };
  return (dispatch) => {
    axios({
        method: 'post',
        url: ManageCartAddProductToCartURL,
        headers,
        data: { productId, quantity, size: sizeSelected, referrerPost: postId, referrerId, posterId }
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
  const { userToken, productId, addToWishlist, referrerPost, referrerId, posterId } = item;
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
            // manageCartGetUserCartDetails({ userToken }); // Again Fetch the Cart Details
            // This Method is similar to manageCartGetUserCartDetails()
            axios({
                method: 'get',
                url: ManageCartGetUserCartURL,
                headers,
                })
                .then((resp) => {
                    const { products } = resp.data;
                    console.log('manageCartGetUserCartDetails', resp.data);
                    dispatch({ type: MANAGE_CART_PAGE_SET_CART_ARRAY, payload: products });
                })
                .catch((err) => {
                    console.log('manageCartGetUserCartDetails Actions Error ', err);
              });
            dispatch({ type: USER_REMOVED_PRODUCT_FROM_CART, payload: productId });
        })
        .catch((error) => {
            console.log('manageCartRemoveProductFromCart Actions Error ', error);
        });

   if (addToWishlist) {
     // Moved the Product from Cart To Wishlist
     // manageCartAddProductToWishlist({ productId, userToken, postId: referrerPost, referrerId, posterId });
     // This method is similar to manageCartAddProductToWishlist()
     dispatch({ type: USER_ADDED_PRODUCT_TO_WISHLIST, payload: productId });
     axios({
         method: 'post',
         url: ManageCartAddProductToWishlistURL,
         headers,
         data: { productId, referrerPost, referrerId, posterId }
         })
         .then((response) => {
             console.log('manageCartAddProductToWishlist resp', response.data);
         })
         .catch((error) => {
             console.log('manageCartAddProductToWishlist Actions Error ', error);
         });
   }
  };
};


// Add Product to Wishlist
export const manageCartAddProductToWishlist = ({ productId, userToken, posterId, postId, referrerId }) => {
  let data = {};
  if (typeof posterId === 'undefined') {
    data = { productId };
  } else {
    data = { productId, referrerPost: postId, referrerId, posterId };
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

// Get User Wishlist
export const manageCartGetUserWishlist = ({ userToken }) => {
  // console.log('manageCartGetUserWishlist', userToken);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'get',
        url: SettingsPageGetUserWishlistURL,
        headers,
        })
        .then((response) => {
            console.log('manageCartGetUserWishlist resp', response.data);
            const { products } = response.data;
            dispatch({ type: SETTING_PAGE_SET_USER_WISHLIST, payload: products });
        })
        .catch((error) => {
            console.log('manageCartGetUserWishlist Actions Error ', error);
        });
  };
};

// Remove Product from Wishlist
export const manageCartRemoveProductFromWishlist = ({ productId, userToken, updateWishlistArray }) => {
  // console.log('manageCartRemoveProductFromWishlist pressed', productId, userToken);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'post',
        url: ManageCartRemoveProductFromWishlistURL,
        headers,
        data: { productId }
        })
        .then((response) => {
            dispatch({ type: USER_REMOVED_PRODUCT_FROM_WISHLIST, payload: productId });
            if (updateWishlistArray) { // Whether Calling from Product Page or Wishlist Page
              axios({
                  method: 'get',
                  url: SettingsPageGetUserWishlistURL,
                  headers,
                  })
                  .then((resp) => {
                      console.log('manageCartRemoveProductFromWishlist manageCartGetUserWishlist resp', resp.data);
                      const { products } = resp.data;
                      dispatch({ type: SETTING_PAGE_SET_USER_WISHLIST, payload: products });
                  })
                  .catch((error) => {
                      console.log('manageCartGetUserWishlist Actions Error ', error);
                  });
            }
            console.log('manageCartRemoveProductFromWishlist resp', response.data);
        })
        .catch((error) => {
            console.log('manageCartRemoveProductFromWishlist Actions Error ', error);
        });
  };
};

// Checkout Orders
export const manageCartPlaceOrder = (item) => {
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
