import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import UserDetailsComp from './celebScreen/UserDetailsComp';
import UserPostsComp from './celebScreen/UserPostsComp';
import { celebrityPageVisitAndSetData } from '../actions';

class PersonalPage extends Component {
  async componentDidMount() {
    // const { personalUserId, userToken } = this.props;
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction();
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }
  onFocusFunction() {
   const { personalUserId, userToken } = this.props;
   this.props.celebrityPageVisitAndSetData({ userToken, userId: personalUserId, isPersonalPage: true });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          rightComponent={{ icon: 'chevron-left', size: 30, onPress: () => { console.log('Right Pressed'); } }}
          centerComponent={{ text: 'Edit Profile', style: { color: 'black', fontSize: 18, fontWeight: 'bold' } }}
          containerStyle={{ backgroundColor: 'white', justifyContent: 'space-around' }}
        />
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
  }
  return { personalUserId, userToken, userId };
};

export default connect(mapStateToProps, {
  celebrityPageVisitAndSetData
})(PersonalPage);
