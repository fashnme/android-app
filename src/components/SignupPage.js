import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import {
  signupPagePhoneUpdate,
  signupPageOTPUpdate,
  signupPageReferrerUpdate,
  signupPageToggleOtpSent,
  signupPageSendOTP,
  signupPageVerifyOTP
} from '../actions';
// const height = Dimensions.get('window').height + StatusBar.currentHeight;


class SignupPage extends Component {
  render() {
    return (
      <View>
        <Text> SignupPage </Text>
      </View>
    );
  }
}


const mapStateToProps = ({ signupPageState }) => {
    const { phoneNumber, otp, isOtpSent, referrerId } = signupPageState;
    return { phoneNumber, otp, isOtpSent, referrerId };
};

export default connect(mapStateToProps, {
  signupPagePhoneUpdate,
  signupPageOTPUpdate,
  signupPageReferrerUpdate,
  signupPageToggleOtpSent,
  signupPageSendOTP,
  signupPageVerifyOTP
})(SignupPage);
