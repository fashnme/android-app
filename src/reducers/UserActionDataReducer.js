import {
  USER_SET_ACTION_DATA,
  USER_LIKED_POST,
  USER_UNLIKED_POST,
  USER_FOLLOWED_HIM,
  USER_UNFOLLOWED_HIM,
  USER_ADDED_PRODUCT_TO_CART,
  USER_REMOVED_PRODUCT_FROM_CART,
  USER_ADDED_PRODUCT_TO_WISHLIST,
  USER_REMOVED_PRODUCT_FROM_WISHLIST
} from '../types';


const INITIAL_STATE = {
  likedPosts: {}, // Stores the Map of Liked Posts { postId: 1 }
  followingData: {}, // Stores the Map of stars this user follow { userId: 1 }
  userCart: {}, // Stores the Map of Products in the users cart { productId: 1 }
  userWishlist: {}, // Stores Map of Products in Wishlist { productId: 1 }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case USER_SET_ACTION_DATA: {
        return { ...state, likedPosts: action.payload.likedPosts, followingData: action.payload.followingData };
      }

      case USER_LIKED_POST: {
        const newObject = {};
        newObject[action.payload] = 1;
        const newLikedPosts = { ...state.likedPosts, ...newObject };
        return { ...state, likedPosts: newLikedPosts };
      }

      case USER_UNLIKED_POST: {
        const newObject = { ...state.likedPosts };
        delete newObject[action.payload];
        return { ...state, likedPosts: newObject };
      }

      case USER_FOLLOWED_HIM: {
        const newObject = {};
        newObject[action.payload] = 1;
        const newfollowedData = { ...state.followingData, ...newObject };
        return { ...state, followingData: newfollowedData };
      }

      case USER_UNFOLLOWED_HIM: {
        const newObject = { ...state.followingData };
        delete newObject[action.payload];
        return { ...state, followingData: newObject };
      }

      case USER_ADDED_PRODUCT_TO_CART: {
        const newObject = {};
        newObject[action.payload] = 1;
        const newCart = { ...state.userCart, ...newObject };
        return { ...state, userCart: newCart };
      }

      case USER_REMOVED_PRODUCT_FROM_CART: {
        const newObject = { ...state.userCart };
        delete newObject[action.payload];
        return { ...state, userCart: newObject };
      }

      case USER_ADDED_PRODUCT_TO_WISHLIST: {
        const newObject = {};
        newObject[action.payload] = 1;
        const newWishlist = { ...state.userWishlist, ...newObject };
        return { ...state, userWishlist: newWishlist };
      }

      case USER_REMOVED_PRODUCT_FROM_WISHLIST: {
        const newObject = { ...state.userWishlist };
        delete newObject[action.payload];
        return { ...state, userWishlist: newObject };
      }

      default:
          return state;
    }
};
