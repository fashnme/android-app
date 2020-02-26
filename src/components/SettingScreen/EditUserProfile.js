import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Header, Avatar, Icon, Input, ButtonGroup } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
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
   this.props.celebrityPageVisitAndSetData({ userToken, userId: personalUserId, isPersonalPage: false });
  }
  pickImage() {
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
        const { path } = response;
        this.accountSettingsUpdateUserProfilePic(response.uri);
        // if (mediaType === 'image') {
        //   this.props.uploadPageUpdateSelectedImagePath(`${response.uri}`);
        //   this.props.uploadPageToggleIsSelected(true);
        //   return;
        // }
      }
    });
  }

  render() {
    const { userName, fullName, genderIndex, loading, error, userToken, bio, dateOfBirth, socialMediaLinks, personalUserId } = this.props;
    console.log({ userName, fullName, genderIndex, loading, error, userToken, bio, dateOfBirth, socialMediaLinks, personalUserId });

    return (
      <View style={styles.container}>
        <ScrollView>
          <Header
            leftComponent={{ icon: 'chevron-left', size: 30 }}
            centerComponent={{ text: 'Edit Profile', style: { color: 'black', fontSize: 18, fontWeight: 'bold' } }}
            rightComponent={{ 
              text: 'Save', 
              style: { color: 'blue', fontSize: 18 },
              onPress: () => this.props.accountSettingsSaveProfileChanges(dateOfBirth, userName, fullName, bio, socialMediaLinks, profilePic, userToken, genders[genderIndex].name)
            }}
            containerStyle={{
              backgroundColor: 'white',
              justifyContent: 'space-around',
            }}
          />
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
              source={{ uri: 'https://pbs.twimg.com/media/EGsDw7nUYAUkiEn.jpg' }} 
              
              size={110}
            />
            
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
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
              <ButtonGroup
                onPress={(index) => this.props.signupPageUpdateGender(genders[index].name)}
                selectedIndex={genderIndex}
                buttons={genders}
                containerStyle={styles.genderRow}
                buttonStyle={{ borderWidth: 0, }}
              />
            </View>
            {
            this.state.showDateTimePicker 
            && 
            <DateTimePicker
              onChange={(event, selectedDate) => console.log(selectedDate.toString())}
              value={new Date(1598051730000)} 
            />
            }
            <Text 
              style={{ color: 'blue', fontSize: 16, }}
              onPress={() => this.setState({ showDateTimePicker: true })}
            >
                {dateOfBirth != null ? 'Choose Date of Birth' : `Change DOB: ${dateOfBirth}`}
            </Text>
            <Input
                value={bio}
                onChangeText={(txt) => this.props.accountSettingsUpdateBio(txt)}
                placeholder="Bio"
                multiline
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
                leftIcon={<Image style={{ height: 25, width: 25 }} source={{ uri: 'https://image.flaticon.com/icons/png/128/1384/1384063.png' }} />}
                leftIconContainerStyle={{ marginHorizontal: 20 }}
            />
            <Input
                placeholder="Youtube Handle"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={styles.textInputStyle}
                leftIcon={<Image style={{ height: 25, width: 25 }} source={{ uri: 'https://image.flaticon.com/icons/png/128/1384/1384060.png' }} />}
                leftIconContainerStyle={{ marginHorizontal: 20 }}
            />
            <Input
                placeholder="Tiktok Handle"
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={styles.textInputStyle}
                leftIcon={<Image style={{ height: 25, width: 25 }} source={{ uri: 'https://image.flaticon.com/icons/png/128/2504/2504942.png' }} />}
                leftIconContainerStyle={{ marginHorizontal: 20 }}
            />
           </View>
        </ScrollView>
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
