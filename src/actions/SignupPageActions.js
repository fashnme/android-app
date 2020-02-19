import axios from 'axios';
import { Actions } from 'react-native-router-flux';
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

import {
  SignupPageSendOtpURL,
  SignupPageVerifyOtpURL
} from '../URLS';

export const signupPagePhoneUpdate = (phone) => {
  return { type: SIGNUP_PAGE_PHONE_UPDATE, payload: phone };
};

export const signupPageOTPUpdate = (otp) => {
  return { type: SIGNUP_PAGE_OTP_UPDATE, payload: otp };
};

export const signupPageReferrerUpdate = (referrerId) => {
  return { type: SIGNUP_PAGE_REFERRER_UPDATE, payload: referrerId };
};

export const signupPageToggleOtpSent = (isSent) => {
  return { type: SIGNUP_PAGE_TOGGLE_OTP_SENT, payload: isSent };
};

export const signupPageCountryCodeUpdate = ({ name, callingCode, countryCode }) => {
  return { type: SIGNUP_PAGE_COUNTRY_CODE_UPDATE, payload: { name, callingCode, countryCode } };
};

export const signupPageUpdateUsername = (userName) => {
  return { type: SIGNUP_PAGE_USERNAME_UPDATE, payload: userName };
};

export const signupPageUpdateFullname = (fullName) => {
  return { type: SIGNUP_PAGE_FULLNAME_UPDATE, payload: fullName };
};

export const signupPageUpdateGender = (gender) => {
  return { type: SIGNUP_PAGE_GENDER_UPDATE, payload: gender };
};

// Action to Send OTP on phone Number
export const signupPageSendOTP = (phone, callingCode) => {
  return (dispatch) => {
    if (phone.match(/^\d{10}$/)) {
      dispatch({ type: SIGNUP_PAGE_TOGGLE_OTP_SENT, payload: true });
      axios({
          method: 'post',
          url: SignupPageSendOtpURL,
          data: { phoneNo: `${callingCode}${phone}` },
          headers: { 'Content-Type': 'application/json' }
          })
          .then((response) => {
              console.log('signupPageSendOTP OTP Sent', response);
          })
          .catch((error) => {
              console.log('signupPageSendOTP Error', error);
              dispatch({ type: SIGNUP_PAGE_ERROR_UPDATE, payload: 'Problem in sending OTP, Please try after some time' });
        });
    } else {
      dispatch({ type: SIGNUP_PAGE_ERROR_UPDATE, payload: 'Please enter Phone Number in correct format' });
    }
  };
};

// Action to Verify OTP sent on Phone
export const signupPageVerifyOTP = (phone, otp, callingCode) => {
  console.log('signupPageVerifyOTP', phone, otp, callingCode);
  return (dispatch) => {
    dispatch({ type: SIGNUP_PAGE_TOGGLE_LOADING, payload: true });
    axios({
          method: 'post',
          url: SignupPageVerifyOtpURL,
          data: { phoneNo: `${callingCode}${phone}`, otp },
          headers: { 'Content-Type': 'application/json' }
          })
          .then((response) => {
            console.log('signupPageVerifyOTP response', response);
            if (response.data.user === null) {
              console.log('New User Encountered');
              Actions.enterDetailsPage();
            } else {
              // Actions.home();
              console.log('signupPageVerifyOTP Set all the User details', response);
            }
            dispatch({ type: SIGNUP_PAGE_TOGGLE_LOADING, payload: false });
          })
          .catch((error) => {
              //handle error
              console.log('signupPageVerifyOTP Error', error.response);
              dispatch({ type: SIGNUP_PAGE_ERROR_UPDATE, payload: 'Problem in verifying OTP, Please try after some time' });
        });
  };
};

// Action to set Users Details on First Time Signup
export const signupPageSubmitUserDetails = ({ userName, fullName, gender }) => {
  console.log('signupPageSubmitUserDetails', { userName, fullName, gender });
  return { type: 'signupPageSubmitUserDetails' };
};
