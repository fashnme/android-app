import React, { Component } from 'react';
import { View, Image, Dimensions, ImageBackground, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Header, Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {
  accountSettingsGetUserRewards
} from '../../actions';
import { EmptyPage } from '../basic';

const screenWidth = Dimensions.get('window').width;
const rowWidth = screenWidth - 10;
const aspectRatio = 1 / 2;

class RewardsPage extends Component {
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
    this.props.accountSettingsGetUserRewards({ userToken });
  }

  renderAmount({ amount, line1, line2 }) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginTop: 10, marginRight: 0, padding: 0 }}>
          <Image
            source={{ uri: 'https://image.flaticon.com/icons/png/128/2413/2413078.png' }}
            style={{ width: 25, height: 25 }}
          />
        </View>
        <View style={{ flexDirection: 'column' }}>
          <View>
            <Text style={{ color: '#fafafa', fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}> {amount} </Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.subRewardText}> {line1} </Text>
            <Text style={styles.subRewardText}> {line2} </Text>
          </View>
        </View>
      </View>
    );
  }

  renderTopCard() {
    const { rewards } = this.props;
    let pendingCoins = 0;
    let availableCoins = 0;
    if (rewards !== undefined) {
      for (const [, value] of Object.entries(rewards)) {
        pendingCoins += value.pending;
        availableCoins += value.available;
      }
    }

    return (
      <Card containerStyle={styles.cardContainer}>
          <ImageBackground
            imageStyle={styles.imageStyle}
            style={styles.imageStyle}
            source={require('../../resources/background/rewards-background.png')}
            resizeMode="cover"
          >
          <View style={{ justifyContent: 'flex-end', flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ marginLeft: 20, marginBottom: 10 }}>
                {this.renderAmount({ amount: availableCoins, line1: 'EARNED', line2: 'COINS' })}
              </View>
              <View style={{ marginRight: 20, marginBottom: 10 }}>
                {this.renderAmount({ amount: pendingCoins, line1: 'PENDING', line2: 'COINS' })}
              </View>
            </View>
          </View>
          </ImageBackground>
      </Card>
    );
  }

  renderHeading(head) {
    return (
      <View style={{ margin: 20, marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{ head }</Text>
      </View>
    );
  }

  renderRewardItem({ item }) {
    const { image, message, referralAmount, status } = item;
    return (
      <ListItem
         title={
           <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'grey' }}>Earned</Text>
            <Text style={{ fontWeight: 'bold', color: 'green', fontSize: 20 }}>{` +${referralAmount}`}</Text>
           </View>
         }
         subtitle={
           <View>
            <Text style={{ fontWeight: 'bold', color: 'grey' }}>{message}</Text>
            <Text style={{ textTransform: 'capitalize', color: 'grey' }}>{`Status:  ${status === undefined ? 'recieved' : status}`}</Text>
           </View>
         }
         leftAvatar={{ source: { uri: image } }}
         bottomDivider
         containerStyle={{ height: 100 }}
         badge={{ status: status === 'pending' ? 'warning' : 'success', value: ' ' }}
      />
    );
  }

  render() {
    const { rewardsArray } = this.props;
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Header
          backgroundColor={'white'}
          placement={'left'}
          leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => { Actions.pop(); } }}
          centerComponent={{ text: 'Rewards', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
          containerStyle={{ paddingTop: 0, height: 56 }}
        />
        <FlatList
          ListHeaderComponent={
              <View>
              {this.renderTopCard()}
              {this.renderHeading('Rewards Earned')}
              </View>
          }
          ListEmptyComponent={<EmptyPage title={'No Rewards!'} subtitle={'Invite Your Friends And Earn Rewards'} />}
          keyExtractor={(item, index) => index.toString()}
          data={rewardsArray}
          renderItem={this.renderRewardItem.bind(this)}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    );
  }
}

const styles = {
  imageStyle: { height: rowWidth * aspectRatio, width: rowWidth, borderRadius: 10 },
  cardContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    margin: 4,
    padding: 0,
    height: rowWidth * aspectRatio,
    width: rowWidth,
    elevation: 50
  },
  subRewardText: { color: '#d6d4d4', fontSize: 11, fontWeight: 'bold', textAlign: 'center' }
};

const mapStateToProps = ({ personalPageState, accountSettingState }) => {
  const { userToken } = personalPageState;
  const { rewardsObject } = accountSettingState;
  const { rewards, referralRewardsArray } = rewardsObject;
  let isEmpty = true;
  if (referralRewardsArray !== undefined && referralRewardsArray.length !== 0) {
    isEmpty = false;
  }
  return { userToken, rewardsArray: referralRewardsArray, rewards, isEmpty };
};

export default connect(mapStateToProps, {
  accountSettingsGetUserRewards
})(RewardsPage);
