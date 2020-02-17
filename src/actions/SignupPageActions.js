import axios from 'axios';

import {
  SIGNUP_PAGE_PHONE_UPDATE,
  SIGNUP_PAGE_OTP_UPDATE,
  SIGNUP_PAGE_REFERRER_UPDATE,
  SIGNUP_PAGE_TOGGLE_OTP_SENT,
  SIGNUP_PAGE_COUNTRY_CODE_UPDATE
} from '../types';

import {

} from '../URLS';

export const signupPagePhoneUpdate = (phone) => {
  return {
    type: SIGNUP_PAGE_PHONE_UPDATE,
    payload: phone
  };
};

export const signupPageOTPUpdate = (otp) => {
  return {
    type: SIGNUP_PAGE_OTP_UPDATE,
    payload: otp
  };
};

export const signupPageReferrerUpdate = (referrerId) => {
  return {
    type: SIGNUP_PAGE_REFERRER_UPDATE,
    payload: referrerId
  };
};

export const signupPageToggleOtpSent = (isSent) => {
  return {
    type: SIGNUP_PAGE_TOGGLE_OTP_SENT,
    payload: isSent
  };
};

export const signupPageSendOTP = (phone) => {
  console.log('signupPageSendOTP', phone);
  return (dispatch) => {
    dispatch({ type: SIGNUP_PAGE_TOGGLE_OTP_SENT, payload: true });
  };
};

export const signupPageVerifyOTP = (phone, otp) => {
  console.log('signupPageVerifyOTP', phone, otp);
  return (dispatch) => {
    dispatch({ type: SIGNUP_PAGE_TOGGLE_OTP_SENT, payload: true });
  };
};

export const signupPageCountryCodeUpdate = ({ name, callingCode, countryCode }) => {
  return {
    type: SIGNUP_PAGE_COUNTRY_CODE_UPDATE,
    payload: { name, callingCode, countryCode }
  };
};
