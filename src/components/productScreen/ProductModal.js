import React, { useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { Icon, Overlay, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import ProductExtraInfo from './ProductExtraInfo';
import ProductPriceSizeView from './ProductPriceSizeView';
import {
  productPageOpenProductModal as _productPageOpenProductModal,
  productPageSelectedProductUpdate as _productPageSelectedProductUpdate,
  videoPagePlayStatusUpdate as _videoPagePlayStatusUpdate
} from '../../actions';

const ProductThumbnail = ({ index, item, productPageSelectedProductUpdate }) => {
  return (
    <View style={styles.thumbnailWrapper}>
      <TouchableWithoutFeedback onPress={() => productPageSelectedProductUpdate(index)}>
        <Image source={{ uri: item.image }} style={styles.productThumbnail} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const NoProductTagged = () => {
  return (
    <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '15%' }}>
      <Image
        source={require('../../resources/icons/empty_bag.png')}
        style={{ height: 200, width: 200 }}
      />
      <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 18 }}> No Products Tagged </Text>
      <Text style={{ marginTop: 10, fontSize: 18, opacity: 0.6 }}> We will tag the products soon! </Text>
    </View>
  );
};

const ProductModal = ({ productsData, productsModalVisible, postId, posterId, previousState,
  productPageOpenProductModal, productPageSelectedProductUpdate, videoPagePlayStatusUpdate }) => {
    const { homePageVideoPlay, celebPageVideoPlay } = previousState;
    const scrollRef = useRef();
    return (
        <Overlay
          isVisible={productsModalVisible}
          overlayStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 2, bottom: 0, position: 'absolute' }}
          width={'100%'}
          height={'80%'}
          windowBackgroundColor={'transparent'}
          animationType={'slide'}
        >
        <View style={styles.modalStyle}>
        <ScrollView
          ref={scrollRef}
        >
          <View style={styles.commentsModalHeader}>
            <View style={{ flexDirection: 'column' }}>
              <Divider style={{ backgroundColor: '#c2c9cf', height: 4, width: 30, borderRadius: 20, alignSelf: 'center' }} />
              <Text style={styles.commentsModalHeaderTitle}>Products</Text>
            </View>
              <View style={styles.commentsModalHeaderExitButton}>
                <Icon
                  name='cross'
                  type='entypo'
                  size={18}
                  raised
                  containerStyle={styles.crossStyle}
                  onPress={() => {
                    productPageOpenProductModal({ isVisible: false, productsData: [], postDetails: { postId, userId: posterId } });
                    videoPagePlayStatusUpdate({ homePageVideoPlay, celebPageVideoPlay });
                    productPageSelectedProductUpdate(0); // Set the Selected Product to 0 on closing the products Modal
                  }}
                />
              </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 8, borderBottomWidth: productsData !== undefined && productsData.length === 0 ? 0 : 0.2 }}>
              <FlatList
                  horizontal
                  data={productsData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => <ProductThumbnail item={item} index={index} productPageSelectedProductUpdate={productPageSelectedProductUpdate} />}
              />

            </View>
            { productsData !== undefined && productsData.length === 0 && <NoProductTagged /> }
            <ProductPriceSizeView scrollRef={scrollRef} />
            <ProductExtraInfo />
          </View>
        </ScrollView>
        </View>
        </Overlay>
    );
};

const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 1
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
        marginTop: 15
      },
      commentsModalHeaderExitButton: {
        position: 'absolute',
        right: 8,
        top: 8,
        opacity: 0.6,
      },
      productsList: {
        // marginTop: 8,
        // borderBottomWidth: 0.2,
      },
      thumbnailWrapper: {
        padding: 10,
      },
      productThumbnail: {
        width: 90,
        height: 90,
        borderRadius: 20,
      },
      crossStyle: {
        marginRight: 0,
        marginTop: 0,
        padding: 0
      }
});
const mapStateToProps = ({ productPageState, videoPlayStatusState }) => {
    const { productsData, productsModalVisible, postId, posterId } = productPageState;
    const { previousState } = videoPlayStatusState;
    return { productsData, productsModalVisible, postId, posterId, previousState };
};
export default connect(mapStateToProps, {
  productPageOpenProductModal: _productPageOpenProductModal,
  productPageSelectedProductUpdate: _productPageSelectedProductUpdate,
  videoPagePlayStatusUpdate: _videoPagePlayStatusUpdate
})(ProductModal);
