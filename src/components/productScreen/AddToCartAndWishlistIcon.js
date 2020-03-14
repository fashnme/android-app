import React from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  productPageOpenProductModal as _productPageOpenProductModal,
  manageCartAddProductToCart as _manageCartAddProductToCart,
  manageCartAddProductToWishlist as _manageCartAddProductToWishlist,
  manageCartRemoveProductFromWishlist as _manageCartRemoveProductFromWishlist
} from '../../actions';

// Check all Params, then add product to Cart
const checkAndCompleteRequest = ({ productRelatedData, manageCartAddProductToCart }) => {
  const { productId, sizeSelected, postId, posterId, userToken, setError } = productRelatedData;
  if (sizeSelected === null) {
    setError('Please Scroll Down & Select Size');
    return;
  }
  manageCartAddProductToCart({
    productId,
    quantity: 1,
    sizeSelected,
    postId,
    posterId,
    userToken
  });
  setError('Added to Bag!');
};

// Render the Bag Icon
const renderAddToBagIcon = ({ productRelatedData, isPresent,
      manageCartAddProductToCart, productPageOpenProductModal }) => {
  const { postId, posterId } = productRelatedData;
  if (isPresent) {
    return (
      <TouchableNativeFeedback
        onPress={() => {
           Actions.manageCart();
           productPageOpenProductModal({ isVisible: false, productsData: [], postDetails: { postId, posterId } });
         }}
      >
        <Image
          style={{ width: 36, height: 36 }}
          source={require('../../resources/icons/added-to-bag.png')}
        />
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableNativeFeedback onPress={() => checkAndCompleteRequest({ productRelatedData, manageCartAddProductToCart })}>
      <Image
        style={{ width: 36, height: 36 }}
        source={require('../../resources/icons/add-to-cart.png')}
      />
    </TouchableNativeFeedback>
  );
};

// Render the BookMark Icon
const renderBookmarkIcon = ({ productRelatedData, isPresent,
              manageCartAddProductToWishlist, manageCartRemoveProductFromWishlist }) => {
  const { productId, postId, posterId, userToken } = productRelatedData;
  if (isPresent) {
    return <Icon type="font-awesome" name="bookmark" color='#ea4e9d' size={36} onPress={() => manageCartRemoveProductFromWishlist({ productId, userToken })} />;
  }
  return <Icon type="font-awesome" name="bookmark-o" color='grey' size={36} onPress={() => manageCartAddProductToWishlist({ productId, userToken, posterId, postId })} />;
};

// Main Component
const AddToCartAndWishlistIcon = ({ productRelatedData, userWishlistMap, userCartMap,
          manageCartAddProductToCart, productPageOpenProductModal, manageCartAddProductToWishlist, manageCartRemoveProductFromWishlist }) => {
  const { productId } = productRelatedData;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
      {renderAddToBagIcon({ productRelatedData, manageCartAddProductToCart, productPageOpenProductModal, isPresent: productId in userCartMap })}
      {renderBookmarkIcon({ productRelatedData, manageCartAddProductToWishlist, manageCartRemoveProductFromWishlist, isPresent: productId in userWishlistMap })}
    </View>
  );
};

const mapStateToProps = ({ userActionData }) => {
  const { userWishlistMap, userCartMap } = userActionData;
  return { userWishlistMap, userCartMap };
};

export default connect(mapStateToProps, {
  productPageOpenProductModal: _productPageOpenProductModal,
  manageCartAddProductToCart: _manageCartAddProductToCart,
  manageCartAddProductToWishlist: _manageCartAddProductToWishlist,
  manageCartRemoveProductFromWishlist: _manageCartRemoveProductFromWishlist
})(AddToCartAndWishlistIcon);
