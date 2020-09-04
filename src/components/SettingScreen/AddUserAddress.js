import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Header, Card, Input, CheckBox, Overlay } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import {
  accountSetttingsAddUserAddress as _accountSetttingsAddUserAddress,
  accountSettingsGetCityAndStateFromPin as _accountSettingsGetCityAndStateFromPin
} from '../../actions';

const showAlert = (message) => {
  Alert.alert('Error', message, [{ text: 'Ok' }], { cancelable: true });
};

const renderUpdatingOverlay = ({ loading }) => {
  return (
    <Overlay
      isVisible={loading}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      overlayBackgroundColor="#fafafa"
    >
      <View style={{ justifyContent: 'center', flexDirection: 'column', flex: 1 }}>
        <ActivityIndicator size="large" />
        <Text style={{ alignSelf: 'center' }}>Updating Address!</Text>
      </View>
    </Overlay>
  );
};

const checkAndAddAddress = ({ userAddress, addressId, userToken, accountSetttingsAddUserAddress }) => {
  const { name, pinCode, state, city, address, phoneNo, tag, locality } = userAddress;
  if (name.trim().length < 3) {
    showAlert('Please Enter Complete Name'); return;
  }
  if (phoneNo.length !== 10) {
    showAlert('Please Enter Valid Indian Mobile Number'); return;
  }
  if (pinCode.length !== 6) {
    showAlert('Please Enter a 6 Digit Pincode'); return;
  }
  if (state.length === 0 || city.length === 0 || locality === undefined || locality.length === 0) {
    showAlert('Please enter a valid pincode And Select a Locality'); return;
  }
  if (address.trim().length < 5) {
    showAlert('Please Enter Complete Address'); return;
  }
  if (tag !== 'home' && tag !== 'office') {
    showAlert('Please Scroll Down, and Select type of Address');
  }
  accountSetttingsAddUserAddress({ userAddress, addressId, userToken });
};

const AddUserAddress = ({ addressData, userToken, loading, accountSetttingsAddUserAddress, accountSettingsGetCityAndStateFromPin }) => {
  // Eg. const { name, pinCode, state, city, address, phoneNo, tag } = address;
  const [name, updateName] = useState(addressData.name);
  const [pinCode, updatePinCode] = useState(addressData.pinCode);
  const [state, updateState] = useState(addressData.state);
  const [city, updateCity] = useState(addressData.city);
  const [address, updateAddress] = useState(addressData.address);
  const [phoneNo, updatePhone] = useState(addressData.phoneNo);
  const [tag, updateTag] = useState(addressData.tag);
  const [locality, updateLocality] = useState(addressData.locality === undefined ? '' : addressData.locality);
  const [localityArray, setLocalityArray] = useState([]);
  const [loadingPincode, setLoadingPincode] = useState(false);
  const { addressId } = addressData;
  const userAddress = { name, pinCode, state, city, address, phoneNo, tag, addressId, locality };
  // console.log(userAddress);
  return (
    <View style={{ flex: 1 }}>
      <Header
        backgroundColor={'white'}
        placement={'center'}
        // leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => { Actions.pop(); } }}
        leftComponent={{ icon: 'arrow-left',
          type: 'font-awesome',
          color: '#e9e9e9',
          onPress: () => { Actions.pop(); },
          reverse: true,
          size: 18,
          reverseColor: '#D5252D',
          containerStyle: { marginLeft: -5, marginTop: 0, opacity: 0.8 },
        }}
        rightComponent={{
          text: 'Save',
          style: { color: '#2089dc', fontWeight: 'bold', fontSize: 18 },
          onPress: () => { checkAndAddAddress({ userAddress, addressId, userToken, accountSetttingsAddUserAddress }); } }}
        centerComponent={{ text: 'Add Address', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
        containerStyle={{ paddingTop: 0, height: 50 }}
      />
      <ScrollView>

        <Card containerStyle={[styles.cardContainer, { borderColor: '#a7bffc' }]}>
          <Input
            placeholder='Enter Name'
            label='Name'
            containerStyle={{ marginTop: 10 }}
            inputStyle={styles.inputStyle}
            onChangeText={(n) => updateName(n)}
            value={name}
          />
          <Input
            placeholder={'Enter Phone Number'}
            label='Mobile'
            keyboardType="phone-pad"
            containerStyle={{ marginTop: 20 }}
            inputStyle={styles.inputStyle}
            onChangeText={(p) => updatePhone(p.trim())}
            value={phoneNo}
          />
        </Card>


        <Card containerStyle={[styles.cardContainer, { borderColor: '#a7bffc' }]}>
          <Input
            label='Pincode'
            placeholder='XXXX45'
            keyboardType="phone-pad"
            maxLength={6}
            containerStyle={{ width: '50%' }}
            inputStyle={styles.inputStyle}
            onChangeText={(p) => {
              if (p.trim().length === 6) {
                setLoadingPincode(true);
                accountSettingsGetCityAndStateFromPin({ pincode: p, updateState, updateCity, setLocalityArray, setLoadingPincode });
              }
              updatePinCode(p.trim());
             }}
            value={pinCode}
            rightIcon={<ActivityIndicator animating={loadingPincode} color={'#ff3f6c'} />}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 3, marginTop: 20 }}>
            <Input
              label='City'
              disabled
              containerStyle={{ width: '50%' }}
              inputStyle={styles.inputStyle}
              value={city}
            />
            <Input
              label='State'
              disabled
              containerStyle={{ width: '50%' }}
              inputStyle={styles.inputStyle}
              value={state}
            />
          </View>

          <Dropdown
            label='Locality'
            data={localityArray}
            selectedItemColor='#1f7070'
            itemTextStyle={styles.inputStyle}
            fontSize={18}
            containerStyle={styles.dropdownContainer}
            labelFontSize={styles.inputStyle.fontSize}
            labelTextStyle={[styles.inputStyle]}
            value={locality}
            textColor={'#1f7070'}
            style={{ marginTop: 5, fontWeight: 'bold' }}
            onChangeText={(value) => updateLocality(value)}
          />
          <Input
            label='Address'
            placeholder='(House No., Building, Street)'
            containerStyle={{ marginTop: 20 }}
            multiline
            inputStyle={styles.inputStyle}
            onChangeText={(a) => updateAddress(a)}
            value={address}
          />
        </Card>

        <Card containerStyle={[styles.cardContainer, { borderColor: '#a7bffc' }]}>
          <Text> Type of Address </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
            <CheckBox
              title='Home'
              size={26}
              checkedColor={'green'}
              checked={tag === 'home'}
              containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
              onPress={() => updateTag('home')}
            />
            <CheckBox
              title='Office'
              size={26}
              checked={tag === 'office'}
              checkedColor={'green'}
              containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
              onPress={() => updateTag('office')}
            />
          </View>
        </Card>
        {renderUpdatingOverlay({ loading })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: { fontSize: 16, fontWeight: 'bold', paddingBottom: 0 },
  cardContainer: { margin: 5, marginTop: 10, marginBottom: 10, borderRadius: 10, borderWidth: 2 },
  dropdownContainer: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'grey',
    // width: '50%'
  }
});

const mapStateToProps = ({ personalPageState, accountSettingState }) => {
  const { userToken } = personalPageState;
  const { loading } = accountSettingState;
  return { userToken, loading };
};

export default connect(mapStateToProps, {
  accountSetttingsAddUserAddress: _accountSetttingsAddUserAddress,
  accountSettingsGetCityAndStateFromPin: _accountSettingsGetCityAndStateFromPin
})(AddUserAddress);
