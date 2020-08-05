import axios from 'axios';

import {
  EXPLORE_PAGE_SET_USER_SEARCH_DATA,
  EXPLORE_PAGE_SET_TRENDING_USERS,
  EXPLORE_PAGE_SET_TRENDING_POSTS
} from '../types';

import {
  ExplorePageGetSearchResultURL,
  ExplorePageGetTrendingUsersURL,
  ExplorePageGetTrendingPostsURL
} from '../URLS';


// Get Autocomplete Search Results
export const explorePageGetUserSearchResults = ({ userToken, query, setLoading }) => {
  const headers = {
    'Content-Type': 'application/json',
     Authorization: userToken
  };
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
  const headers = {
    'Content-Type': 'application/json',
     Authorization: userToken
  };
  return (dispatch) => {
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
      });
  };
};
