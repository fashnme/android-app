import React, { Component } from 'react';
import { View, FlatList, RefreshControl, Image, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
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
    const { userToken, userName, celebPageLoading, userId, isVerified } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor={'white'}
          placement={'center'}
          leftComponent={{ icon: 'arrow-left',
            type: 'font-awesome',
            color: '#e9e9e9',
            onPress: () => { Actions.pop(); },
            reverse: true,
            size: 18,
            reverseColor: '#FF416C',
            containerStyle: { marginLeft: -5, marginTop: 0, opacity: 0.8 },
          }}
          centerComponent={
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#808080', fontWeight: 'bold', fontSize: 19 }}>@{userName}</Text>
              { isVerified ? <Image source={require('../resources/icons/verifiedUser.png')} style={{ height: 22, width: 22, margin: 0, marginLeft: 3 }} /> : <View /> }
            </View>
          }
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
    const { userName, isVerified } = userDetails;
    const { userToken } = personalPageState;
    return { userToken, userName, celebPageLoading, userId, isVerified };
};

export default connect(mapStateToProps, {
  celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts,
  videoPagePlayStatusUpdate,
  celebrityPageGetCelebData
})(CelebrityPage);
