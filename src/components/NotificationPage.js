import React, { Component } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Header, ListItem, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { EmptyPage } from './basic';

import {
  notificationPageGetNotifcations
} from '../actions';

class NotificationPage extends Component {
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
     this.props.notificationPageGetNotifcations({ userToken, notificationPage: 1 });
  }

  rightImage(source) {
    return (
      <Image
        source={source}
        style={styles.rightImage}
      />
    );
  }

  timeDifference(timestamp) {
    const previous = new Date(timestamp).getTime();
    const current = new Date().getTime();
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = current - previous;
    if (elapsed < msPerMinute) return `${Math.round(elapsed / 1000) + 5}s ago`;
    else if (elapsed < msPerHour) return `${Math.round(elapsed / msPerMinute)}min ago`;
    else if (elapsed < msPerDay) return `${Math.round(elapsed / msPerHour)}h ago`;
    else if (elapsed < msPerMonth) return `${Math.round(elapsed / msPerDay)}d ago`;
    else if (elapsed < msPerYear) return `${Math.round(elapsed / msPerMonth)}m ago`;
    return `${Math.round(elapsed / msPerYear)}y ago`;
  }

  likeNotifcation({ image, body, timeStamp }) {
    return (
      <Card containerStyle={styles.cardContainer}>
        <ListItem
          leftAvatar={{ source: { uri: image }, size: 55, containerStyle: { padding: 0, marginTop: 5 } }}
          title={body}
          titleStyle={styles.title}
          subtitle={this.timeDifference(timeStamp)}
          subtitleStyle={{ marginTop: 10, padding: 0 }}
          containerStyle={styles.containerStyle}
          rightElement={this.rightImage(require('../resources/icons/like.png'))}
          // onPress={() => {}}
          // bottomDivider
        />
      </Card>
    );
  }

  followNotifcation({ image, body, timeStamp }) {
    return (
      <Card containerStyle={styles.cardContainer}>
        <ListItem
          leftAvatar={{ source: { uri: image }, size: 55, containerStyle: { padding: 0, marginTop: 5 } }}
          title={body}
          titleStyle={styles.title}
          subtitle={this.timeDifference(timeStamp)}
          subtitleStyle={{ marginTop: 10, padding: 0 }}
          containerStyle={styles.containerStyle}
          rightElement={this.rightImage(require('../resources/icons/follow.png'))}
          contentContainerStyle={{ margin: 0, padding: 0 }}
          // onPress={() => {}}
          // bottomDivider
        />
      </Card>
    );
  }
  renderItem({ item }) {
    const { notificationAction, image, body, timeStamp } = item;
    switch (notificationAction) {
      case 'like_post':
        return this.likeNotifcation({ image, body, timeStamp });
      case 'follow_user':
        return this.followNotifcation({ image, body, timeStamp });
      default:
        return <View />;
    }
  }

  render() {
    const { notificationArray } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor={'white'}
          placement={'center'}
          centerComponent={{ text: 'Activities', style: { color: '#808080', fontWeight: 'bold', fontSize: 19 } }}
          containerStyle={{ paddingTop: 0, height: 46 }}
        />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={notificationArray}
          renderItem={this.renderItem.bind(this)}
          ListEmptyComponent={<EmptyPage title={'No New Notification!'} subtitle={''} />}
        />
      </View>
    );
  }
}

const styles = {
  title: {
      opacity: 0.8,
      padding: 0,
      margin: 0
  },
  containerStyle: {
    margin: 5,
    paddingLeft: 5,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 5
  },
  cardContainer: {
    margin: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    padding: 0
  },
  rightImage: { height: 32, width: 32, marginTop: 5, marginRight: 5 }
};

const mapStateToProps = ({ notificationState, personalPageState }) => {
  const { userToken } = personalPageState;
  const { notificationArray } = notificationState;
  return { userToken, notificationArray };
};

export default connect(mapStateToProps, {
  notificationPageGetNotifcations
})(NotificationPage);
