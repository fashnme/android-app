import {
  HOME_PAGE_TOGGLE_PRODUCTS_MODAL,
  HOME_PAGE_SET_TOGGLE_PRODUCTS_DATA,
  PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE
} from '../types';

const INITIAL_STATE = {
  productsData: [],
  productsModalVisible: false,
  selectedItem: 0
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

      default:
          return state;
    }
};
