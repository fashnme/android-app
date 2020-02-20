import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  signupPageUpdateUsername as _signupPageUpdateUsername,
  signupPageUpdateFullname as _signupPageUpdateFullname,
  signupPageUpdateGender as _signupPageUpdateGender,
  signupPageSubmitUserDetails as _signupPageSubmitUserDetails
} from '../../actions';


// signupPageUpdateUsername(userName)
// signupPageUpdateFullname(fullName)
// signupPageUpdateGender(gender)
// signupPageSubmitUserDetails({ userName, fullName, gender, userToken })

const EnterDetailsPage = ({
  userName, fullName, gender, loading, error, userToken,
  signupPageUpdateUsername, signupPageUpdateFullname, signupPageUpdateGender, signupPageSubmitUserDetails
}) => {
  console.log('props', { userName, fullName, gender, loading, userToken, error });
  // console.log('actions', signupPageUpdateUsername, signupPageUpdateFullname, signupPageUpdateGender, signupPageSubmitUserDetails);


  return (
    <View>
      <Text> Enter Details Page </Text>
    </View>
  );
};

const mapStateToProps = ({ signupPageState, personalPageState }) => {
  const { userName, fullName, gender, loading, error } = signupPageState;
  const { userToken } = personalPageState;
  return { userName, fullName, gender, loading, error, userToken };
};

export default connect(mapStateToProps, {
  signupPageUpdateUsername: _signupPageUpdateUsername,
  signupPageUpdateFullname: _signupPageUpdateFullname,
  signupPageUpdateGender: _signupPageUpdateGender,
  signupPageSubmitUserDetails: _signupPageSubmitUserDetails
})(EnterDetailsPage);
