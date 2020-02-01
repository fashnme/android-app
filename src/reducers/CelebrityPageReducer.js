import {
  CELEBRITY_PAGE_SET_CELEB_DATA,
  CELEBRITY_PAGE_GET_CELEB_POSTS,
  CELEBRITY_PAGE_GET_CELEB_LIKED_POSTS
} from '../types';


const INITIAL_STATE = {
  userId: '',
  userDetails: {
      profilePic: '',
      userName: '',
      followingCount: '',
      followersCount: '',
      totalLikes: '',
      firstName: '',
  },
  selfPostArray: [], // Array to store the self posts
  postLikedArray: [], // Array to store the posts Liked
  selfPostPageNum: 1, // Page Number
  postLikedPageNum: 1 // Page Number
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CELEBRITY_PAGE_SET_CELEB_DATA:
         return { ...INITIAL_STATE, userDetails: action.payload.userDetails, userId: action.payload.userId };

      case CELEBRITY_PAGE_GET_CELEB_POSTS: {
        const newArray = [...state.selfPostArray, ...action.payload];
        return { ...state, selfPostArray: newArray, selfPostPageNum: state.selfPostPageNum + 1 };
      }

      case CELEBRITY_PAGE_GET_CELEB_LIKED_POSTS: {
        const newArray = [...state.postLikedArray, ...action.payload];
        return { ...state, postLikedArray: newArray, postLikedPageNum: state.postLikedPageNum + 1 };
      }

      default:
          return state;
    }
};
