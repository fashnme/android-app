import React, { Component } from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import PersonalDetailsComp from './personalScreen/PersonalDetailsComp';
import PersonalPostsComp from './personalScreen/PersonalPostsComp';
import {
  personalPageVisitAndSetData,
  celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts
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
     const { personalUserId, userToken } = this.props;
     this.props.personalPageVisitAndSetData({ userToken, userId: personalUserId });
     // Setting the First Request Data for User's own Liked and posted posts
     this.props.celebrityPageGetUserPosts({ userId: personalUserId, userToken, selfPostPageNum: 1 });
     this.props.celebrityPageGetUserLikedPosts({ userId: personalUserId, userToken, postLikedPageNum: 1 });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
          <Header
            backgroundColor={'white'}
            placement={'center'}
            centerComponent={{ text: this.props.fullName, style: { color: 'gray', fontWeight: 'bold', fontSize: 17 } }}
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
  const { fullName } = personalUserDetails;
  return { personalUserId, userToken, fullName };
};

export default connect(mapStateToProps, {
  personalPageVisitAndSetData,
  celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts
})(PersonalPage);
