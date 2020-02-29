import {
  HOME_PAGE_TOGGLE_PRODUCTS_MODAL,
  HOME_PAGE_SET_TOGGLE_PRODUCTS_DATA,
  PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE,
  PRODUCT_PAGE_SET_POSTID_AND_POSTERID
} from '../types';

const INITIAL_STATE = {
  productsData: [],
  productsModalVisible: false,
  selectedItem: 0,
  postId: '',
  posterId: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case HOME_PAGE_TOGGLE_PRODUCTS_MODAL:
          return { ...state, productsModalVisible: action.payload };

      case HOME_PAGE_SET_TOGGLE_PRODUCTS_DATA: {
        const { isVisible, productsData } = action.payload;
        return { ...state, productsModalVisible: isVisible, productsData };
      }

      case PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE:
        return { ...state, selectedItem: action.payload };

      case PRODUCT_PAGE_SET_POSTID_AND_POSTERID: {
        const { userId, postId } = action.payload;
        return { ...state, postId, posterId: userId };
      }

      default:
          return state;
    }
};
