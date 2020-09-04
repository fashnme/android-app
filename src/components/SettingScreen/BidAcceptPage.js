import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Header, Card, Input, Button, Overlay } from 'react-native-elements';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import RenderAddressComponent from './RenderAddressComponent';
import {
  bidsPageAcceptBid as _bidsPageAcceptBid
} from '../../actions';

const renderSlider = ({ setValue, amount, sliderValue }) => {
  const minValue = Math.floor(0.3 * amount);
  const maxValue = Math.floor(0.8 * amount);
  const step = Math.floor((maxValue - minValue) * 0.05);
  return (
    <View>
      <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 18 }}> Select Security Amount </Text>
      <Slider
        value={minValue}
        onValueChange={v => setValue(v)}
        minimumValue={minValue}
        maximumValue={maxValue}
        step={step}
        maximumTrackTintColor={'#f00'}
        minimumTrackTintColor={'#00f'}
        thumbStyle={styles.thumbStyle}
        animateTransitions
      />
      {sliderValue < (0.6 * amount) ? <Text style={styles.greenText}>{`\u20B9${sliderValue}`}</Text> : <Text style={styles.redText}>{`\u20B9${sliderValue}`}</Text> }
    </View>
  );
};

const checkPropsAndAcceptBid = ({ bidId, selectedAddress, sliderValue, amount, size, setPropError, bidsPageAcceptBid, userToken }) => {
  // console.log('checkPropsAndAcceptBid', { bidId, sliderValue, amount, size, setPropError, selectedAddress });
  if (amount === 0) {
    setPropError('Please Enter the Amount of Product');
    return;
  }
  if (size.length === 0) {
    setPropError('Please Enter Size of Product');
    return;
  }
  if (sliderValue === 0) {
    setPropError('Please move Slider to select Security Amount');
    return;
  }
  if (Object.values(selectedAddress).length === 0) {
    setPropError('Scroll Down And Select a Address Below');
    return;
  }
  setPropError('');
  bidsPageAcceptBid({ bidId,
      price: parseInt(amount, 10),
      size,
      userToken,
      ownerAddress: selectedAddress,
      securityAmount: sliderValue,
      ownerMessage: ''
  });
};

const renderError = ({ propError }) => {
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <Text style={{ color: 'red', textAlign: 'center' }}> { propError } </Text>
    </View>
  );
};

const renderAcceptingOverlay = ({ loading }) => {
  return (
    <Overlay
      isVisible={loading}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      overlayBackgroundColor="#fafafa"
    >
      <View style={{ justifyContent: 'center', flexDirection: 'column', flex: 1 }}>
        <ActivityIndicator size="large" />
        <Text style={{ alignSelf: 'center' }}>Accepting This Bid!</Text>
      </View>
    </Overlay>
  );
};

const BidAcceptPage = ({ bidId, selectedAddress, userToken, loading, bidsPageAcceptBid }) => {
  const [sliderValue, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [size, setSize] = useState('');
  const [propError, setPropError] = useState('');
  // console.log('BidAcceptPage', bidId, size);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Header
        backgroundColor={'white'}
        placement={'left'}
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
        centerComponent={{ text: 'BIDS', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
        rightComponent={
          <Button
            title={'Accept'}
            type={'outline'}
            raised
            titleStyle={{ color: 'green', fontWeight: 'bold', fontSize: 17 }}
            onPress={() => { checkPropsAndAcceptBid({ bidId, selectedAddress, sliderValue, amount, size, setPropError, bidsPageAcceptBid, userToken }); }}
          />
        }
        containerStyle={{ paddingTop: 0, height: 50 }}
      />
      <ScrollView>
        <Card containerStyle={{ padding: 0, margin: 0 }}>
          <Card>
            <Input
              placeholder='Enter Price of Product'
              label={'Amount (\u20B9)'}
              multiline
              keyboardType={'number-pad'}
              value={amount}
              onChangeText={am => setAmount(am)}
            />
          </Card>
          { propError.length === 0 ? <View /> : renderError({ propError })}
          <Card>
            <Input
              placeholder='Enter Size of Product'
              label={'Size'}
              multiline
              value={size}
              onChangeText={text => setSize(text)}
            />
          </Card>
          <Card>
            {renderSlider({ setValue, amount, sliderValue })}
          </Card>
          <View style={{ margin: 10 }}>
            <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17, alignItems: 'center' }}>
              Select Pickup Address
            </Text>
          </View>
          { propError.length === 0 ? <View /> : renderError({ propError })}
          <RenderAddressComponent />
          {renderAcceptingOverlay({ loading })}
        </Card>
      </ScrollView>
    </View>
  );
};
const styles = {
  thumbStyle: {
    width: 30,
    height: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomEndRadius: 15,
    backgroundColor: '#4ac4ac',
    transform: [{ rotateY: '-45deg' }, { rotateX: '-45deg' }]
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  greenText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'green'
  },
  redText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#f00'
  }
};

const mapStateToProps = ({ accountSettingState, personalPageState }) => {
  const { userToken } = personalPageState;
  const { selectedAddress, loading } = accountSettingState;
  return { userToken, selectedAddress, loading };
};

export default connect(mapStateToProps, {
  bidsPageAcceptBid: _bidsPageAcceptBid
})(BidAcceptPage);
