import {
  PERSONAL_PAGE_SET_USERTOKEN
} from '../types';

const INITIAL_STATE = {
  userToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiUERvNWdtOEJNZ0tZWjFQNFlobFoiLCJpYXQiOjE1Nzg0ODgzODF9.f_0FHHWMZ1Javvvmtl72yO5m_1pICYjggYZA0-ccFQM',
  personalUserId: 'b5ItMP'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PERSONAL_PAGE_SET_USERTOKEN:
        return { ...state, userToken: action.payload };
      default:
          return state;
    }
};
