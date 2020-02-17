import {
  SIGNUP_PAGE_PHONE_UPDATE,
  SIGNUP_PAGE_OTP_UPDATE,
  SIGNUP_PAGE_REFERRER_UPDATE,
  SIGNUP_PAGE_TOGGLE_OTP_SENT
} from '../types';

const INITIAL_STATE = {
  phoneNumber: '',
  otp: '',
  isOtpSent: false,
  referrerId: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SIGNUP_PAGE_PHONE_UPDATE:
        return { ...state, phoneNumber: action.payload };
      case SIGNUP_PAGE_OTP_UPDATE:
        return { ...state, otp: action.payload };
      case SIGNUP_PAGE_REFERRER_UPDATE:
        return { ...state, referrerId: action.payload };
      case SIGNUP_PAGE_TOGGLE_OTP_SENT:
        return { ...state, isOtpSent: action.payload };
      default:
          return state;
    }
};
