import axios from 'axios';

import {
  NOTIFICATION_PAGE_UPDATE_NOTIFICATIONS
} from '../types';

import {
  NotificationPageGetNotificationURL
} from '../URLS';

export const notificationPageGetNotifcations = ({ userToken, notificationPage }) => {
  const headers = {
    'Content-Type': 'application/json',
     Authorization: userToken
  };
  return (dispatch) => {
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
      });
  };
};
