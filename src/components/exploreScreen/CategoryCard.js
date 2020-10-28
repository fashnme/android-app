import React from 'react';
import { View, Text, Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const WINDOW_WIDTH = Dimensions.get('window').width;
const ASSPECT_RATIO = 1;
const THUMBNAIL_WIDTH = WINDOW_WIDTH * 0.44;


const CategoryCard = ({ imageUri, imagePath, title, onPress }) => {
  try {
    return (
      <TouchableOpacity onPress={onPress}>
        <View>
          <ImageBackground
            source={{ uri: imagePath }}
            style={styles.imageStyle}
          >
          <View style={{ backgroundColor: 'white', alignSelf: 'flex-start', flexDirection: 'row' }}>
            <Text style={{ fontSize: 14, color: '#050505', margin: 8, marginRight: 10, marginLeft: 10, fontWeight: 'bold', textAlignVertical: 'center' }}>
              {title}
            </Text>
            <Icon
              name='arrowright'
              color='#050505'
              type='antdesign'
              size={20}
              containerStyle={{ margin: 0, justifyContent: 'center', marginRight: 10, backgroundColor: 'white' }}
            />
          </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  } catch (error) {
    console.log('CategoryCard Error', error);
    return (
      <TouchableOpacity onPress={onPress}>
        <View>
          <ImageBackground
            source={{ uri: imageUri }}
            style={styles.imageStyle}
          >
          <View style={{ backgroundColor: 'white', alignSelf: 'flex-start', flexDirection: 'row' }}>
            <Text style={{ fontSize: 14, color: '#050505', margin: 8, marginRight: 10, marginLeft: 10, fontWeight: 'bold', textAlignVertical: 'center' }}>
              {title}
            </Text>
            <Icon
              name='arrowright'
              color='#050505'
              type='antdesign'
              size={20}
              containerStyle={{ margin: 0, justifyContent: 'center', marginRight: 10, backgroundColor: 'white' }}
            />
          </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#707070',
    marginLeft: 5,
    fontSize: 18,
    marginBottom: 10
  },
  containerStyle: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',

  },
  imageStyle: {
    height: THUMBNAIL_WIDTH / ASSPECT_RATIO,
    width: THUMBNAIL_WIDTH,
    overflow: 'hidden',
    borderRadius: 4,
    justifyContent: 'flex-end',
  }
});

export default CategoryCard;
