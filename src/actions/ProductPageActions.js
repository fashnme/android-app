import axios from 'axios';

import {
  PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE
} from '../types';

import {

} from '../URLS';


export const productPageSelectedProductUpdate = (index, productsData) => {
  // console.log('productPageSelectedProductUpdate ProductsData', productsData);
  // TODO Update the Price of the Product
  return (dispatch) => {
    dispatch({ type: PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE, payload: index });
  };
};

export const productPageAddToCart = () => {
  console.log('Product Added to Cart');
  // TODO
  return { type: 'productPageAddToCart' };
};
