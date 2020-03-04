import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Header, Divider } from 'react-native-elements';

const RewardsPage = () => {
  return (
    <View>
    <Header
      backgroundColor={'white'}
      placement={'left'}
      leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => {} }}
      centerComponent={{ text: 'Rewards', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
      containerStyle={{ paddingTop: 0, height: 56 }}
    />
    </View>
  );
};

export default RewardsPage;
