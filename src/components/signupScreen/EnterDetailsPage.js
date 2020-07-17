import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Input, ButtonGroup, Image, Button, Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
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
      <Image style={styles.genderIcon} source={{ uri: 'https://image.flaticon.com/icons/png/128/3101/3101021.png' }} />
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

const UserInputBox = ({ placeholder, iconName, iconType, errorMessage, name, valueName, changeAction, inputStyle }) => {
  return (
    <Input
      value={valueName}
      onChangeText={(txt) => changeAction(txt)}
      placeholder={placeholder}
      inputContainerStyle={{ borderBottomWidth: 0 }}
      containerStyle={styles.textInputStyle}
      inputStyle={inputStyle}
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
  const [referralCode, setReferralCode] = useState('');
  // console.log('props', { userName, fullName, genderIndex, loading, userToken, error });
  // console.log('actions', signupPageUpdateUsername, signupPageUpdateFullname, signupPageUpdateGender, signupPageSubmitUserDetails);
  return (
    <View style={{ flex: 1, backgroundColor: '#FF416C' }}>
        <Header
          backgroundColor={'#FF4B2B'}
          placement={'center'}
          centerComponent={{ text: 'Join Now', style: { fontSize: 24, color: 'white', fontWeight: 'bold' } }}
          containerStyle={{ paddingTop: 0, height: 46, margin: 0, borderWidth: 0 }}
        />
        <ScrollView style={{ backgroundColor: '#FF416C' }}>
        <LinearGradient colors={['#FF4B2B', '#FF416C']} style={styles.body}>
            <UserInputBox
              name="username"
              errorMessage={error}
              placeholder="Username"
              iconName="at"
              inputStyle={{ fontWeight: 'bold', opacity: 0.6 }}
              iconType="font-awesome"
              valueName={userName}
              changeAction={(txt) => signupPageUpdateUsername(txt)}
            />
            <UserInputBox
              name="fullname"
              placeholder="Full Name"
              iconName="user"
              iconType="font-awesome"
              inputStyle={{}}
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

            <UserInputBox
              name="fullname"
              placeholder="Referral Code (optional)"
              iconName="user-plus"
              iconType="font-awesome"
              inputStyle={{ fontWeight: 'bold', color: '#006400' }}
              valueName={referralCode}
              changeAction={(txt) => setReferralCode(txt)}
            />
            <Button
              loading={loading}
              title="Continue"
              loadingProps={{ color: '#FF7F50' }}
              loadingStyle={{ borderColor: 'orange' }}
              titleStyle={{ color: '#FF4500', fontSize: 20, fontWeight: 'bold' }}
              buttonStyle={{ backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 20, marginTop: 30, elevation: 15, marginBottom: 70 }}
              onPress={() => {
                signupPageSubmitUserDetails({ userName, fullName, gender: genders[genderIndex].name, userToken, referralCode });
              }}
            />
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
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
    height: 150,
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center'
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
