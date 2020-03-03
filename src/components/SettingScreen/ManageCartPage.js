import React, { Component } from 'react';
import { View, Text, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import { Header, ListItem, Card, Button, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import RenderAddressComponent from './RenderAddressComponent';

import {
  manageCartGetUserCartDetails,
  manageCartRemoveProductFromCart,
  manageCartPlaceOrder
} from '../../actions';

class ManageCartPage extends Component {
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
    this.props.manageCartGetUserCartDetails({ userToken });
  }

  showAlert(message) {
    Alert.alert(
         '',
         message, [{
             text: 'Ok',
         }], {
             cancelable: true
         }
      );
  }

  checkoutButtonPressed() {
    const { userToken, userCartArray, selectedAddress, totalCartValue, totalDeliveryCharges } = this.props;
    if (userCartArray.length === 0) {
      this.showAlert('Please Add Some Product To Checkout');
      return;
    }
    if (Object.values(selectedAddress).length === 0) {
      this.showAlert('Scroll Down And Select a Delivery Address Below');
      return;
    }
    if (totalCartValue <= 0 || totalDeliveryCharges < 0) {
      this.showAlert('Some Error, Please Try After Some Time');
      return;
    }
    // console.log('All Good');
    this.props.manageCartPlaceOrder({ userToken, userCartArray, selectedAddress, totalCartValue, totalDeliveryCharges });
  }

  renderImage({ image }) {
    return (
      <View style={{ boderRadius: 4 }}>
        <Image source={{ uri: image }} style={{ width: 90, height: 135, borderRadius: 5 }} />
      </View>
    );
  }

  renderTitleComp({ brandName, title, ecommerce }) {
    return (
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'grey' }}> {brandName} </Text>
        <Text ellipsizeMode={'tail'} numberOfLines={1} style={{ fontSize: 14, color: 'grey' }}> {title} </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#ff3f6c', textTransform: 'capitalize' }}> {ecommerce} </Text>
      </View>
    );
  }

  renderDiscount({ price, crossedPrice }) {
    const discount = Math.floor(((crossedPrice - price) * 100) / crossedPrice);
    if (discount === 0) {
      return <View />;
    }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ textDecorationLine: 'line-through', color: 'grey' }}>{`\u20B9 ${crossedPrice}`}</Text>
        <Text style={{ color: 'green' }}>{`   ${discount}% Off`}</Text>
      </View>
    );
  }

  renderSubComp({ price, crossedPrice, quantity, size, deliveryCharges }) {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text> {`Size: ${size}`} </Text>
          <Text> {`Qty: ${quantity}`} </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text> {`\u20B9 ${price}  `} </Text>
          {this.renderDiscount({ crossedPrice, price })}
        </View>
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
          <Text style={{ fontSize: 12, marginTop: 5, color: 'grey' }}>{`Delivery Charges:  \u20B9 ${deliveryCharges}`}</Text>
        </View>
      </View>
    );
  }

  renderButtons({ productId }) {
    const { userToken } = this.props;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button
          title={'REMOVE'}
          titleStyle={{ fontSize: 13, color: 'grey' }}
          type={'clear'}
          icon={{ name: 'delete', type: 'antdesign', size: 15, color: 'red' }}
          iconRight
          onPress={() => this.props.manageCartRemoveProductFromCart({ userToken, productId })}
        />
        <Button
          title={'MOVE TO WISHLIST'}
          titleStyle={{ fontSize: 13, color: 'grey' }}
          type={'clear'}
          // icon={{ name: 'bookmark-o', type: 'font-awesome', size: 15, color: '#f73b77' }}
          icon={{ name: 'bookmark', type: 'feather', size: 15, color: '#f73b77' }}
          iconRight
          onPress={() => this.props.manageCartRemoveProductFromCart({ userToken, productId, addToWishlist: true })}
        />
      </View>
    );
  }

  renderItem({ item }) {
    const { productId, title, price, crossedPrice, brandName, image, quantity, size, ecommerce, deliveryCharges } = item;
    return (
      <Card containerStyle={{ margin: 6, padding: 2, borderRadius: 8 }}>
        <ListItem
          title={this.renderTitleComp({ brandName, title, ecommerce })}
          subtitle={this.renderSubComp({ price, crossedPrice, quantity, size, deliveryCharges })}
          leftAvatar={this.renderImage({ image })}
          pad={10}
          bottomDivider
        />
        { this.renderButtons({ productId }) }
      </Card>
    );
  }

  renderRequestingOverlay() {
    const { loading } = this.props;
    return (
      <Overlay
        isVisible={loading}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="#fafafa"
      >
        <View style={{ justifyContent: 'center', flexDirection: 'column', flex: 1 }}>
          <ActivityIndicator size="large" />
          <Text style={{ alignSelf: 'center' }}>Placing Your Order!</Text>
        </View>
      </Overlay>
    );
  }

  render() {
    const { userCartArray, totalCartValue, totalDeliveryCharges, isEmpty } = this.props;
    // console.log({ userToken, userCartArray, totalCartValue, totalDeliveryCharges, isEmpty });
    if (isEmpty) {
      return <View />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor={'white'}
          placement={'left'}
          leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => { Actions.pop(); } }}
          centerComponent={{ text: 'MANAGE BAG', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
          rightComponent={
            <Button
              title={'WISHLIST'}
              type={'outline'}
              raised
              titleStyle={{ color: '#4186e0', fontWeight: '400', fontSize: 14, padding: 5 }}
              onPress={() => { Actions.wishlistPage(); }}
            />
          }
          containerStyle={{ paddingTop: 0, height: 56 }}
        />
        <View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={userCartArray}
            renderItem={this.renderItem.bind(this)}
            ListFooterComponent={
              <View>
                <View style={{ marginTop: 10, marginLeft: 10 }}>
                  <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17, alignItems: 'center' }}>
                    Select Delivery Address
                  </Text>
                </View>
                <RenderAddressComponent />
              </View>
            }
            contentContainerStyle={{ paddingBottom: 150 }}
          />
        </View>
        <View style={styles.checkoutButton}>
          <Card containerStyle={{ flex: 1, margin: 0 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontWeight: 'bold', color: 'grey' }}>Total: </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{`\u20B9 ${totalCartValue + totalDeliveryCharges}`} </Text>
              </View>
              <Button
                ViewComponent={LinearGradient}
                titleStyle={{ fontWeight: 'bold' }}
                linearGradientProps={{
                  colors: ['#ff4b1f', '#ff9068'],
                  start: { x: 1.0, y: 0.0 },
                  end: { y: 1.0, x: 1.0 },
                }}
                title={'PLACE ORDER'}
                buttonStyle={{ width: '100%' }}
                raised
                onPress={() => this.checkoutButtonPressed()}
              />
            </View>
          </Card>
          {this.renderRequestingOverlay()}
        </View>

      </View>
    );
  }
}

const styles = {
  checkoutButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  }
};

const mapStateToProps = ({ personalPageState, accountSettingState }) => {
  const { userToken } = personalPageState;
  const { userCartArray, selectedAddress, loading } = accountSettingState;
  let totalCartValue = 0;
  let totalDeliveryCharges = 0;
  userCartArray.forEach((item) => {
    totalCartValue += (item.price * item.quantity);
    totalDeliveryCharges += item.deliveryCharges;
  });
  let isEmpty = true;
  if (userCartArray.length !== 0) {
    isEmpty = false;
  }
  return { userToken, userCartArray, selectedAddress, totalCartValue, totalDeliveryCharges, isEmpty, loading };
};

export default connect(mapStateToProps, {
  manageCartGetUserCartDetails,
  manageCartRemoveProductFromCart,
  manageCartPlaceOrder
})(ManageCartPage);
