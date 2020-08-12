import {
  PERSONAL_PAGE_SET_USERTOKEN,
  PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID,
  PERSONAL_PAGE_SET_OWN_POSTS,
  PERSONAL_PAGE_SET_OWN_LIKED_POSTS,
  PERSONAL_PAGE_DELETE_POST,
  PERSONAL_PAGE_TOGGLE_LOADING
} from '../types';

const INITIAL_STATE = {
  userToken: '',
  personalUserId: '', // Set this to empty in production
  personalPageLoading: false,
  personalUserDetails: {
    followingCount: 0,
    followersCount: 0,
    totalLikes: 0
  },
  ownPostsArray: [], // Array to store the self posts
  selfLikedPostArray: [], // Array to store the posts Liked
  ownPostPageNum: 1, // Page Number
  postLikedPageNum: 1 // Page Number
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PERSONAL_PAGE_SET_USERTOKEN:
        return { ...state, userToken: action.payload };

      case PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID: {
        const { userId } = action.payload;
        return { ...state, personalUserDetails: action.payload, personalUserId: userId, personalPageLoading: false };
      }

      case PERSONAL_PAGE_TOGGLE_LOADING: {
        return { ...state, personalPageLoading: action.payload };
      }

      case PERSONAL_PAGE_SET_OWN_POSTS: {
        if (state.ownPostPageNum === 1) {
          return { ...state, ownPostsArray: action.payload, ownPostPageNum: state.ownPostPageNum + 1 };
        }
        const newArray = [...state.ownPostsArray, ...action.payload];
        const result = Array.from(new Set(newArray.map(s => s.postId)))
                          .map(postId => {
                                return newArray.find(s => s.postId === postId);
                            }
                          );
        return { ...state, ownPostsArray: result, ownPostPageNum: state.ownPostPageNum + 1 };
      }

      case PERSONAL_PAGE_SET_OWN_LIKED_POSTS: {
        if (state.postLikedPageNum === 1) {
          return { ...state, selfLikedPostArray: action.payload, postLikedPageNum: state.postLikedPageNum + 1 };
        }
        const newArray = [...state.selfLikedPostArray, ...action.payload];
        const result = Array.from(new Set(newArray.map(s => s.postId)))
                          .map(postId => {
                                return newArray.find(s => s.postId === postId);
                            }
                          );
        return { ...state, selfLikedPostArray: result, postLikedPageNum: state.postLikedPageNum + 1 };
      }

      case PERSONAL_PAGE_DELETE_POST: {
          const { postId } = action.payload;
          let delIndex = null;
          const { ownPostsArray } = state;
          ownPostsArray.forEach((obj, index) => { if (obj.postId === postId) { delIndex = index; } });
          if (delIndex !== null) {
            ownPostsArray.splice(delIndex, 1);
            const newOwnPostsArray = [...ownPostsArray];
            return { ...state, ownPostsArray: newOwnPostsArray };
          }
          return { ...state };
      }

      default:
          return state;
    }
};
