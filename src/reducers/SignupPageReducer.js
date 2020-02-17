import {
  SIGNUP_PAGE_PHONE_UPDATE,
  SIGNUP_PAGE_OTP_UPDATE,
  SIGNUP_PAGE_REFERRER_UPDATE,
  SIGNUP_PAGE_TOGGLE_OTP_SENT,
  SIGNUP_PAGE_COUNTRY_CODE_UPDATE
} from '../types';

const INITIAL_STATE = {
  phoneNumber: '',
  otp: '',
  isOtpSent: false,
  referrerId: '',
  countryData: { name: 'India', callingCode: '91', countryCode: 'IN' }
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
      case SIGNUP_PAGE_COUNTRY_CODE_UPDATE: {
        const countryData = action.payload;
        return { ...state, countryData };
      }
      default:
          return state;
    }
};
