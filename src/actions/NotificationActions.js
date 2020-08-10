import axios from 'axios';

import {
  NOTIFICATION_PAGE_UPDATE_NOTIFICATIONS,
  NOTIFICATION_PAGE_TOGGLE_NOTIFICATION_LOADING
} from '../types';

import {
  NotificationPageGetNotificationURL
} from '../URLS';

export const notificationPageGetNotifcations = ({ userToken, notificationPage }) => {
  // console.log('notificationPageGetNotifcations page called', notificationPage);
  const headers = {
    'Content-Type': 'application/json',
     Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: NOTIFICATION_PAGE_TOGGLE_NOTIFICATION_LOADING, payload: true });
    axios({
        method: 'get',
        url: NotificationPageGetNotificationURL,
        headers,
        params: { page: notificationPage }
        })
        .then((response) => {
            // console.log('notificationPageGetNotifcations resp', response.data);
            const { notifications } = response.data;
            dispatch({ type: NOTIFICATION_PAGE_UPDATE_NOTIFICATIONS, payload: notifications });
        })
        .catch((error) => {
            console.log('notificationPageGetNotifcations Actions Error ', error);
        })
        .finally(() => {
          dispatch({ type: NOTIFICATION_PAGE_TOGGLE_NOTIFICATION_LOADING, payload: false });
        });
  };
};
