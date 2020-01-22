import axios from 'axios';

import {
  HOME_PAGE_FEED_INITIAL_DATA_UPDATE,
  HOME_PAGE_FEED_EXTRA_DATA_UPDATE,
  HOME_PAGE_PUBLIC_FEED_INITIAL_DATA_UPDATE,
  HOME_PAGE_PUBLIC_FEED_EXTRA_DATA_UPDATE,
  HOME_PAGE_ACTIVE_TAB_UPDATE,
  HOME_PAGE_SET_PUBLIC_VERTICAL_CAROUSEL_REF,
  HOME_PAGE_SET_PERSONAL_VERTICAL_CAROUSEL_REF,
  USER_LIKED_POST,
  USER_UNLIKED_POST
} from '../types';

import {
  HomePageGetInitialFeedDataURL,
  HomePageGetInitialPublicFeedDataURL,
  HomePageLikePostURL,
  HomePageUnlikePostURL,
  HomePageDislikePostURL
} from '../URLS';


// Method to Get the Initial Personal Feed Data
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


// Method to Get the Extra Personal Feed Data
export const homePageGetExtraFeedData = ({ userToken, feedPageNum }) => {
  console.log('Actions ', userToken, feedPageNum);
  return {
    type: HOME_PAGE_FEED_EXTRA_DATA_UPDATE,
    payload: []
  };
};

// Method to Get the Initial Public Feed Data
export const homePageGetInitialPublicFeedData = ({ userToken }) => {
  return (dispatch) => {
    axios.get(HomePageGetInitialPublicFeedDataURL, { headers: { Authorization: userToken } })
    .then(response => {
      // console.log('Actions Feed Data', response.data.posts);
      dispatch({ type: HOME_PAGE_PUBLIC_FEED_INITIAL_DATA_UPDATE, payload: response.data.posts });
    })
    .catch(error => {
      console.log('HomePageActions homePageGetInitialFeedData Error', error);
    });
  };
};

// Method to Get the Extra Public Feed Data
export const homePageGetExtraPublicFeedData = ({ userToken, publicFeedPageNum }) => {
  console.log('Actions ', userToken, publicFeedPageNum);
  return {
    type: HOME_PAGE_PUBLIC_FEED_EXTRA_DATA_UPDATE,
    payload: []
  };
};

// Method to Update the Active Tab on Home page
export const homePageUpdateActiveTab = ({ activeTab }) => {
  // console.log('Active Tab Updated', activeTab);
  return {
    type: HOME_PAGE_ACTIVE_TAB_UPDATE,
    payload: activeTab
  };
};

// Method to set verticalPublicCarouselRef on Home Page
export const homePageSetPublicVerticalCarouselRef = (ref) => {
  return {
      type: HOME_PAGE_SET_PUBLIC_VERTICAL_CAROUSEL_REF,
      payload: ref
  };
};

// Method to set verticalPersonalCarouselRef on Home Page
export const homePageSetPersonalVerticalCarouselRef = (ref) => {
  return {
      type: HOME_PAGE_SET_PERSONAL_VERTICAL_CAROUSEL_REF,
      payload: ref
  };
};

// Method to Like a Post
export const homePageLikePost = ({ userToken, postId, userId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: USER_LIKED_POST, payload: postId });
    axios({
        method: 'post',
        url: HomePageLikePostURL,
        headers,
        data: { postId, posterId: userId }
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
export const homePageUnlikePost = ({ userToken, postId, userId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: USER_UNLIKED_POST, payload: postId });
    axios({
        method: 'post',
        url: HomePageUnlikePostURL,
        headers,
        data: { postId, posterId: userId }
        })
        .then((response) => {
            console.log('homePageUnlikePost', response);
        })
        .catch((error) => {
            //handle error
            console.log('homePageUnlikePost Actions Error ', error);
      });
  };
};


// Method to Dislike a Post
export const homePageDislikePost = ({ userToken, postId, userId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'post',
        url: HomePageDislikePostURL,
        headers,
        data: { postId, posterId: userId }
        })
        .then((response) => {
            console.log('homePageDislikePost', response);
        })
        .catch((error) => {
            //handle error
            console.log('homePageDislikePost Actions Error ', error);
      });
  };
};
