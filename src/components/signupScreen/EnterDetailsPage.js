import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  signupPageUpdateUsername as _signupPageUpdateUsername,
  signupPageUpdateFullname as _signupPageUpdateFullname,
  signupPageUpdateGender as _signupPageUpdateGender,
  signupPageSubmitUserDetails as _signupPageSubmitUserDetails
} from '../../actions';

const EnterDetailsPage = ({
  userName, fullName, gender, loading,
  signupPageUpdateUsername, signupPageUpdateFullname, signupPageUpdateGender, signupPageSubmitUserDetails
}) => {
  console.log('props', { userName, fullName, gender, loading });
  console.log('actions', signupPageUpdateUsername, signupPageUpdateFullname, signupPageUpdateGender, signupPageSubmitUserDetails);


  return (
    <View>
      <Text> Enter Details Page </Text>
    </View>
  );
};

const mapStateToProps = ({ signupPageState }) => {
  const { userName, fullName, gender, loading } = signupPageState;
  return { userName, fullName, gender, loading };
};

export default connect(mapStateToProps, {
  signupPageUpdateUsername: _signupPageUpdateUsername,
  signupPageUpdateFullname: _signupPageUpdateFullname,
  signupPageUpdateGender: _signupPageUpdateGender,
  signupPageSubmitUserDetails: _signupPageSubmitUserDetails
})(EnterDetailsPage);
