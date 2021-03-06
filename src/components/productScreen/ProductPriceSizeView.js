import React, { useState } from 'react';
import { View, Text, Image, TouchableNativeFeedback, FlatList, TouchableOpacity } from 'react-native';
import { Card, Badge, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import { globalStyles } from '../../Styles';
import AddToCartAndWishlistIcon from './AddToCartAndWishlistIcon';
import FullProductImageViewer from './FullProductImageViewer';
import {
  productPageOpenProductModal as _productPageOpenProductModal,
  productPageUpdatePriceAndSize as _productPageUpdatePriceAndSize,
  manageCartAddProductToCart as _manageCartAddProductToCart,
  productPageToggleFullImageViewer as _productPageToggleFullImageViewer,
  productPageAddProductToReminder as _productPageAddProductToReminder
} from '../../actions';


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
  const marginTop = error.length === 0 ? 0 : 10;
  return (
    <View style={{ flex: 1, margin: marginTop }}>
      <Text style={{ color: 'red', textAlign: 'center' }}> { error } </Text>
    </View>
  );
};

const renderInStockReminderButton = ({ sizesAvailable, userToken, productData, productAddedForReminder,
  productPageAddProductToReminder }) => {
  const { productId } = productData;
  if (sizesAvailable === undefined || sizesAvailable.length !== 0) {
    return <View />;
  }
  if (productId in productAddedForReminder) {
    return (
      <Button
        title={'Reminder Added'}
        disabled
        buttonStyle={{ borderRadius: 12 }}
        containerStyle={{ width: '60%', alignSelf: 'center', borderRadius: 12 }}
      />
    );
  }
  return (
    <Button
      title={'In-Stock Reminder'}
      onPress={() => {
        productPageAddProductToReminder({ userToken, productData });
        showMessage({ message: 'Reminder Added', type: 'success', duration: 5000, floating: true, icon: 'success', description: 'We will remind you when product is back in Stock' });
      }}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ['#00d8c0', '#00c0a8', '#00a890'],
        start: { x: 1.0, y: 0.0 },
        end: { y: 1.0, x: 1.0 },
      }}
      buttonStyle={{ borderRadius: 12 }}
      containerStyle={{ width: '60%', alignSelf: 'center', borderRadius: 12 }}
      raised
    />
  );
};

const renderSizeBlock = ({ sizesAvailable, sizeSelected, setSizeSelected }) => {
  // console.log('sizesAvailable', sizesAvailable);
  if (sizesAvailable === undefined) {
    return (
      <Card>
        <Text style={{ justifyContent: 'center', flexDirection: 'row', flex: 1 }}> Updating Sizes...... </Text>
      </Card>
    );
  }
  if (sizesAvailable.length === 0) {
    return (
      <View style={styles.codeView}>
        <Text style={styles.codeText}> Out of Stock </Text>
      </View>
    );
    // return <Text style={{ color: 'red', textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}> Out of Stock </Text>;
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

const renderCrossedPriceBlock = ({ crossedPrice, price }) => {
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

const renderSizeChartText = ({ sizeChartUrl, scrollRef }) => {
  // "Size Chart" Text
  if (sizeChartUrl === undefined || sizeChartUrl.length === 0) {
    return <View />;
  }
  return (
    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', margin: 10, marginTop: 20 }}>
      <Button
        title='SIZE CHART'
        type="outline"
        titleStyle={styles.sizeChartText}
        buttonStyle={{ borderColor: '#ff3f6c' }}
        raised
        onPress={() => scrollRef.current.scrollToEnd({ animated: true, duration: 1000 })}
      />
    </View>
  );
};

const checkAndCompleteRequest = ({ productId, sizeSelected, postId, userToken, posterId, referrerId,
  visitCart, manageCartAddProductToCart, productPageOpenProductModal }) => {
  if (sizeSelected === null) {
    // setError('Please Scroll Down & Select Size');
    showMessage({ message: 'Please Scroll Down & Select Size', type: 'danger', duration: 5000, floating: true, icon: 'warning' });
    return;
  }
  manageCartAddProductToCart({
    productId,
    quantity: 1,
    sizeSelected,
    postId,
    posterId,
    referrerId,
    userToken
  });
  if (visitCart) {
    Actions.manageCart();
  }
  productPageOpenProductModal({ isVisible: false, productsData: [], postDetails: { postId, posterId } });
  // setError('Added to Bag!');
  showMessage({ message: 'Added to Bag!', type: 'success', floating: true, icon: 'success' });
};

// scrollRef from parent component
const ProductPriceSizeView = ({ scrollRef, productData, postId, posterId, askForSize, userToken, referrerId, productAddedForReminder,
  productPageOpenProductModal, productPageUpdatePriceAndSize, manageCartAddProductToCart, productPageToggleFullImageViewer,
  productPageAddProductToReminder }) => {
  const [sizeSelected, setSizeSelected] = useState(null);
  // console.log('ProductPriceSizeView productData', productData);
  const [error, setError] = useState('');
  if (productData === undefined) {
    return <View />;
  }
  const { productId, title, brandName, price, crossedPrice, image, sizesAvailable, sizeChartUrl } = productData;
  if (askForSize) {
    // Hit the Server to Update the Price & Sizes Available
    productPageUpdatePriceAndSize({ productId });
  }
  const productRelatedData = { productId, sizeSelected, postId, posterId, userToken, setError };
  return (
    <View>
      {renderError({ error })}
      <View style={styles.productView}>
        <TouchableOpacity style={styles.productImage} onPress={() => { productPageToggleFullImageViewer({ visible: true }); }}>
          <Image source={{ uri: image }} style={{ flex: 1, resizeMode: 'contain', marginTop: 0, borderRadius: 5 }} />
        </TouchableOpacity>
        <View style={{ flex: 3, padding: 5 }}>
          <Text style={{ fontSize: 16, marginTop: 2 }}>{title}</Text>
          <Text style={styles.productBrand}>{brandName.trim().toUpperCase()}</Text>
          <Text style={styles.productPrice}>{`\u20B9${price}`}</Text>
          { renderCrossedPriceBlock({ crossedPrice, price }) }
          <AddToCartAndWishlistIcon productRelatedData={productRelatedData} />
          <BuyNowButton
            title="BUY NOW" onPress={() => {
              checkAndCompleteRequest({ productId, sizeSelected, postId, posterId, referrerId, userToken, setError, visitCart: true, manageCartAddProductToCart, productPageOpenProductModal });
            }}
          />
          <BidForRentButton
            title="ASK FOR RENT" onPress={() => {
              Actions.bidCreatePage({ postId, posterId, productData });
              productPageOpenProductModal({ isVisible: false, productsData: [], postDetails: { postId, userId: posterId } });
            }}
          />
        </View>
      </View>
      {renderSizeChartText({ sizeChartUrl, scrollRef })}
      {renderSizeBlock({ sizesAvailable, sizeSelected, setSizeSelected })}
      {renderInStockReminderButton({ sizesAvailable, userToken, productData, productAddedForReminder, productPageAddProductToReminder })}
      <FullProductImageViewer />
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
    padding: 2,
    paddingTop: 0,
    justifyContent: 'center',
    alignContent: 'center',
  },
  productBrand: {
    fontSize: 15,
    color: 'orange',
    marginTop: 4,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    marginTop: 4,
    fontWeight: 'bold'
  },
  productCost: {
    fontSize: 18,
    marginTop: 4,
    textDecorationLine: 'line-through',
  },
  productDiscount: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headingStyle: { fontWeight: 'bold', marginBottom: 5, marginTop: 5 },
  sizeContainerStyle: {
    margin: 6,
    padding: 3,
    height: 28,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  sizeTextStyle: { fontSize: 18, fontWeight: 'bold', margin: 2, color: 'grey' },
  codeText: { fontWeight: 'bold', fontSize: 18, color: 'red', textAlign: 'center' },
  codeView: {
    borderWidth: 1,
    margin: 15,
    marginTop: 25,
    marginBottom: 20,
    borderStyle: 'dashed',
    alignItems: 'center',
    borderRadius: 1,
    borderColor: 'grey',
    backgroundColor: 'rgba(255, 65, 108,0.1)',
    padding: 10,
    width: '50%',
    alignSelf: 'center'
  },
  sizeChartText: { fontSize: 14, fontWeight: 'bold', color: '#ff3f6c', textShadowRadius: 1 }
};

const mapStateToProps = ({ productPageState, personalPageState, referralState }) => {
    const { productsData, selectedItem, postId, posterId, productsModalVisible,
      productAddedForReminder, sizeAndPriceObject, requestedForPriceSizeUpdate } = productPageState;
    if (!productsModalVisible) {
      return { productData: undefined };
    }
    const { userToken } = personalPageState;
    const oldData = productsData[selectedItem];
    if (oldData === undefined) {
      return { productData: undefined };
    }
    const { productId } = oldData;
    let productData = {};
    let askForSize = true;
    if (productId in sizeAndPriceObject) {
      productData = { ...oldData, ...sizeAndPriceObject[productId] };
    } else {
      productData = oldData;
    }
    if (productId in requestedForPriceSizeUpdate) {
      askForSize = false;
    }
    const { referrerId } = referralState;
    return { productData, postId, posterId, askForSize, referrerId, userToken, productAddedForReminder };
};

export default connect(mapStateToProps, {
  productPageOpenProductModal: _productPageOpenProductModal,
  productPageUpdatePriceAndSize: _productPageUpdatePriceAndSize,
  manageCartAddProductToCart: _manageCartAddProductToCart,
  productPageToggleFullImageViewer: _productPageToggleFullImageViewer,
  productPageAddProductToReminder: _productPageAddProductToReminder
})(ProductPriceSizeView);
