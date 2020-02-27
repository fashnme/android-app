import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  SETTING_PAGE_SET_USER_ORDERS,
  SETTING_PAGE_SET_RENT_BID_BY_ME,
  SETTING_PAGE_SET_RENT_BID_FOR_ME,
  SETTING_PAGE_USER_CAPTION_UPDATE,
  SETTING_PAGE_USER_DOB_UPDATE,
  SETTING_PAGE_USER_SOCIAL_LINK_UPDATE,
  SETTING_PAGE_USER_PROFILE_PIC_UDPATE,
  SETTING_PAGE_GENERAL_LOADING_TOGGLE,
  SETTING_PAGE_USER_ADD_ADDRESS
} from '../types';

import {
  SettingsPageGetUserOrdersURL,
  SettingsPageGetBidsByMeURL,
  SettingsPageGetBidsForMeURL,
  SettingsPageSaveProfileChangesURL,
  SettingsPageRejectBidURL,
  SettingsPageAddUserAddressURL
} from '../URLS';

export const accountSettingsUpdateBio = ({ bio }) => {
    return { type: SETTING_PAGE_USER_CAPTION_UPDATE, payload: bio };
};

export const accountSettingsUpdateDateOfBirth = ({ dateOfBirth }) => {
  return { type: SETTING_PAGE_USER_DOB_UPDATE, payload: dateOfBirth };
};

export const accountSettingsUpdateUserProfilePic = ({ profilePic }) => {
  return { type: SETTING_PAGE_USER_PROFILE_PIC_UDPATE, payload: profilePic };
};

export const accountSetttingsAddUserAddress = ({ userAddress, addressId, userToken }) => {
  console.log('Done Added userAddress');
  Actions.pop();
  return { type: 'accountSetttingsAddUserAddress' }; // TODO
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
              // Setting Updated Data for Personal Page Tab
              // dispatch({ type: CELEBRITY_PAGE_SET_CELEB_DATA, payload: { userDetails: response.data.userDetails, userId } });
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

// Reject the Bid
export const accountSettingsRejectBid = ({ bidId, reason, feedback, userToken }) => {
  // console.log('accountSettingsRejectBid', { bidId, reason, feedback, userToken });
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: true });
    axios({
        method: 'post',
        url: SettingsPageRejectBidURL,
        headers,
        data: { bidId, ownerRejectionReason: reason, ownerFeedback: feedback }
        })
        .then((response) => {
            const { bids } = response.data;
            if (typeof bids !== 'undefined') {
              dispatch({ type: SETTING_PAGE_SET_RENT_BID_FOR_ME, payload: bids });
            }
            Actions.bidsForMe();
            console.log('accountSettingsRejectBid', response.data);
        })
        .catch((error) => {
            console.log('accountSettingsRejectBid Actions Error ', error);
        })
        .finally(() => {
            dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: false });
        });
  };
};
