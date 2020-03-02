import axios from 'axios';

import {
  PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE,
  PRODUCT_PAGE_SET_TOGGLE_PRODUCTS_DATA,
  PRODUCT_PAGE_SET_POSTID_AND_POSTERID,
  HOME_PAGE_TOGGLE_COMMENTS_MODAL,
  PRODUCT_PAGE_SET_COMPLETE_PRODUCTS_DATA,
  PRODUCT_PAGE_PRICE_AND_SIZE_UPDATE,
  USER_ADDED_PRODUCT_TO_CART
} from '../types';

import {
  ProductPageFetchProductsInfoURL,
  ProductPageAddProductToCartURL
} from '../URLS';


export const productPageSelectedProductUpdate = (index) => {
  return { type: PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE, payload: index };
};

export const productPageUpdatePriceAndSize = ({ productId }) => {
  // TODO Update the Price of the Product
  console.log('productPageUpdatePriceAndSize', productId);
  const payload = { };
  payload[productId] = { sizesAvailable: [
        {
          "size": "30",
          "sizeStandard": ""
        },
        {
          "size": "One Size",
          "sizeStandard": ""
        },
        {
          "size": "S",
          "sizeStandard": ""
        },
        {
          "size": "XXL",
          "sizeStandard": ""
        }
      ]};
  return { type: PRODUCT_PAGE_PRICE_AND_SIZE_UPDATE, payload };
};

// Method to Toggle Products Modal And Set Detail
export const productPageOpenProductModal = ({ isVisible, productsData, postDetails }) => {
  return (dispatch) => {
    if (isVisible) {
      fetchExtraProductsData(productsData, dispatch);
    }
    dispatch({ type: HOME_PAGE_TOGGLE_COMMENTS_MODAL, payload: false });
    dispatch({ type: PRODUCT_PAGE_SET_TOGGLE_PRODUCTS_DATA, payload: { isVisible, productsData } });
    dispatch({ type: PRODUCT_PAGE_SET_POSTID_AND_POSTERID, payload: postDetails });
  };
};

const fetchExtraProductsData = (productsData, dispatch) => {
  const idsArray = [];
  productsData.forEach((item) => {
    idsArray.push(item.productId);
  });
  const headers = {
    'Content-Type': 'application/json'
  };
  axios({
      method: 'post',
      url: ProductPageFetchProductsInfoURL,
      headers,
      data: { productIdArray: idsArray }
      })
      .then((response) => {
          const { products } = response.data;
          // console.log('fetchExtraProductsData', response.data);
          dispatch({ type: PRODUCT_PAGE_SET_COMPLETE_PRODUCTS_DATA, payload: products });
      })
      .catch((error) => {
          console.log('productPageOpenProductModal fetchExtraProductsData Actions Error ', error);
      });
};

export const productPageAddToCart = (item) => {
  console.log('Product Added to Cart', item);
  const { productId, quantity, sizeSelected, postId, posterId, userToken } = item;
  return (dispatch) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: userToken
    };
    axios({
        method: 'post',
        url: ProductPageAddProductToCartURL,
        headers,
        data: { productId, quantity, size: sizeSelected, referrerPost: postId, referrerId: posterId }
        })
        .then((response) => {
            console.log('productPageAddToCart', response.data);
            dispatch({ type: USER_ADDED_PRODUCT_TO_CART, payload: productId });
        })
        .catch((error) => {
            console.log('productPageAddToCart  Actions Error ', error);
        });
  };
};
