import React, { Component } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, Dimensions, ImageBackground } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  manageCartGetUserWishlist,
  manageCartAddProductToCart
} from '../../actions';
import { EmptyPage } from '../basic';

// TODO TODO TODO
// Fix the Action & Reducer to Show PersonalStore Products instead of Wishlist Array

const screenWidth = Dimensions.get('window').width;
const itemSpacing = 10;
const rowWidth = (screenWidth - (3 * itemSpacing)) / 2;
const aspectRatio = 3 / 4;

class PersonalStorePage extends Component {
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
    const { title, brandName, price, image, crossedPrice, discount, productId, referrerPost, referrerId } = item;
    const { userToken } = this.props;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <View>
            <ImageBackground source={{ uri: image }} style={styles.image}>
              <View />
            </ImageBackground>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.brand}>{ brandName }</Text>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.desc}>{ title }</Text>
            { this.renderPriceBlock({ crossedPrice, discount, price }) }
          </View>
        </TouchableWithoutFeedback>
        <Button
          title={'MOVE TO BAG'}
          type={'outline'}
          containerStyle={{ marginTop: 3, borderColor: '#03a685' }}
          titleStyle={{ fontWeight: '600', fontSize: 14, color: '#03a685' }}
          onPress={() => {
                this.props.manageCartAddProductToCart({ productId,
                  quantity: 1,
                  sizeSelected: '', // TODO, Prompt User to Select Size
                  postId: referrerPost,
                  posterId: referrerId,
                  userToken });
              }}
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
            data={wishlistArray}
            numColumns={2}
            renderItem={this.renderItem.bind(this)}
            ListEmptyComponent={<EmptyPage title={'Empty Store!'} subtitle={'We will fill the bucket soon!'} />}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
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
    }
};

const mapStateToProps = ({ personalPageState, accountSettingState }) => {
  const { userToken } = personalPageState;
  const { wishlistArray } = accountSettingState;
  let isEmpty = true;
  if (wishlistArray.length !== 0) {
    isEmpty = false;
  }
  return { userToken, wishlistArray, isEmpty };
};

export default connect(mapStateToProps, {
  manageCartGetUserWishlist,
  manageCartAddProductToCart
})(PersonalStorePage);
