import React from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import { Avatar, Button, Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {
  celebrityPageFollow as _celebrityPageFollow, // Just to remove the Global Variable ESLint Error
  celebrityPageUnfollow as _celebrityPageUnfollow,
  celebrityPageSocialIconClicked as _celebrityPageSocialIconClicked
} from '../../actions';

const socialFlatlistData = [
  { name: 'instagram', logoResource: require('../../resources/icons/instagram.png') },
  { name: 'facebook', logoResource: require('../../resources/icons/facebook.png') },
  { name: 'twitter', logoResource: require('../../resources/icons/twitter.png') },
  { name: 'youtube', logoResource: require('../../resources/icons/youtube.png') },
];


// Social Icon Component
// const SocialIconButton = ({ name, clicked, profile }) => {
//   return (
//       <SocialIcon
//         iconSize={15}
//         style={{ height: 25, width: 25 }}
//         onPress={() => clicked({ name, profile })}
//         type={name}
//       />
//   );
// };

// Convert Integer to String
const convertIntToString = (num) => {
  const precision = 0;
  const abbrev = ['', 'K', 'M', 'B'];
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(num)) / 3);
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
  const suffix = abbrev[order];
  return (num / Math.pow(10, order * 3)).toFixed(precision) + suffix;
};

// Render the User Details Block : Following, Fans, Hearts
const userDetailBlock = (value, title, middle) => {
  return (
    <View style={middle ? [styles.userDataBlock, styles.userDataBlockMiddle] : styles.userDataBlock} >
      <Text style={styles.userDataBlockValue}>{convertIntToString(value)}</Text>
      <Text style={styles.userDataBlockTitle}>{title}</Text>
    </View>
  );
};

// Render User Avatar
const renderAvatar = ({ profilePic }) => {
    return (
      <Avatar
        rounded
        source={{ uri: profilePic }}
        size={100}
        activeOpacity={0.7}
        containerStyle={{ marginTop: 10 }}
        onPress={() => console.log('Profile clicked')}
      />
    );
};

// Render Follow/Unfollow Buttion
const renderFollowButton = ({ isFollowing, userId, userToken, celebrityPageFollow, celebrityPageUnfollow }) => {
  if (isFollowing) { // If following the users
    return (
      <Button
        onPress={() => celebrityPageUnfollow({ userToken, userId })}
        buttonStyle={styles.followingButton}
        title={'Following'}
      />
    );
  }
  return (
    <Button
      onPress={() => celebrityPageFollow({ userToken, userId })}
      buttonStyle={styles.followButton}
      title={'Follow'}
    />
  );
};

const renderSocialIcon = ({ item, socialMediaLinks, celebrityPageSocialIconClicked }) => {
  const { name, logoResource } = item;
  return (
    <TouchableNativeFeedback onPress={() => celebrityPageSocialIconClicked({ name, profile: socialMediaLinks[name] })}>
        <Image
          style={styles.socialIconImage}
          source={logoResource}
        />
    </TouchableNativeFeedback>
  );
};
const UserDetailsComp = ({ userDetails, isFollowing, userId, userToken, celebrityPageFollow, celebrityPageUnfollow, celebrityPageSocialIconClicked }) => {
  const { profilePic, fullName, followingCount, socialMediaLinks, followersCount, totalLikes, bio } = userDetails;
  return (
    <Card containerStyle={styles.cardContainer}>
        <View style={styles.profile}>
          {renderAvatar({ profilePic })}
          <Text style={styles.userName}>{fullName}</Text>
          <Text numberOfLines={4} style={styles.userBio}>
            {bio}
          </Text>
          <View style={styles.userData}>
            {userDetailBlock(followingCount, 'Following', false)}
            {isFollowing ? userDetailBlock(followersCount + 1, 'Followers', true) : userDetailBlock(followersCount, 'Followers', true)}
            {userDetailBlock(totalLikes, 'Likes', false)}
          </View>
          {renderFollowButton({ isFollowing, userId, userToken, celebrityPageFollow, celebrityPageUnfollow })}
          <View style={{ flex: 1, marginTop: 25 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={socialFlatlistData}
              keyExtractor={(index, it) => it + index.toString()}
              renderItem={({ item }) => renderSocialIcon({ item, socialMediaLinks, celebrityPageSocialIconClicked })}
            />
          </View>
        </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    padding: 10,
    paddingBottom: 20
  },
  userName: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#606060'
  },
  userData: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 15,
  },
  userDataBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 90,
  },
  userDataBlockTitle: {
    opacity: 0.4,
    fontSize: 15
  },
  userDataBlockMiddle: {
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderColor: '#EAF0F1',
  },
  userDataBlockValue: {
    marginTop: 4,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#606060'
  },
  followButton: {
    backgroundColor: 'red',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  followingButton: {
    backgroundColor: 'grey',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  userBio: {
    fontSize: 14,
    width: '80%',
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 10
  },
  cardContainer: {
    flex: 1,
    margin: 0,
    padding: 0,
    borderRadius: 12,
    marginBottom: 5,
    marginTop: 5
  },
  socialIconImage: {
    width: 30,
    height: 30,
    margin: 10,
    borderRadius: 5
  }
});

const mapStateToProps = ({ userActionData, celebPageState, personalPageState }) => {
    const { followingDataMap } = userActionData;
    const { userDetails, userId } = celebPageState;
    const { userToken } = personalPageState;
    let isFollowing = false;
    if (userId in followingDataMap) {
      isFollowing = true;
    }
    return { userDetails, isFollowing, userId, userToken };
};

export default connect(mapStateToProps, {
  celebrityPageFollow: _celebrityPageFollow,
  celebrityPageUnfollow: _celebrityPageUnfollow,
  celebrityPageSocialIconClicked: _celebrityPageSocialIconClicked
})(UserDetailsComp);
