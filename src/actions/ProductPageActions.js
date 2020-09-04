import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import {
  PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE,
  PRODUCT_PAGE_SET_TOGGLE_PRODUCTS_DATA,
  PRODUCT_PAGE_SET_POSTID_AND_POSTERID,
  PRODUCT_PAGE_SET_COMPLETE_PRODUCTS_DATA,
  PRODUCT_PAGE_PRICE_AND_SIZE_UPDATE,
  VIDEO_PAGE_PLAY_STATUS_UPDATE,
  PRODUCT_PAGE_TOGGLE_FULL_IMAGE_VIEWER,
  PRODUCT_PAGE_ADD_PRODUCT_TO_REMINDER,
  PRODUCT_PAGE_TOGGLE_PRODUCT_LOADING,
  PRODUCT_PAGE_SET_SINGLE_PRODUCT_PAGE_DATA
} from '../types';

import {
  ProductPageFetchProductsInfoURL,
  ProductPageGetUpdatePriceAndSizeURL,
  ProductPageAddProductToReminderURL
} from '../URLS';


export const productPageSelectedProductUpdate = (index) => {
  return { type: PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE, payload: index };
};

// Toggle Full Image Viewer Modal
export const productPageToggleFullImageViewer = ({ visible }) => {
  return { type: PRODUCT_PAGE_TOGGLE_FULL_IMAGE_VIEWER, payload: visible };
};

export const productPageUpdatePriceAndSize = ({ productId }) => {
  console.log('productPageUpdatePriceAndSize', productId);
  const headers = { 'Content-Type': 'application/json' };
  return (dispatch) => {
    axios({
        method: 'post',
        url: ProductPageGetUpdatePriceAndSizeURL,
        headers,
        data: { productId, priceRequired: true, similarRequired: false }
        })
        .then((response) => {
            const { updatedPriceAndSize } = response.data;
            const payload = {};
            payload[productId] = updatedPriceAndSize;
            dispatch({ type: PRODUCT_PAGE_PRICE_AND_SIZE_UPDATE, payload });
        })
        .catch((error) => {
            console.log('productPageUpdatePriceAndSize Actions Error ', error, productId);
            // TODO Remove this dummy data
            const dumdata = {
                // price: 575,
                // crossedPrice: 1199,
                // discount: 52,
                // offers: [],
                // sizesAvailable: [{size: 'S'},{size: 'M'},{size: 'L'},{size: 'XL'},{size: 'XLL'} ],
                sizesAvailable: [],
                //     {
                //         size: 'Onesize',
                //         sizeStandard: ''
                //     }
                // ],
                stockAvailability: false
            };
            const payload = {};
            payload[productId] = dumdata;
            dispatch({ type: PRODUCT_PAGE_PRICE_AND_SIZE_UPDATE, payload });
        });
    };
};

// Method to Add product to Reminder
export const productPageAddProductToReminder = ({ userToken, productData }) => {
  const { productId, price } = productData;
  return (dispatch) => {
    dispatch({ type: PRODUCT_PAGE_ADD_PRODUCT_TO_REMINDER, payload: productId });
    axios({
        method: 'post',
        url: ProductPageAddProductToReminderURL,
        headers: { 'Content-Type': 'application/json', Authorization: userToken },
        data: { productId, price }
        })
        .then((response) => {
            console.log('productPageAddProductToReminder', response.data);
        })
        .catch((error) => {
            //handle error
            console.log('productPageAddProductToReminder Actions Error ', error);
      });
  };
};


// Method to Toggle Products Modal And Set Detail
export const productPageOpenProductModal = ({ isVisible, productsData, postDetails }) => {
  return (dispatch) => {
    if (isVisible) {
      // Pause the video when product modal opens
      dispatch({ type: VIDEO_PAGE_PLAY_STATUS_UPDATE, payload: { homePageVideoPlay: false, celebPageVideoPlay: false } });
      fetchExtraProductsData(productsData, dispatch);
    }
    dispatch({ type: PRODUCT_PAGE_SET_TOGGLE_PRODUCTS_DATA, payload: { isVisible, productsData } });
    dispatch({ type: PRODUCT_PAGE_SET_POSTID_AND_POSTERID, payload: postDetails });
  };
};

const fetchExtraProductsData = (productsData, dispatch) => {
  const idsArray = [];
  productsData.forEach((item) => {
    idsArray.push(item.productId);
  });
  axios({
      method: 'post',
      url: ProductPageFetchProductsInfoURL,
      headers: { 'Content-Type': 'application/json' },
      data: { productIdArray: idsArray }
      })
      .then((response) => {
          const { products } = response.data;
          // console.log('fetchExtraProductsData', response.data);
          dispatch({ type: PRODUCT_PAGE_SET_COMPLETE_PRODUCTS_DATA, payload: products });
      })
      .catch((error) => {
          console.log('productPageOpenProductModal fetchExtraProductsData Actions Error ', error);
      })
      .finally(() => {
        console.log('productPageOpenProductModal fetchExtraProductsData idsArray', idsArray);
      });
};

export const productPageVisitSetSingleProductPage = ({ productId, posterId = '',
referrerPost = '', referrerId = '' }) => {
  // Setting default value to empty string
  Actions.singleProductPage();
  return (dispatch) => {
    dispatch({ type: PRODUCT_PAGE_SET_SINGLE_PRODUCT_PAGE_DATA, payload: {} });
    dispatch({ type: PRODUCT_PAGE_TOGGLE_PRODUCT_LOADING, payload: true });
    // Fetch Data
    axios({
        method: 'post',
        url: ProductPageFetchProductsInfoURL,
        headers: { 'Content-Type': 'application/json' },
        data: { productIdArray: [productId] }
        })
        .then((response) => {
            const { products } = response.data;
            if (products !== undefined && products.length > 0) {
              const payload = { ...products[0], posterId, referrerPost, referrerId };
              dispatch({ type: PRODUCT_PAGE_SET_SINGLE_PRODUCT_PAGE_DATA, payload });
            } else {
              console.log('productPageVisitSingleProductPage Internal Actions Error ', { productId, products });
            }
        })
        .catch((error) => {
            console.log('productPageVisitSingleProductPage Actions Error ', error);
        })
        .finally(() => {
            setTimeout(() => dispatch({ type: PRODUCT_PAGE_TOGGLE_PRODUCT_LOADING, payload: false }), 1000);
        });
    // Fetch Price Details Info
    axios({
        method: 'post',
        url: ProductPageGetUpdatePriceAndSizeURL,
        headers: { 'Content-Type': 'application/json' },
        data: { productId, priceRequired: true, similarRequired: false }
        }).then((response) => {
            const { updatedPriceAndSize } = response.data;
            const payload = {};
            payload[productId] = updatedPriceAndSize;
            dispatch({ type: PRODUCT_PAGE_PRICE_AND_SIZE_UPDATE, payload });
        }).catch((error) => {
          const dumdata = { sizesAvailable: [], stockAvailability: false };
          const payload = {};
          payload[productId] = dumdata;
          dispatch({ type: PRODUCT_PAGE_PRICE_AND_SIZE_UPDATE, payload });
          console.log('productPageVisitSingleProductPage price updation error', error);
        });
  };
};
