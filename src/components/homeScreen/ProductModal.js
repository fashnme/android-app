import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { globalStyles } from '../../Styles';
import {
  homePageOpenProductsModal as _homePageOpenProductsModal,
  productPageSelectedProductUpdate as _productPageSelectedProductUpdate
} from '../../actions';


const ProductThumbnail = ({ index, item, productPageSelectedProductUpdate, productsData }) => {
  return (
    <View style={styles.thumbnailWrapper}>
      <TouchableWithoutFeedback onPress={() => productPageSelectedProductUpdate(index, productsData)}>
        <Image source={{ uri: item.image }} style={styles.productThumbnail} />
      </TouchableWithoutFeedback>
    </View>
  );
};

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
const ProductView = ({ productData }) => {
  // console.log('ProductModal productData', productData);
  if (productData === undefined) {
    return <View />;
  }
  const { title, brandName, price, crossedPrice, image } = productData;
  return (
    <View style={styles.productView}>
      <View style={styles.productImage}>
        <Image source={{ uri: image }} style={{ flex: 1 }} />
      </View>
      <View style={styles.productData}>
        <Text style={styles.productName}>{title}</Text>
        <Text style={styles.productBrand}>{brandName}</Text>
        <Text style={styles.productPrice}>{`\u20B9${price}`}</Text>
        { renderPriceBlock({ crossedPrice, price }) }
        <AddToCartButton title="ADD TO CART" onPress={() => console.log('Add to Cart button Pressed')} />
        <BuyNowButton title="BUY NOW" onPress={() => console.log('Buy Now button Pressed')} />
      </View>
    </View>
  );
};

const ProductModal = ({ selectedItem, productsData, productsModalVisible, homePageOpenProductsModal, productPageSelectedProductUpdate }) => {
    return (
        <Modal
          onSwipeComplete={() => homePageOpenProductsModal({ isVisible: false, productsData: [] })}
          swipeDirection={['down']}
          scroll
          isVisible={productsModalVisible}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
          }}
          backdropOpacity={0}
        >
          <View style={styles.modalStyle}>
            <View style={styles.commentsModalHeader}>
              <Text style={styles.commentsModalHeaderTitle}>Products</Text>
                <View style={styles.commentsModalHeaderExitButton}>
                  <Icon name='cross' type='entypo' onPress={() => homePageOpenProductsModal({ isVisible: false, productsData: [] })} />
                </View>
            </View>
            <View style={styles.body}>
              <View style={styles.productsList}>
                <FlatList
                    horizontal
                    data={productsData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <ProductThumbnail item={item} index={index} productPageSelectedProductUpdate={productPageSelectedProductUpdate} productsData={productsData} />}
                />
              </View>
              <ProductView productData={productsData[selectedItem]} />
            </View>

            <View style={styles.editBox} />
          </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalStyle: {
        height: '80%',
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        margin: 0,
      },
      commentsModalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
      },
      commentsModalHeaderTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        opacity: 0.6,
      },
      commentsModalHeaderExitButton: {
        position: 'absolute',
        right: 8,
        top: 8,
        opacity: 0.6,
      },
      body: {
        flex: 1,
      },
      title: {
        fontSize: 10,
      },
      productsList: {
        margin: 10,
        borderBottomWidth: 0.6,
      },
      thumbnailWrapper: {
        padding: 10,
      },
      productThumbnail: {
        width: 90,
        height: 90,
        borderRadius: 20,
      },
      productView: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
      },
      productImage: {
        flex: 3,
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
      },
      productData: {
        flex: 3,
        padding: 10,
      },
      productName: {
        fontSize: 16,
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
      }
});
const mapStateToProps = ({ productPageState }) => {
    const { productsData, productsModalVisible, selectedItem } = productPageState;
    return { productsData, productsModalVisible, selectedItem };
};
export default connect(mapStateToProps, {
  homePageOpenProductsModal: _homePageOpenProductsModal,
  productPageSelectedProductUpdate: _productPageSelectedProductUpdate
})(ProductModal);
