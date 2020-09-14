import {
  USER_SET_ACTION_DATA,
  USER_LIKED_POST,
  USER_UNLIKED_POST,
  USER_FOLLOWED_HIM,
  USER_UNFOLLOWED_HIM,
  USER_ADDED_PRODUCT_TO_CART,
  USER_REMOVED_PRODUCT_FROM_CART,
  USER_ADDED_PRODUCT_TO_WISHLIST,
  USER_REMOVED_PRODUCT_FROM_WISHLIST,
  USER_LIKED_COMMENT,
  USER_UNLIKED_COMMENT,
  USER_RESET_ALL_USER_ACTION_DATA // Logout
} from '../types';


const INITIAL_STATE = {
  loadInitialUserData: true, // For the first time hit the server to load the user data in the app
  likedPosts: {}, // Stores the Map of Liked Posts { postId: 1 }
  followingDataMap: {}, // Stores the Map of stars this user follow { userId: 1 }
  userCartMap: {}, // Stores the Map of Products in the users cart { productId: 1 }
  userWishlistMap: {}, // Stores Map of Products in Wishlist { productId: 1 }
  likedComments: {}, // Stores the Map of Liked Comments { commentId: 1 }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case USER_SET_ACTION_DATA: {
        const { likedPosts, followingDataMap, userCartMap, userWishlistMap, likedComments } = action.payload;
        return { ...state, likedPosts, followingDataMap, userCartMap, userWishlistMap, likedComments, loadInitialUserData: false };
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
        const newfollowedData = { ...state.followingDataMap, ...newObject };
        return { ...state, followingDataMap: newfollowedData };
      }

      case USER_UNFOLLOWED_HIM: {
        const newObject = { ...state.followingDataMap };
        delete newObject[action.payload];
        return { ...state, followingDataMap: newObject };
      }

      case USER_ADDED_PRODUCT_TO_CART: {
        const newObject = {};
        newObject[action.payload] = 1;
        const newCart = { ...state.userCartMap, ...newObject };
        return { ...state, userCartMap: newCart };
      }

      case USER_REMOVED_PRODUCT_FROM_CART: {
        const newObject = { ...state.userCartMap };
        delete newObject[action.payload];
        return { ...state, userCartMap: newObject };
      }

      case USER_ADDED_PRODUCT_TO_WISHLIST: {
        const newObject = {};
        newObject[action.payload] = 1;
        const newWishlist = { ...state.userWishlistMap, ...newObject };
        return { ...state, userWishlistMap: newWishlist };
      }

      case USER_REMOVED_PRODUCT_FROM_WISHLIST: {
        const newObject = { ...state.userWishlistMap };
        delete newObject[action.payload];
        return { ...state, userWishlistMap: newObject };
      }

      case USER_LIKED_COMMENT: {
        const newObject = {};
        newObject[action.payload] = 1;
        const newLikedComments = { ...state.likedComments, ...newObject };
        return { ...state, likedComments: newLikedComments };
      }

      case USER_UNLIKED_COMMENT: {
        const newObject = { ...state.likedComments };
        delete newObject[action.payload];
        return { ...state, likedComments: newObject };
      }

      case USER_RESET_ALL_USER_ACTION_DATA: {
        return { ...state, ...INITIAL_STATE };
      }

      default:
          return state;
    }
};
