import React from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabView, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import PostThumbnail from './PostThumbnail';
import { EmptyPage } from '../basic';

import {
  celebrityPageGetUserPosts as _celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts as _celebrityPageGetUserLikedPosts,
  customPostListViewPageVisitAndSetData as _customPostListViewPageVisitAndSetData,
  personalPageDeletePost as _personalPageDeletePost
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

const UserPosts = ({ postsData, selfPostPageNum, userId, userToken,
      getMethod, customPostListViewPageVisitAndSetData, personalPageDeletePost }) => {
  // console.log('UserPostsComp UserPosts', postsData);
  return (
    <FlatList
      data={postsData}
      listKey={'postList'}
      numColumns={3}
      renderItem={({ item, index }) => {
          return (
            <PostThumbnail
              imageUri={item.mediaType === 'image' ? item.uploadUrl : item.thumbnailUrl}
              likes={item.totalLikes}
              onPress={() => customPostListViewPageVisitAndSetData({ customFeedData: postsData, postIndex: index })}
              showDeleteIcon
              onDeletePress={() => personalPageDeletePost({ postId: item.postId, userToken })}
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

const LikedPosts = ({ postsData, postLikedPageNum, userId, userToken,
      getMethod, customPostListViewPageVisitAndSetData }) => {
  // console.log('UserPostsComp LikedPosts', postsData);
  return (
    <FlatList
      data={postsData}
      listKey={'likedPostList'}
      numColumns={3}
      renderItem={({ item, index }) => (
        <PostThumbnail
          imageUri={item.mediaType === 'image' ? item.uploadUrl : item.thumbnailUrl}
          likes={item.totalLikes}
          onPress={() => customPostListViewPageVisitAndSetData({ customFeedData: postsData, postIndex: index })}
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
  selfPostArray, postLikedArray, selfPostPageNum, postLikedPageNum, userId, userToken,
  personalPageDeletePost, celebrityPageGetUserPosts, celebrityPageGetUserLikedPosts, customPostListViewPageVisitAndSetData }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{ key: 'posts' }, { key: 'likedposts' }]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'posts':
        return (
          <UserPosts
              postsData={selfPostArray}
              getMethod={celebrityPageGetUserPosts}
              selfPostPageNum={selfPostPageNum}
              userId={userId}
              userToken={userToken}
              customPostListViewPageVisitAndSetData={customPostListViewPageVisitAndSetData}
              personalPageDeletePost={personalPageDeletePost}
          />
        );
      case 'likedposts':
        return (
          <LikedPosts
            postsData={postLikedArray}
            getMethod={celebrityPageGetUserLikedPosts}
            postLikedPageNum={postLikedPageNum}
            userId={userId}
            userToken={userToken}
            customPostListViewPageVisitAndSetData={customPostListViewPageVisitAndSetData}
          />
        );
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
    backgroundColor: 'white',
    // height: '50%'
  }
});

const mapStateToProps = ({ personalPageState }) => {
    // console.log('Length of selfPostArray', selfPostArray.length);
    const { personalUserId, ownPostsArray, userToken, selfLikedPostArray, ownPostPageNum, postLikedPageNum } = personalPageState;
    // Use the data from personalPageState & transform it, so that the component remains same as Celebrity component
    return {
      selfPostArray: ownPostsArray,
      postLikedArray: selfLikedPostArray,
      selfPostPageNum: ownPostPageNum,
      postLikedPageNum,
      userId: personalUserId,
      userToken
    };
};

export default connect(mapStateToProps, {
  celebrityPageGetUserPosts: _celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts: _celebrityPageGetUserLikedPosts,
  customPostListViewPageVisitAndSetData: _customPostListViewPageVisitAndSetData,
  personalPageDeletePost: _personalPageDeletePost
})(PersonalPostsComp);
