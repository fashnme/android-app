import {
  SETTING_PAGE_SET_USER_ORDERS,
  SETTING_PAGE_SET_RENT_BID_BY_ME,
  SETTING_PAGE_SET_RENT_BID_FOR_ME,
  SETTING_PAGE_USER_CAPTION_UPDATE,
  SETTING_PAGE_USER_DOB_UPDATE,
  SETTING_PAGE_USER_SOCIAL_LINK_UPDATE,
  SETTING_PAGE_USER_PROFILE_PIC_UDPATE,
  SETTING_PAGE_USER_ADD_ADDRESS,
  SETTING_PAGE_GENERAL_LOADING_TOGGLE,
  SETTING_PAGE_SET_SELECTED_ADDRESS,
  MANAGE_CART_PAGE_SET_CART_ARRAY,
  SETTING_PAGE_SET_USER_WISHLIST,
  SETTING_PAGE_CART_AND_WISHLIST_LOADING_TOGGLE,
  SETTING_PAGE_SET_USER_REWARDS,
  SETTING_PAGE_SET_USER_PERSONAL_STORE
} from '../types';


const INITIAL_STATE = {
  // Profile Details
  bio: '',
  dateOfBirth: '',
  socialMediaLinks: { instagram: '', youtube: '', twitter: '', facebook: '' },
  profilePic: '',
  deliveryDetailsArray: [],
  selectedAddress: {},
  // Other Details
  wishlistArray: [],
  ordersArray: [],
  rentBidsForMe: [],
  rentBidsByMe: [],
  rewardsObject: {}, // { rewards: {signupReferral: {}, ...}, referralRewardsArray: [...]}
  personalStoreArray: [],
  notificationArray: [],
  userCartArray: [],
  // Loading
  loading: false,
  cartAndWishlistLoading: false
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

      case SETTING_PAGE_SET_SELECTED_ADDRESS:
        return { ...state, selectedAddress: action.payload };

      case SETTING_PAGE_USER_DOB_UPDATE:
        return { ...state, dateOfBirth: action.payload };

      case SETTING_PAGE_USER_ADD_ADDRESS:
        return { ...state, deliveryDetailsArray: action.payload };

      case SETTING_PAGE_USER_SOCIAL_LINK_UPDATE: {
        const newSocialMediaLinks = { ...state.socialMediaLinks, ...action.payload };
        return { ...state, socialMediaLinks: newSocialMediaLinks };
      }

      case SETTING_PAGE_SET_USER_REWARDS:
        return { ...state, rewardsObject: action.payload };

      case SETTING_PAGE_SET_USER_WISHLIST:
        return { ...state, wishlistArray: action.payload };

      case SETTING_PAGE_USER_PROFILE_PIC_UDPATE:
        return { ...state, profilePic: action.payload };

      case SETTING_PAGE_GENERAL_LOADING_TOGGLE:
        return { ...state, loading: action.payload };

      case MANAGE_CART_PAGE_SET_CART_ARRAY:
        return { ...state, userCartArray: action.payload };

      case SETTING_PAGE_CART_AND_WISHLIST_LOADING_TOGGLE:
        return { ...state, cartAndWishlistLoading: action.payload };

      case SETTING_PAGE_SET_USER_PERSONAL_STORE: {
        return { ...state, personalStoreArray: action.payload };
      }

      default:
          return state;
    }
};
