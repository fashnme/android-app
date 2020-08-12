import {
  EXPLORE_PAGE_SET_USER_SEARCH_DATA,
  EXPLORE_PAGE_SET_TRENDING_USERS,
  EXPLORE_PAGE_SET_TRENDING_POSTS,
  EXPLORE_PAGE_TOGGLE_LOADING
} from '../types';


const INITIAL_STATE = {
  userSearchResults: [],
  trendingUsers: [],
  trendingPosts: [],
  explorePageLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EXPLORE_PAGE_SET_USER_SEARCH_DATA: {
        return { ...state, userSearchResults: action.payload };
      }

      case EXPLORE_PAGE_TOGGLE_LOADING: {
        return { ...state, explorePageLoading: action.payload };
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
