import axios from 'axios';

import {
  PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE,
  PRODUCT_PAGE_SET_TOGGLE_PRODUCTS_DATA,
  PRODUCT_PAGE_SET_POSTID_AND_POSTERID,
  PRODUCT_PAGE_SET_COMPLETE_PRODUCTS_DATA,
  PRODUCT_PAGE_PRICE_AND_SIZE_UPDATE,
} from '../types';

import {
  ProductPageFetchProductsInfoURL,
  ProductPageGetUpdatePriceAndSizeURL
} from '../URLS';


export const productPageSelectedProductUpdate = (index) => {
  return { type: PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE, payload: index };
};

export const productPageUpdatePriceAndSize = ({ productId }) => {
  console.log('productPageUpdatePriceAndSize', productId);
  // TODO TEST
  const headers = {
    'Content-Type': 'application/json'
  };
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
                price: 575,
                crossedPrice: 1199,
                discount: 52,
                offers: [],
                sizesAvailable: [],
                //     {
                //         size: 'Onesize',
                //         sizeStandard: ''
                //     }
                // ],
                stockAvailability: true
            };
            const payload = {};
            payload[productId] = dumdata;
            dispatch({ type: PRODUCT_PAGE_PRICE_AND_SIZE_UPDATE, payload });
        });
    };
};


// Method to Toggle Products Modal And Set Detail
export const productPageOpenProductModal = ({ isVisible, productsData, postDetails }) => {
  return (dispatch) => {
    if (isVisible) {
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
      })
      .finally(() => {
        console.log('productPageOpenProductModal fetchExtraProductsData idsArray', idsArray);
      });
};
