import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import EnterPhoneNumberScreen from './signupScreen/EnterPhoneNumberScreen';
import EnterOTPScreen from './signupScreen/EnterOTPScreen';

const SignupPage = ({ isOtpSent }) => {
    const backAction = () => {
      return true;
    };
    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    return isOtpSent ? <EnterOTPScreen /> : <EnterPhoneNumberScreen />;
};


const mapStateToProps = ({ signupPageState }) => {
  const { isOtpSent } = signupPageState;
  return { isOtpSent };
};

export default connect(mapStateToProps)(SignupPage);
