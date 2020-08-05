import React, { Component } from 'react';
import { View, StatusBar, FlatList } from 'react-native';
import { connect } from 'react-redux';
import UserSearchBar from './exploreScreen/UserSearchBar';
import TrendingUsers from './exploreScreen/TrendingUsers';
import TrendingPosts from './exploreScreen/TrendingPosts';

import {
  videoPagePlayStatusUpdate,
  explorePageGetTrendingUsers,
  explorePageGetTrendingPosts
} from '../actions';

class ExplorePage extends Component {
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const { userToken } = this.props;
      this.props.videoPagePlayStatusUpdate({ homePageVideoPlay: false, celebPageVideoPlay: false });
      this.props.explorePageGetTrendingUsers({ userToken });
      this.props.explorePageGetTrendingPosts({ userToken });
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <StatusBar hidden />
          <FlatList
            listKey={'mainPersonalList'}
            ListHeaderComponent={<UserSearchBar />}
            ListFooterComponent={
              <View>
                <TrendingUsers />
                <TrendingPosts />
              </View>
            }
            data={[]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => {}}
          />
      </View>
    );
  }
}

const mapStateToProps = ({ personalPageState }) => {
    const { userToken } = personalPageState;
    return { userToken };
};

export default connect(mapStateToProps, {
  videoPagePlayStatusUpdate,
  explorePageGetTrendingUsers,
  explorePageGetTrendingPosts
})(ExplorePage);
