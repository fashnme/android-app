import {
  PERSONAL_PAGE_SET_USERTOKEN,
  PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID,
} from '../types';

const INITIAL_STATE = {
  userToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiWW1pU2ptOEJ1SklTRE0yLWN6NWoiLCJpYXQiOjE1ODMzMDk2Nzd9.3FJ-WP8Z-EWEl9z7dredlkEMUk2FiyBQmGr5aRdfxQA',
  personalUserId: 'PDo5gm8BMgKYZ1P4YhlZ', // Set this to empty in production
  personalUserDetails: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PERSONAL_PAGE_SET_USERTOKEN:
        return { ...state, userToken: action.payload };

      case PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID: {
        const { userId } = action.payload;
        return { ...state, personalUserDetails: action.payload, personalUserId: userId };
      }

      default:
          return state;
    }
};
