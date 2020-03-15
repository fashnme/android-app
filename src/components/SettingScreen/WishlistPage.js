import React, { Component } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, Dimensions, ImageBackground, ScrollView } from 'react-native';
import { Header, Button, Icon, Overlay, Card, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import {
  manageCartGetUserWishlist,
  manageCartRemoveProductFromWishlist,
  manageCartAddProductToCart,
  productPageUpdatePriceAndSize
} from '../../actions';
import { EmptyPage } from '../basic';


const screenWidth = Dimensions.get('window').width;
const itemSpacing = 10;
const rowWidth = (screenWidth - (3 * itemSpacing)) / 2;
const aspectRatio = 3 / 4;

class WishlistPage extends Component {
  constructor() {
      super();
      this.state = {
          sizeSelected: null,
          openSizeModal: false,
          item: null
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
    this.props.manageCartGetUserWishlist({ userToken });
  }

  moveToBagPressed({ item }) {
    const { productId, referrerId, referrerPost } = item;
    const { userToken } = this.props;
    const { sizeSelected } = this.state;
    // console.log('moveToBagPressed', { productId, referrerId, referrerPost, sizeSelected });
    if (sizeSelected === null) {
      this.setState({ openSizeModal: true, item }); // Open Size Modal
      // console.log('sizeSelected is Null');
      return;
    }
    this.props.manageCartAddProductToCart({ productId,
      quantity: 1,
      sizeSelected,
      postId: referrerPost,
      posterId: referrerId,
      userToken });

    showMessage({
      message: 'Product Added to Bag',
      type: 'success',
      floating: true,
      icon: 'success'
    });
    this.setState({ openSizeModal: false, item: null, sizeSelected: null }); // Close Size Modal
  }

  renderSizeModal() {
    const { openSizeModal, item, sizeSelected } = this.state;
    if (!openSizeModal) {
      return <View />;
    }
    const { sizeAndPriceObject } = this.props;
    const { productId } = item;
    if (!(productId in sizeAndPriceObject)) {
      this.props.productPageUpdatePriceAndSize({ productId });
    }
    const updatedData = sizeAndPriceObject[productId];

    if (updatedData === undefined) {
      return (
        <Card>
          <Text style={{ justifyContent: 'center' }}> Updating Sizes...... </Text>
        </Card>
      );
    }
    const { sizesAvailable } = updatedData;
    return (
        <Overlay
          isVisible={openSizeModal}
          overlayStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 2, bottom: 0, position: 'absolute' }}
          width={'100%'}
          height={'30%'}
          windowBackgroundColor={'transparent'}
          animationType={'slide'}
        >
          <View style={{ flex: 1 }}>
            <ScrollView>
              <Card containerStyle={{ margin: 0 }}>
                <Text style={styles.headingStyle}> Select Size </Text>
                <View>
                  <FlatList
                    horizontal
                    keyExtractor={(i, index) => index.toString()}
                    data={sizesAvailable}
                    renderItem={(sizes) => {
                      console.log('sizes', sizes);
                      return (
                        <Badge
                          badgeStyle={[styles.sizeContainerStyle, sizeSelected === sizes.item.size ? { borderColor: '#ee5f73' } : { borderColor: 'grey' }]}
                          textStyle={[styles.sizeTextStyle, sizeSelected === sizes.item.size ? { color: '#ee5f73' } : { color: 'grey' }]}
                          value={sizes.item.size}
                          onPress={() => this.setState({ sizeSelected: sizes.item.size })}
                        />
                      );
                    }}
                    ListEmptyComponent={
                        <Card>
                          <Text style={{ justifyContent: 'center', color: 'red', alignItems: 'center' }}> Product Out Of Stock </Text>
                        </Card>
                    }
                  />
                </View>
                <Button
                  title="Done"
                  type="outline"
                  buttonStyle={{ marginTop: 20, marginBottom: 2, borderColor: '#d00' }}
                  titleStyle={{ color: '#ff859a', fontWeight: '600' }}
                  onPress={() => { this.moveToBagPressed({ item }); }}
                />
              </Card>
            </ScrollView>
          </View>
        </Overlay>
    );
  }

  renderPriceBlock({ crossedPrice, discount, price }) {
    if (discount === 0) {
      return <Text style={styles.price}>{ `\u20B9${price}` }</Text>;
    }
    return (
      <View style={{ flexDirection: 'row', width: rowWidth }}>
        <Text style={styles.price}>{ `\u20B9${price}  ` }</Text>
        <Text style={styles.productCost}>{`\u20B9 ${crossedPrice}`}</Text>
        <Text style={styles.productDiscount}>{`  ${discount}% Off`}</Text>
      </View>
    );
  }
  renderItem({ item }) {
    const { title, brandName, price, image, crossedPrice, discount, productId } = item;
    const { userToken } = this.props;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <View>
            <ImageBackground source={{ uri: image }} style={styles.image}>
              <Icon
                name='circle-with-cross'
                type='entypo'
                size={26}
                iconStyle={{ color: 'grey' }}
                containerStyle={styles.crossStyle}
                onPress={() => { this.props.manageCartRemoveProductFromWishlist({ productId, userToken, updateWishlistArray: true }); showMessage({ message: 'Removed from Bag!', type: 'danger', floating: true, icon: 'danger' }); }}
              />
            </ImageBackground>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.brand}>{ brandName }</Text>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.desc}>{ title }</Text>
            { this.renderPriceBlock({ crossedPrice, discount, price }) }
          </View>
        </TouchableWithoutFeedback>
        <Button
          title={'ADD TO BAG'}
          type={'outline'}
          containerStyle={{ marginTop: 3, borderColor: '#03a685' }}
          titleStyle={{ fontWeight: '600', fontSize: 14, color: '#03a685' }}
          onPress={() => { this.moveToBagPressed({ item }); }}
        />
      </View>
    );
  }

  render() {
    const { wishlistArray } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          backgroundColor={'white'}
          placement={'left'}
          leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => { Actions.pop(); } }}
          centerComponent={{ text: 'WISHLIST', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
          rightComponent={
            <Button
              title={'CHECKOUT BAG'}
              type={'outline'}
              raised
              titleStyle={{ color: '#4186e0', fontWeight: '400', fontSize: 14, padding: 5 }}
              onPress={() => { Actions.manageCart(); }}
            />
          }
          containerStyle={{ paddingTop: 0, height: 56 }}
        />
        <View>
          <FlatList
            contentContainerStyle={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
            data={wishlistArray}
            numColumns={2}
            renderItem={this.renderItem.bind(this)}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={<EmptyPage title={'Empty Wishlist!'} subtitle={'Add Products to Wishlist'} />}
          />
        </View>
        {this.renderSizeModal()}
        <FlashMessage position="bottom" />
      </View>
    );
  }
}

const styles = {
    image: {
      width: rowWidth,
      height: rowWidth / aspectRatio,
      borderColor: '#d5d6d9',
      borderWidth: 0.5,
    },
    container: {
      backgroundColor: 'white',
      paddingLeft: itemSpacing,
      marginBottom: 20
    },
    brand: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 14,
        color: '#161925',
        width: rowWidth,
        textTransform: 'capitalize'
    },
    price: {
        marginTop: 5,
        fontSize: 14,
        color: '#000',
    },
    desc: {
        marginTop: 5,
        fontWeight: '200',
        fontSize: 11,
        color: '#94989f',
        width: rowWidth,
    },
    productCost: {
      marginTop: 5,
      fontSize: 14,
      color: 'grey',
      textDecorationLine: 'line-through',
    },
    productDiscount: {
      marginTop: 5,
      fontSize: 14,
      color: '#ff905a',
      fontWeight: 'bold',
    },
    crossStyle: {
      borderRadius: 20,
      backgroundColor: 'hsla(0,0%,100%,0.6)',
      position: 'absolute',
      right: 3,
      top: 3
    },
    headingStyle: {
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 5
    },
    sizeContainerStyle: {
      margin: 6,
      padding: 3,
      height: 28,
      backgroundColor: 'white',
      borderWidth: 1,
    },
    sizeTextStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      margin: 2,
      color: 'grey'
    }
};

const mapStateToProps = ({ personalPageState, accountSettingState, productPageState }) => {
  const { userToken } = personalPageState;
  const { wishlistArray } = accountSettingState;
  const { sizeAndPriceObject } = productPageState;
  return { userToken, wishlistArray, sizeAndPriceObject };
};

export default connect(mapStateToProps, {
  manageCartGetUserWishlist,
  manageCartRemoveProductFromWishlist,
  manageCartAddProductToCart,
  productPageUpdatePriceAndSize
})(WishlistPage);
