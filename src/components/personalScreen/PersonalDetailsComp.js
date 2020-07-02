import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, SocialIcon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {
  celebrityPageSocialIconClicked as _celebrityPageSocialIconClicked
} from '../../actions';

// Social Icon Component
const SocialIconButton = ({ name, clicked, profile }) => {
  return (
      <SocialIcon
        iconSize={15}
        style={{ height: 25, width: 25 }}
        onPress={() => clicked({ name, profile })}
        type={name}
      />
  );
};

// Convert Integer to String
const convertIntToString = (num) => {
  if (String(num).length >= 7) {
    return `${String(num / 1000000)}M`;
  } else if (String(num).length >= 4) {
    return `${String(num / 1000)}K`;
  }
  return num;
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
        source={{
          uri: profilePic,
        }}
        size={80}
        activeOpacity={0.7}
        containerStyle={{ borderColor: 'black', borderWidth: 1 }}
        onPress={() => console.log('Profile clicked')}
      />
    );
};

const PersonalDetailsComp = ({ userDetails, celebrityPageSocialIconClicked }) => {
  const { profilePic, userName, followingCount, followersCount, totalLikes, bio } = userDetails;
  return (
    <View style={{ flex: 1 }}>
        <View style={styles.profile}>
          {renderAvatar({ profilePic })}
          <Text style={styles.userName}>@{userName}</Text>
          <View style={styles.userData}>
            {userDetailBlock(followingCount, 'Following', false)}
            {userDetailBlock(followersCount, 'Fans', true)}
            {userDetailBlock(totalLikes, 'Loved', false)}
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={['instagram', 'facebook', 'twitter', 'linkedin']}
              keyExtractor={(index, it) => it + index.toString()}
              renderItem={({ item }) => <SocialIconButton name={item} clicked={celebrityPageSocialIconClicked} profile={'test'} />}
            />
          </View>
          <Text numberOfLines={3} style={styles.userBio}>
            {bio}
          </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    padding: 10,
    paddingBottom: 20
  },
  userName: {
    fontSize: 18,
    marginTop: 10,
  },
  userData: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  userDataBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 90,
  },
  userDataBlockTitle: {
    opacity: 0.4,
  },
  userDataBlockMiddle: {
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderColor: '#EAF0F1',
  },
  userDataBlockValue: {},
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
    width: '60%',
    textAlign: 'center',
    opacity: 0.6,
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