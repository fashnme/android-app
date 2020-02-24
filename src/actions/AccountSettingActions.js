import axios from 'axios';

import {
  SETTING_PAGE_SET_USER_ORDERS,
  SETTING_PAGE_SET_RENT_BID_BY_ME,
  SETTING_PAGE_SET_RENT_BID_FOR_ME
} from '../types';

import {
  SettingsPageGetUserOrdersURL,
  SettingsPageGetBidsByMeURL,
  SettingsPageGetBidsForMeURL
} from '../URLS';

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
