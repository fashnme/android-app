import {
  NOTIFICATION_PAGE_UPDATE_NOTIFICATIONS,
  NOTIFICATION_PAGE_TOGGLE_NOTIFICATION_LOADING,
  NOTIFICATION_PAGE_RESET_DATA
} from '../types';


const INITIAL_STATE = {
  notificationArray: [],
  notificationPage: 1,
  notificationLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case NOTIFICATION_PAGE_UPDATE_NOTIFICATIONS: {
        if (state.notificationPage === 1) {
          return { ...state, notificationArray: action.payload, notificationPage: 2 };
        }
        const newNotify = [...state.notificationArray, ...action.payload];
        const result = Array.from(new Set(newNotify.map(s => s.notificationId)))
                          .map(notificationId => {
                                return newNotify.find(s => s.notificationId === notificationId);
                            }
                          );
        return { ...state, notificationArray: result, notificationPage: state.notificationPage + 1, notificationLoading: false };
      }

    case NOTIFICATION_PAGE_TOGGLE_NOTIFICATION_LOADING:
      return { ...state, notificationLoading: action.payload };

    case NOTIFICATION_PAGE_RESET_DATA: {
      return { ...state, ...INITIAL_STATE };
    }
    
    default:
        return state;
  }
};
