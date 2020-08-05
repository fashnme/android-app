import {
  EXPLORE_PAGE_SET_USER_SEARCH_DATA,
  EXPLORE_PAGE_SET_TRENDING_USERS,
  EXPLORE_PAGE_SET_TRENDING_POSTS
} from '../types';


const INITIAL_STATE = {
  userSearchResults: [],
  trendingUsers: [],
  trendingPosts: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EXPLORE_PAGE_SET_USER_SEARCH_DATA: {
        return { ...state, userSearchResults: action.payload };
      }

      case EXPLORE_PAGE_SET_TRENDING_USERS: {
        return { ...state, trendingUsers: action.payload };
      }

      case EXPLORE_PAGE_SET_TRENDING_POSTS: {
        return { ...state, trendingPosts: action.payload };
      }
      
      default:
          return state;
    }
};
