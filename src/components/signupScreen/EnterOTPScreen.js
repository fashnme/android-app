import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Icon, Header, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  signupPageOTPUpdate,
  signupPageVerifyOTP,
  signupPageToggleOtpSent,
  signupPageSendOTP
} from '../../actions';

class EnterOTPScreen extends Component {
  constructor() {
      super();
      this.state = {
          resend: false
      };
  }
  renderError(error) {
    if (error.length === 0) {
      return <View />;
    }
    return (
      <Card containerStyle={{ margin: 0, padding: 0, borderRadius: 5, elevation: 4 }}>
        <Text style={{ fontWeight: 'bold', color: '#FF4B2B', fontSize: 16, margin: 5, textAlign: 'center' }}>{error}</Text>
      </Card>
    );
  }
  render() {
    const { loading, phoneNumber, otp, countryData, error } = this.props;
    const { callingCode } = countryData;
    return (
        <View style={{ flex: 1 }}>
            <Header
              backgroundColor={'white'}
              placement={'center'}
              leftComponent={<Icon onPress={() => this.props.signupPageToggleOtpSent(false)} color="#FF4B2B" name="chevron-left" type="font-awesome" />}
              centerComponent={{ text: 'Verification Code', style: { fontWeight: 'bold', fontSize: 16, color: '#FF4B2B' } }}
              containerStyle={{ paddingTop: 0, height: 50 }}
            />
            <LinearGradient colors={['#FF4B2B', '#FF416C']} style={{ flex: 1 }}>
              <ScrollView>
                <Card containerStyle={styles.topContainer}>
                  <Text style={{ color: '#fafafa', marginTop: 20, fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>{`Please Enter the verification code sent to +${callingCode}-${phoneNumber}`}</Text>
                  <OTPInputView
                      style={{ width: '80%', height: 200, justifyContent: 'center', alignItems: 'center' }}
                      pinCount={4}
                      codeInputHighlightStyle={{ borderColor: '#2089dc' }}
                      codeInputFieldStyle={styles.otpInput}
                      onCodeFilled={(code => { this.props.signupPageOTPUpdate(code); })}
                  />
                  {this.renderError(error)}
                </Card>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10 }}>
                  <Button
                    title={this.state.resend ? 'OTP Sent!' : 'Resend OTP'}
                    onPress={() => {
                        if (this.state.resend === false) {
                          this.setState({ resend: true });
                          this.props.signupPageSendOTP(phoneNumber, callingCode);
                        }
                    }}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    type={'clear'}
                  />
                </View>

                <Button
                  containerStyle={{ padding: 0, margin: 50, backgroundColor: 'transparent' }}
                  loading={loading}
                  type={'outline'}
                  title="VERIFY"
                  titleStyle={{ color: '#fafafa', fontSize: 20, fontWeight: 'bold' }}
                  buttonStyle={{ backgroundColor: 'transparent', borderRadius: 10, borderColor: 'white', borderWidth: 1 }}
                  onPress={() => {
                    this.props.signupPageVerifyOTP(phoneNumber, otp, callingCode);
                  }}
                  loadingProps={{ color: '#fafafa' }}
                />
              </ScrollView>
            </LinearGradient>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  otpInput: {
    backgroundColor: 'white',
    height: 50,
    width: 50,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    borderRadius: 5,
    fontSize: 20,
    elevation: 15,
    borderColor: 'white',
    borderWidth: 3,
    margin: 10,
  },
  topContainer: {
    margin: 30,
    marginBottom: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    elevation: 0,
    alignItems: 'center'
  }
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
