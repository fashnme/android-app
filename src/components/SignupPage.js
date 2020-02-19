import React from 'react';
import { connect } from 'react-redux';
import EnterPhoneNumberScreen from './signupScreen/EnterPhoneNumberScreen';
import EnterOTPScreen from './signupScreen/EnterOTPScreen';

const SignupPage = ({ isOtpSent }) => {
    return isOtpSent ? <EnterOTPScreen /> : <EnterPhoneNumberScreen />;
};

const mapStateToProps = ({ signupPageState }) => {
  const { isOtpSent } = signupPageState;
  return { isOtpSent };
};

export default connect(mapStateToProps)(SignupPage);
