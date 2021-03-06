import {
  PERSONAL_PAGE_SET_USERTOKEN,
  PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID,
  PERSONAL_PAGE_SET_OWN_POSTS,
  PERSONAL_PAGE_SET_OWN_LIKED_POSTS,
  PERSONAL_PAGE_DELETE_POST,
  PERSONAL_PAGE_TOGGLE_LOADING,
  PERSONAL_PAGE_RESET_DATA
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
        const { selfPostPageNum, posts } = action.payload;
        if (selfPostPageNum === 1) {
          return { ...state, ownPostsArray: posts, ownPostPageNum: 2 };
        }
        const newArray = [...state.ownPostsArray, ...posts];
        const result = Array.from(new Set(newArray.map(s => s.postId)))
                          .map(postId => {
                                return newArray.find(s => s.postId === postId);
                            }
                          );
        return { ...state, ownPostsArray: result, ownPostPageNum: selfPostPageNum + 1 };
      }

      case PERSONAL_PAGE_SET_OWN_LIKED_POSTS: {
        const { posts, postLikedPageNum } = action.payload;
        if (postLikedPageNum === 1) {
          return { ...state, selfLikedPostArray: posts, postLikedPageNum: 2 };
        }
        const newArray = [...state.selfLikedPostArray, ...posts];
        const result = Array.from(new Set(newArray.map(s => s.postId)))
                          .map(postId => {
                                return newArray.find(s => s.postId === postId);
                            }
                          );
        return { ...state, selfLikedPostArray: result, postLikedPageNum: postLikedPageNum + 1 };
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

      case PERSONAL_PAGE_RESET_DATA: {
        return { ...state, ...INITIAL_STATE };
      }

      default:
          return state;
    }
};
