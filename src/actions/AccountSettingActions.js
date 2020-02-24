import axios from 'axios';

import {
  SETTING_PAGE_SET_USER_ORDERS,
  SETTING_PAGE_SET_RENT_BID_BY_ME,
  SETTING_PAGE_SET_RENT_BID_FOR_ME,
  SETTING_PAGE_USER_CAPTION_UPDATE,
  SETTING_PAGE_USER_DOB_UPDATE,
  SETTING_PAGE_USER_SOCIAL_LINK_UPDATE,
  SETTING_PAGE_USER_PROFILE_PIC_UDPATE
} from '../types';

import {
  SettingsPageGetUserOrdersURL,
  SettingsPageGetBidsByMeURL,
  SettingsPageGetBidsForMeURL,
  SettingsPageSaveProfileChangesURL
} from '../URLS';

export const accountSettingsUpdateBio = ({ bio }) => {
    return { type: SETTING_PAGE_USER_CAPTION_UPDATE, payload: bio };
};

export const accountSettingsUpdateDateOfBirth = ({ dateOfBirth }) => {
  return { type: SETTING_PAGE_USER_DOB_UPDATE, payload: dateOfBirth };
};

export const accountSettingsUpdateUserProfilePic = ({ profilePic }) => {
  return { tpe: SETTING_PAGE_USER_PROFILE_PIC_UDPATE, payload: profilePic };
};

export const accountSettingsUpdateSocialMediaLinksLink = ({ socialMediaLinks, newSocialObject }) => {
  // newSocialObject { name: 'facebbok', profile: 'link or handle'}
  const { name, profile } = newSocialObject;
  const newSocialMediaLinks = { ...socialMediaLinks };
  newSocialMediaLinks[name] = profile;
  return { type: SETTING_PAGE_USER_SOCIAL_LINK_UPDATE, paload: newSocialMediaLinks };
};

export const accountSettingsSaveProfileChanges = ({ dateOfBirth, userName, fullName, bio,
  socialMediaLinks, profilePic, userToken, gender }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: userToken
    };
    return (dispatch) => {
      axios({
          method: 'post',
          url: SettingsPageSaveProfileChangesURL,
          headers,
          data: { dob: dateOfBirth, userName, fullName, gender, bio, socialMediaLinks, profilePic }
          })
          .then((response) => {
              console.log('accountSettingsSaveProfileChanges', response.data);
              // console.log('accountSettingsSaveProfileChanges', response.data);
          })
          .catch((error) => {
              console.log('accountSettingsSaveProfileChanges Actions Error ', error);
        });
    };
};

export const accountSettingsGetUserOrders = ({ userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'get',
        url: SettingsPageGetUserOrdersURL,
        headers,
        })
        .then((response) => {
            const { orderProducts } = response.data;
            if (typeof orderProducts !== 'undefined') {
              dispatch({ type: SETTING_PAGE_SET_USER_ORDERS, payload: orderProducts });
            }
            // console.log('accountSettingsGetUserOrders', response.data);
        })
        .catch((error) => {
            console.log('accountSettingsGetUserOrders Actions Error ', error);
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
