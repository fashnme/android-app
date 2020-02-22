import {
  SETTING_PAGE_SET_USER_ORDERS
} from '../types';


const INITIAL_STATE = {
  // Profile Details
  userName: '',
  fullName: '',
  wishlistArray: [],
  ordersArray: [],
  rentRequestsArray: [],
  personalProductRecomm: [],
  notificationArray: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SETTING_PAGE_SET_USER_ORDERS:
        return { ...state, ordersArray: action.payload };
      default:
          return state;
    }
};
