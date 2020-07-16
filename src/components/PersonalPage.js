import React, { Component } from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import PersonalDetailsComp from './personalScreen/PersonalDetailsComp';
import PersonalPostsComp from './personalScreen/PersonalPostsComp';
import {
  personalPageSetData,
  celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts,
  videoPagePlayStatusUpdate
 } from '../actions';

class PersonalPage extends Component {
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction();
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }
  onFocusFunction() {
     const { userToken, personalUserId } = this.props;
     this.props.videoPagePlayStatusUpdate({ homePageVideoPlay: false, celebPageVideoPlay: false });
     this.props.personalPageSetData({ userToken });
     // Setting the First Request Data for User's own Liked and posted posts
     this.props.celebrityPageGetUserPosts({ userId: personalUserId, userToken, selfPostPageNum: 1, isPersonalData: true });
     this.props.celebrityPageGetUserLikedPosts({ userId: personalUserId, userToken, postLikedPageNum: 1, isPersonalData: true });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
          <Header
            backgroundColor={'white'}
            placement={'center'}
            centerComponent={{ text: `@${this.props.userName}`, style: { color: '#808080', fontWeight: 'bold', fontSize: 19 } }}
            rightComponent={{ icon: 'settings', color: '#ee5f73', size: 28, onPress: () => { Actions.settings(); } }}
            containerStyle={{ paddingTop: 0, height: 50 }}
          />
          <FlatList
            listKey={'mainPersonalList'}
            ListHeaderComponent={<PersonalDetailsComp />}
            ListFooterComponent={<PersonalPostsComp />}
            data={['']}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => {}}
          />
      </View>
    );
  }
}

const mapStateToProps = ({ personalPageState }) => {
  const { personalUserId, userToken, personalUserDetails } = personalPageState;
  const { userName } = personalUserDetails;
  return { personalUserId, userToken, userName };
};

export default connect(mapStateToProps, {
  personalPageSetData,
  celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts,
  videoPagePlayStatusUpdate
})(PersonalPage);
