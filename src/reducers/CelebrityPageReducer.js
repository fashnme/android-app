import {
  CELEBRITY_PAGE_SET_CELEB_DATA,
  CELEBRITY_PAGE_GET_CELEB_POSTS,
  CELEBRITY_PAGE_GET_CELEB_LIKED_POSTS,
  CELEBRITY_PAGE_TOGGLE_LOADING,
  CELEBRITY_PAGE_RESET_DATA
} from '../types';


const INITIAL_STATE = {
  userId: '',
  celebPageLoading: false,
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
        return { ...state, userDetails, userId, selfPostPageNum: 1, postLikedPageNum: 1, celebPageLoading: false };
      }

      case CELEBRITY_PAGE_TOGGLE_LOADING: {
        return { ...state, celebPageLoading: action.payload };
      }

      case CELEBRITY_PAGE_GET_CELEB_POSTS: {
        // console.log('CELEBRITY_PAGE_GET_CELEB_POSTS', action.payload);
        const { posts, selfPostPageNum } = action.payload;
        if (selfPostPageNum === 1) {
          return { ...state, selfPostArray: posts, selfPostPageNum: 2 };
        }
        const newArray = [...state.selfPostArray, ...posts];
        const result = Array.from(new Set(newArray.map(s => s.postId)))
                          .map(postId => {
                                return newArray.find(s => s.postId === postId);
                            }
                          );
        return { ...state, selfPostArray: result, selfPostPageNum: selfPostPageNum + 1 };
      }

      case CELEBRITY_PAGE_GET_CELEB_LIKED_POSTS: {
        const { posts, postLikedPageNum } = action.payload;
        if (postLikedPageNum === 1) {
          return { ...state, postLikedArray: posts, postLikedPageNum: 2 };
        }
        const newArray = [...state.postLikedArray, ...posts];
        const result = Array.from(new Set(newArray.map(s => s.postId)))
                          .map(postId => {
                                return newArray.find(s => s.postId === postId);
                            }
                          );
        return { ...state, postLikedArray: result, postLikedPageNum: postLikedPageNum + 1 };
      }

      case CELEBRITY_PAGE_RESET_DATA: {
        return { ...state, ...INITIAL_STATE };
      }
      default:
          return state;
    }
};
