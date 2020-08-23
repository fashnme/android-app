import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import { Overlay } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import {
  productPageToggleFullImageViewer as _productPageToggleFullImageViewer
} from '../../actions';

// const renderCrossIcon = ({ productPageToggleFullImageViewer }) => {
//   return (
//     <View style={styles.commentsModalHeaderExitButton}>
//       <Icon
//         name='cross'
//         type='entypo'
//         size={18}
//         raised
//         containerStyle={styles.crossStyle}
//         onPress={() => {
//             productPageToggleFullImageViewer({ visible: false });
//           }}
//       />
//     </View>
//   );
// };

const renderImages = ({ imagesArray }) => {
  return (
    <View style={{ flex: 1 }}>
      <Swiper
        loadMinimal
        loadMinimalSize={2}
        // index={0}
        loop={false}
      >
        {imagesArray.map((item) => (
          <View style={{ flex: 1 }}>
            <Image source={{ uri: item }} style={{ flex: 1, resizeMode: 'contain', borderRadius: 5 }} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const renderSpinner = () => {
  return (
    <View style={{ justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator
            size="large"
            color='#2196F3'
          />
    </View>
  );
};

// productPageToggleFullImageViewer = ({ visible })
const FullProductImageViewer = ({ imageViewerModalVisible, imagesArray,
    productPageToggleFullImageViewer }) => {
  // console.log('FullProductImageViewer visible', imageViewerModalVisible);
  return (
    <Overlay
      isVisible={imageViewerModalVisible}
      overlayStyle={{ height: '75%', width: '90%', backgroundColor: 'transparent', elevation: 0 }}
      animationType={'fade'}
      onBackdropPress={() => productPageToggleFullImageViewer({ visible: false })}
    >
      { /*renderCrossIcon({ productPageToggleFullImageViewer }) */}
      {imagesArray === undefined ? renderSpinner() : renderImages({ imagesArray }) }
    </Overlay>
  );
};

const mapStateToProps = ({ productPageState }) => {
  const { productsData, selectedItem, productsCompleteData, imageViewerModalVisible } = productPageState;
  let imagesArray;
  if (productsData.length === productsCompleteData.length
    && selectedItem < productsData.length
    && productsData[selectedItem].productId === productsCompleteData[selectedItem].productId) {
    imagesArray = productsCompleteData[selectedItem].imagesArray;
  } else {
    imagesArray = undefined;
  }
  return { imageViewerModalVisible, imagesArray };
};

export default connect(mapStateToProps, {
  productPageToggleFullImageViewer: _productPageToggleFullImageViewer
})(FullProductImageViewer);
