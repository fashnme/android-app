import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Header, Avatar, Icon, Input, ButtonGroup, Overlay } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import {
  signupPageUpdateUsername,
  signupPageUpdateFullname,
  signupPageUpdateGender,
  accountSettingsUpdateBio,
  accountSettingsUpdateDateOfBirth,
  accountSettingsUpdateSocialMediaLinks,
  accountSettingsUpdateUserProfilePic,
  accountSettingsSaveProfileChanges,
  accountSettingGetAndSetUserData
} from '../../actions';


const MaleIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Image style={styles.genderIcon} source={{ uri: 'https://image.flaticon.com/icons/png/128/702/702023.png' }} />
      <Text style={styles.iconCaption}>Male</Text>
    </View>
  );
};
const FemaleIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Image style={styles.genderIcon} source={{ uri: 'https://image.flaticon.com/icons/png/128/145/145866.png' }} />
      <Text style={styles.iconCaption}>Female</Text>
    </View>
  );
};
const OthersIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Image style={styles.genderIcon} source={{ uri: 'https://image.flaticon.com/icons/png/128/1177/1177568.png' }} />
      <Text style={styles.iconCaption}>Rather Not Say</Text>
    </View>
  );
};

const genders = [
  {
    name: 'male',
    element: MaleIcon
  },
  {
    name: 'female',
    element: FemaleIcon
  },
  {
    name: 'others',
    element: OthersIcon
  }
];

class EditUserProfile extends Component {
  constructor() {
    super();
    this.state = {
      showDateTimePicker: false
    };
  }
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
     this.props.accountSettingGetAndSetUserData({ userToken, userId: personalUserId });
  }

  getFormattedDate(date) {
    const d = new Date(date).toDateString().split(' ');
    return `${d[1]} ${d[2]}, ${d[3]}`;
  }

  pickImage() {
    const { personalUserId } = this.props;
    const options = {
      title: 'Select Image/Video',
      mediaType: 'image',
      storageOptions: {
        skipBackup: true,
        noData: true,
        waitUntilSaved: true,
        cameraRoll: true
      },
    };
    ImagePicker.launchImageLibrary(options, response => { // Open Image Library:
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.props.selectImageFromLibraryVS(false);
      } else {
        this.props.accountSettingsUpdateUserProfilePic({ profilePic: response.uri, personalUserId });
        // TODO Call other user data fetchings required for Settings Screen
        // Eg. Fetch all the orders & Bids
      }
    });
  }

  renderUpdatingOverlay({ accountSettingLoader }) {
    return (
      <Overlay
        isVisible={accountSettingLoader}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="#fafafa"
      >
        <View style={{ justifyContent: 'center', flexDirection: 'column', flex: 1 }}>
          <ActivityIndicator size="large" />
          <Text style={{ alignSelf: 'center' }}>Updating Profile!</Text>
        </View>
      </Overlay>
    );
  }

  render() {
    const { userName, fullName, genderIndex, error, userToken, bio,
      dateOfBirth, socialMediaLinks, profilePic, oldUserName, accountSettingLoader } = this.props;
    // console.log({ userName, fullName, genderIndex, loading, error, userToken, bio, dateOfBirth, socialMediaLinks, personalUserId });
    const profileDetailsChanges = {
      dateOfBirth,
      userName,
      fullName,
      bio,
      socialMediaLinks,
      profilePic: '',
      userToken,
      gender: genders[genderIndex].name,
      oldUserName
    };
    const { youtube, twitter, instagram, facebook } = socialMediaLinks;
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'white'}
          leftComponent={{ icon: 'chevron-left', size: 30, onPress: () => Actions.pop() }}
          centerComponent={{ text: 'Edit Profile', style: { color: 'black', fontSize: 18, fontWeight: 'bold' } }}
          rightComponent={{
            text: 'Save',
            style: { color: '#007AFF', fontSize: 18 },
            onPress: () => this.props.accountSettingsSaveProfileChanges({ profileDetailsChanges })
          }}
          containerStyle={{ paddingTop: 0, height: 56 }}
        />
        <ScrollView>
          <View style={styles.body}>
            <Avatar
              rounded
              containerStyle={{ alignSelf: 'center', margin: 10 }}
              showEditButton
              editButton={{
                name: 'upload',
                type: 'feather',
                iconStyle: { padding: 3 },
                containerStyle: { backgroundColor: 'red', borderRadius: 20 },
                onPress: () => {
                  this.pickImage();
                }
              }}
              source={{ uri: profilePic }}
              size={110}
            />
            <Text style={{ fontWeight: 'bold', color: 'red' }}>{ error}</Text>
            <Input
                value={bio}
                onChangeText={(txt) => this.props.accountSettingsUpdateBio({ bio: txt })}
                placeholder="Bio"
                multiline
                numberOfLines={3}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={styles.textInputStyle}
                leftIcon={<Icon name="bio" type="material-community" />}
                leftIconContainerStyle={{ marginHorizontal: 20 }}
            />

            <Text style={{ fontSize: 16, }}>Social Handles</Text>
            <Input
                placeholder="Instagram Handle"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={styles.textInputStyle}
                leftIcon={<Image style={{ height: 25, width: 25 }} source={require('../../resources/icons/instagram.png')} />}
                leftIconContainerStyle={{ marginHorizontal: 20 }}
                value={instagram}
                onChangeText={(txt) => {
                  const newSocialObject = { name: 'instagram', profile: txt };
                  this.props.accountSettingsUpdateSocialMediaLinks({ socialMediaLinks, newSocialObject });
                }}
            />
            <Input
                placeholder="Facebook Id"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={styles.textInputStyle}
                leftIcon={<Image style={{ height: 25, width: 25 }} source={require('../../resources/icons/facebook.png')} />}
                leftIconContainerStyle={{ marginHorizontal: 20 }}
                value={facebook}
                onChangeText={(txt) => {
                  const newSocialObject = { name: 'facebook', profile: txt };
                  this.props.accountSettingsUpdateSocialMediaLinks({ socialMediaLinks, newSocialObject });
                }}
            />
            <Input
                placeholder="Twitter Handle"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={styles.textInputStyle}
                leftIcon={<Image style={{ height: 25, width: 25 }} source={require('../../resources/icons/twitter.png')} />}
                leftIconContainerStyle={{ marginHorizontal: 20 }}
                value={twitter}
                onChangeText={(txt) => {
                  const newSocialObject = { name: 'twitter', profile: txt };
                  this.props.accountSettingsUpdateSocialMediaLinks({ socialMediaLinks, newSocialObject });
                }}
            />
            <Input
                placeholder="YT Channel Name"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={styles.textInputStyle}
                leftIcon={<Image style={{ height: 25, width: 25 }} source={require('../../resources/icons/youtube.png')} />}
                leftIconContainerStyle={{ marginHorizontal: 20 }}
                value={youtube}
                onChangeText={(txt) => {
                  const newSocialObject = { name: 'youtube', profile: txt };
                  this.props.accountSettingsUpdateSocialMediaLinks({ socialMediaLinks, newSocialObject });
                }}
            />

            <Text style={{ fontSize: 16, }}>Profile Details</Text>
            <Input
              onChangeText={(txt) => this.props.signupPageUpdateUsername(txt)}
              value={userName}
              placeholder="Username"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={styles.textInputStyle}
              leftIcon={<Icon name="at" type="font-awesome" />}
              leftIconContainerStyle={{ marginHorizontal: 20 }}
            />
            <Input
              onChangeText={(txt) => this.props.signupPageUpdateFullname(txt)}
              value={fullName}
              placeholder="Full Name"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={styles.textInputStyle}
              leftIcon={<Icon name="user" type="font-awesome" />}
              leftIconContainerStyle={{ marginHorizontal: 20 }}
            />
            {
            this.state.showDateTimePicker
            &&
            <DateTimePicker
              onChange={(event, selectedDate) => {
                this.setState({ showDateTimePicker: false });
                console.log('selected dateOfBirth', event, selectedDate, this.state.showDateTimePicker);
                this.props.accountSettingsUpdateDateOfBirth({ dateOfBirth: selectedDate.toString() });
              }}
              value={new Date(dateOfBirth)}
            />
            }
            <Input
              value={this.getFormattedDate(dateOfBirth)}
              placeholder="Choose Date of Birth"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={styles.textInputStyle}
              rightIcon={<Icon name="calendar" type="font-awesome" onPress={() => this.setState({ showDateTimePicker: true })} />}
              disabled
              rightIconContainerStyle={{ marginHorizontal: 10 }}
            />

            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
              <ButtonGroup
                onPress={(index) => this.props.signupPageUpdateGender(genders[index].name)}
                selectedIndex={genderIndex}
                buttons={genders}
                containerStyle={styles.genderRow}
                buttonStyle={{ borderWidth: 0, }}
              />
            </View>
            {this.renderUpdatingOverlay({ accountSettingLoader })}
           </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    alignItems: 'center'
  },
  textInputStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    width: '90%',
    borderRadius: 20,
    elevation: 15,
    margin: 10,
  },
  genderRow: {
    height: 100,
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  iconContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  genderIcon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
});

const mapStateToProps = ({ signupPageState, personalPageState, accountSettingState }) => {
  const { userName, fullName, gender, error } = signupPageState;
  const { userToken, personalUserId, personalUserDetails } = personalPageState;
  const oldUserName = personalUserDetails.userName; // This is the Old User Name
  const { bio, dateOfBirth, socialMediaLinks, profilePic } = accountSettingState;
  const accountSettingLoader = accountSettingState.loading;
  let genderIndex = 0;
  if (gender === 'male') {
      genderIndex = 0;
  } else if (gender === 'female') {
      genderIndex = 1;
  } else {
      genderIndex = 2;
  }
  return { userName, fullName, genderIndex, error, userToken, bio, dateOfBirth, socialMediaLinks, profilePic, personalUserId, oldUserName, accountSettingLoader };
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
  accountSettingGetAndSetUserData
})(EditUserProfile);
