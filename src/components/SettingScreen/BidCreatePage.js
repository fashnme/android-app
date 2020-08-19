import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Card, Input, Button, Icon, Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import RenderAddressComponent from './RenderAddressComponent';
import { bidsPageCreateBid as _bidsPageCreateBid } from '../../actions';

const renderError = ({ propError }) => {
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <Text style={{ color: 'red', textAlign: 'center' }}> { propError } </Text>
    </View>
  );
};

const getFormattedDate = (date) => {
  if (date.length <= 1) {
    return '';
  }
  const d = new Date(date).toDateString().split(' ');
  return `${d[1]} ${d[2]}, ${d[3]} (${d[0]})`;
};

const renderRequestingOverlay = ({ loading }) => {
  return (
    <Overlay
      isVisible={loading}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      overlayBackgroundColor="#fafafa"
    >
      <View style={{ justifyContent: 'center', flexDirection: 'column', flex: 1 }}>
        <ActivityIndicator size="large" />
        <Text style={{ alignSelf: 'center' }}>Creating a Request!</Text>
      </View>
    </Overlay>
  );
};

const renderDatePicker = (setState, showCalender, setPropError) => {
  return (
    <DateTimePicker
      onChange={(event, selectedDate) => {
        showCalender(false);
        if (typeof selectedDate !== 'undefined') {
          setState(selectedDate.toString());
          setPropError('');
        }
      }}
      value={new Date()}
      minimumDate={new Date()}
    />
  );
};

const checkPropsAndCreateBid = ({ amount, message, selectedAddress, startDate, endDate, postId, posterId,
      productData, setPropError, userToken, bidsPageCreateBid }) => {
  if (amount.length === 0) {
    // setPropError('Enter Amount you want pay for Renting');
    Alert.alert('Enter Amount', 'Enter Amount you want pay for Renting', [{ style: 'cancel' }, { text: 'Ok' }], { cancelable: true });
    return;
  }
  if (startDate.length === 0) {
    // setPropError('Select a Start Date for Renting');
    Alert.alert('Start Date', 'Select a Start Date for Renting', [{ style: 'cancel' }, { text: 'Ok' }], { cancelable: true });
    return;
  }
  if (new Date(startDate) <= new Date()) {
    // setPropError('We can not Ship That Day :>)');
    Alert.alert('', 'We can not Ship That Day :>)', [{ style: 'cancel' }, { text: 'Ok' }], { cancelable: true });
    return;
  }
  if (endDate.length === 0) {
    // setPropError('Select a End Date for Renting');
    Alert.alert('End Date', 'Select a End Date for Renting', [{ style: 'cancel' }, { text: 'Ok' }], { cancelable: true });
    return;
  }
  if (new Date(endDate) < new Date(startDate)) {
    // setPropError(`Select a End Date after ${getFormattedDate(startDate)}`);
    Alert.alert('Date', `Select a End Date after ${getFormattedDate(startDate)}`, [{ style: 'cancel' }, { text: 'Ok' }], { cancelable: true });
    return;
  }
  if (Object.values(selectedAddress).length === 0) {
    // setPropError('Scroll Down And Select a Address Below');
    Alert.alert('Select Address', 'Scroll Down And Select a Delivery Address Below', [{ style: 'cancel' }, { text: 'Ok' }], { cancelable: true });
    return;
  }

  setPropError('');
  // console.log('Everything is Fine');

  let refProductId = '';
  if (typeof productData !== 'undefined') {
    refProductId = productData.productId;
  }

  bidsPageCreateBid({
      postId,
      posterId,
      startDate,
      endDate,
      amount: parseInt(amount, 10),
      userToken,
      deliveryAddress: selectedAddress,
      refProductId,
      comment: message
  });
};

const BidCreatePage = ({ postId, posterId, productData, userToken, selectedAddress, loading, bidsPageCreateBid }) => {
  // console.log('bid now button pressed!', { postId, posterId, productData });
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartCalender, toggleStartCalander] = useState(false);
  const [showEndCalender, toggleEndCalander] = useState(false);
  const [message, setMessage] = useState('');
  const [propError, setPropError] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header
        backgroundColor={'white'}
        placement={'left'}
        leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => { Actions.home(); } }}
        centerComponent={{ text: 'RENT IT', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
        rightComponent={
          <Button
            ViewComponent={LinearGradient}
            titleStyle={{ fontWeight: 'bold' }}
            linearGradientProps={{
              colors: ['#FF4B2B', '#FF416C'],
              start: { x: 1.0, y: 0.0 },
              end: { y: 1.0, x: 1.0 },
            }}
            title={'REQUEST'}
            buttonStyle={{ paddingLeft: 30, paddingRight: 30 }}
            raised
            onPress={() => {
              checkPropsAndCreateBid({
                amount, message, selectedAddress, startDate, endDate, postId, posterId, productData, setPropError, userToken, bidsPageCreateBid
              });
            }}
          />
        }
        containerStyle={{ paddingTop: 0, height: 50 }}
      />
      <ScrollView>
        <Card containerStyle={{ padding: 0, margin: 0 }}>

          <Card containerStyle={{ borderRadius: 10, borderColor: '#e1fade', borderWidth: 2 }}>
            <Input
              placeholder='Rent you want to Pay'
              label={'Amount (\u20B9)'}
              keyboardType={'number-pad'}
              value={amount}
              onChangeText={am => setAmount(am)}
            />
          </Card>

          { propError.length === 0 ? <View /> : renderError({ propError })}

          <Card containerStyle={{ borderRadius: 10, borderColor: '#e3eafc', borderWidth: 2 }}>
            <Input
              value={getFormattedDate(startDate)}
              label={'Start Date'}
              placeholder="Choose Start Date"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              rightIcon={
                <Icon name="calendar" type="font-awesome" color='#2089dc' onPress={() => toggleStartCalander(true)} />
              }
              disabled
              rightIconContainerStyle={{ marginHorizontal: 10 }}
            />
            { showStartCalender ? renderDatePicker(setStartDate, toggleStartCalander, setPropError) : <View /> }
          </Card>

          <Card containerStyle={{ borderRadius: 10, borderColor: '#fad9e1', borderWidth: 2 }}>
            <Input
              value={getFormattedDate(endDate)}
              label={'End Date'}
              placeholder="Choose End Date"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              rightIcon={<Icon name="calendar" type="font-awesome" color='#ee5f73' onPress={() => toggleEndCalander(true)} />}
              disabled
              rightIconContainerStyle={{ marginHorizontal: 10 }}
            />
            { showEndCalender ? renderDatePicker(setEndDate, toggleEndCalander, setPropError) : <View /> }
          </Card>

          <Card containerStyle={{ borderRadius: 10, borderWidth: 2 }}>
            <Input
              placeholder='Share why you love this Product'
              label={'Message for Owner (Optional)'}
              multiline
              value={message}
              inputStyle={{ fontSize: 14 }}
              onChangeText={me => setMessage(me)}
            />
          </Card>

          { propError.length === 0 ? <View /> : renderError({ propError })}

          <View style={{ margin: 10 }}>
            <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17, alignItems: 'center' }}>
              Select Delivery Address
            </Text>
          </View>

          <RenderAddressComponent />
          {renderRequestingOverlay({ loading })}
        </Card>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({ accountSettingState, personalPageState }) => {
  const { userToken } = personalPageState;
  const { selectedAddress, loading } = accountSettingState;
  return { userToken, selectedAddress, loading };
};

export default connect(mapStateToProps, {
  bidsPageCreateBid: _bidsPageCreateBid
})(BidCreatePage);
