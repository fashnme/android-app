import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Button } from 'react-native-elements';

const renderImage = ({ postContentUrl }) => {
  return (
    <View style={{ boderRadius: 4 }}>
      <Image source={{ uri: postContentUrl }} style={{ width: 100, height: 150, borderRadius: 5 }} />
    </View>
  );
};

const renderTitleComponent = ({ startDate, endDate, amount }) => {
  return (
    <View>
      <Text> { amount } { startDate } { endDate } </Text>
    </View>
  );
};

const renderItem = ({ item }) => {
  const { postContentUrl, startDate, endDate, amount, comment, category, deliveryDetails } = item;
  return (
    <ListItem
      title={renderTitleComponent({ postContentUrl, startDate, endDate, amount, comment, category, deliveryDetails })}
      subtitle={comment}
      leftAvatar={renderImage({ postContentUrl })}
      bottomDivider
      chevron
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

const mapStateToProps = ({ accountSettingState }) => {
  const { rentBidsForMe } = accountSettingState;
  return { rentBidsForMe };
};
export default connect(mapStateToProps, {

})(BidsForMe);
