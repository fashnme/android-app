import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Linking } from 'react-native';

import {
  USER_FOLLOWED_HIM,
  USER_UNFOLLOWED_HIM,
  CELEBRITY_PAGE_SET_CELEB_DATA,
  CELEBRITY_PAGE_GET_CELEB_POSTS,
  CELEBRITY_PAGE_GET_CELEB_LIKED_POSTS,
  CELEBRITY_PAGE_TOGGLE_LOADING,
  CELEBRITY_PAGE_RESET_DATA,
  PERSONAL_PAGE_SET_OWN_POSTS,
  PERSONAL_PAGE_SET_OWN_LIKED_POSTS,
} from '../types';

import {
  CelebrityPageFollowURL,
  CelebrityPageUnfollowURL,
  CelebrityPageGetUserDetailsURL,
  CelebrityPageGetUserPostsURL,
  CelebrityPageGetUserLikedPostsURL
} from '../URLS';


// Method to Visit & Set the Celebrity Page
export const celebrityPageVisitAndSetData = ({ userId, userToken }) => {
  // console.log('celebrityPageVisitAndSetData', userId);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  // Visit the Celebrity Page
  Actions.celebrityPage();
  return (dispatch) => {
    dispatch({ type: CELEBRITY_PAGE_RESET_DATA });
    dispatch({ type: CELEBRITY_PAGE_TOGGLE_LOADING, payload: true });
    // console.log('celebrityPageVisitAndSetData', userId);
    // Setting the General Details
    axios({
        method: 'post',
        url: CelebrityPageGetUserDetailsURL,
        headers,
        data: { userId }
        })
        .then((response) => {
            dispatch({ type: CELEBRITY_PAGE_SET_CELEB_DATA, payload: { userDetails: response.data.userDetails } });
        })
        .catch((error) => {
            //handle error
            console.log('celebrityPageVisitAndSetData Actions Error ', error);
        })
        .finally(() => {
          dispatch({ type: CELEBRITY_PAGE_TOGGLE_LOADING, payload: false });
        });
    // Setting the First page of user posts
    axios({
        method: 'post',
        url: CelebrityPageGetUserPostsURL,
        headers,
        data: { userId, page: 1 }
        })
        .then((response) => {
            // console.log('celebrityPageGetUserPosts 1', selfPostPageNum, response.data.posts);
            const payload = { posts: response.data.posts, selfPostPageNum: 1 };
            dispatch({ type: CELEBRITY_PAGE_GET_CELEB_POSTS, payload });
        })
        .catch((error) => {
            //handle error
            console.log('celebrityPageGetUserPosts 1 Actions Error ', error);
      });
      // Setting the First Page of user liked posts
      axios({
          method: 'post',
          url: CelebrityPageGetUserLikedPostsURL,
          headers,
          data: { userId, page: 1 }
          })
          .then((response) => {
            // console.log('celebrityPageGetUserLikedPosts 1', postLikedPageNum, response.data.posts);
            const payload = { posts: response.data.posts, postLikedPageNum: 1 };
            dispatch({ type: CELEBRITY_PAGE_GET_CELEB_LIKED_POSTS, payload });
          })
          .catch((error) => {
              //handle error
              console.log('celebrityPageGetUserLikedPosts 1 Actions Error ', error);
        });
  };
};

// Method to get Celeb Data, This method is to implement "Pull to Refresh" feature on Celeb Page
export const celebrityPageGetCelebData = ({ userId, userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: CELEBRITY_PAGE_TOGGLE_LOADING, payload: true });
    axios({
        method: 'post',
        url: CelebrityPageGetUserDetailsURL,
        headers,
        data: { userId }
        })
        .then((response) => {
            dispatch({ type: CELEBRITY_PAGE_SET_CELEB_DATA, payload: { userDetails: response.data.userDetails } });
        })
        .catch((error) => {
            //handle error
            console.log('celebrityPageVisitAndSetData Actions Error ', error);
        })
        .finally(() => {
          dispatch({ type: CELEBRITY_PAGE_TOGGLE_LOADING, payload: false });
        });
  };
};

// Method to Get the Celeb Posts
export const celebrityPageGetUserPosts = ({ userId, userToken, selfPostPageNum, isPersonalData }) => {
  // console.log('celebrityPageGetUserPosts data', userId, selfPostPageNum, isPersonalData);
  if (userId.length === 0) {
    return { type: 'CELEBRITY_PAGE_GET_CELEB_POSTS_UNHANDLED' };
  }
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'post',
        url: CelebrityPageGetUserPostsURL,
        headers,
        data: { userId, page: selfPostPageNum }
        })
        .then((response) => {
            // console.log('celebrityPageGetUserPosts', selfPostPageNum, response.data.posts.length);
            if (response.data.posts.length === 0) {
              console.log('empty celebrityPageGetUserPosts', selfPostPageNum);
            } else if (isPersonalData === true) {
              const payload = { posts: response.data.posts, selfPostPageNum };
              dispatch({ type: PERSONAL_PAGE_SET_OWN_POSTS, payload });
            } else {
              const payload = { posts: response.data.posts, selfPostPageNum };
              dispatch({ type: CELEBRITY_PAGE_GET_CELEB_POSTS, payload });
            }
        })
        .catch((error) => {
            //handle error
            console.log('celebrityPageGetUserPosts Actions Error ', error);
      });
  };
};

// Method to Get the Posts Liked by Celeb
export const celebrityPageGetUserLikedPosts = ({ userId, userToken, postLikedPageNum, isPersonalData }) => {
  // console.log('celebrityPageGetUserLikedPosts data', userId, postLikedPageNum, isPersonalData);

  if (userId.length === 0 || postLikedPageNum > 3) {
    // TODO: postLikedPageNum > 3 Precaution initially, Remove after uneven length problem solved

    return { type: 'CELEBRITY_PAGE_GET_CELEB_POSTS_UNHANDLED' };
  }
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'post',
        url: CelebrityPageGetUserLikedPostsURL,
        headers,
        data: { userId, page: postLikedPageNum }
        })
        .then((response) => {
          console.log('celebrityPageGetUserLikedPosts', postLikedPageNum, response.data.posts.length);
          if (response.data.posts.length === 0) {
            console.log('empty celebrityPageGetUserLikedPosts', postLikedPageNum);
          } else if (isPersonalData === true) {
            const payload = { posts: response.data.posts, postLikedPageNum };
            dispatch({ type: PERSONAL_PAGE_SET_OWN_LIKED_POSTS, payload });
          } else {
            const payload = { posts: response.data.posts, postLikedPageNum };
            dispatch({ type: CELEBRITY_PAGE_GET_CELEB_LIKED_POSTS, payload });
          }
        })
        .catch((error) => {
            //handle error
            console.log('celebrityPageGetUserLikedPosts Actions Error ', error);
      });
  };
};


// Method to Follow a Celebrity
export const celebrityPageFollow = ({ userToken, userId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: USER_FOLLOWED_HIM, payload: userId });
    axios({
        method: 'post',
        url: CelebrityPageFollowURL,
        headers,
        data: { userId }
        })
        .then((response) => {
            console.log('celebrityPageFollow', response.data);
        })
        .catch((error) => {
            //handle error
            console.log('celebrityPageFollow Actions Error ', error);
      });
  };
};


// Method to Unfollow a Celebrity
export const celebrityPageUnfollow = ({ userToken, userId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: USER_UNFOLLOWED_HIM, payload: userId });
    axios({
        method: 'post',
        url: CelebrityPageUnfollowURL,
        headers,
        data: { userId }
        })
        .then((response) => {
            console.log('celebrityPageUnfollow', response.data);
        })
        .catch((error) => {
            //handle error
            console.log('celebrityPageUnfollow Actions Error ', error);
      });
  };
};

// Method to go to the Respective Social Media
export const celebrityPageSocialIconClicked = ({ name, profile }) => {
  console.log('celebrityPageSocialIconClicked', name, profile);
  switch (name) {
    case 'instagram': { const url = `https://www.instagram.com/${profile}`; Linking.openURL(url); } break;
    case 'facebook': { const url = `https://www.facebook.com/${profile}`; Linking.openURL(url); } break;
    case 'twitter': { const url = `https://www.twitter.com/${profile}`; Linking.openURL(url); } break;
    case 'youtube': { const url = `https://www.youtube.com/${profile}`; Linking.openURL(url); } break;
    default:
  }
  return { type: 'celebrityPageSocialIconClicked' };
};
