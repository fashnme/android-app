import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CountryPicker from 'react-native-country-picker-modal';
import { Input, Icon, Header, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  signupPagePhoneUpdate,
  signupPageSendOTP,
  signupPageCountryCodeUpdate
} from '../../actions';

class EnterPhoneNumberScreen extends Component {
  render() {
    const { phoneNumber, error, countryData } = this.props;
    const { countryCode, name, callingCode } = countryData;

    return (
        <View style={{ flex: 1 }}>
          <Header
            backgroundColor={'white'}
            placement={'center'}
            centerComponent={{ text: 'OTP Verification', style: { fontSize: 16, fontWeight: 'bold', color: '#FF4B2B' } }}
            containerStyle={{ paddingTop: 0, height: 50 }}
          />
          <LinearGradient colors={['#FF4B2B', '#FF416C']} style={{ flex: 1 }}>
            <ScrollView>

              <Card containerStyle={styles.topContainer}>
                <View style={{ alignItems: 'center' }}>
                  <Image style={{ height: 80, width: 80 }} source={require('../../resources/icons/phone.png')} />
                </View>
                <Text style={{ color: 'grey', marginTop: 20, textAlign: 'center' }}>We will send you a One time SMS message.</Text>
                <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 16, margin: 20, textAlign: 'center' }}>{error}</Text>
              </Card>


              <Card containerStyle={styles.bottomContainer}>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                  <CountryPicker
                      containerButtonStyle={{ backgroundColor: 'white', borderRadius: 20, height: 40, width: 40, padding: 5, justifyContent: 'center', alignItems: 'center' }}
                      withCallingCode
                      countryCode={countryCode}
                      onSelect={(data) => this.props.signupPageCountryCodeUpdate({ countryCode: data.cca2, name: data.name, callingCode: data.callingCode[0] })}
                  />
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}> {name} (+{callingCode})</Text>
                </View>
                <Input
                  containerStyle={{ marginTop: 10, marginRight: 0, marginLeft: 0 }}
                  inputStyle={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 22 }}
                  placeholder="Your Phone Number"
                  placeholderTextColor="white"
                  keyboardType="phone-pad"
                  onChangeText={(newPhone) => { this.props.signupPagePhoneUpdate(newPhone); }}
                  value={this.props.phoneNumber}
                />
                <Icon
                  raised
                  name='chevron-right'
                  type='font-awesome'
                  color='#FF4B2B'
                  containerStyle={{ alignItems: 'center', marginTop: 20, elevation: 10 }}
                  onPress={() => this.props.signupPageSendOTP(phoneNumber, callingCode)}
                />
              </Card>


            </ScrollView>
          </LinearGradient>

        </View>
    );
  }
}

const styles = StyleSheet.create({
    topContainer: {
      margin: 0,
      backgroundColor: 'white',
      borderWidth: 0,
      height: 250,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25
    },
    bottomContainer: {
      backgroundColor: 'transparent',
      elevation: 0,
      borderWidth: 0
    }
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
