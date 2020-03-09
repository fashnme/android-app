import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import ProductExtraInfo from './ProductExtraInfo';
import ProductPriceSizeView from './ProductPriceSizeView';
import {
  productPageOpenProductModal as _productPageOpenProductModal,
  productPageSelectedProductUpdate as _productPageSelectedProductUpdate
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

const ProductModal = ({ productsData, productsModalVisible, postId, posterId,
  productPageOpenProductModal, productPageSelectedProductUpdate }) => {
    return (
        <Overlay
          isVisible={productsModalVisible}
          overlayStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 2, bottom: 0, position: 'absolute' }}
          width={'100%'}
          height={'80%'}
          windowBackgroundColor={'transparent'}
        >
        <View style={styles.modalStyle}>
        <ScrollView>
          <View style={styles.commentsModalHeader}>
            <Text style={styles.commentsModalHeaderTitle}>Products</Text>
              <View style={styles.commentsModalHeaderExitButton}>
                <Icon name='cross' type='entypo' size={18} raised containerStyle={styles.crossStyle} onPress={() => productPageOpenProductModal({ isVisible: false, productsData: [], postDetails: { postId, posterId } })} />
              </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.productsList}>
              <FlatList
                  horizontal
                  data={productsData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => <ProductThumbnail item={item} index={index} productPageSelectedProductUpdate={productPageSelectedProductUpdate} />}
              />
            </View>
            <ProductPriceSizeView />
            <ProductExtraInfo />
          </View>
        </ScrollView>
        </View>
        </Overlay>
        // </Modal>
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
      },
      commentsModalHeaderExitButton: {
        position: 'absolute',
        right: 8,
        top: 8,
        opacity: 0.6,
      },
      productsList: {
        marginTop: 10,
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
      crossStyle: {
        marginRight: 0,
        marginTop: 0,
        padding: 0
      }
});
const mapStateToProps = ({ productPageState }) => {
    const { productsData, productsModalVisible, postId, posterId } = productPageState;
    return { productsData, productsModalVisible, postId, posterId };
};
export default connect(mapStateToProps, {
  productPageOpenProductModal: _productPageOpenProductModal,
  productPageSelectedProductUpdate: _productPageSelectedProductUpdate
})(ProductModal);
