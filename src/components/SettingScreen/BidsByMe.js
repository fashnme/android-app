import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
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
  // console.log('BidsByMe', deliveryDetails);
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
        title={'Edit'}
        raised
        containerStyle={{ width: 80 }}
        titleStyle={{ color: '#fb56c1', fontWeight: 'bold' }}
        buttonStyle={{ borderColor: '#fb56c1', borderWidth: 1 }}
        type={'outline'}
        onPress={() => { }} // Visit BidUpdatePage to update Bid
      />
      <Button
        title={'Cancel'}
        raised
        containerStyle={{ width: 80 }}
        titleStyle={{ color: '#ee5f73', fontWeight: 'bold' }}
        buttonStyle={{ borderColor: '#ee5f73', borderWidth: 1 }}
        type={'outline'}
        onPress={() => { Actions.bidCancelPage({ bidId }); }} // Visit BidCancelPage to Cancel & take response
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

const BidsByMe = ({ rentBidsByMe }) => {
  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={rentBidsByMe}
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
  const { rentBidsByMe } = accountSettingState;
  return { rentBidsByMe };
};

export default connect(mapStateToProps)(BidsByMe);
