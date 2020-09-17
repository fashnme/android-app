import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const WINDOW_WIDTH = Dimensions.get('window').width;
const ASSPECT_RATIO = 3 / 4;
const THUMBNAIL_WIDTH = WINDOW_WIDTH / 3;
const THUMBNAIL_HEIGHT = THUMBNAIL_WIDTH / ASSPECT_RATIO;

const PostThumbnail = ({ imageUri, likes, onPress, mediaType }) => {
  if (mediaType === 'video') {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.postThumbnail}>
          <Image style={styles.postThumbnailImage} source={{ uri: imageUri }} />
          <View style={styles.postDetails}>
              <Icon
                name="md-play-circle"
                type="ionicon"
                color="white"
                containerStyle={{ opacity: 0.8, marginTop: 5 }}
                size={24}
              />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.postThumbnail}>
        <Image style={styles.postThumbnailImage} source={{ uri: imageUri }} />
        <View style={styles.postDetailsImage}>
            <Icon
              name="heart"
              type="font-awesome"
              color="white"
              containerStyle={{ opacity: 0.8, marginTop: 5 }}
              size={14}
            />
            <Text style={styles.postThumbnailText}> {likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postThumbnail: {
    height: THUMBNAIL_HEIGHT,
    width: THUMBNAIL_WIDTH,
    padding: 3,
  },
  postThumbnailImage: { flex: 1 },
  postDetails: {
    position: 'absolute',
    top: 3,
    right: 8,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  postDetailsImage: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postThumbnailText: { color: 'white', opacity: 0.8 },
});

export default PostThumbnail;
