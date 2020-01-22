import React from 'react';
import {
  View,
  Text,
} from 'react-native';

// const screenWidth = Dimensions.get('window').width;
// const height = Dimensions.get('window').height + StatusBar.currentHeight;

const DislikeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>
              Dislike
            </Text>
          </View>
    </View>
  );
};


const styles = {
  viewStyle: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
	textStyle: {
    color: 'white',
    fontSize: 50,
  }
};

export default DislikeScreen;
