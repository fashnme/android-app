import {
  PERSONAL_PAGE_SET_USERTOKEN,
  PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID,
} from '../types';

const INITIAL_STATE = {
  userToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiUERvNWdtOEJNZ0tZWjFQNFlobFoiLCJpYXQiOjE1Nzg0ODgzODF9.f_0FHHWMZ1Javvvmtl72yO5m_1pICYjggYZA0-ccFQM',
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
