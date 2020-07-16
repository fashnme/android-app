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
      fullName: '',
  },
  selfPostArray: [], // Array to store the self posts
  postLikedArray: [], // Array to store the posts Liked
  selfPostPageNum: 1, // Page Number
  postLikedPageNum: 1 // Page Number
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CELEBRITY_PAGE_SET_CELEB_DATA: {
        const { userDetails } = action.payload;
        const { userId } = userDetails;
        return { ...state, userDetails, userId, selfPostPageNum: 1, postLikedPageNum: 1 };
      }
      case CELEBRITY_PAGE_GET_CELEB_POSTS: {
        // if (action.payload.length === 0) {
        //   return state;
        // }
        // console.log('CELEBRITY_PAGE_GET_CELEB_POSTS', action.payload);

        if (state.selfPostPageNum === 1) {
          return { ...state, selfPostArray: action.payload, selfPostPageNum: state.selfPostPageNum + 1 };
        }
        const newArray = [...state.selfPostArray, ...action.payload];
        const result = Array.from(new Set(newArray.map(s => s.postId)))
                          .map(postId => {
                                return newArray.find(s => s.postId === postId);
                            }
                          );
        return { ...state, selfPostArray: result, selfPostPageNum: state.selfPostPageNum + 1 };
      }

      case CELEBRITY_PAGE_GET_CELEB_LIKED_POSTS: {
        if (state.postLikedPageNum === 1) {
          return { ...state, postLikedArray: action.payload, postLikedPageNum: state.postLikedPageNum + 1 };
        }
        const newArray = [...state.postLikedArray, ...action.payload];
        const result = Array.from(new Set(newArray.map(s => s.postId)))
                          .map(postId => {
                                return newArray.find(s => s.postId === postId);
                            }
                          );
        return { ...state, postLikedArray: result, postLikedPageNum: state.postLikedPageNum + 1 };
      }

      default:
          return state;
    }
};
