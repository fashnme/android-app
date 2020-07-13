import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

const WINDOW_WIDTH = Dimensions.get('window').width;
const ASSPECT_RATIO = 3 / 4;
const THUMBNAIL_WIDTH = WINDOW_WIDTH / 3;

const confirmDeletePressed = ({ onDeletePress }) => {
  Alert.alert(
   'Delete the Post',
   'Are you Sure?', [{
       text: 'No',
       onPress: () => {},
       style: 'cancel'
   }, {
       text: 'Yes',
       onPress: onDeletePress
   }], {
       cancelable: true
   }
);
};

const PostThumbnail = ({ imageUri, likes, onPress, showDeleteIcon, onDeletePress }) => {
  if (showDeleteIcon) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.postThumbnail}>
          <Image style={styles.postThumbnailImage} source={{ uri: imageUri }} />
          <View style={styles.postDetails}>
              <Icon
                name="trash"
                type="font-awesome"
                color="red"
                containerStyle={{ opacity: 1, marginTop: 5 }}
                size={24}
                onPress={() => confirmDeletePressed({ onDeletePress })}
                underlayColor={'white'}
                // raised
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
        <View style={styles.postDetails}>
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
    height: THUMBNAIL_WIDTH / ASSPECT_RATIO,
    width: THUMBNAIL_WIDTH,
    padding: 3,
  },
  postThumbnailImage: {
    flex: 1,
  },
  postDetails: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postThumbnailText: {
    color: 'white',
    opacity: 0.8,
  },
});

export default PostThumbnail;
