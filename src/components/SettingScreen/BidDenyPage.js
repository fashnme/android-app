import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Card } from 'react-native-elements';

const reasons = [
  { text: 'Bid Price is Low' },
  { text: 'Bid Price is High' },
  { text: 'This is not my Product' },
  { text: 'I need this product between requested time' },
  { text: "Don't want to Share" },
  { text: 'Other Reason' }
];

const BidDenyPage = ({ bidId }) => {
  console.log('BidDenyPage', bidId);
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Header
        backgroundColor={'white'}
        placement={'left'}
        leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => { Actions.pop(); } }}
        centerComponent={{ text: 'BIDS FOR ME', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
        containerStyle={{ paddingTop: 0, height: 56 }}
      />
      <Card>
        <Text> BidDenyPage </Text>
      </Card>
    </View>
  );
};
const styles = {
  container: {
   minHeight: 228,
 }
};
export default BidDenyPage;
