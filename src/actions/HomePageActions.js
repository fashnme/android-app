import axios from 'axios';

import {
  HOME_PAGE_FEED_INITIAL_DATA_UPDATE,
  HOME_PAGE_FEED_EXTRA_DATA_UPDATE,
  HOME_PAGE_ACTIVE_TAB_UPDATE
} from '../types';

import {
  HomePageGetInitialFeedDataURL,
  HomePageLikePostURL,
  HomePageUnLikePostURL
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


// Method to Get the Extra Feed Data
export const homePageGetExtraFeedData = ({ userToken, feedPageNum }) => {
  console.log('Actions ', userToken, feedPageNum);
  return {
    type: HOME_PAGE_FEED_EXTRA_DATA_UPDATE,
    payload: []
  };
};

// Method to Update the Active Tab on Home page
export const homePageUpdateActiveTab = ({ activeTab }) => {
  console.log('Active Tab Updated', activeTab);
  return {
    type: HOME_PAGE_ACTIVE_TAB_UPDATE,
    payload: activeTab
  };
};

// Method to Like a Post
export const homePageLikePost = ({ userToken, postId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'post',
        url: HomePageLikePostURL,
        headers,
        data: { postId }
        })
        .then((response) => {
            console.log('homePageLikePost', response);
        })
        .catch((error) => {
            //handle error
            console.log('homePageLikePost Actions Error ', error);
      });
  };
};


// Method to UnLike a Post
export const homePageUnLikePost = ({ userToken, postId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'post',
        url: HomePageUnLikePostURL,
        headers,
        data: { postId }
        })
        .then((response) => {
            console.log('homePageUnLikePost', response);
        })
        .catch((error) => {
            //handle error
            console.log('homePageUnLikePost Actions Error ', error);
      });
  };
};
