import React, { Component } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import UserDetailsComp from './celebScreen/UserDetailsComp';
import UserPostsComp from './celebScreen/UserPostsComp';
import {
  celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts,
  videoPagePlayStatusUpdate,
  celebrityPageGetCelebData
} from '../actions';

class CelebrityPage extends Component {
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction();
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }
  onFocusFunction() {
     // const { userId, userToken } = this.props;
     // console.log({userId});
     // userId is coming from Actions.celebrityPage() calling in actions
     // Setting the First Request Data for Celeb's Liked and posted posts
     // this.props.celebrityPageGetUserPosts({ userId, userToken, selfPostPageNum: 1, isPersonalData: false });
     // this.props.celebrityPageGetUserLikedPosts({ userId, userToken, postLikedPageNum: 1, isPersonalData: false });
     this.props.videoPagePlayStatusUpdate({ homePageVideoPlay: false, celebPageVideoPlay: false });
  }

  render() {
    const { userToken, userName, celebPageLoading, userId } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor={'white'}
          placement={'center'}
          centerComponent={{ text: `@${userName}`, style: { color: '#808080', fontWeight: 'bold', fontSize: 19 } }}
          containerStyle={{ paddingTop: 0, height: 50 }}
        />
        <FlatList
          listKey={'mainList'}
          ListHeaderComponent={<UserDetailsComp />}
          ListFooterComponent={<UserPostsComp />}
          data={[]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => {}}
          refreshControl={
            <RefreshControl
              onRefresh={() => this.props.celebrityPageGetCelebData({ userId, userToken })}
              refreshing={celebPageLoading}
              colors={['#D5252D', '#FE19AA']}
            />
          }
          refreshing={celebPageLoading}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ celebPageState, personalPageState }) => {
    const { userDetails, celebPageLoading, userId } = celebPageState;
    const { userName } = userDetails;
    const { userToken } = personalPageState;
    return { userToken, userName, celebPageLoading, userId };
};

export default connect(mapStateToProps, {
  celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts,
  videoPagePlayStatusUpdate,
  celebrityPageGetCelebData
})(CelebrityPage);
