import React from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';

const SettingsPage = () => {
  return (
    <View>
      <Header
        leftComponent={<View />}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={<View />}
        backgroundColor={'#fff'}
      />
      <Text>
        Settings Page
      </Text>
    </View>
  );
};

export default SettingsPage;
