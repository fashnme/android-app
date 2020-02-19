import {
  SIGNUP_PAGE_PHONE_UPDATE,
  SIGNUP_PAGE_OTP_UPDATE,
  SIGNUP_PAGE_REFERRER_UPDATE,
  SIGNUP_PAGE_TOGGLE_OTP_SENT,
  SIGNUP_PAGE_COUNTRY_CODE_UPDATE,
  SIGNUP_PAGE_ERROR_UPDATE,
  SIGNUP_PAGE_TOGGLE_LOADING,
  SIGNUP_PAGE_USERNAME_UPDATE,
  SIGNUP_PAGE_FULLNAME_UPDATE,
  SIGNUP_PAGE_GENDER_UPDATE
} from '../types';

const INITIAL_STATE = {
  phoneNumber: '',
  otp: '',
  isOtpSent: false,
  referrerId: '',
  error: '',
  loading: false,
  countryData: { name: 'India', callingCode: '91', countryCode: 'IN' },
  // User Details
  userName: '',
  fullName: '',
  gender: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SIGNUP_PAGE_PHONE_UPDATE:
        return { ...state, phoneNumber: action.payload, error: '' };
      case SIGNUP_PAGE_OTP_UPDATE:
        return { ...state, otp: action.payload, error: '' };
      case SIGNUP_PAGE_REFERRER_UPDATE:
        return { ...state, referrerId: action.payload };
      case SIGNUP_PAGE_TOGGLE_OTP_SENT:
        return { ...state, isOtpSent: action.payload };
      case SIGNUP_PAGE_ERROR_UPDATE:
        return { ...state, error: action.payload };
      case SIGNUP_PAGE_TOGGLE_LOADING:
        return { ...state, loading: action.payload };
      case SIGNUP_PAGE_COUNTRY_CODE_UPDATE: {
        const countryData = action.payload;
        return { ...state, countryData };
      }

      case SIGNUP_PAGE_USERNAME_UPDATE:
        return { ...state, userName: action.payload };
      case SIGNUP_PAGE_FULLNAME_UPDATE:
        return { ...state, fullName: action.payload };
      case SIGNUP_PAGE_GENDER_UPDATE:
        return { ...state, gender: action.payload };

      default:
          return state;
    }
};
