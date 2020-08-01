import {
  PRODUCT_PAGE_SET_TOGGLE_PRODUCTS_DATA,
  PRODUCT_PAGE_SET_COMPLETE_PRODUCTS_DATA,
  PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE,
  PRODUCT_PAGE_SET_POSTID_AND_POSTERID,
  PRODUCT_PAGE_PRICE_AND_SIZE_UPDATE,
  PRODUCT_PAGE_TOGGLE_FULL_IMAGE_VIEWER
} from '../types';

const INITIAL_STATE = {
  productsData: [],
  productsModalVisible: false,
  imageViewerModalVisible: false,
  productsCompleteData: [],
  selectedItem: 0,
  sizeAndPriceObject: {}, // { productId: {price, crossedPrice, size} }
  postId: '',
  posterId: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PRODUCT_PAGE_SET_TOGGLE_PRODUCTS_DATA: {
        const { isVisible, productsData } = action.payload;
        return { ...state, productsModalVisible: isVisible, productsData };
      }

      case PRODUCT_PAGE_SET_COMPLETE_PRODUCTS_DATA: {
        // console.log('CompleteProductData Reducer', action.payload);
        return { ...state, productsCompleteData: action.payload };
      }

      case PRODUCT_PAGE_PRICE_AND_SIZE_UPDATE: {
        const newObj = { ...state.sizeAndPriceObject, ...action.payload };
        // console.log('CompleteProductData Reducer Price & Size', newObj);
        return { ...state, sizeAndPriceObject: newObj };
      }

      case PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE:
        return { ...state, selectedItem: action.payload };

      case PRODUCT_PAGE_SET_POSTID_AND_POSTERID: {
        const { userId, postId } = action.payload;
        return { ...state, postId, posterId: userId };
      }

      case PRODUCT_PAGE_TOGGLE_FULL_IMAGE_VIEWER: {
        return { ...state, imageViewerModalVisible: action.payload };
      }

      default:
          return state;
    }
};
