import React from 'react';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  customPostListViewPageVisitAndSetData as _customPostListViewPageVisitAndSetData
} from '../../actions';

const WINDOW_WIDTH = Dimensions.get('window').width;
const ASSPECT_RATIO = 3 / 4;
const THUMBNAIL_WIDTH = WINDOW_WIDTH / 2;

// Convert Integer to String
const convertIntToString = (num) => {
  const precision = 0;
  const abbrev = ['', 'K', 'M', 'B'];
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(num)) / 3);
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
  const suffix = abbrev[order];
  return (num / Math.pow(10, order * 3)).toFixed(precision) + suffix;
};

const renderUserIconAndName = ({ userPic, userName }) => {
  return (
    <ListItem
      leftAvatar={{ source: { uri: userPic }, size: 35, containerStyle: { margin: 0, padding: 0 } }}
      title={userName}
      titleStyle={{ fontSize: 13, width: THUMBNAIL_WIDTH, margin: 0, marginLeft: -7, marginTop: 7 }}
      titleProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
      containerStyle={{ margin: 0, padding: 0, marginTop: 10, alignItems: 'flex-start' }}
    />
  );
};

const renderLikesComments = ({ totalLikes, totalComments }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
      <Button
        type={'clear'}
        icon={{
          name: 'heart-o',
          type: 'font-awesome',
          size: 25,
          color: '#808080'
        }}
        title={convertIntToString(totalLikes)}
        titleStyle={{ color: '#808080' }}
      />
      <Button
        type={'clear'}
        icon={{
          name: 'comment-o',
          type: 'font-awesome',
          size: 25,
          color: '#808080'
        }}
        title={convertIntToString(totalComments)}
        titleStyle={{ color: '#808080' }}
      />
    </View>
  );
};

const renderItem = ({ item, index, trendingPosts, customPostListViewPageVisitAndSetData }) => {
  const { userPic, userName, thumbnailUrl, mediaType, uploadUrl, caption, totalLikes, totalComments } = item;
  let imageUri = '';
  if (mediaType === 'video') {
    imageUri = thumbnailUrl;
  } else {
    imageUri = uploadUrl;
  }
  return (
    <TouchableOpacity onPress={() => customPostListViewPageVisitAndSetData({ customFeedData: trendingPosts, postIndex: index })}>
      <Card containerStyle={styles.containerStyle}>
        <Image
          source={{ uri: imageUri }}
          style={styles.imageStyle}
        />
          <Text style={{ marginTop: 5, fontSize: 13, color: '#808080' }} numberOfLines={3} ellipsizeMode={'head'}>
            {caption}
          </Text>
          {renderUserIconAndName({ userPic, userName })}
          {renderLikesComments({ totalLikes, totalComments })}
      </Card>
    </TouchableOpacity>
  );
};


const TrendingPosts = ({ trendingPosts,
  customPostListViewPageVisitAndSetData }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}> Trending Posts </Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={trendingPosts}
        numColumns={2}
        renderItem={({ item, index }) => renderItem({ item, index, trendingPosts, customPostListViewPageVisitAndSetData })}
        style={{ borderRadius: 10, margin: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#707070',
    marginLeft: 5,
    fontSize: 18,
    marginBottom: 10
  },
  containerStyle: {
    height: 150 + (THUMBNAIL_WIDTH / ASSPECT_RATIO),
    width: THUMBNAIL_WIDTH - 8,
    padding: 3,
    margin: 2,
    marginBottom: 2,
    flex: 1
  },
  imageStyle: {
    height: THUMBNAIL_WIDTH / ASSPECT_RATIO,
    margin: 0,
    padding: 0
  }
});


const mapStateToProps = ({ explorePageState }) => {
    const { trendingPosts } = explorePageState;
    return { trendingPosts };
};
export default connect(mapStateToProps, {
  customPostListViewPageVisitAndSetData: _customPostListViewPageVisitAndSetData
})(TrendingPosts);
