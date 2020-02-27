import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import {
  USER_FOLLOWED_HIM,
  USER_UNFOLLOWED_HIM,
  CELEBRITY_PAGE_SET_CELEB_DATA,
  CELEBRITY_PAGE_GET_CELEB_POSTS,
  CELEBRITY_PAGE_GET_CELEB_LIKED_POSTS,
  SETTING_PAGE_USER_CAPTION_UPDATE,
  SETTING_PAGE_USER_DOB_UPDATE,
  SETTING_PAGE_USER_SOCIAL_LINK_UPDATE,
  SETTING_PAGE_USER_PROFILE_PIC_UDPATE,
  SIGNUP_PAGE_USERNAME_UPDATE,
  SIGNUP_PAGE_FULLNAME_UPDATE,
  SIGNUP_PAGE_GENDER_UPDATE,
  SETTING_PAGE_USER_ADD_ADDRESS,
  PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID
} from '../types';

import {
  CelebrityPageFollowURL,
  CelebrityPageUnfollowURL,
  CelebrityPageGetUserDetailsURL,
  CelebrityPageGetUserPostsURL,
  CelebrityPageGetUserLikedPostsURL
} from '../URLS';


// Method to Visit & Set the Celebrity Page
export const celebrityPageVisitAndSetData = ({ userId, userToken, isPersonalPage }) => {
  if (isPersonalPage) {
    Actions.celebrityPage(); // Calling from Home Page, so go to Celebrity Page
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    // dispatch({ type: USER_UNFOLLOWED_HIM, payload: userId });
    axios({
        method: 'post',
        url: CelebrityPageGetUserDetailsURL,
        headers,
        data: { userId }
        })
        .then((response) => {
            // Setting Data for Personal Page Tab
            dispatch({ type: CELEBRITY_PAGE_SET_CELEB_DATA, payload: { userDetails: response.data.userDetails, userId } });
            // Setting Data for Setting's Page Update User Profile Page
            const { fullName, gender, profilePic, userName, dob, socialMediaLinks, bio } = response.data.userDetails;
            // console.log('celebrityPageVisitAndSetData', { fullName, gender, profilePic, userName, dob, socialMediaLinks, bio });
            if (isPersonalPage) {
              // Set the personal Details & Personal User Id in the Personal Page State
              dispatch({ type: PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID, payload: response.data.userDetails });
              // Set these details for the Account Settings Screen
              dispatch({ type: SETTING_PAGE_USER_CAPTION_UPDATE, payload: bio });
              dispatch({ type: SETTING_PAGE_USER_DOB_UPDATE, payload: dob });
              dispatch({ type: SETTING_PAGE_USER_SOCIAL_LINK_UPDATE, payload: socialMediaLinks });
              dispatch({ type: SETTING_PAGE_USER_PROFILE_PIC_UDPATE, payload: profilePic });
              dispatch({ type: SIGNUP_PAGE_USERNAME_UPDATE, payload: userName });
              dispatch({ type: SIGNUP_PAGE_FULLNAME_UPDATE, payload: fullName });
              dispatch({ type: SIGNUP_PAGE_GENDER_UPDATE, payload: gender });
              const deliveryDetailsArray = Object.values(response.data.userDetails.deliveryDetails);
              dispatch({ type: SETTING_PAGE_USER_ADD_ADDRESS, payload: deliveryDetailsArray });
            }
        })
        .catch((error) => {
            //handle error
            console.log('celebrityPageVisitAndSetData Actions Error ', error);
      });
  };
};


// Method to Get the Celeb Posts
export const celebrityPageGetUserPosts = ({ userId, userToken, selfPostPageNum }) => {
  // console.log('celebrityPageGetUserPosts data', userId, selfPostPageNum);
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
            // console.log('celebrityPageGetUserPosts', selfPostPageNum, response.data.posts);
            dispatch({ type: CELEBRITY_PAGE_GET_CELEB_POSTS, payload: response.data.posts });
        })
        .catch((error) => {
            //handle error
            console.log('celebrityPageGetUserPosts Actions Error ', error);
      });
  };
};

// Method to Get the Posts Liked by Celeb
export const celebrityPageGetUserLikedPosts = ({ userId, userToken, postLikedPageNum }) => {
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
        url: CelebrityPageGetUserLikedPostsURL,
        headers,
        data: { userId, page: postLikedPageNum }
        })
        .then((response) => {
            // console.log('celebrityPageGetUserLikedPosts', postLikedPageNum, response.data.posts);
            dispatch({ type: CELEBRITY_PAGE_GET_CELEB_LIKED_POSTS, payload: response.data.posts });
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
  return { type: 'celebrityPageSocialIconClicked' };
};
