import {
  REFERRAL_PAGE_REFERRER_DATA_UPDATE,
} from '../types';

const INITIAL_STATE = {
  referrerId: '', // Referred By
  newUser: false, // Whether downloading first time or not
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case REFERRAL_PAGE_REFERRER_DATA_UPDATE: {
        const { referrerId, newUser } = action.payload;
        return { ...state, referrerId, newUser };
      }

      default:
          return state;
    }
};
