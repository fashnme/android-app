import React, { Component } from 'react';
import { View, FlatList, Image, LayoutAnimation, RefreshControl, Linking } from 'react-native';
import { Header, ListItem, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { EmptyPage } from './basic';
// import dummy_notification from './dummy_notification';
import {
  notificationPageGetNotifcations,
  celebrityPageVisitAndSetData,
  customSinglePostViewPageVisitAndSetData,
  videoPagePlayStatusUpdate
} from '../actions';

class NotificationPage extends Component {
  componentDidMount() {
    LayoutAnimation.spring();
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
     this.props.videoPagePlayStatusUpdate({ homePageVideoPlay: false, celebPageVideoPlay: false });
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

  likeNotifcation({ item }) {
    const { image1, image2, body, timeStamp, likerId, postId } = item;
    const { userToken } = this.props;
    return (
      <Card containerStyle={styles.cardContainer}>
        <ListItem
          leftAvatar={{ source: { uri: image1 }, size: 55, containerStyle: { padding: 0, marginTop: 5 }, onPress: () => this.props.celebrityPageVisitAndSetData({ userId: likerId, userToken }) }}
          title={body}
          titleStyle={styles.title}
          underlayColor={'transparent'}
          subtitle={this.timeDifference(timeStamp)}
          subtitleStyle={{ marginTop: 10, padding: 0 }}
          containerStyle={styles.containerStyle}
          rightAvatar={{ source: { uri: image2 }, size: 55, rounded: false, containerStyle: { padding: 0, marginTop: 0 }, onPress: () => this.props.customSinglePostViewPageVisitAndSetData({ postId }) }}
          // rightElement={this.rightImage({ uri: image2 })}
          onPress={() => this.props.customSinglePostViewPageVisitAndSetData({ postId })}
          // bottomDivider
        />
      </Card>
    );
  }

  followNotifcation({ item }) {
    const { image1, body, timeStamp, followerId } = item;
    const { userToken } = this.props;
    return (
      <Card containerStyle={styles.cardContainer}>
        <ListItem
          leftAvatar={{ source: { uri: image1 }, size: 55, containerStyle: { padding: 0, marginTop: 5 }, onPress: () => this.props.celebrityPageVisitAndSetData({ userId: followerId, userToken }) }}
          title={body}
          titleStyle={styles.title}
          underlayColor={'transparent'}
          subtitle={this.timeDifference(timeStamp)}
          subtitleStyle={{ marginTop: 10, padding: 0 }}
          containerStyle={styles.containerStyle}
          rightElement={this.rightImage(require('../resources/icons/follow.png'))}
          contentContainerStyle={{ margin: 0, padding: 0 }}
          onPress={() => this.props.celebrityPageVisitAndSetData({ userId: followerId, userToken })}
          // bottomDivider
        />
      </Card>
    );
  }

  commentNotification({ item }) {
    const { image1, image2, body, timeStamp, commenterId, postId } = item;
    const { userToken } = this.props;
    return (
      <Card containerStyle={styles.cardContainer}>
        <ListItem
          leftAvatar={{ source: { uri: image1 }, size: 55, containerStyle: { padding: 0, marginTop: 5 }, onPress: () => this.props.celebrityPageVisitAndSetData({ userId: commenterId, userToken }) }}
          title={body}
          titleStyle={styles.title}
          underlayColor={'transparent'}
          subtitle={this.timeDifference(timeStamp)}
          subtitleStyle={{ marginTop: 10, padding: 0 }}
          containerStyle={styles.containerStyle}
          // rightAvatar={{ source: { uri: image2 }, size: 55, containerStyle: { padding: 0, marginTop: 5 } }}
          rightAvatar={{ source: { uri: image2 }, size: 55, rounded: false, containerStyle: { padding: 0, marginTop: 0 }, onPress: () => this.props.customSinglePostViewPageVisitAndSetData({ postId }) }}
          // rightElement={this.rightImage(require('../resources/icons/like.png'))}
          onPress={() => this.props.customSinglePostViewPageVisitAndSetData({ postId })}
          // bottomDivider
        />
      </Card>
    );
  }

  referredNotification({ item }) {
    const { image1, body, timeStamp, referredUserId } = item;
    const { userToken } = this.props;
    // const image2 = 'https://image.flaticon.com/icons/png/128/1057/1057240.png';
    return (
      <Card containerStyle={styles.cardContainer}>
        <ListItem
          leftAvatar={{ source: { uri: image1 }, size: 55, containerStyle: { padding: 0, marginTop: 5 }, onPress: () => this.props.celebrityPageVisitAndSetData({ userId: referredUserId, userToken }) }}
          title={body}
          titleStyle={styles.title}
          underlayColor={'transparent'}
          subtitle={this.timeDifference(timeStamp)}
          subtitleStyle={{ marginTop: 10, padding: 0 }}
          containerStyle={styles.containerStyle}
          // rightElement={this.rightImage(require('../resources/icons/referredIcon.png'))}
          // rightElement={this.rightImage({ uri: 'https://image.flaticon.com/icons/png/128/2413/2413078.png' })}
          rightAvatar={{ source: require('../resources/icons/referred_icon.png'), containerStyle: { padding: 0, marginTop: 0 }, onPress: () => Actions.rewardsPage() }}
          contentContainerStyle={{ margin: 0, padding: 0 }}
          onPress={() => this.props.celebrityPageVisitAndSetData({ userId: referredUserId, userToken })}
          // bottomDivider
        />
      </Card>
    );
  }

  purchasedNotification({ item }) {
    const { image1, image2, body, timeStamp, postId } = item;
    return (
      <Card containerStyle={styles.cardContainer}>
        <ListItem
          leftAvatar={{ source: { uri: image1 }, size: 55, containerStyle: { padding: 0, marginTop: 5 }, onPress: () => this.props.customSinglePostViewPageVisitAndSetData({ postId }) }}
          title={body}
          titleStyle={styles.title}
          underlayColor={'transparent'}
          subtitle={this.timeDifference(timeStamp)}
          subtitleStyle={{ marginTop: 10, padding: 0 }}
          containerStyle={styles.containerStyle}
          rightAvatar={{ source: { uri: image2 }, size: 55, containerStyle: { padding: 0, marginTop: 5 } }}
          // rightElement={this.rightImage(require('../resources/icons/like.png'))}
          onPress={() => this.props.customSinglePostViewPageVisitAndSetData({ postId })}
          // bottomDivider
        />
      </Card>
    );
  }

  patangMessageNotification({ item }) {
    const { image1, body, timeStamp } = item;
    return (
      <Card containerStyle={styles.cardContainer}>
        <ListItem
          leftAvatar={{ source: { uri: image1 }, size: 55, rounded: false, containerStyle: { padding: 0, marginTop: 5 } }}
          title={body}
          titleStyle={styles.title}
          underlayColor={'transparent'}
          subtitle={this.timeDifference(timeStamp)}
          subtitleStyle={{ marginTop: 10, padding: 0 }}
          containerStyle={styles.containerStyle}
          rightElement={this.rightImage(require('../resources/icons/liked_icon.png'))}
          contentContainerStyle={{ margin: 0, padding: 0 }}
          // onPress={() => this.props.celebrityPageVisitAndSetData({ userId: referrerId, userToken })}
          // bottomDivider
        />
      </Card>
    );
  }

  openPostNotification({ item }) {
    const { image1, body, timeStamp, postId } = item;
    // post Image should be square
    return (
      <Card containerStyle={styles.cardContainer}>
        <ListItem
          leftAvatar={{ source: { uri: image1 }, size: 55, containerStyle: { padding: 0, marginTop: 5 }, onPress: () => this.props.customSinglePostViewPageVisitAndSetData({ postId }) }}
          title={body}
          titleStyle={styles.title}
          underlayColor={'transparent'}
          subtitle={this.timeDifference(timeStamp)}
          subtitleStyle={{ marginTop: 10, padding: 0 }}
          containerStyle={styles.containerStyle}
          // rightElement={this.rightImage(require('../resources/icons/liked_icon.png'))}
          contentContainerStyle={{ margin: 0, padding: 0 }}
          onPress={() => this.props.customSinglePostViewPageVisitAndSetData({ postId })}
          // bottomDivider
        />
      </Card>
    );
  }

  openProfileNotification({ item }) {
    const { image1, body, timeStamp, profileId } = item;
    const { userToken } = this.props;
    return (
      <Card containerStyle={styles.cardContainer}>
        <ListItem
          leftAvatar={{ source: { uri: image1 }, size: 55, containerStyle: { padding: 0, marginTop: 5 }, onPress: () => this.props.celebrityPageVisitAndSetData({ userId: profileId, userToken }) }}
          title={body}
          underlayColor={'transparent'}
          titleStyle={styles.title}
          subtitle={this.timeDifference(timeStamp)}
          subtitleStyle={{ marginTop: 10, padding: 0 }}
          containerStyle={styles.containerStyle}
          // rightElement={this.rightImage(require('../resources/icons/liked_icon.png'))}
          contentContainerStyle={{ margin: 0, padding: 0 }}
          onPress={() => this.props.celebrityPageVisitAndSetData({ userId: profileId, userToken })}
          // bottomDivider
        />
      </Card>
    );
  }

  openLinkNotification({ item }) {
    const { image1, body, timeStamp, link } = item;
    return (
      <Card containerStyle={styles.cardContainer}>
        <ListItem
          leftAvatar={{ source: { uri: image1 }, size: 55, rounded: false, containerStyle: { padding: 0, marginTop: 5 } }}
          title={body}
          underlayColor={'transparent'}
          titleStyle={styles.title}
          subtitle={this.timeDifference(timeStamp)}
          subtitleStyle={{ marginTop: 10, padding: 0 }}
          containerStyle={styles.containerStyle}
          contentContainerStyle={{ margin: 0, padding: 0 }}
          onPress={() => {
            if (!link.startsWith('http')) {
              Linking.openURL(`http://${link}`).catch(err => console.error("NotificationPage open_link Coudn't Open the link", link, err));
            } else {
              Linking.openURL(link).catch(err => console.error("NotificationPage open_link Coudn't Open the link", link, err));
            }
          }}
        />
      </Card>
    );
  }

  renderItem({ item }) {
    const { notificationAction } = item;
    switch (notificationAction) {
      case 'like_post':
        return this.likeNotifcation({ item });
      case 'follow_user':
        return this.followNotifcation({ item });
      case 'comment_post':
        return this.commentNotification({ item });
      case 'referred_user':
        return this.referredNotification({ item });
      case 'purchased':
        return this.purchasedNotification({ item });
      case 'patang_message':
        return this.patangMessageNotification({ item });
      case 'open_post':
        return this.openPostNotification({ item });
      case 'open_profile':
        return this.openProfileNotification({ item });
      case 'open_link':
        return this.openLinkNotification({ item });
      default:
        return <View />;
    }
  }

  render() {
    const { notificationArray, userToken, notificationLoading } = this.props;
    // console.log('NotificationPage', notificationLoading);
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
          refreshControl={
            <RefreshControl
              onRefresh={() => this.props.notificationPageGetNotifcations({ userToken, notificationPage: 1 })}
              refreshing={notificationLoading}
              colors={['#D5252D', '#FE19AA']}
            />
          }
          refreshing={notificationLoading}
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
  rightImage: { height: 40, width: 40, marginTop: 5, marginRight: 5 }
};

const mapStateToProps = ({ notificationState, personalPageState }) => {
  const { userToken } = personalPageState;
  const { notificationArray, notificationLoading } = notificationState;
  return { userToken, notificationArray, notificationLoading };
};

export default connect(mapStateToProps, {
  notificationPageGetNotifcations,
  celebrityPageVisitAndSetData,
  customSinglePostViewPageVisitAndSetData,
  videoPagePlayStatusUpdate
})(NotificationPage);
