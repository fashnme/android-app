import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import UserDetailsComp from './celebScreen/UserDetailsComp';
import UserPostsComp from './celebScreen/UserPostsComp';
import { celebrityPageVisitAndSetData } from '../actions';

class PersonalPage extends Component {
  componentDidMount() {
    const { personalUserId, userToken } = this.props;
    this.props.celebrityPageVisitAndSetData({ userToken, userId: personalUserId, isPersonalPage: true });
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

const mapStateToProps = ({ personalPageState }) => {
  const { personalUserId, userToken } = personalPageState;
  return { personalUserId, userToken };
};

export default connect(mapStateToProps, {
  celebrityPageVisitAndSetData
})(PersonalPage);
