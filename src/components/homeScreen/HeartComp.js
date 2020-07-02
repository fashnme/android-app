import React from 'react';
import { View, Text, TouchableNativeFeedback, Image } from 'react-native';
// import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

const convertIntToString = (num) => {
  if (String(num).length >= 7) {
    return `${String(num / 1000000)}M`;
  } else if (String(num).length >= 4) {
    return `${String(num / 1000)}K`;
  }
  return num;
};

const HeartComp = ({ postId, likes, onLikePress, onUnlikePress, likedPosts }) => {
  // console.log('HeartComp', postId, likedPosts, postId in likedPosts);
  if (postId in likedPosts) {
    // return (
    //   <TouchableNativeFeedback onPress={onUnlikePress}>
    //     <View>
    //       <Icon
    //         name='heart'
    //         type='font-awesome'
    //         color='#f00'
    //         size={32}
    //         iconStyle={styles.icons}
    //       />
    //       <Text style={styles.actionCaption}>{convertIntToString(likes + 1)}</Text>
    //     </View>
    //   </TouchableNativeFeedback>
    // );
    return (
      <View style={styles.icons}>
        <TouchableNativeFeedback onPress={onUnlikePress}>
          <View>
            <Image
              style={[{ width: 70, height: 70 }]}
              source={require('../../resources/icons/liked_icon.png')}
            />
            <Text style={styles.actionCaption}>{convertIntToString(likes + 1)}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
  // return (
  //   <View>
  //     <Icon
  //       name='heart'
  //       type='font-awesome'
  //       color='#fafafa'
  //       size={32}
  //       onPress={onLikePress}
  //       iconStyle={styles.icons}
  //     />
  //     <Text style={styles.actionCaption}>{convertIntToString(likes)}</Text>
  //   </View>
  return (
      <TouchableNativeFeedback onPress={onLikePress}>
        <View style={styles.icons}>
          <Image
            style={[{ width: 70, height: 70 }]}
            source={require('../../resources/icons/not_liked_icon.png')}
          />
          <Text style={styles.actionCaption}>{convertIntToString(likes + 1)}</Text>
        </View>
      </TouchableNativeFeedback>
  );
};

const styles = {
  icons: {
    marginTop: 30,
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
  actionCaption: {
    color: 'white',
    textAlign: 'center',
  }
};

const mapStateToProps = ({ userActionData }) => {
    const { likedPosts } = userActionData;
    return { likedPosts };
};
export default connect(mapStateToProps)(HeartComp);
