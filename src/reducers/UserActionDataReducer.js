import {
  USER_SET_ACTION_DATA,
  USER_LIKED_POST,
  USER_UNLIKED_POST,
  USER_FOLLOWED_HIM,
  USER_UNFOLLOWED_HIM
} from '../types';


const INITIAL_STATE = {
  likedPosts: {}, // Stores the Map of Liked Posts { postId: 1 }
  followingData: {}, // Stores the Map of stars this user follow { userId: 1 }
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

      default:
          return state;
    }
};
