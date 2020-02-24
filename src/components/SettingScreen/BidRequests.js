import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {
  accountSettingsGetBidsByMe,
  accountSettingsGetBidsForMe
} from '../../actions';
import BidsForMe from './BidsForMe';
import BidsByMe from './BidsByMe';

const initialLayout = { width: Dimensions.get('window').width };


class BidRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
       index: 0,
       routes: [
         { key: 'bidsForMe', title: 'For You' },
         { key: 'bidsByMe', title: 'By You' },
       ]
     };
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction();
    });
  }
  componentWillUnmount() {
      this.focusListener.remove();
  }
  onFocusFunction() {
     const { userToken } = this.props;
     this.props.accountSettingsGetBidsByMe({ userToken });
     this.props.accountSettingsGetBidsForMe({ userToken });
  }

  render() {
    const renderScene = ({ route }) => {
      switch (route.key) {
        case 'bidsForMe':
          return <BidsForMe />;

        case 'bidsByMe':
          return <BidsByMe />;

        default:
          return <View />;
      }
    };
    const { index, routes } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor={'white'}
          placement={'left'}
          leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => { Actions.pop(); } }}
          centerComponent={{ text: 'REQUESTS', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
          containerStyle={{ paddingTop: 0, height: 56 }}
        />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={(i) => { this.setState({ index: i }); }}
          initialLayout={initialLayout}
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
  accountSettingsGetBidsByMe,
  accountSettingsGetBidsForMe
})(BidRequests);
