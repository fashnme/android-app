import React, { Component } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, Dimensions, Image, ScrollView, RefreshControl } from 'react-native';
import { Header, Button, Overlay, Card, Badge, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FlashMessage from 'react-native-flash-message';
import {
  manageCartGetUserPersonalStore,
  manageCartAddProductToCart,
  productPageUpdatePriceAndSize,
  productPageVisitSetSingleProductPage
} from '../../actions';
import {
  PersonalStorePageGifURL
} from '../../URLS';
import { EmptyPage } from '../basic';


const screenWidth = Dimensions.get('window').width;
const itemSpacing = 10;
const rowWidth = (screenWidth - (3 * itemSpacing)) / 2;
const aspectRatio = 3 / 4;

class PersonalStorePage extends Component {
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
    this.props.manageCartGetUserPersonalStore({ userToken });
  }

  moveToBagPressed({ item }) {
    const { productId, referrerId, referrerPost, posterId } = item;
    const { userToken } = this.props;
    const { sizeSelected } = this.state;
    // console.log('moveToBagPressed', { productId, referrerId, referrerPost, sizeSelected });
    if (sizeSelected === null) {
      this.setState({ openSizeModal: true, item }); // Open Size Modal
      // console.log('sizeSelected is Null');
      return;
    }
    this.props.manageCartAddProductToCart({
      productId,
      quantity: 1,
      sizeSelected,
      postId: referrerPost,
      referrerId,
      posterId,
      userToken });

    this.refs.wishlistPage.showMessage({ message: 'Product Added to Bag', type: 'success', floating: true, icon: 'success' });
    this.setState({ openSizeModal: false, item: null, sizeSelected: null }); // Close Size Modal
  }

  renderSizeModal() {
    const { openSizeModal, item, sizeSelected } = this.state;
    if (!openSizeModal) {
      return <View />;
    }
    const { sizeAndPriceObject, requestedForPriceSizeUpdate } = this.props;
    const { productId } = item;
    if (!(productId in requestedForPriceSizeUpdate)) {
      this.props.productPageUpdatePriceAndSize({ productId });
    }
    const updatedData = sizeAndPriceObject[productId];

    if (updatedData === undefined) {
      return (
        <Overlay
          isVisible={openSizeModal}
          overlayStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, borderWidth: 0.5, borderColor: '#FE19AA', bottom: 0, position: 'absolute' }}
          width={'100%'}
          height={'30%'}
          animationType={'slide'}
          windowBackgroundColor={'transparent'}
          onBackdropPress={() => this.setState({ openSizeModal: false, item: null, sizeSelected: null })}
        >
          <View style={{ flexDirection: 'column' }}>
            <Divider style={{ backgroundColor: '#c2c9cf', height: 4, width: 30, borderRadius: 20, alignSelf: 'center' }} />
            <Text style={[styles.headingStyle, { marginTop: 10 }]}> Select Size </Text>
          </View>
          <Text style={[styles.headingStyle, { fontWeight: '200', marginTop: 50 }]}> Updating Available Sizes...... </Text>
      </Overlay>
    );
    }
    const { sizesAvailable } = updatedData;
    return (
        <Overlay
          isVisible={openSizeModal}
          overlayStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, borderWidth: 0.5, borderColor: '#FE19AA', bottom: 0, position: 'absolute' }}
          width={'100%'}
          height={'30%'}
          animationType={'slide'}
          windowBackgroundColor={'transparent'}
          onBackdropPress={() => this.setState({ openSizeModal: false, item: null, sizeSelected: null })}
        >
          <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ flexDirection: 'column' }}>
                  <Divider style={{ backgroundColor: '#c2c9cf', height: 4, width: 30, borderRadius: 20, alignSelf: 'center' }} />
                  <Text style={[styles.headingStyle, { marginTop: 10 }]}> Select Size </Text>
                </View>
                <View>
                  <FlatList
                    horizontal
                    keyExtractor={(i, index) => index.toString()}
                    data={sizesAvailable}
                    renderItem={(sizes) => {
                      // console.log('sizes', sizes);
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
                        <Card containerStyle={{ flex: 1, width: '80%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                          <Text style={{ color: 'red', alignSelf: 'center', fontWeight: 'bold' }}> Product Out Of Stock </Text>
                        </Card>
                    }
                  />
                </View>
                <Button
                  title="Done"
                  type="outline"
                  disabled={sizesAvailable === undefined || sizesAvailable.length === 0}
                  buttonStyle={{ marginTop: 20, marginBottom: 2, borderColor: '#d00', width: '50%', alignSelf: 'center' }}
                  titleStyle={{ color: '#ff859a', fontWeight: '600' }}
                  onPress={() => { this.moveToBagPressed({ item }); }}
                />
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
    const { title, brandName, price, image, crossedPrice, discount, productId,
    posterId = 'patang', referrerPost = 'personalstore', referrerId = '' } = item;
    // Since there is no post or poster so this will be empty
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => this.props.productPageVisitSetSingleProductPage({ productId, posterId, referrerPost, referrerId })}
        >
          <View>
            <Image source={{ uri: image }} style={styles.image} />
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
          onPress={() => this.moveToBagPressed({ item })}
        />
      </View>
    );
  }

  render() {
    const { personalStoreArray, userToken, cartAndWishlistLoading } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          backgroundColor={'white'}
          placement={'left'}
          leftComponent={{ icon: 'arrow-left',
            type: 'font-awesome',
            color: '#e9e9e9',
            onPress: () => { Actions.pop(); },
            reverse: true,
            size: 18,
            reverseColor: '#D5252D',
            containerStyle: { marginLeft: -5, marginTop: 0, opacity: 0.8 },
          }}
          centerComponent={{ text: 'Personal Store', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
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
            data={personalStoreArray}
            numColumns={2}
            renderItem={this.renderItem.bind(this)}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={
              <EmptyPage
                title={'Stocking your Store!'}
                subtitle={'Creating a Perfect Collection for You'}
                source={{ uri: PersonalStorePageGifURL }}
              />
            }
            refreshControl={
              <RefreshControl
                onRefresh={() => this.props.manageCartGetUserPersonalStore({ userToken })}
                refreshing={cartAndWishlistLoading}
                colors={['#D5252D', '#FE19AA']}
              />
            }
            refreshing={cartAndWishlistLoading}
          />
        </View>
        {this.renderSizeModal()}
        <FlashMessage position="bottom" ref="wishlistPage" />
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
    headingStyle: {
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 5,
      alignSelf: 'center'
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
  const { personalStoreArray, cartAndWishlistLoading } = accountSettingState;
  const { sizeAndPriceObject, requestedForPriceSizeUpdate } = productPageState;
  return { userToken, personalStoreArray, sizeAndPriceObject, requestedForPriceSizeUpdate, cartAndWishlistLoading };
};


export default connect(mapStateToProps, {
  manageCartGetUserPersonalStore,
  manageCartAddProductToCart,
  productPageUpdatePriceAndSize,
  productPageVisitSetSingleProductPage
})(PersonalStorePage);
