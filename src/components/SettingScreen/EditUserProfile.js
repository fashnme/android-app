import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  signupPageUpdateUsername,
  signupPageUpdateFullname,
  signupPageUpdateGender,
  accountSettingsUpdateBio,
  accountSettingsUpdateDateOfBirth,
  accountSettingsUpdateSocialMediaLinks,
  accountSettingsUpdateUserProfilePic,
  accountSettingsSaveProfileChanges,
  celebrityPageVisitAndSetData
} from '../../actions';

class EditUserProfile extends Component {
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction();
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }
  onFocusFunction() {
   const { personalUserId, userToken } = this.props;
   this.props.celebrityPageVisitAndSetData({ userToken, userId: personalUserId, isPersonalPage: false });
  }


  
  render() {
    const { userName, fullName, genderIndex, loading, error, userToken, bio, dateOfBirth, socialMediaLinks, personalUserId } = this.props;
    console.log({ userName, fullName, genderIndex, loading, error, userToken, bio, dateOfBirth, socialMediaLinks, personalUserId });
    return (
      <View>
        <Text> Edit User Profile Page </Text>
      </View>
    );
  }
}

const mapStateToProps = ({ signupPageState, personalPageState, accountSettingState }) => {
  const { userName, fullName, gender, loading, error } = signupPageState;
  const { userToken, personalUserId } = personalPageState;
  const { bio, dateOfBirth, socialMediaLinks } = accountSettingState;
  let genderIndex = 0;
  if (gender === 'male') {
      genderIndex = 0;
  } else if (gender === 'female') {
      genderIndex = 1;
  } else {
      genderIndex = 2;
  }
  return { userName, fullName, genderIndex, loading, error, userToken, bio, dateOfBirth, socialMediaLinks, personalUserId };
};
export default connect(mapStateToProps, {
  signupPageUpdateUsername,
  signupPageUpdateFullname,
  signupPageUpdateGender,
  accountSettingsUpdateBio,
  accountSettingsUpdateDateOfBirth,
  accountSettingsUpdateSocialMediaLinks,
  accountSettingsUpdateUserProfilePic,
  accountSettingsSaveProfileChanges,
  celebrityPageVisitAndSetData
})(EditUserProfile);
