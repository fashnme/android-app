import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import UserDetailsComp from './celebScreen/UserDetailsComp';
import UserPostsComp from './celebScreen/UserPostsComp';
import {
  celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts
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
     const { userId, userToken } = this.props;
     // Setting the First Request Data for Celeb's Liked and posted posts 
     this.props.celebrityPageGetUserPosts({ userId, userToken, selfPostPageNum: 1 });
     this.props.celebrityPageGetUserLikedPosts({ userId, userToken, postLikedPageNum: 1 });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          listKey={'mainList'}
          ListHeaderComponent={<UserDetailsComp />}
          ListFooterComponent={<UserPostsComp />}
          data={['']}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => {}}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ celebPageState, homePageState }) => {
    const { userId } = celebPageState;
    const { userToken } = homePageState;
    return { userId, userToken };
};

export default connect(mapStateToProps, {
  celebrityPageGetUserPosts,
  celebrityPageGetUserLikedPosts
})(CelebrityPage);
