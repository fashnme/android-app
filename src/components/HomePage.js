import React, { Component } from 'react';
import { View, } from 'react-native';
import { connect } from 'react-redux';
import {
  homePageGetInitialFeedData
} from '../actions';

class HomePage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleOpenURL = this.handleOpenURL.bind(this);
  // }

  componentDidMount() {
    // Getting the Initial Feed Data, when App in opened
    this.props.homePageGetInitialFeedData({ userToken: '' });
  }

  // componentWillUnmount() {
  //
  // }

  onRefresh() {

  }

  render() {
    const { feedData, feedPageNum } = this.props;
    console.log('HomePage', feedData, feedPageNum);
    return (
      <View />
    );
  }
}

// const styles = {
//
// };

const mapStateToProps = ({ homePageState }) => {
    const { feedData, feedPageNum } = homePageState;
    return { feedData, feedPageNum };
};

export default connect(mapStateToProps, {
  homePageGetInitialFeedData
})(HomePage);
