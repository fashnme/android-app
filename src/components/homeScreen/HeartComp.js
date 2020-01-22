import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

const HeartComp = ({ postId, text, onLikePress, onUnlikePress, likedPosts }) => {
  if (postId in likedPosts) {
    return (
      <View>
        <Icon
          name='heart'
          type='font-awesome'
          color='#f00'
          size={32}
          onPress={onUnlikePress}
          iconStyle={styles.icons}
        />
        <Text style={styles.actionCaption}>{text}</Text>
      </View>
    );
  }

  return (
    <View>
      <Icon
        name='heart'
        type='font-awesome'
        color='#fafafa'
        size={32}
        onPress={onLikePress}
        iconStyle={styles.icons}
      />
      <Text style={styles.actionCaption}>{text}</Text>
    </View>
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
