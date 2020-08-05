import React from 'react';
import { View, Text, TouchableNativeFeedback, Image } from 'react-native';
// import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';


// Convert Integer to String
const convertIntToString = (num) => {
  const precision = 0;
  const abbrev = ['', 'K', 'M', 'B'];
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(num)) / 3);
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
  const suffix = abbrev[order];
  return (num / Math.pow(10, order * 3)).toFixed(precision) + suffix;
};

const HeartComp = ({ postId, likes, onLikePress, onUnlikePress, likedPosts }) => {
  // console.log('HeartComp', postId, likedPosts, postId in likedPosts);
  if (postId in likedPosts) {
    return (
      <View style={styles.icons}>
        <TouchableNativeFeedback onPress={onUnlikePress}>
          <View>
            <Image
              style={[{ width: 46, height: 46, justifyContent: 'center', alignSelf: 'center' }]}
              source={require('../../resources/icons/liked_icon.png')}
            />
            <Text style={styles.actionCaption}>{convertIntToString(likes + 1)}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
  return (
      <TouchableNativeFeedback onPress={onLikePress}>
        <View style={styles.icons}>
          <Image
            style={[{ width: 46, height: 46, justifyContent: 'center', alignSelf: 'center' }]}
            source={require('../../resources/icons/not_liked_icon.png')}
          />
          <Text style={styles.actionCaption}>{convertIntToString(likes)}</Text>
        </View>
      </TouchableNativeFeedback>
  );
};

const styles = {
  icons: {
    marginTop: 30,
    textShadowColor: 'black',
    textShadowRadius: 10,
    elevation: 10
  },
  actionCaption: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
};

const mapStateToProps = ({ userActionData }) => {
    const { likedPosts } = userActionData;
    return { likedPosts };
};
export default connect(mapStateToProps)(HeartComp);
