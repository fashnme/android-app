import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Header, Card, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  accountSetttingsAddUserAddress as _accountSetttingsAddUserAddress
} from '../../actions';

const AddUserAddress = ({ addressData, accountSetttingsAddUserAddress, userToken }) => {
  // Eg. const { name, pinCode, state, city, address, phoneNo, tag } = address;
  const [name, updateName] = useState(addressData.name);
  const [pinCode, updatePinCode] = useState(addressData.pinCode);
  const [state, updateState] = useState(addressData.state);
  const [city, updateCity] = useState(addressData.city);
  const [address, updateAddress] = useState(addressData.address);
  const [phoneNo, updatePhone] = useState(addressData.phoneNo);
  const [tag, updateTag] = useState(addressData.tag);
  const { addressId } = addressData;
  const userAddress = { name, pinCode, state, city, address, phoneNo, tag, addressId };
  return (
    <View>
      <Header
        backgroundColor={'white'}
        placement={'center'}
        leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => { Actions.pop(); } }}
        rightComponent={{
          text: 'Save',
          style: { color: '#00f', fontWeight: 'bold', fontSize: 16 },
          onPress: () => { accountSetttingsAddUserAddress({ userAddress, addressId, userToken }); } }}
        centerComponent={{ text: 'Add Address', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
        containerStyle={{ paddingTop: 0, height: 56 }}
      />
      <Text>
        AddUserAddress
      </Text>
    </View>
  );
};

export default connect(null, {
  accountSetttingsAddUserAddress: _accountSetttingsAddUserAddress
})(AddUserAddress);
