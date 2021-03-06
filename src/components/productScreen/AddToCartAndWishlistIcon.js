import React from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { showMessage } from 'react-native-flash-message';

import {
  productPageOpenProductModal as _productPageOpenProductModal,
  manageCartAddProductToCart as _manageCartAddProductToCart,
  manageCartAddProductToWishlist as _manageCartAddProductToWishlist,
  manageCartRemoveProductFromWishlist as _manageCartRemoveProductFromWishlist
} from '../../actions';

// Check all Params, then add product to Cart
const checkAndCompleteRequest = ({ productRelatedData, referrerId, manageCartAddProductToCart }) => {
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
    referrerId,
    userToken
  });
  showMessage({ message: 'Added to Bag!', type: 'success', floating: true, icon: 'success' });
};

// Render the Bag Icon
const renderAddToBagIcon = ({ productRelatedData, referrerId, isPresent,
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
    <TouchableNativeFeedback
      onPress={() => { checkAndCompleteRequest({ productRelatedData, referrerId, manageCartAddProductToCart }); }}
    >
      <Image
        style={{ width: 36, height: 36 }}
        source={require('../../resources/icons/add-to-cart.png')}
      />
    </TouchableNativeFeedback>
  );
};

// Render the BookMark Icon
const renderBookmarkIcon = ({ productRelatedData, referrerId, isPresent,
              manageCartAddProductToWishlist, manageCartRemoveProductFromWishlist }) => {
  const { productId, postId, posterId, userToken } = productRelatedData;
  if (isPresent) {
    return <Icon type="font-awesome" name="bookmark" color='#ea4e9d' size={36} onPress={() => { manageCartRemoveProductFromWishlist({ productId, userToken }); showMessage({ message: 'Removed from Wishlist!', type: 'danger', floating: true, icon: 'danger' }); }} />;
  }
  return <Icon type="font-awesome" name="bookmark-o" color='grey' size={36} onPress={() => { manageCartAddProductToWishlist({ productId, userToken, posterId, postId, referrerId }); showMessage({ message: 'Added to Wishlist!', type: 'success', floating: true, icon: 'success' }); }} />;
};

// Main Component
const AddToCartAndWishlistIcon = ({ productRelatedData, userWishlistMap, userCartMap, referrerId,
          manageCartAddProductToCart, productPageOpenProductModal, manageCartAddProductToWishlist, manageCartRemoveProductFromWishlist }) => {
  const { productId } = productRelatedData;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
      {renderAddToBagIcon({ productRelatedData, manageCartAddProductToCart, productPageOpenProductModal, referrerId, isPresent: productId in userCartMap })}
      {renderBookmarkIcon({ productRelatedData, manageCartAddProductToWishlist, manageCartRemoveProductFromWishlist, referrerId, isPresent: productId in userWishlistMap })}
    </View>
  );
};

const mapStateToProps = ({ userActionData, referralState }) => {
  const { userWishlistMap, userCartMap } = userActionData;
  const { referrerId } = referralState;
  return { userWishlistMap, userCartMap, referrerId };
};

export default connect(mapStateToProps, {
  productPageOpenProductModal: _productPageOpenProductModal,
  manageCartAddProductToCart: _manageCartAddProductToCart,
  manageCartAddProductToWishlist: _manageCartAddProductToWishlist,
  manageCartRemoveProductFromWishlist: _manageCartRemoveProductFromWishlist
})(AddToCartAndWishlistIcon);
