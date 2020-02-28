import axios from 'axios';

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
  PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID
} from '../types';

import {
  CelebrityPageGetUserDetailsURL
} from '../URLS';

export const personalPageVisitAndSetData = ({ userId, userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
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
              // console.log('personalPageVisitAndSetData', { fullName, gender, profilePic, userName, dob, socialMediaLinks, bio });
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
                console.log('personalPageVisitAndSetData deliveryDetailsArray Error', err, userId);
              }
        })
        .catch((error) => {
            //handle error
            console.log('personalPageVisitAndSetData Actions Error ', error);
      });
  };
};
