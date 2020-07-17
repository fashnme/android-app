import React, { Component } from 'react';
import { AppState, View } from 'react-native';
import { connect } from 'react-redux';
import { videoPagePlayStatusUpdate } from '../../actions';

class BackgroundStateHandler extends Component {
  constructor() {
    super();
    this.state = {
      appState: AppState.currentState
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
  }

  handleAppStateChange(nextAppState) {
    const { previousState } = this.props;
    console.log(nextAppState, previousState);
    if (nextAppState === 'background') {
      this.props.videoPagePlayStatusUpdate({ homePageVideoPlay: false, celebPageVideoPlay: false });
    }
    if (nextAppState === 'active') {
      const { homePageVideoPlay, celebPageVideoPlay } = previousState;
      this.props.videoPagePlayStatusUpdate({ homePageVideoPlay, celebPageVideoPlay });
    }
    this.setState({ appState: nextAppState });
  }

  render() {
    return <View />;
  }
}

const mapStateToProps = ({ videoPlayStatusState }) => {
  const { previousState } = videoPlayStatusState;
  return { previousState };
};

export default connect(mapStateToProps, {
  videoPagePlayStatusUpdate
})(BackgroundStateHandler);
