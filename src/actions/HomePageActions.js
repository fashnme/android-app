import axios from 'axios';

import {
  HOME_PAGE_FEED_INITIAL_DATA_UPDATE,
  HOME_PAGE_FEED_EXTRA_DATA_UPDATE
} from '../types';

import {
  HomePageGetInitialFeedDataURL
} from '../URLS';


// Method to Get the Initial Feed Data
export const homePageGetInitialFeedData = ({ userToken }) => {
  return (dispatch) => {
    axios.get(HomePageGetInitialFeedDataURL, { headers: { Authorization: userToken } })
    .then(response => {
      // console.log('Actions Feed Data', response.data.posts);
      dispatch({ type: HOME_PAGE_FEED_INITIAL_DATA_UPDATE, payload: response.data.posts });
    })
    .catch(error => {
      console.log('HomePageActions homePageGetInitialFeedData Error', error);
    });
  };
};


export const homePageGetExtraFeedData = ({ userToken, feedPageNum }) => {
  console.log('Actions ', userToken, feedPageNum);
  return {
    type: HOME_PAGE_FEED_EXTRA_DATA_UPDATE,
    payload: []
  };
};
