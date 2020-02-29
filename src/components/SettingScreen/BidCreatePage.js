import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Card, Input, Button, Icon, Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
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
    />
  );
};

const checkPropsAndCreateBid = ({ amount, message, selectedAddress, startDate, endDate, postId, posterId,
      productData, setPropError, userToken, bidsPageCreateBid }) => {
  if (amount.length === 0) {
    setPropError('Please Enter the Amount for Renting');
    return;
  }
  if (startDate.length === 0) {
    setPropError('Select a Start Date for Renting');
    return;
  }
  if (new Date(startDate) <= new Date()) {
    setPropError('We can not Ship That Day :>)');
    return;
  }
  if (endDate.length === 0) {
    setPropError('Select a End Date for Renting');
    return;
  }
  if (new Date(endDate) < new Date(startDate)) {
    setPropError(`Select a End Date after ${getFormattedDate(startDate)}`);
    return;
  }
  if (Object.values(selectedAddress).length === 0) {
    setPropError('Scroll Down And Select a Address Below');
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
        centerComponent={{ text: 'BID', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
        rightComponent={
          <Button
            title={'Create'}
            type={'outline'}
            raised
            titleStyle={{ color: 'green', fontWeight: 'bold', fontSize: 17 }}
            onPress={() => {
              checkPropsAndCreateBid({
                amount, message, selectedAddress, startDate, endDate, postId, posterId, productData, setPropError, userToken, bidsPageCreateBid
              });
            }}
          />
        }
        containerStyle={{ paddingTop: 0, height: 56 }}
      />
      <ScrollView>
        <Card containerStyle={{ padding: 0, margin: 0 }}>

          <Card>
            <Input
              placeholder='Enter the of Bid Amount'
              label={'Amount (\u20B9)'}
              keyboardType={'number-pad'}
              value={amount}
              onChangeText={am => setAmount(am)}
            />
          </Card>

          { propError.length === 0 ? <View /> : renderError({ propError })}

          <Card>
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

          <Card>
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

          <Card>
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