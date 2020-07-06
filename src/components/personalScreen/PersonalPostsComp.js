import React from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabView, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import PostThumbnail from './PostThumbnail';
import { EmptyPage } from '../basic';

import {
  celebrityPageGetUserPosts as _celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts as _celebrityPageGetUserLikedPosts
} from '../../actions';

const WINDOW_WIDTH = Dimensions.get('window').width;

const renderIcon = ({ route, focused }) => {
  if (route.key === 'posts') {
    return (<Icon name="list" type="font-awesome" color={focused ? 'red' : 'grey'} />);
  }
  return (<Icon name="heart" type="font-awesome" color={focused ? 'red' : 'grey'} />);
};

const renderTabBar = props => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: 'white' }}
      renderIcon={data => renderIcon(data)}
    />
  );
};

const UserPosts = ({ postsData, getMethod, selfPostPageNum, userId, userToken }) => {
  // console.log('UserPostsComp UserPosts', postsData);
  return (
    <FlatList
      data={postsData}
      listKey={'postList'}
      numColumns={3}
      renderItem={({ item }) => {
          return (
            <PostThumbnail
              imageUri={item.uploadUrl}
              likes={item.totalLikes}
              onPress={() => console.log('UserPosts Thumbnail Pressed')}
            />
          );
        }}
      ListEmptyComponent={<EmptyPage title={''} subtitle={'No Posts Found!'} />}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={() => console.log('UserPosts onEndReached', selfPostPageNum)}
      style={styles.postFeeds}
    />
  );
};

const LikedPosts = ({ postsData, getMethod, postLikedPageNum, userId, userToken }) => {
  // console.log('UserPostsComp LikedPosts', postsData);
  return (
    <FlatList
      data={postsData}
      listKey={'likedPostList'}
      numColumns={3}
      renderItem={({ item }) => (
        <PostThumbnail
          imageUri={item.uploadUrl}
          likes={item.totalLikes}
          onPress={() => console.log('LikedPosts Thumbnail Pressed')}
        />
      )}
      ListEmptyComponent={<EmptyPage title={''} subtitle={'No Posts Found!'} />}
      keyExtractor={(item, index) => index.toString() + item}
      onEndReached={() => console.log('LikedPosts onEndReached', postLikedPageNum)}
      style={styles.postFeeds}
    />
  );
};

const PersonalPostsComp = ({
  selfPostArray, postLikedArray, selfPostPageNum, postLikedPageNum, userId,
    userToken, celebrityPageGetUserPosts, celebrityPageGetUserLikedPosts }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{ key: 'posts' }, { key: 'likedposts' }]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'posts':
        return <UserPosts postsData={selfPostArray} getMethod={celebrityPageGetUserPosts} selfPostPageNum={selfPostPageNum} userId={userId} userToken={userToken} />;

      case 'likedposts':
        return <LikedPosts postsData={postLikedArray} getMethod={celebrityPageGetUserLikedPosts} postLikedPageNum={postLikedPageNum} userId={userId} userToken={userToken} />;

      default:
        return <View />;
    }
  };
  const initialLayout = { width: WINDOW_WIDTH };
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  postFeeds: {
    width: WINDOW_WIDTH,
    padding: 0,
  }
});

const mapStateToProps = ({ personalPageState, celebPageState, homePageState }) => {
    const { selfPostArray, postLikedArray, selfPostPageNum, postLikedPageNum } = celebPageState;
    const { userToken } = homePageState;
    const { personalUserId } = personalPageState;
    return { selfPostArray, postLikedArray, selfPostPageNum, postLikedPageNum, userId: personalUserId, userToken };
};

export default connect(mapStateToProps, {
  celebrityPageGetUserPosts: _celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts: _celebrityPageGetUserLikedPosts
})(PersonalPostsComp);
