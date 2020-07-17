import React from 'react';
import { View, Text, Dimensions, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const rowWidth = screenWidth;
const aspectRatio = 347 / 300; // Image's Height / Width


const EmptyPage = ({ title, subtitle }) => {
  return (
    <View>
      <Card containerStyle={styles.cardContainer}>
        <ImageBackground
          imageStyle={styles.imageStyle}
          style={styles.imageStyle}
          source={require('../../resources/background/empty-page-background.png')}
          resizeMode="cover"
        >
          <View style={{ justifyContent: 'flex-start', flex: 1, marginTop: 20, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#606060', textTransform: 'uppercase' }}>{title}</Text>
            <Text style={{ marginTop: 5, color: '#535665', textAlign: 'center' }}>{subtitle}</Text>
          </View>
        </ImageBackground>
      </Card>
    </View>
  );
};

const styles = {
  imageStyle: { height: rowWidth * aspectRatio, width: rowWidth, borderRadius: 10 },
  cardContainer: {
    margin: 0,
    flex: 1,
    borderWidth: 0,
    alignItems: 'center',
    padding: 0,
    height: screenHeight,
    width: screenWidth,
  }
};

export { EmptyPage };
