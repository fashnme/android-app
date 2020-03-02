import React, { useState } from 'react';
import { View, Text, Image, TouchableNativeFeedback, FlatList, ActivityIndicator } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { globalStyles } from '../../Styles';
import {
  productPageOpenProductModal as _productPageOpenProductModal,
  productPageUpdatePriceAndSize as _productPageUpdatePriceAndSize,
  productPageAddToCart as _productPageAddToCart
} from '../../actions';

const AddToCartButton = ({ onPress, title }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={globalStyles.addToCartButton}>
        <Text style={globalStyles.addToCartButtonText}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const BuyNowButton = ({ onPress, title }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={globalStyles.buyNowButton}>
        <Text style={globalStyles.buyNowButtonText}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const BidForRentButton = ({ onPress, title }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={globalStyles.bidForRentButton}>
        <Text style={globalStyles.bidForRentButtonTitle}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const renderError = ({ error }) => {
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <Text style={{ color: 'red', textAlign: 'center' }}> { error } </Text>
    </View>
  );
};

const renderSizeBlock = ({ sizesAvailable, sizeSelected, setSizeSelected }) => {
  // console.log('sizesAvailable', sizesAvailable);
  if (typeof sizesAvailable === 'undefined') {
    return <ActivityIndicator />;
  }
  if (sizesAvailable.length === 0) {
    return <Text> Out of Stock </Text>;
  }
  return (
    <Card containerStyle={{ marginBottom: 6, paddingBottom: 4, borderRadius: 8 }}>
      <Text style={styles.headingStyle}> Sizes Available </Text>
      <View>
      <FlatList
        horizontal
        keyExtractor={(item, index) => index.toString()}
        data={sizesAvailable}
        renderItem={({ item }) => {
          return (
            <Badge
              badgeStyle={[styles.sizeContainerStyle, sizeSelected === item.size ? { borderColor: '#ee5f73' } : { borderColor: 'grey' }]}
              textStyle={[styles.sizeTextStyle, sizeSelected === item.size ? { color: '#ee5f73' } : { color: 'grey' }]}
              value={item.size}
              onPress={() => setSizeSelected(item.size)}
            />
          );
        }}
      />
      </View>
    </Card>
  );
};

const renderPriceBlock = ({ crossedPrice, price }) => {
  const discount = Math.floor(((crossedPrice - price) * 100) / crossedPrice);
  if (discount === 0) {
    return <View />;
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.productCost}>{`\u20B9 ${crossedPrice}`}</Text>
      <Text style={styles.productDiscount}>{`${discount}% Off`}</Text>
    </View>
  );
};

const checkAndCompleteRequest = ({ productId, sizeSelected, postId, userToken, setError, posterId, visitCart, productPageAddToCart }) => {
  if (sizeSelected === null) {
    setError('Please Scroll Down & Select Size');
    return;
  }
  productPageAddToCart({
    productId,
    quantity: 1,
    sizeSelected,
    postId,
    posterId,
    userToken
  });
  if (visitCart) {
    console.log('Visit Cart', visitCart);
  }
  setError('Added to Cart!');
};

const ProductPriceSizeView = ({ productData, postId, posterId, askForSize, userToken,
  productPageOpenProductModal, productPageUpdatePriceAndSize, productPageAddToCart }) => {
  const [sizeSelected, setSizeSelected] = useState(null);
  const [error, setError] = useState('');
  if (productData === undefined) {
    return <View />;
  }
  const { productId, title, brandName, price, crossedPrice, image, sizesAvailable } = productData;
  if (askForSize) {
    // Hit the Server to Update the Price & Sizes Available
    productPageUpdatePriceAndSize({ productId });
  }
  return (
    <View>
      {renderError({ error })}
      <View style={styles.productView}>
        <View style={styles.productImage}>
          <Image source={{ uri: image }} style={{ flex: 1, resizeMode: 'contain' }} />
        </View>
        <View style={{ flex: 3, padding: 10 }}>
          <Text style={{ fontSize: 16 }}>{title}</Text>
          <Text style={styles.productBrand}>{brandName}</Text>
          <Text style={styles.productPrice}>{`\u20B9${price}`}</Text>
          { renderPriceBlock({ crossedPrice, price }) }
          <AddToCartButton
            title="ADD TO BAG" onPress={() => {
              checkAndCompleteRequest({ productId, sizeSelected, postId, posterId, userToken, setError, visitCart: false, productPageAddToCart });
            }}
          />
          <BuyNowButton
            title="BUY NOW" onPress={() => {
              checkAndCompleteRequest({ productId, sizeSelected, postId, posterId, userToken, setError, visitCart: true, productPageAddToCart });
            }}
          />
          <BidForRentButton
            title="ASK FOR RENT" onPress={() => {
            Actions.bidCreatePage({ postId, posterId, productData });
            productPageOpenProductModal({ isVisible: false, productsData: [], postDetails: { postId, posterId } });
            }}
          />
        </View>
      </View>
      {renderSizeBlock({ sizesAvailable, sizeSelected, setSizeSelected })}
    </View>
  );
};

const styles = {
  productView: {
    flex: 1,
    flexDirection: 'row',
    margin: 0,
  },
  productImage: {
    flex: 3,
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  productBrand: {
    fontSize: 15,
    color: 'orange',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  productCost: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  productDiscount: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    marginLeft: 10,
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

const mapStateToProps = ({ productPageState, personalPageState }) => {
    const { productsData, selectedItem, postId, posterId, productsModalVisible, sizeAndPriceObject } = productPageState;
    if (!productsModalVisible) {
      return { productData: undefined };
    }
    const { userToken } = personalPageState;
    const oldData = productsData[selectedItem];
    const { productId } = oldData;
    let productData = {};
    let askForSize = true;
    if (productId in sizeAndPriceObject) {
      productData = { ...oldData, ...sizeAndPriceObject[productId] };
      askForSize = false;
    } else {
      productData = oldData;
    }

    return { productData, postId, posterId, askForSize, userToken };
};

export default connect(mapStateToProps, {
  productPageOpenProductModal: _productPageOpenProductModal,
  productPageUpdatePriceAndSize: _productPageUpdatePriceAndSize,
  productPageAddToCart: _productPageAddToCart
})(ProductPriceSizeView);
