import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, ListItem, CheckBox, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  accountSettingSetSelectedAddress as _accountSettingSetSelectedAddress
} from '../../actions';

const renderTitle = ({ name, address, city, state, pinCode, locality }) => {
  return (
    <View>
      <Text style={styles.name}> {name} </Text>
      <Text style={styles.textItem}> {address} </Text>
      <Text style={styles.textItem}> { locality },  {city} </Text>
      <Text style={styles.textItem}> { state} {'-'} {pinCode} </Text>
    </View>
  );
};

const renderPhone = ({ phoneNo }) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 5 }}>
      <Text> Mobile: </Text>
      <Text style={styles.textItem}> {phoneNo} </Text>
    </View>
  );
};

const renderSingleAddress = ({ item, selectedAddress, accountSettingSetSelectedAddress }) => {
  // console.log('Address Item', item, selectedAddress);
  const { label, city, pinCode, name, address, state, phoneNo, locality } = item;
  return (
    <ListItem
      title={renderTitle({ label, name, address, city, state, pinCode, locality })}
      subtitle={renderPhone({ phoneNo })}
      leftElement={
        <CheckBox
          containerStyle={{ margin: 0, padding: 0, flexDirection: 'column' }}
          checked={item === selectedAddress}
          checkedColor='green'
          onPress={() => accountSettingSetSelectedAddress({ selectedAddress: item })}
        />
      }
      bottomDivider
      rightTitle={'Edit'}
      rightTitleStyle={{ color: '#2089dc', fontWeight: 'bold' }}
      rightTitleProps={{ onPress: () => Actions.addUserAddress({ addressData: item }) }}
    />
  );
};

const RenderAddressComponent = ({ deliveryDetailsArray, selectedAddress, accountSettingSetSelectedAddress }) => {
  const emptyItem = { label: '', addressId: '', city: '', pinCode: '', name: '', address: '', locality: '', state: '', phoneNo: '' };
  return (
    <View>
      <Card containerStyle={{ padding: 0, marginBottom: 10, borderRadius: 5 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={deliveryDetailsArray}
          renderItem={({ item }) => renderSingleAddress({ item, selectedAddress, accountSettingSetSelectedAddress })}
        />
        <Button
          title="+ ADD NEW ADDRESS"
          type={'outline'}
          containerStyle={{ margin: 15 }}
          onPress={() => { Actions.addUserAddress({ addressData: emptyItem }); }}
        />
      </Card>
    </View>
  );
};

const styles = {
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#696E79'
  },
  textItem: {
    fontSize: 14,
    color: '#696E79'
  }
};

const mapStateToProps = ({ accountSettingState }) => {
  const { deliveryDetailsArray, selectedAddress } = accountSettingState;
  return { deliveryDetailsArray, selectedAddress };
};
export default connect(mapStateToProps, {
  accountSettingSetSelectedAddress: _accountSettingSetSelectedAddress
})(RenderAddressComponent);
