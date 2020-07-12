import {
  PERSONAL_PAGE_SET_USERTOKEN,
  PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID,
} from '../types';

const INITIAL_STATE = {
  userToken: '',
  personalUserId: '', // Set this to empty in production
  personalUserDetails: {},
  selfPostArray: [], // Array to store the self posts
  postLikedArray: [], // Array to store the posts Liked
  selfPostPageNum: 1, // Page Number
  postLikedPageNum: 1 // Page Number
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PERSONAL_PAGE_SET_USERTOKEN:
        return { ...state, userToken: action.payload };

      case PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID: {
        const { userId } = action.payload;
        return { ...state, personalUserDetails: action.payload, personalUserId: userId };
      }

      default:
          return state;
    }
};
