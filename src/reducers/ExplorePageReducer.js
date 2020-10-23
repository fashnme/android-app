import {
  EXPLORE_PAGE_SET_USER_SEARCH_DATA,
  EXPLORE_PAGE_SET_TRENDING_USERS,
  EXPLORE_PAGE_SET_TRENDING_POSTS,
  EXPLORE_PAGE_TOGGLE_LOADING,
  EXPLORE_PAGE_SET_CATEGORY_DATA,
  EXPLORE_PAGE_SET_PRODUCT_SEARCH_DATA
} from '../types';


const INITIAL_STATE = {
  userSearchResults: [],
  trendingUsers: [],
  trendingPosts: [],
  productSearchResults: [],
  explorePageLoading: false,
  menCategoriesData: {}, // { categories: [{ title: '', imageUri: '', searchText: ''}], mainImageUri: '' }
  womenCategoriesData: {}, // { categories: [{ title: '', imageUri: '', searchText: ''}], mainImageUri: '' }
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

      case EXPLORE_PAGE_SET_CATEGORY_DATA: {
        const { WomenCategoriesData, MenCategoriesData } = action.payload;
        return { ...state, womenCategoriesData: WomenCategoriesData, menCategoriesData: MenCategoriesData };
      }

      case EXPLORE_PAGE_SET_PRODUCT_SEARCH_DATA: {
        return { ...state, productSearchResults: action.payload };
      }

      default:
          return state;
    }
};
