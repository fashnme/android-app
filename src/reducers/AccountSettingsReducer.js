import {
  SETTING_PAGE_SET_USER_ORDERS,
  SETTING_PAGE_SET_RENT_BID_BY_ME,
  SETTING_PAGE_SET_RENT_BID_FOR_ME,
  SETTING_PAGE_USER_CAPTION_UPDATE,
  SETTING_PAGE_USER_DOB_UPDATE,
  SETTING_PAGE_USER_SOCIAL_LINK_UPDATE,
  SETTING_PAGE_USER_PROFILE_PIC_UDPATE
} from '../types';


const INITIAL_STATE = {
  // Profile Details
  bio: '',
  dateOfBirth: '',
  socialMediaLinks: {},
  profilePic: '',
  // Other Details
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

      case SETTING_PAGE_USER_CAPTION_UPDATE:
        return { ...state, bio: action.payload };

      case SETTING_PAGE_USER_DOB_UPDATE:
        return { ...state, dateOfBirth: action.payload };

      case SETTING_PAGE_USER_SOCIAL_LINK_UPDATE:
        return { ...state, socialMediaLinks: action.payload };

      case SETTING_PAGE_USER_PROFILE_PIC_UDPATE:
        return { ...state, profilePic: action.payload };

      default:
          return state;
    }
};
