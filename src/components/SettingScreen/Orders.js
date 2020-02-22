import React, { Component } from 'react';
import { View, Text, FlatList, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Header, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {
  accountSettingsGetUserOrders
} from '../../actions';

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

  renderEmpty() {
    const { height, width } = Dimensions.get('window');
    return (
      <View>
        <Header
          backgroundColor={'white'}
          placement={'center'}
          leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => { Actions.pop(); } }}
          centerComponent={{ text: 'NO ORDERS FOUND', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
        />
        <View style={{ height, width, backgroundColor: 'white', justifyContent: 'center' }} />
      </View>
    );
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

  renderStatusComponent({ orderCreated, status }) {
    let color = '';
    switch (status) {
      case 'placed':
        color = '#00f';
        break;
      case 'confirmed':
        color = '#F08300';
        break;
      case 'shipped':
        color = '#00367C';
        break;
      case 'delivered':
        color = '#0f0';
        break;
      default:
        color = '#4d4b4b';
        break;
    }
    const date = new Date(orderCreated).toDateString().split(' ');
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

  renderOrderItem({ item }) {
    const { brandName, imagesArray, price, title, size, orderId, status, crossedPrice, orderCreated } = item;
    return (
      <View style={{ backgroundColor: 'white' }}>
        {this.renderOrderNumber({ orderId })}
        <ListItem
           title={this.renderTitleComponent({ title, brandName, price, crossedPrice, size })}
           subtitle={this.renderStatusComponent({ orderCreated, status })}
           leftAvatar={this.renderImage(imagesArray[0])}
           bottomDivider
           chevron={{ color: '#5c5b5b', size: 20 }}
        />
      </View>
    );
  }

  renderOrders() {
    const { ordersArray } = this.props;
    return (
      <View>
        <Header
          backgroundColor={'white'}
          placement={'left'}
          leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => { Actions.pop(); } }}
          centerComponent={{ text: 'ORDERS', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
        />
        <Divider style={{ backgroundColor: 'blue' }} />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={ordersArray}
          renderItem={this.renderOrderItem.bind(this)}
        />
      </View>
    );
  }

  render() {
    const { isEmpty } = this.props;
    return (
      <View>
        {isEmpty ? this.renderEmpty() : this.renderOrders()}
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
    fontWeight: 'bold'
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
  const { ordersArray } = accountSettingState;
  let isEmpty = true;
  if (ordersArray.length !== 0) {
    isEmpty = false;
  }
  return { userToken, ordersArray, isEmpty };
};

export default connect(mapStateToProps, {
  accountSettingsGetUserOrders
})(Orders);
