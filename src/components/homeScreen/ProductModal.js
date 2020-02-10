import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { globalStyles } from '../../Styles';

const data = {
  products: [
      {
        id: 1,
        name: 'Men Zip Decoration Letter Print Hooded Sweatshirt',
        brand: 'SHEIN',
        price: 'Rs. 1311',
        cost: 'Rs. 1656',
        discount: '20%',
        imageUri: 'https://img.ltwebstatic.com/origin/images2_pi/2018/06/28/15301669633684263662_im_405x552.jpg',
    },

    {
      id: 2,
      name: 'Wolverine: Beast Mode On T-Shirts   ',
      brand: 'MARVEL',
      price: 'Rs. 449',
      cost: '',
      discount: '',
      imageUri: 'https://images.thesouledstore.com/public/theSoul/uploads/catalog/product/1546675082_Marvel_Wolverine_BeastModeOn_Tshirt_Mockup.jpg',
  },
  ]
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

const ProductView = ({ productData }) => {
  return (
    <View style={styles.productView}>
      <View style={styles.productImage}>
        <Image source={{ uri: productData.imageUri }} style={{ flex: 1 }} />
      </View>
      <View style={styles.productData}>
        <Text style={styles.productName}>{productData.name}</Text>
        <Text style={styles.productBrand}>{productData.brand}</Text>
        <Text style={styles.productPrice}>{productData.price}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.productCost}>{productData.cost}</Text>
          <Text style={styles.productDiscount}>{productData.discount} {productData.discount !== '' ? 'off' : ''}</Text>
        </View>
        <AddToCartButton title="ADD TO CART" onPress={() => console.log('Add to Cart button Pressed')} />
        <BuyNowButton title="BUY NOW" onPress={() => console.log('Buy Now button Pressed')} />
      </View>
    </View>
  );
};

const ProductModal = ({ isVisible, onExit, postData }) => {
  const [itemIndex, setItemIndex] = useState(0);
    return (
        <Modal
          onSwipeComplete={() => onExit(false)}
          swipeDirection={['down']}
          scroll
          isVisible={isVisible}
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
                  <Icon name='cross' type='entypo' onPress={() => onExit(false)} />
                </View>
            </View>
            <View style={styles.body}>
              <View style={styles.productsList}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data.products}
                    keyExtractor={({ item }, index) => item + index.toString()}
                    renderItem={(i) => <View style={styles.thumbnailWrapper}><TouchableWithoutFeedback onPress={() => setItemIndex(i.index)}><Image source={{ uri: i.item.imageUri }} style={styles.productThumbnail} /></TouchableWithoutFeedback></View>}
                />
              </View>
              <ProductView productData={data.products[itemIndex]} />
            </View>

            <View style={styles.editBox} />
          </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalStyle: {
        height: '70%',
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
        width: 80,
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
        fontSize: 20,
      },
      productBrand: {
        fontSize: 15,
        color: 'orange',
        fontWeight: 'bold',
      },
      productPrice: {
        fontSize: 30,
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

export default ProductModal;
