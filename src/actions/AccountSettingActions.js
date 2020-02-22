import axios from 'axios';

import {
  SETTING_PAGE_SET_USER_ORDERS
} from '../types';

import {
  SettingsPageGetUserOrders
} from '../URLS';

export const accountSettingsGetUserOrders = ({ userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'get',
        url: SettingsPageGetUserOrders,
        headers,
        })
        .then((response) => {
            const { orderProducts } = response.data;
            if (typeof orderProducts !== 'undefined') {
              dispatch({ type: SETTING_PAGE_SET_USER_ORDERS, payload: orderProducts });
            }
            console.log('accountSettingsGetUserOrders', response.data);
        })
        .catch((error) => {
            //handle error
            console.log('accountSettingsGetUserOrders Actions Error ', error);
      });
  };
};
