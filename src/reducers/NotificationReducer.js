import {
  NOTIFICATION_PAGE_UPDATE_NOTIFICATIONS
} from '../types';


const INITIAL_STATE = {
  notificationArray: [],
  notificationPage: 1
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case NOTIFICATION_PAGE_UPDATE_NOTIFICATIONS: {
        if (state.notificationPage === 1) {
          return { ...state, notificationArray: action.payload, notificationPage: 2 };
        }
        const newNotify = [...state.notificationArray, ...action.payload];
        return { ...state, notificationArray: newNotify, notificationPage: state.notificationPage + 1 };
      }

      default:
          return state;
    }
};
