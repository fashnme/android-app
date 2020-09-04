import React, { useState } from 'react';
import { View } from 'react-native';
import { Header, Card, Input, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  bidsPageCancelBid as _bidsPageCancelBid
} from '../../actions';

const reasons = [
  { value: "I don't need it Anymore" },
  { value: 'I got it somewhere else' },
  { value: "It won't fit me" },
  { value: 'I changed my Mind' },
  { value: 'Other Reasons' }
];

const BidCancelPage = ({ bidId, userToken, loading, bidsPageCancelBid }) => {
  const [index, updateIndex] = useState(0);
  const [feedback, updateFeedback] = useState('');
  return (
    <View style={{ flex: 1 }}>
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
        centerComponent={{ text: 'BIDS BY ME', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
        containerStyle={{ paddingTop: 0, height: 50 }}
      />
      <Card>
        <Dropdown
          label='Reason for Rejection'
          data={reasons}
          selectedItemColor='#1f7070'
          itemCount={10}
          fontSize={18}
          value={reasons[index].value}
          onChangeText={(value, i) => updateIndex(i)}
        />
      </Card>
      <Card>
        <Input
          placeholder='Please Provide Feedback'
          label='Feedback'
          multiline
          value={feedback}
          onChangeText={text => updateFeedback(text)}
        />
      </Card>
      <Card>
        <Button
          raised
          buttonStyle={{ borderColor: '#ff859a', borderWidth: 1 }}
          titleStyle={{ color: '#ff859a', fontWeight: 'bold', fontSize: 18 }}
          loading={loading}
          loadingProps={{ color: '#ff859a' }}
          title={'Cancel Bid'}
          type={'outline'}
          onPress={() => { bidsPageCancelBid({ bidId, feedback, userToken, reason: reasons[index].value }); }}
        />
      </Card>
    </View>
  );
};

const mapStateToProps = ({ personalPageState, accountSettingState }) => {
  const { userToken } = personalPageState;
  const { loading } = accountSettingState;
  return { userToken, loading };
};
export default connect(mapStateToProps, {
  bidsPageCancelBid: _bidsPageCancelBid
})(BidCancelPage);
