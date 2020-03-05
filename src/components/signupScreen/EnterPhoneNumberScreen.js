import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CountryPicker from 'react-native-country-picker-modal';
import { Input, Button, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  signupPagePhoneUpdate,
  signupPageSendOTP,
  signupPageCountryCodeUpdate
} from '../../actions';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class EnterPhoneNumberScreen extends Component {
  render() {
    const { countryCode, name, callingCode } = this.props.countryData;
    return (
        <View>
        <Header
          backgroundColor={'white'}
          placement={'center'}
          centerComponent={{ text: 'OTP Verification', style: styles.headerTitle }}
          containerStyle={{ paddingTop: 0, height: 56, elevation: 5, }}
        />
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.bodyIcon}>
                  <Image style={styles.icon} source={require('../../resources/icons/mail.png')} />
                  <Text style={{ color: '#C71585', fontSize: 18, fontWeight: 'bold' }}>Enter your mobile number</Text>
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>We will send you a OTP Message</Text>

                  <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 18, margin: 30, textAlign: 'center' }}>{this.props.error}</Text>
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
                          buttonStyle={{ backgroundColor: 'white', borderRadius: 30, paddingHorizontal: 20, marginTop: 30, elevation: 15, marginBottom: 30 }}
                          onPress={() => this.props.signupPageSendOTP(this.props.phoneNumber, callingCode)}
                      />
                  </View>
                </LinearGradient>
            </View>
        </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      width: screenWidth,
      height: screenHeight,
      backgroundColor: 'white',
      flex: 1
    },
    headerTitle: {
      color: '#ff4500',
      fontSize: 20,
      fontWeight: 'bold',
    },
    bodyIcon: {
      alignItems: 'center',
    },
    body: {
      flex: 1,
      margin: 0,
    },
    icon: {
      height: 100,
      width: 100,
      resizeMode: 'contain',
      marginBottom: 10,
      marginTop: 20,
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
    const { phoneNumber, error, countryData } = signupPageState;
    return { phoneNumber, error, countryData };
};

export default connect(mapStateToProps, {
  signupPagePhoneUpdate,
  signupPageSendOTP,
  signupPageCountryCodeUpdate
})(EnterPhoneNumberScreen);
