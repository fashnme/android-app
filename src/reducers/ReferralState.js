import {
  REFERRAL_PAGE_REFERRER_DATA_UPDATE,
} from '../types';

const INITIAL_STATE = {
  referrerId: '', // Referred By
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case REFERRAL_PAGE_REFERRER_DATA_UPDATE: {
        const { referrerId } = action.payload;
        return { ...state, referrerId };
      }

      default:
          return state;
    }
};
