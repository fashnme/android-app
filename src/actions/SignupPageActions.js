import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { homePageFetchUserColdStartDetails } from './HomePageActions';
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
  SIGNUP_PAGE_GENDER_UPDATE,
  PERSONAL_PAGE_SET_USERTOKEN,
  REFERRAL_PAGE_REFERRER_DATA_UPDATE,
  ASYNCSTORAGE_USER_TOKEN_NAME,
  ASYNCSTORAGE_USER_USER_NAME
} from '../types';

import {
  SignupPageSendOtpURL,
  SignupPageVerifyOtpURL,
  SignupPageSubmitUserDetailsURL
} from '../URLS';

export const signupPagePhoneUpdate = (phone) => {
  return { type: SIGNUP_PAGE_PHONE_UPDATE, payload: phone };
};

export const signupPageOTPUpdate = (otp) => {
  return { type: SIGNUP_PAGE_OTP_UPDATE, payload: otp };
};

export const signupPageSetReferrerData = ({ referrerId, newUser }) => {
  return { type: REFERRAL_PAGE_REFERRER_DATA_UPDATE, payload: { referrerId, newUser } };
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

export const signupPageUserTokenUpdate = (userToken) => {
  return { type: PERSONAL_PAGE_SET_USERTOKEN, payload: userToken };
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
          .then(() => {
              // console.log('signupPageSendOTP OTP Sent', response);
          })
          .catch((error) => {
              console.log('signupPageSendOTP Error', error);
              dispatch({ type: SIGNUP_PAGE_ERROR_UPDATE, payload: 'Problem in sending OTP, Please try after some time' });
        });
    } else {
      dispatch({ type: SIGNUP_PAGE_ERROR_UPDATE, payload: 'Please enter a 10 Digit Phone Number' });
    }
  };
};

// Action to Verify OTP sent on Phone
export const signupPageVerifyOTP = (phone, otp, callingCode) => {
  // console.log('signupPageVerifyOTP', phone, otp, callingCode);
  return (dispatch) => {
    dispatch({ type: SIGNUP_PAGE_TOGGLE_LOADING, payload: true });
    axios({
          method: 'post',
          url: SignupPageVerifyOtpURL,
          data: { phoneNo: `${callingCode}${phone}`, otp },
          headers: { 'Content-Type': 'application/json' }
          })
          .then((response) => {
            // console.log('signupPageVerifyOTP response', response);
            const userToken = `Bearer ${response.data.jwt}`;
            dispatch({ type: PERSONAL_PAGE_SET_USERTOKEN, payload: userToken });
            setUserToken(userToken);
            if (response.data.user === null) {
              Actions.enterDetailsPage();
              setUserName('');
            } else {
              Actions.tabBar();
              setUserName('Already a User');
              dispatch(homePageFetchUserColdStartDetails({ userToken }));
              // console.log('signupPageVerifyOTP Set all the User details', response);
            }
          })
          .catch((error) => {
              //handle error
              console.log('signupPageVerifyOTP Error', error);
              dispatch({ type: SIGNUP_PAGE_ERROR_UPDATE, payload: 'Please Enter Correct OTP or Try Later' });
        })
        .finally(() => {
          dispatch({ type: SIGNUP_PAGE_TOGGLE_LOADING, payload: false });
        });
  };
};

const setUserName = (userName) => {
  AsyncStorage.setItem(ASYNCSTORAGE_USER_USER_NAME, userName);
};

const setUserToken = (jwt) => {
  AsyncStorage.setItem(ASYNCSTORAGE_USER_TOKEN_NAME, jwt);
  console.log('Phone JWT STORED', jwt);
};


// Action to set Users Details on First Time Signup
export const signupPageSubmitUserDetails = ({ userName, fullName, gender, userToken, referralCode }) => {
  // console.log('signupPageSubmitUserDetails', { userName, fullName, gender, userToken, referralCode });
  return (dispatch) => {
    dispatch({ type: SIGNUP_PAGE_TOGGLE_LOADING, payload: true });
    axios({
        method: 'post',
        url: SignupPageSubmitUserDetailsURL,
        data: { userName, fullName, gender, referralCode },
        headers: { 'Content-Type': 'application/json', Authorization: userToken }
        })
        .then((response) => {
            // console.log('signupPageSubmitUserDetails', response);
            if (response.status === 200) {
              const jwt = `Bearer ${response.data.jwt}`;
              dispatch({ type: PERSONAL_PAGE_SET_USERTOKEN, payload: jwt });
              setUserToken(jwt);
              Actions.tabBar();
              setUserName(userName);
            }
        })
        .catch((error) => {
            console.log('signupPageSubmitUserDetails Error', error);
            const errorMessage = error.response.data;
            if (errorMessage.length <= 40) {
              dispatch({ type: SIGNUP_PAGE_ERROR_UPDATE, payload: errorMessage });
            } else {
              dispatch({ type: SIGNUP_PAGE_ERROR_UPDATE, payload: 'Problem in Creating User, Please try after some time' });
            }
        })
        .finally(() => {
          dispatch({ type: SIGNUP_PAGE_TOGGLE_LOADING, payload: false });
        });
  };
};
