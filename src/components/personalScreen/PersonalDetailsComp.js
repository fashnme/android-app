import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {
  celebrityPageSocialIconClicked as _celebrityPageSocialIconClicked
} from '../../actions';


const socialFlatlistData = [
  { name: 'instagram', logoResource: require('../../resources/icons/instagram.png') },
  { name: 'facebook', logoResource: require('../../resources/icons/facebook.png') },
  { name: 'twitter', logoResource: require('../../resources/icons/twitter.png') },
  { name: 'youtube', logoResource: require('../../resources/icons/youtube.png') },
];


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
      <Text style={styles.userDataBlockTitle}>{title}</Text>
      <Text style={styles.userDataBlockValue}>{convertIntToString(value)}</Text>
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

const PersonalDetailsComp = ({ userDetails, celebrityPageSocialIconClicked }) => {
  const { profilePic, fullName, followingCount, followersCount, totalLikes, bio, socialMediaLinks } = userDetails;
  // console.log('PersonalDetailsComp userDetails', userDetails);
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
            {userDetailBlock(followersCount, 'Followers', true)}
            {userDetailBlock(totalLikes, 'Likes', false)}
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={socialFlatlistData}
              keyExtractor={(index, it) => it + index.toString()}
              renderItem={({ item }) => renderSocialIcon({ item, socialMediaLinks, celebrityPageSocialIconClicked })}
              // <SocialIconButton name={item} clicked={celebrityPageSocialIconClicked} profile={'test'} />
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
    justifyContent: 'center',
    margin: 15,
    width: '100%'
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
    marginBottom: 10,
    marginTop: 5
  },
  socialIconImage: {
    width: 30,
    height: 30,
    margin: 10,
    borderRadius: 5
  }
});

const mapStateToProps = ({ celebPageState, homePageState }) => {
    const { userDetails } = celebPageState;
    const { userToken } = homePageState;
    return { userDetails, userToken };
};

export default connect(mapStateToProps, {
  celebrityPageSocialIconClicked: _celebrityPageSocialIconClicked
})(PersonalDetailsComp);
