import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnterPhoneNumberScreen from './signupPage/EnterPhoneNumberScreen';
import EnterOTPScreen from './signupPage/EnterOTPScreen';
import {
  signupPagePhoneUpdate,
  signupPageOTPUpdate,
  signupPageReferrerUpdate,
  signupPageToggleOtpSent,
  signupPageSendOTP,
  signupPageVerifyOTP,
  signupPageCountryCodeUpdate
} from '../actions';

class SignupPage extends Component {
  render() {
    return (
    this.props.isOtpSent ? <EnterOTPScreen /> : <EnterPhoneNumberScreen />
    );
  }
}

const mapStateToProps = ({ signupPageState }) => {
    const { phoneNumber, otp, isOtpSent, referrerId, countryData } = signupPageState;
    return { phoneNumber, otp, isOtpSent, referrerId, countryData };
};

export default connect(mapStateToProps, {
  signupPagePhoneUpdate,
  signupPageOTPUpdate,
  signupPageReferrerUpdate,
  signupPageToggleOtpSent,
  signupPageSendOTP,
  signupPageVerifyOTP,
  signupPageCountryCodeUpdate
})(SignupPage);
