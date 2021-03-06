import React, { useState } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Card, Input, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import {
  bidsPageRejectBid as _bidsPageRejectBid
} from '../../actions';

const reasons = [
  { value: 'Bid Price is Low' },
  { value: 'Bid Price is High' },
  { value: 'This is not my Product' },
  { value: 'Unable to Process the Request' },
  { value: "Don't want to Share" },
  { value: 'Other Reasons' }
];
// Add Header
const BidDenyPage = ({ bidId, userToken, loading, bidsPageRejectBid }) => {
  const [index, updateIndex] = useState(0);
  const [feedback, updateFeedback] = useState('');
  // console.log('ind', index, feedback);
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
        centerComponent={{ text: 'BIDS FOR ME', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
        containerStyle={{ paddingTop: 0, height: 50 }}
      />
      <Card containerStyle={{ margin: 5, marginTop: 10, marginBottom: 10, borderRadius: 10, borderWidth: 2 }}>
          <Dropdown
            label='Reason for Rejection'
            data={reasons}
            selectedItemColor='#1f7070'
            itemCount={10}
            fontSize={18}
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.inputStyle}
            labelFontSize={styles.inputStyle.fontSize}
            labelTextStyle={[styles.inputStyle]}
            value={reasons[index].value}
            onChangeText={(value, i) => updateIndex(i)}
          />
          <Card containerStyle={styles.inputContainer}>
            <Input
              placeholder='Please Provide Feedback'
              label='Feedback'
              multiline
              value={feedback}
              onChangeText={text => updateFeedback(text)}
              inputStyle={styles.commentInputStyle}
              value={feedback}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              maxLength={500}
            />
          </Card>

            <Button
              raised
              containerStyle={{ marginTop: 30 }}
              buttonStyle={{ borderColor: '#ff859a', borderWidth: 1 }}
              titleStyle={{ color: '#ff859a', fontWeight: 'bold', fontSize: 18 }}
              loading={loading}
              loadingProps={{ color: '#ff859a' }}
              title={'Reject Bid'}
              type={'outline'}
              onPress={() => bidsPageRejectBid({ bidId, userToken, feedback, reason: reasons[index].value })}
            />
      </Card>
    </View>
  );
};

const styles = {
  buttonStyle: { borderWidth: 1, borderColor: '#1b83ea' },
  inputContainer: {
    margin: 2,
    padding: 5,
    marginTop: 10,
    elevation: 1,
    borderRadius: 5,
  },
  inputStyle: { fontSize: 16, fontWeight: 'bold', paddingBottom: 0 },
  dropdownContainer: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'grey',
  },
  commentInputStyle: { fontSize: 17, textAlignVertical: 'top', maxHeight: 200 },
};

const mapStateToProps = ({ personalPageState, accountSettingState }) => {
  const { userToken } = personalPageState;
  const { loading } = accountSettingState;
  return { userToken, loading };
};
export default connect(mapStateToProps, {
  bidsPageRejectBid: _bidsPageRejectBid
})(BidDenyPage);
