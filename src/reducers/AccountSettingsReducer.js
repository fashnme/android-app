import {
  SETTING_PAGE_SET_USER_ORDERS,
  SETTING_PAGE_SET_RENT_BID_BY_ME,
  SETTING_PAGE_SET_RENT_BID_FOR_ME
} from '../types';


const INITIAL_STATE = {
  // Profile Details
  userName: '',
  fullName: '',
  wishlistArray: [],
  ordersArray: [],
  rentBidsForMe: [],
  rentBidsByMe: [],
  personalProductRecomm: [],
  notificationArray: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SETTING_PAGE_SET_USER_ORDERS:
        return { ...state, ordersArray: action.payload };

      case SETTING_PAGE_SET_RENT_BID_BY_ME:
        return { ...state, rentBidsByMe: action.payload };

      case SETTING_PAGE_SET_RENT_BID_FOR_ME:
        return { ...state, rentBidsForMe: action.payload };
        
      default:
          return state;
    }
};
