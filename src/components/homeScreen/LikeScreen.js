import React from 'react';
import {
  View,
  Text,
} from 'react-native';

// const screenWidth = Dimensions.get('window').width;
// const height = Dimensions.get('window').height + StatusBar.currentHeight;

const LikeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>
              Like
            </Text>
          </View>
    </View>
  );
};


const styles = {
  viewStyle: {
    backgroundColor: 'green',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
	textStyle: {
    color: 'white',
    fontSize: 50,
  }
};

export default LikeScreen;
