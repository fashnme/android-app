import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Input, ButtonGroup, Image, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import {
  signupPageUpdateUsername as _signupPageUpdateUsername,
  signupPageUpdateFullname as _signupPageUpdateFullname,
  signupPageUpdateGender as _signupPageUpdateGender,
  signupPageSubmitUserDetails as _signupPageSubmitUserDetails
} from '../../actions';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// signupPageUpdateUsername(userName)
// signupPageUpdateFullname(fullName)
// signupPageUpdateGender(gender)
// signupPageSubmitUserDetails({ userName, fullName, gender, userToken })

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

const UserInputBox = ({ placeholder, iconName, iconType, errorMessage, name, valueName, changeAction }) => {
  return (
    <Input
      value={valueName}
      onChangeText={(txt) => changeAction(txt)}
      placeholder={placeholder}
      inputContainerStyle={{ borderBottomWidth: 0 }}
      containerStyle={styles.textInputStyle}
      leftIcon={<Icon name={iconName} type={iconType} />}
      leftIconContainerStyle={{ marginHorizontal: 20 }}
      errorMessage={name === 'username' ? errorMessage : ''}
      errorStyle={{ fontWeight: 'bold' }}
    />
  );
};


const EnterDetailsPage = ({
  userName, fullName, genderIndex, loading, error, userToken,
  signupPageUpdateUsername, signupPageUpdateFullname, signupPageUpdateGender, signupPageSubmitUserDetails
  }) => {
  // console.log('props', { userName, fullName, genderIndex, loading, userToken, error });
  // console.log('actions', signupPageUpdateUsername, signupPageUpdateFullname, signupPageUpdateGender, signupPageSubmitUserDetails);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}> Create account </Text>
          </View>
        </View>
        <LinearGradient colors={['#FF7F50', '#FF8C00', '#FF4500']} style={styles.body}>
          <View style={{ paddingTop: 100, width: '100%', alignItems: 'center' }}>
            <UserInputBox
              name="username"
              errorMessage={error}
              placeholder="Username"
              iconName="at"
              iconType="font-awesome"
              valueName={userName}
              changeAction={(txt) => signupPageUpdateUsername(txt)}
            />
            <UserInputBox
              name="fullname"
              placeholder="Full Name"
              iconName="user"
              iconType="font-awesome"
              valueName={fullName}
              changeAction={(txt) => signupPageUpdateFullname(txt)}
            />

            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', paddingHorizontal: 30 }}>Gender: </Text>
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
              <ButtonGroup
                onPress={(index) => signupPageUpdateGender(genders[index].name)}
                selectedIndex={genderIndex}
                buttons={genders}
                containerStyle={styles.genderRow}
                buttonStyle={{ borderWidth: 0, }}
              />
            </View>
            <Button
              loading={loading}
              title="Continue"
              titleStyle={{ color: '#FF4500', fontSize: 20, fontWeight: 'bold' }}
              buttonStyle={{ backgroundColor: 'white', borderRadius: 30, paddingHorizontal: 20, marginTop: 30, elevation: 15, }}
              onPress={() => {
                signupPageSubmitUserDetails(userName, fullName, genders[genderIndex].name, userToken);
              }}
            />
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: 'white'
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 3,
    marginTop: 20,
    alignItems: 'center',
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
  iconCaption: {
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

const mapStateToProps = ({ signupPageState, personalPageState }) => {
  const { userName, fullName, gender, loading, error } = signupPageState;
  const { userToken } = personalPageState;
  let genderIndex = 0;
  if (gender === 'male') {
      genderIndex = 0;
  } else if (gender === 'female') {
      genderIndex = 1;
  } else {
      genderIndex = 2;
  }
  return { userName, fullName, genderIndex, loading, error, userToken };
};

export default connect(mapStateToProps, {
  signupPageUpdateUsername: _signupPageUpdateUsername,
  signupPageUpdateFullname: _signupPageUpdateFullname,
  signupPageUpdateGender: _signupPageUpdateGender,
  signupPageSubmitUserDetails: _signupPageSubmitUserDetails
})(EnterDetailsPage);
