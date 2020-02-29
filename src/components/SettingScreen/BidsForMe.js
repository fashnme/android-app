import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const renderImage = ({ postContentUrl }) => {
  return (
    <View style={{ boderRadius: 4 }}>
      <Image source={{ uri: postContentUrl }} style={{ width: 120, height: 180, borderRadius: 5 }} />
    </View>
  );
};

const getFormattedDate = (date) => {
  const d = new Date(date).toDateString().split(' ');
  return `${d[1]} ${d[2]}, ${d[3]}`;
};

const renderTitleComponent = ({ startDate, endDate, amount, comment, category, deliveryDetails }) => {
  // console.log('BidsForMe', deliveryDetails);
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.headingStyle}> Looking For : </Text>
        <Text style={styles.fieldStyle}>{category}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.headingStyle}> Start Date: </Text>
        <Text style={styles.fieldStyle}>{`${getFormattedDate(startDate)}`}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.headingStyle}> End Date: </Text>
        <Text style={styles.fieldStyle}>{`${getFormattedDate(endDate)}`}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.headingStyle}> Amount: </Text>
        <Text style={styles.fieldStyle}>{`\u20B9 ${amount}`}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.headingStyle}> Requested From: </Text>
        <Text style={styles.fieldStyle}>{deliveryDetails.pinCode}</Text>
      </View>
      <View>
        <Text style={styles.headingStyle}> Occassion: </Text>
        <Text style={[styles.fieldStyle]}>{comment}</Text>
      </View>
    </View>
  );
};

const renderButtons = ({ bidId }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
      <Button
        title={'Accept'}
        raised
        containerStyle={{ width: 80 }}
        titleStyle={{ color: 'green', fontWeight: 'bold' }}
        buttonStyle={{ borderColor: 'green', borderWidth: 1 }}
        type={'outline'}
        onPress={() => { Actions.bidAcceptPage({ bidId }); }} // Visit BidAcceptPage to accept formalities
      />
      <Button
        title={'Deny'}
        raised
        containerStyle={{ width: 80 }}
        titleStyle={{ color: 'red', fontWeight: 'bold' }}
        buttonStyle={{ borderColor: 'red', borderWidth: 1 }}
        type={'outline'}
        onPress={() => { Actions.bidDenyPage({ bidId }); }} // Visit BidDenyPage to take response
      />
    </View>
  );
};

const renderItem = ({ item }) => {
  const { bidId, postContentUrl, startDate, endDate, amount, conmment, category, deliveryDetails } = item;
  return (
    <ListItem
      title={renderTitleComponent({ startDate, endDate, amount, conmment, category, deliveryDetails })}
      subtitle={renderButtons({ bidId })}
      leftAvatar={renderImage({ postContentUrl })}
      bottomDivider
      pad={10}
    />
  );
};

const BidsForMe = ({ rentBidsForMe }) => {
  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={rentBidsForMe}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = {
  headingStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey'
  },
  fieldStyle: {
    fontSize: 15,
    fontWeight: '700'
  },
};

const mapStateToProps = ({ accountSettingState }) => {
  const { rentBidsForMe } = accountSettingState;
  return { rentBidsForMe };
};
export default connect(mapStateToProps, {

})(BidsForMe);
