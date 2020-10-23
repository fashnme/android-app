import React, { Component } from 'react';
import { View, StatusBar, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import UserSearchBar from './UserSearchBar';
import TrendingUsers from './TrendingUsers';
import TrendingPosts from './TrendingPosts';

import {
  videoPagePlayStatusUpdate,
  explorePageGetTrendingUsers,
  explorePageGetTrendingPosts
} from '../../actions';

class TrendingScreen extends Component {
  componentDidMount() {
    const { userToken } = this.props;
    this.props.explorePageGetTrendingUsers({ userToken });
    this.props.explorePageGetTrendingPosts({ userToken });
  }
  componentWillUnmount() {
    // this.focusListener.remove();
  }

  render() {
    // const { userToken, explorePageLoading } = this.props;
    const { explorePageLoading } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar hidden />
          <UserSearchBar />
          <FlatList
            listKey={'exploreList'}
            ListHeaderComponent={<TrendingUsers />}
            ListFooterComponent={<TrendingPosts />}
            data={[]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => {}}
            refreshControl={
              <RefreshControl
                // onRefresh={() => this.props.explorePageGetTrendingPosts({ userToken })} // Testing Maybe it is good to not fetch everytime
                refreshing={explorePageLoading}
                colors={['#D5252D', '#FE19AA']}
              />
            }
            refreshing={explorePageLoading}
          />
      </View>
    );
  }
}

const mapStateToProps = ({ personalPageState, explorePageState }) => {
    const { userToken } = personalPageState;
    const { explorePageLoading } = explorePageState;
    return { userToken, explorePageLoading };
};

export default connect(mapStateToProps, {
  videoPagePlayStatusUpdate,
  explorePageGetTrendingUsers,
  explorePageGetTrendingPosts
})(TrendingScreen);
