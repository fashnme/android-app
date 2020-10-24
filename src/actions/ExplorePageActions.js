import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import {
  EXPLORE_PAGE_SET_USER_SEARCH_DATA,
  EXPLORE_PAGE_SET_TRENDING_USERS,
  EXPLORE_PAGE_SET_TRENDING_POSTS,
  EXPLORE_PAGE_TOGGLE_LOADING,
  EXPLORE_PAGE_SET_CATEGORY_DATA,
  EXPLORE_PAGE_SET_PRODUCT_SEARCH_DATA
} from '../types';

import {
  ExplorePageGetSearchResultURL,
  ExplorePageGetTrendingUsersURL,
  ExplorePageGetTrendingPostsURL,
  ExplorePageGetProductSearchURL
} from '../URLS';


// Get Autocomplete Search Results
export const explorePageGetUserSearchResults = ({ userToken, query, setLoading }) => {
  const headers = { 'Content-Type': 'application/json', Authorization: userToken };
  return (dispatch) => {
    axios({
        method: 'get',
        url: ExplorePageGetSearchResultURL,
        headers,
        params: { q: query.toLowerCase(), type: 'user' }
        })
        .then((response) => {
          setLoading(false); // Loading False
          // console.log('explorePageGetUserSearchResults resp', response.data);
          dispatch({ type: EXPLORE_PAGE_SET_USER_SEARCH_DATA, payload: response.data });
        })
        .catch((error) => {
          setLoading(false); // Loading False
          console.log('explorePageGetUserSearchResults Actions Error ', error);
      });
  };
};

// Get Trending Users
export const explorePageGetTrendingUsers = ({ userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
     Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'get',
        url: ExplorePageGetTrendingUsersURL,
        headers
        })
        .then((response) => {
          // console.log('explorePageGetTrendingUsers resp', response.data);
          const { users } = response.data;
          dispatch({ type: EXPLORE_PAGE_SET_TRENDING_USERS, payload: users });
        })
        .catch((error) => {
          console.log('explorePageGetTrendingUsers Actions Error ', error);
      });
  };
};


// Get Trending Posts
export const explorePageGetTrendingPosts = ({ userToken }) => {
  console.log('explorePageGetTrendingPosts action called');
  const headers = { 'Content-Type': 'application/json', Authorization: userToken };
  return (dispatch) => {
    dispatch({ type: EXPLORE_PAGE_TOGGLE_LOADING, payload: true });
    axios({
        method: 'get',
        url: ExplorePageGetTrendingPostsURL,
        headers
        })
        .then((response) => {
          // console.log('explorePageGetTrendingPosts resp', response.data);
          const { posts } = response.data;
          dispatch({ type: EXPLORE_PAGE_SET_TRENDING_POSTS, payload: posts });
        })
        .catch((error) => {
          console.log('explorePageGetTrendingPosts Actions Error ', error);
        })
        .finally(() => {
          dispatch({ type: EXPLORE_PAGE_TOGGLE_LOADING, payload: false });
        });
  };
};

export const explorePageSetCategoriesData = ({ WomenCategoriesData, MenCategoriesData }) => {
  // console.log('explorePageSetCategoriesData', { WomenCategoriesData, MenCategoriesData });
  return {
    type: EXPLORE_PAGE_SET_CATEGORY_DATA,
    payload: { WomenCategoriesData, MenCategoriesData }
  };
};

// Search across tagged Products in Post Index
export const explorePageGetProductSearchResults = ({ query, userToken }) => {
  Actions.productSearchResults();
  // console.log('explorePageGetProductSearchResults query', query, userToken);
  const headers = { 'Content-Type': 'application/json', Authorization: userToken };
  return (dispatch) => {
    axios({
        method: 'get',
        url: ExplorePageGetProductSearchURL,
        headers,
        params: { product: query.toLowerCase() }
        })
        .then((response) => {
          // console.log('Actions explorePageGetProductSearchResults', response.data.posts);
          dispatch({ type: EXPLORE_PAGE_SET_PRODUCT_SEARCH_DATA, payload: response.data.posts });
        })
        .catch((error) => {
          dispatch({ type: EXPLORE_PAGE_SET_PRODUCT_SEARCH_DATA, payload: [] });
          console.log('explorePageGetProductSearchResults Error', error);
        }).finally(() => {
          dispatch({ type: EXPLORE_PAGE_TOGGLE_LOADING, payload: false });
        });
  };
};
