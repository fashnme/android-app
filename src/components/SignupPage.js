import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import CountryPicker from 'react-native-country-picker-modal';

import { Input, Icon, Button } from 'react-native-elements';
import {
  signupPagePhoneUpdate,
  signupPageOTPUpdate,
  signupPageReferrerUpdate,
  signupPageToggleOtpSent,
  signupPageSendOTP,
  signupPageVerifyOTP,
  signupPageCountryCodeUpdate
} from '../actions';
import { ScrollView } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class SignupPage extends Component {
  render() {
    const { countryCode, name, callingCode } = this.props.countryData;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}> OTP Verification </Text>
          </View>
          <View style={styles.bodyIcon}>
            <Image style={styles.icon} source={require('../resources/icons/mail.png')} />
            <Text style={{ color: '#C71585', fontSize: 18, fontWeight: 'bold' }}>Enter your mobile number</Text>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>We will send you a OTP Message.</Text>
          </View>
          <LinearGradient colors={['#FF7F50', '#FF8C00', '#FF4500']} style={styles.body}>
            <View style={styles.topCropper} />
            <View style={styles.bodyForm}>
                <View style={styles.phoneNumberField}>
                  <View style={{ alignItems: 'center', flexDirection: 'row', marginHorizontal: 10, justifyContent: 'center' }}>      
                    <CountryPicker
                      containerButtonStyle={{ backgroundColor: 'white', borderRadius: 20, height: 40, width: 40, padding: 5, justifyContent: 'center', alignItems: 'center' }}
                      withCallingCode 
                      countryCode={countryCode} 
                      onSelect={(data) => this.props.signupPageCountryCodeUpdate({ countryCode: data.cca2, name: data.name, callingCode: data.callingCode[0] })}
                    />
                  </View>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}>(+{callingCode}) {name}</Text>    
                </View>
                <Input
                  containerStyle={{ paddingHorizontal: 50, marginTop: 20, }}
                  inputStyle={styles.inputStyle}
                  placeholder="Enter Phone"
                  placeholderTextColor="white"
                  keyboardType="phone-pad"
                  onChangeText={(newPhone) => { this.props.signupPagePhoneUpdate(newPhone); }}
                  value={this.props.phoneNumber}
                />
                <Button
                  title="Send OTP"
                  titleStyle={{ color: '#FF4500', fontSize: 20, fontWeight: 'bold' }}
                  buttonStyle={{ backgroundColor: 'white', borderRadius: 30, paddingHorizontal: 20, marginTop: 30, }}
                  onPress={this.props.signupPageSendOTP(this.props.phoneNumber)}
                />
              </View>
          </LinearGradient>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'white'
  },
  header: {
    alignItems: 'center',
    margin: 20,
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#ff4500',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bodyIcon: {
    alignItems: 'center',
    flex: 4,
    justifyContent: 'center',
  },  
  body: {
    flex: 5,
  },
  icon: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  topCropper: {
    height: 60,
    width: screenWidth,
    position: 'absolute',
    borderRadius: 80,
    top: -30,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  bodyForm: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  phoneNumberField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
  },
});

const mapStateToProps = ({ signupPageState }) => {
    const { phoneNumber, otp, isOtpSent, referrerId, countryData } = signupPageState;
    return { phoneNumber, otp, isOtpSent, referrerId, countryData };
};

export default connect(mapStateToProps, {
  signupPagePhoneUpdate,
  signupPageOTPUpdate,
  signupPageReferrerUpdate,
  signupPageToggleOtpSent,
  signupPageSendOTP,
  signupPageVerifyOTP,
  signupPageCountryCodeUpdate
})(SignupPage);
