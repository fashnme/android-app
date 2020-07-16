import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

import {
  CELEBRITY_PAGE_SET_CELEB_DATA,
  SETTING_PAGE_USER_CAPTION_UPDATE,
  SETTING_PAGE_USER_DOB_UPDATE,
  SETTING_PAGE_USER_SOCIAL_LINK_UPDATE,
  SETTING_PAGE_USER_PROFILE_PIC_UDPATE,
  SIGNUP_PAGE_USERNAME_UPDATE,
  SIGNUP_PAGE_FULLNAME_UPDATE,
  SIGNUP_PAGE_GENDER_UPDATE,
  SETTING_PAGE_USER_ADD_ADDRESS,
  PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID,
  PERSONAL_PAGE_DELETE_POST
} from '../types';

import {
  CelebrityPageGetUserDetailsURL,
  HomePageUpdateRegistrationTokenURL,
  PersonalPageDeletePost
} from '../URLS';

export const personalPageSetData = ({ userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
     Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'post',
        url: CelebrityPageGetUserDetailsURL,
        headers,
        // data: { userId } // Not required for fetching personal details
        })
        .then((response) => {
              // console.log('personalPageSetData response', response.data);
              // Setting Data for Personal Page Tab
              dispatch({ type: CELEBRITY_PAGE_SET_CELEB_DATA, payload: { userDetails: response.data.userDetails } });
              // Setting Data for Setting's Page Update User Profile Page
              const { fullName, gender, profilePic, userName, dob, registrationToken, socialMediaLinks, bio } = response.data.userDetails;
              // console.log('personalPageSetData', { fullName, gender, profilePic, userName, dob, socialMediaLinks, bio });
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
              try {
                const deliveryDetailsArray = Object.values(response.data.userDetails.deliveryDetails);
                dispatch({ type: SETTING_PAGE_USER_ADD_ADDRESS, payload: deliveryDetailsArray });
              } catch (err) {
                console.log('personalPageSetData deliveryDetailsArray Error', err);
              }
              if (registrationToken === undefined || registrationToken.length === 0) {
                fetchNewRegistrationToken({ userToken });
              } else {
                console.log('registrationToken already exists or is undefined');
              }
        })
        .catch((error) => {
            //handle error
            console.log('personalPageSetData Actions Error ', error);
      });
  };
};

const fetchNewRegistrationToken = async ({ userToken }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: userToken
    };
    // Get FCM TOKEN
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
          axios({
              method: 'post',
              url: HomePageUpdateRegistrationTokenURL,
              headers,
              data: { registrationToken: fcmToken }
              })
              .then((response) => {
                  console.log('fetchNewRegistrationToken new token successfully set', response.data, fcmToken);
              })
              .catch((error) => {
                  console.log('fetchNewRegistrationToken Actions Error ', error, fcmToken);
            });
      } else {
        console.log('Failed, No token received');
      }
    }
};

export const personalPageDeletePost = ({ postId, userToken }) => {
  // console.log('personalPageDeletePost', postId);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: PERSONAL_PAGE_DELETE_POST, payload: { postId } });
    axios({
        method: 'post',
        url: PersonalPageDeletePost,
        headers,
        data: { postId }
        })
        .then((response) => {
            console.log('personalPageDeletePost', response.data);
        })
        .catch((error) => {
            //handle error
            console.log('personalPageDeletePost Actions Error ', error);
      });
  };
};
