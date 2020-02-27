import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Header, Card, Input } from 'react-native-elements';
import Slider from 'react-native-slider';
import { Actions } from 'react-native-router-flux';

const renderAddressComponent = () => {
  return (
    <View>
      <Text> Pickup Address </Text>
    </View>
  );
};

const renderSlider = ({ setValue, amount, sliderValue }) => {
  const minValue = Math.floor(0.4 * amount);
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
        thumbTintColor='rgb(252, 228, 149)'
        thumbImage={require('../signupScreen/fashn_square.png')}
        thumbStyle={styles.thumb}
        animateTransitions
      />
      {sliderValue < (0.5 * amount) ? <Text style={styles.greenText}>{`\u20B9${sliderValue}`}</Text> : <Text style={styles.redText}>{`\u20B9${sliderValue}`}</Text> }
    </View>
  );
};

const BidAcceptPage = ({ bidId }) => {
  const [sliderValue, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [size, setSize] = useState('');
  // console.log('BidAcceptPage', bidId, size);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Header
        backgroundColor={'white'}
        placement={'center'}
        leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => { Actions.pop(); } }}
        centerComponent={{ text: 'ACCEPT BID', style: { color: 'green', fontWeight: 'bold', fontSize: 17 } }}
        containerStyle={{ paddingTop: 0, height: 56 }}
      />
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
        
      </Card>
    </View>
  );
};
const styles = {
  thumb: {
    width: 50,
    height: 20,
    borderRadius: 10,
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
    color: '#013220'
  },
  redText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#f00'
  }
};

export default BidAcceptPage;
