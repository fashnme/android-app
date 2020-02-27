import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Icon, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  signupPageOTPUpdate,
  signupPageVerifyOTP,
  signupPageToggleOtpSent,
  signupPageSendOTP
} from '../../actions';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class EnterOTPScreen extends Component {
  constructor() {
      super();
      this.state = {
          resend: false
      };
  }
  render() {
    const { loading, phoneNumber, otp, countryData, callingCode } = this.props;
    return (
        <View>
            <Header
            backgroundColor={'white'}
            placement={'center'}
            leftComponent={<Icon onPress={() => this.props.signupPageToggleOtpSent(false)} color="#ff4500" name="chevron-left" type="font-awesome" />}
            centerComponent={{ text: 'Enter Verification Code', style: styles.headerTitle }}
            containerStyle={{ paddingTop: 0, height: 56, elevation: 5, }}
            />
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.bodyIcon}>
                        <Image style={styles.icon} source={require('../../resources/icons/mail.png')} />
                        <Text style={{ color: '#C71585', fontSize: 18, fontWeight: 'bold' }}>Enter OTP</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, }}>We have sent OTP on {phoneNumber}</Text>

                        <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 18, padding: 10, }}>{this.props.error}</Text>
                    </View>
                    <LinearGradient colors={['#FF7F50', '#FF8C00', '#FF4500']} style={styles.body}>
                        <View style={styles.topCropper} />
                            <View style={styles.bodyForm}>
                                <View style={styles.phoneNumberField}>
                                    <OTPInputView
                                        style={{ width: '80%', height: 200 }}
                                        pinCount={4}
                                        autoFocusOnLoad
                                        codeInputFieldStyle={styles.otpInput}
                                        onCodeFilled={(code => {
                                        this.props.signupPageOTPUpdate(code);
                                        })}
                                    />
                            </View>
                                    <Text
                                        onPress={() => {
                                            if (this.state.resend === false) {
                                                this.setState({ resend: true });
                                                this.props.signupPageSendOTP(phoneNumber, callingCode);
                                            }
                                        }}
                                        style={{ color: 'white', fontWeight: 'bold' }}
                                    >
                                        {this.state.resend ? 'OTP Sent!' : 'Resend OTP'}
                                    </Text>
                            <Button
                                loading={loading}
                                loadingStyle={{ borderColor: 'orange' }}
                                title="VERIFY"
                                titleStyle={{ color: '#FF4500', fontSize: 20, fontWeight: 'bold' }}
                                buttonStyle={{ backgroundColor: 'white', borderRadius: 30, paddingHorizontal: 20, marginTop: 15, marginBottom: 50, elevation: 15, }}
                                onPress={() => {
                                    console.log('Butotn clicked');
                                    this.props.signupPageVerifyOTP(phoneNumber, otp, countryData.callingCode); 
                                }}
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
        backgroundColor: 'white'
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
    },
    phoneNumberField: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    otpInput: {
        backgroundColor: 'white',
        height: 50,
        width: 50,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 15,
        borderColor: 'white',
        borderWidth: 1,
        margin: 10,
    },
  });


const mapStateToProps = ({ signupPageState }) => {
    const { phoneNumber, otp, countryData, error, loading } = signupPageState;
    return { phoneNumber, otp, countryData, error, loading };
};

export default connect(mapStateToProps, {
  signupPageOTPUpdate,
  signupPageVerifyOTP,
  signupPageToggleOtpSent,
  signupPageSendOTP,
})(EnterOTPScreen);
