import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Input, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  signupPagePhoneUpdate,
  signupPageOTPUpdate,
  signupPageReferrerUpdate,
  signupPageToggleOtpSent,
  signupPageSendOTP,
  signupPageVerifyOTP,
  signupPageCountryCodeUpdate
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
    const { countryCode, name, callingCode } = this.props.countryData;
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ position: 'absolute', left: 0 }}><Icon onPress={() => this.props.signupPageToggleOtpSent(false)} color="#ff4500" name="chevron-left" type="font-awesome" /></View>
                    <Text style={styles.headerTitle}> Enter Verification Code </Text>
                </View>
                <View style={styles.bodyIcon}>
                    <Image style={styles.icon} source={require('../../resources/icons/mail.png')} />
                    <Text style={{ color: '#C71585', fontSize: 18, fontWeight: 'bold' }}>Enter OTP</Text>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, }}>We have sent OTP on {this.props.phoneNumber}</Text>
                </View>
                <LinearGradient colors={['#FF7F50', '#FF8C00', '#FF4500']} style={styles.body}>
                    <View style={styles.topCropper} />
                        <View style={styles.bodyForm}>
                            <View style={styles.phoneNumberField}>
                                <OTPInputView
                                    style={{ width: '80%', height: 200 }}
                                    pinCount={4}
                                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                    // onCodeChanged = {code => { this.setState({code})}}
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
                                            this.props.signupPageSendOTP(this.props.phoneNumber);
                                        }
                                    }} 
                                    style={{ color: 'white', fontWeight: 'bold' }}
                                >
                                    {this.state.resend ? 'OTP Sent!' : 'Resend OTP'}
                                </Text> 
                               {this.props.error != null ? <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, padding: 10, }}>{this.props.error}</Text> : <View />}
                        <Button
                            title="VERIFY"
                            titleStyle={{ color: '#FF4500', fontSize: 20, fontWeight: 'bold' }}
                            buttonStyle={{ backgroundColor: 'white', borderRadius: 30, paddingHorizontal: 20, marginTop: 30, elevation: 15, }}
                            onPress={() => this.props.signupPageVerifyOTP(this.props.phoneNumber, this.props.otp)}
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
        flexDirection: 'row'
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
    otpInput: { 
        backgroundColor: '#F37344', 
        height: 50, 
        width: 50, 
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
    const { phoneNumber, otp, isOtpSent, referrerId, countryData, error } = signupPageState;
    return { phoneNumber, otp, isOtpSent, referrerId, countryData, error };
};

export default connect(mapStateToProps, {
  signupPagePhoneUpdate,
  signupPageOTPUpdate,
  signupPageReferrerUpdate,
  signupPageToggleOtpSent,
  signupPageSendOTP,
  signupPageVerifyOTP,
  signupPageCountryCodeUpdate
})(EnterOTPScreen);
