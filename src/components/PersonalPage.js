import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import UserDetailsComp from './celebScreen/UserDetailsComp';
import UserPostsComp from './celebScreen/UserPostsComp';
import { celebrityPageVisitAndSetData } from '../actions';

class PersonalPage extends Component {
  async componentDidMount() {
    // const { personalUserId, userToken } = this.props;
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
    this.onFocusFunction();
  });
    // this.props.celebrityPageVisitAndSetData({ userToken, userId: personalUserId, isPersonalPage: true });
  }
  componentWillUnmount() {
  this.focusListener.remove();
}
  onFocusFunction() {
  // do some stuff on every screen focus
   const { personalUserId, userToken } = this.props;
   this.props.celebrityPageVisitAndSetData({ userToken, userId: personalUserId, isPersonalPage: true });
}

  render() {
    // const { userId, personalUserId, userToken } = this.props;

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

const mapStateToProps = ({ personalPageState, celebPageState }) => {
  const { personalUserId, userToken } = personalPageState;
  const { userId } = celebPageState;
  if (userId !== personalUserId) {
    console.log('PersonalPage', userId, personalUserId);
    // this.props.celebrityPageVisitAndSetData({ userToken, userId: personalUserId, isPersonalPage: true });
  }
  return { personalUserId, userToken, userId };
};

export default connect(mapStateToProps, {
  celebrityPageVisitAndSetData
})(PersonalPage);
