import React, { Component } from 'react';
import { View, Text, FlatList, Image, RefreshControl, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Header, Divider, Card, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {
  accountSettingsGetUserOrders,
  productPageVisitSetSingleProductPage
} from '../../actions';
import { EmptyPage } from '../basic';
import { PHONE_NUMBER_TO_CONTACT_US } from '../../types';


class Orders extends Component {
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
    this.props.accountSettingsGetUserOrders({ userToken });
  }

  renderImage(image) {
    return (
      <View style={{ boderRadius: 4 }}>
        <Image source={{ uri: image }} style={{ width: 100, height: 150, borderRadius: 5 }} />
      </View>
    );
  }

  renderTitleComponent({ title, brandName, price, size, crossedPrice }) {
    const discount = crossedPrice - price;
    const qty = 1;
    return (
      <View style={{ marginTop: -20 }}>
        <Text style={styles.brandStyle} ellipsizeMode={'tail'} numberOfLines={1}>{brandName} </Text>
        <Text style={styles.titleStyle} ellipsizeMode={'tail'} numberOfLines={1}>{title}</Text>
        <Text style={styles.sizeStyle}>{`Size: ${size} | Qty:${qty}`}</Text>
        <View style={{ flexDirection: 'row', marginTop: 3 }}>
          <Text style={styles.priceStyle}>{`\u20B9 ${price}  `}</Text>
          <Text style={styles.crossedPriceStyle}>{`\u20B9 ${crossedPrice}`}</Text>
          <Text style={styles.savedPriceStyle}>{`  Saved \u20B9${discount}`}</Text>
        </View>
      </View>
    );
  }

  renderStatusComponent({ timeStamp, status }) {
    let color = '';
    switch (status) {
      case 'placed':
        color = '#F08300';
        break;
      case 'confirmed':
        color = '#f75990';
        break;
      case 'shipped':
        color = '#611978';
        break;
      case 'delivered':
        color = '#4ea668';
        break;
      case 'cancelled':
        color = 'red';
        break;
      case 'completed':
        color = 'green';
        break;
      default:
        color = '#4d4b4b';
        break;
    }
    const date = new Date(timeStamp).toDateString().split(' ');
    return (
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text style={[styles.statusStyle, { color }]}> {status} </Text>
          <Text style={styles.dateStyle}> {`(${date[1]} ${date[2]}, ${date[3]})`} </Text>
        </View>
    );
  }

  renderOrderNumber({ orderId }) {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 15, flexDirection: 'row', marginLeft: 12 }}>
        <Text style={{ color: '#393318', fontWeight: '900' }}> ORDER NO: </Text>
        <Text style={styles.orderId}>{orderId} </Text>
      </View>
    );
  }

  renderButtons({ productId, status, orderId }) {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        <Button
          title={'CONTACT US'}
          titleStyle={{ fontSize: 13, color: 'grey' }}
          type={'outline'}
          icon={{ name: 'phone-call', type: 'feather', size: 15, color: '#4cbb17' }}
          buttonStyle={{ borderColor: '#4cbb17' }}
          iconRight
          raised
          onPress={() => {
            const number = Platform.OS === 'ios' ? `telprompt:${PHONE_NUMBER_TO_CONTACT_US}` : `tel:${PHONE_NUMBER_TO_CONTACT_US}`;
            Linking.openURL(number);
          }}
        />
        <Button
          title={status === 'delivered' ? 'RETURN ORDER' : 'CANCEL ORDER'}
          titleStyle={{ fontSize: 13, color: 'grey' }}
          type={'outline'}
          icon={{ name: 'circle-with-cross', type: 'entypo', size: 18, color: 'red' }}
          buttonStyle={{ borderColor: 'red' }}
          iconRight
          raised
          onPress={() => {
            Actions.orderCancelReturnPage({ orderId, productId });
          }}
        />
      </View>
    );
  }

  renderOrderItem({ item }) {
    const { brandName, imagesArray, price, title, size, orderId, status, crossedPrice, timeStamp,
    referrerPost, referrerId, posterId, productId } = item;
    return (
      <Card containerStyle={{ margin: 6, padding: 2, borderRadius: 8 }}>
        {this.renderOrderNumber({ orderId })}
        <ListItem
           title={this.renderTitleComponent({ title, brandName, price, crossedPrice, size })}
           subtitle={this.renderStatusComponent({ timeStamp, status })}
           leftAvatar={this.renderImage(imagesArray[0])}
           underlayColor={'transparent'}
           containerStyle={{ borderRadius: 50 }}
           onPress={() => this.props.productPageVisitSetSingleProductPage({ productId, posterId, referrerPost, referrerId })}
           // chevron={{ color: '#5c5b5b', size: 20 }}
        />
        { status === 'cancelled' || status === 'completed' ? <View /> : this.renderButtons({ productId, status, orderId }) }
      </Card>
    );
  }

  render() {
    const { ordersArray, userToken, loading } = this.props;
    return (
      <View style={{ backgroundColor: '#fafafa' }}>
        <Header
          backgroundColor={'white'}
          placement={'left'}
          // leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => { Actions.pop(); } }}
          leftComponent={{ icon: 'arrow-left',
            type: 'font-awesome',
            color: '#e9e9e9',
            onPress: () => { Actions.pop(); },
            reverse: true,
            size: 18,
            reverseColor: '#D5252D',
            containerStyle: { marginLeft: -5, marginTop: 0, opacity: 0.8 },
          }}
          centerComponent={{ text: 'ORDERS', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
          containerStyle={{ paddingTop: 0, height: 56 }}
        />
        <Divider style={{ backgroundColor: 'blue' }} />
        <View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={ordersArray}
            renderItem={this.renderOrderItem.bind(this)}
            ListEmptyComponent={
              <EmptyPage
                title={loading ? 'Loading Orders...' : 'No Orders Found!'}
                subtitle={'Visit Cart & Add Products!'}
              />
            }
            contentContainerStyle={{ paddingBottom: 200 }}
            refreshControl={
              <RefreshControl
                onRefresh={() => this.props.accountSettingsGetUserOrders({ userToken })}
                refreshing={loading}
                colors={['#D5252D', '#FE19AA']}
              />
            }
            refreshing={loading}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontWeight: '500',
    marginTop: 3
  },
  priceStyle: {
    fontWeight: 'bold',
    color: '#1a5c21',
    fontSize: 15
  },
  brandStyle: {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  sizeStyle: {
    marginTop: 3
  },
  statusStyle: {
    textTransform: 'capitalize',
    fontSize: 15,
    fontWeight: 'bold'
  },
  dateStyle: {
    color: '#222'
  },
  orderId: {
    color: '#70706e',
    fontWeight: 'bold'
  },
  crossedPriceStyle: {
    textDecorationLine: 'line-through',
    fontSize: 15
  },
  savedPriceStyle: {
    color: '#4ECDC4',
    fontWeight: 'bold',
    fontSize: 15
  }
};

const mapStateToProps = ({ personalPageState, accountSettingState }) => {
  const { userToken } = personalPageState;
  const { ordersArray, loading } = accountSettingState;
  // let isEmpty = true;
  // if (ordersArray.length !== 0) {
  //   isEmpty = false;
  // }
  return { userToken, ordersArray, loading };
};

export default connect(mapStateToProps, {
  accountSettingsGetUserOrders,
  productPageVisitSetSingleProductPage
})(Orders);
