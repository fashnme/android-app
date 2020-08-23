import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import ImageResizer from 'react-native-image-resizer/index.android';
import { RNS3 } from 'react-native-aws3';

import {
  AWS_OPTIONS,
  SETTING_PAGE_SET_USER_ORDERS,
  SETTING_PAGE_SET_RENT_BID_BY_ME,
  SETTING_PAGE_SET_RENT_BID_FOR_ME,
  SETTING_PAGE_SET_USER_REWARDS,
  SETTING_PAGE_USER_CAPTION_UPDATE,
  SETTING_PAGE_USER_DOB_UPDATE,
  SETTING_PAGE_USER_SOCIAL_LINK_UPDATE,
  SETTING_PAGE_USER_PROFILE_PIC_UDPATE,
  SETTING_PAGE_GENERAL_LOADING_TOGGLE,
  SETTING_PAGE_USER_ADD_ADDRESS,
  PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID,
  SIGNUP_PAGE_USERNAME_UPDATE, // Using these reducer state to show username in username update section
  SIGNUP_PAGE_FULLNAME_UPDATE,
  SIGNUP_PAGE_GENDER_UPDATE,
  SIGNUP_PAGE_ERROR_UPDATE,
  SETTING_PAGE_SET_SELECTED_ADDRESS
} from '../types';

import {
  SettingsPageGetUserOrdersURL,
  SettingsPageGetBidsByMeURL,
  SettingsPageGetBidsForMeURL,
  SettingsPageSaveProfileChangesURL,
  SettingsPageAddUserAddressURL,
  CelebrityPageGetUserDetailsURL,
  SettingsPageGetUserRewardsURL,
  SettingsPageGetCityAndAddressFromPinURL
} from '../URLS';

export const accountSettingsUpdateBio = ({ bio }) => {
    return { type: SETTING_PAGE_USER_CAPTION_UPDATE, payload: bio };
};

export const accountSettingsUpdateDateOfBirth = ({ dateOfBirth }) => {
  return { type: SETTING_PAGE_USER_DOB_UPDATE, payload: dateOfBirth };
};

export const accountSettingSetSelectedAddress = ({ selectedAddress }) => {
  return { type: SETTING_PAGE_SET_SELECTED_ADDRESS, payload: selectedAddress };
};

// Get the User Personal Details
export const accountSettingGetAndSetUserData = ({ userId, userToken }) => {
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
            console.log('accountSettingGetAndSetUserData', response.data.userDetails);
            const { fullName, gender, profilePic, userName, dob, socialMediaLinks, bio } = response.data.userDetails;
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
              console.log('Error deliveryDetailsArray accountSettingGetAndSetUserData', userId);
            }
        })
        .catch((error) => {
            //handle error
            console.log('accountSettingGetAndSetUserData Actions Error ', error);
      });
  };
};

// Get City & State from Pincode
export const accountSettingsGetCityAndStateFromPin = ({ pincode, updateState, updateCity }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return (dispatch) => {
    dispatch({ type: 'accountSettingsGetCityAndStateFromPin' });
    axios({
        method: 'get',
        url: SettingsPageGetCityAndAddressFromPinURL,
        headers,
        params: { pincode }
        })
        .then((response) => {
            console.log('pinCode resp', response.data);
            const { stateName, city, status } = response.data;
            if (status === 'OK') {
              updateState(stateName);
              updateCity(city);
            } else {
              updateState('');
              updateCity('');
            }
        })
        .catch((error) => {
            console.log('accountSettingsGetCityAndStateFromPin Actions Error ', error);
      });
  };
};


// Add or Update the user Address Details
export const accountSetttingsAddUserAddress = ({ userAddress, addressId, userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  let newAddressId = '';
  if (addressId !== undefined) {
    newAddressId = addressId;
  }
  return (dispatch) => {
    dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: true });
    axios({
        method: 'post',
        url: SettingsPageAddUserAddressURL,
        headers,
        data: { address: userAddress, addressId: newAddressId.toString() }
        })
        .then((response) => {
            // console.log('accountSetttingsAddUserAddress', response.data);
            const deliveryDetailsArray = Object.values(response.data.deliveryDetails);
            dispatch({ type: SETTING_PAGE_USER_ADD_ADDRESS, payload: deliveryDetailsArray });
            Actions.pop();
        })
        .catch((error) => {
            console.log('accountSetttingsAddUserAddress Actions Error ', error);
        })
        .finally(() => {
            dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: false });
        });
  };
};


// Add or Update users social Media Handles & Links
export const accountSettingsUpdateSocialMediaLinks = ({ socialMediaLinks, newSocialObject }) => {
  // newSocialObject { name: 'facebook', profile: 'link or handle'}
  const { name, profile } = newSocialObject;
  const newSocialMediaLinks = { ...socialMediaLinks };
  newSocialMediaLinks[name] = profile;
  return { type: SETTING_PAGE_USER_SOCIAL_LINK_UPDATE, payload: newSocialMediaLinks };
};


// Update the user Profile Pic & Upload this Image to S3
export const accountSettingsUpdateUserProfilePic = ({ profilePic }) => {
  return {
    type: SETTING_PAGE_USER_PROFILE_PIC_UDPATE,
    payload: profilePic
  };
  // return (dispatch) => {
  //   dispatch({ type: SETTING_PAGE_USER_PROFILE_PIC_UDPATE, payload: profilePic });
  //   Image.getSize(profilePic, (w, h) => {
  //     ImageResizer.createResizedImage(profilePic, w, h, 'WEBP', 40).then((response) => {
  //       const { uri } = response;
  //       const name = `${personalUserId}-t-${Math.round((new Date().getTime()) / 1000)}.webp`;
  //       const keyPrefix = 'profilePictures/';
  //       AWS_OPTIONS.keyPrefix = keyPrefix;
  //       const file = { uri, name, type: 'image/webp' };
  //       RNS3.put(file, AWS_OPTIONS).then(resp => {
  //         if (resp.status === 201) {
  //           dispatch({ type: SETTING_PAGE_USER_PROFILE_PIC_UDPATE, payload: resp.body.postResponse.location });
  //           console.log('Content Uploaded', resp.body.postResponse.location);
  //         } else {
  //           console.log('accountSettingsUpdateUserProfilePic Error in Uploading profilePic', resp, uri, name);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log('accountSettingsUpdateUserProfilePic Error Uploading Image', err);
  //       });
  //     }).catch((err) => {
  //       console.log('Error in Image Compression', err);
  //     });
  //   });
  // };
};

// Save the User Profile Changes in DB
export const accountSettingsSaveProfileChanges = ({ profileDetailsChanges, personalUserId }) => {
    const { dateOfBirth, userName, fullName, bio,
      socialMediaLinks, profilePic, userToken, gender, oldUserName } = profileDetailsChanges;
    const userNameChanged = userName !== oldUserName;
    return (dispatch) => {
      dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: true });
      if (profilePic.includes('https:') || profilePic.includes('http:')) {
        // profilePic not changed
        updateProfileChanges({ dateOfBirth, userName, profilePic, fullName, gender, bio, socialMediaLinks, userToken, userNameChanged, dispatch });
      } else {
        // Upload Profile Pic
        Image.getSize(profilePic, (w, h) => {
          ImageResizer.createResizedImage(profilePic, w, h, 'WEBP', 40).then((response) => {
            const { uri } = response;
            const name = `${personalUserId}-t-${Math.round((new Date().getTime()) / 1000)}.webp`;
            const keyPrefix = 'profilePictures/';
            AWS_OPTIONS.keyPrefix = keyPrefix;
            const file = { uri, name, type: 'image/webp' };
            RNS3.put(file, AWS_OPTIONS).then(resp => {
              if (resp.status === 201) {
                updateProfileChanges({ dateOfBirth, userName, profilePic: resp.body.postResponse.location, fullName, gender, bio, socialMediaLinks, userToken, userNameChanged, dispatch });
                dispatch({ type: SETTING_PAGE_USER_PROFILE_PIC_UDPATE, payload: resp.body.postResponse.location }); // So, that if user press the Save Button Again, the image is not uploaded again, instead falls in above if case
                console.log('Profile Photo Uploaded', resp.body.postResponse.location);
              } else {
                dispatch({ type: SIGNUP_PAGE_ERROR_UPDATE, payload: 'Error in Uploading Image:' });
                console.log('accountSettingsSaveProfileChanges Error in Uploading profilePic', resp, uri, name);
              }
            })
            .catch((err) => {
              dispatch({ type: SIGNUP_PAGE_ERROR_UPDATE, payload: 'Error in Uploading Image' });
              console.log('accountSettingsSaveProfileChanges Error Uploading Image', err);
            });
          }).catch((err) => {
            console.log('Error in Image Compression', err);
          });
        });
      }
    };
};

const updateProfileChanges = ({ dateOfBirth, userName, fullName, gender, bio, socialMediaLinks, profilePic,
  userToken, userNameChanged, dispatch }) => {
  axios({
      method: 'post',
      url: SettingsPageSaveProfileChangesURL,
      headers: { 'Content-Type': 'application/json', Authorization: userToken },
      data: { newProfile: { dob: dateOfBirth, userName, fullName, gender, bio, socialMediaLinks, profilePic }, userNameChanged }
      })
      .then((response) => {
          console.log('accountSettingsSaveProfileChanges', response.data, response.status);
      })
      .catch((error) => {
          console.log('accountSettingsSaveProfileChanges Actions Error ', error);
          const errorMessage = error.response.data;
          if (errorMessage.length > 25) {
            dispatch({ type: SIGNUP_PAGE_ERROR_UPDATE, payload: 'Server Error, Please try in some time' });
          }
          dispatch({ type: SIGNUP_PAGE_ERROR_UPDATE, payload: errorMessage });
      })
      .finally(() => {
          dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: false });
      });
};

// Get all the Orders Done by the User
export const accountSettingsGetUserOrders = ({ userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: true });
    axios({
        method: 'get',
        url: SettingsPageGetUserOrdersURL,
        headers,
        })
        .then((response) => {
            const { orderProducts } = response.data;
            if (orderProducts !== undefined) {
              dispatch({ type: SETTING_PAGE_SET_USER_ORDERS, payload: orderProducts });
            }
            // console.log('accountSettingsGetUserOrders', response.data);
        })
        .catch((error) => {
            console.log('accountSettingsGetUserOrders Actions Error ', error);
      }).finally(() => {
        dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: false });
      });
  };
};

// Get Bids Made By Me
export const accountSettingsGetBidsByMe = ({ userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'get',
        url: SettingsPageGetBidsByMeURL,
        headers,
        })
        .then((response) => {
            const { bids } = response.data;
            if (typeof bids !== 'undefined') {
              dispatch({ type: SETTING_PAGE_SET_RENT_BID_BY_ME, payload: bids });
            }
            console.log('accountSettingsGetBidsByMe', response.data);
        })
        .catch((error) => {
            console.log('accountSettingsGetBidsByMe Actions Error ', error);
      });
  };
};


// Get Bids For Me
export const accountSettingsGetBidsForMe = ({ userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'get',
        url: SettingsPageGetBidsForMeURL,
        headers,
        })
        .then((response) => {
            const { bids } = response.data;
            if (typeof bids !== 'undefined') {
              dispatch({ type: SETTING_PAGE_SET_RENT_BID_FOR_ME, payload: bids });
            }
            console.log('accountSettingsGetBidsForMe', response.data);
        })
        .catch((error) => {
            console.log('accountSettingsGetBidsForMe Actions Error ', error);
      });
  };
};

// Get User Rewards
export const accountSettingsGetUserRewards = ({ userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: true });
    axios({
        method: 'get',
        url: SettingsPageGetUserRewardsURL,
        headers,
        })
        .then((response) => {
          // console.log('accountSettingsGetUserRewards', response.data);
          dispatch({ type: SETTING_PAGE_SET_USER_REWARDS, payload: response.data });
        })
        .catch((error) => {
            console.log('accountSettingsGetUserRewards Actions Error ', error);
      }).finally(() => {
        dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: false });
      });
  };
};
