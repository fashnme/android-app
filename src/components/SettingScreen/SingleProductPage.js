import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator, Image } from 'react-native';
import { Header, ListItem, Card, Badge, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import FlashMessage from 'react-native-flash-message';
import {
  manageCartAddProductToCart,
  manageCartAddProductToWishlist,
  productPageAddProductToReminder
} from '../../actions';


// ****************************** When opening a recommended products below then don't use the
// posterId & referrerPost sent by Actions Call ******************************

class SingleProductPage extends Component {
  constructor() {
    super();
    this.state = {
      sizeSelected: null
    };
  }

  checkAndCompleteRequest() {
    if (this.state.sizeSelected === null) {
      this.refs.singleProductPageMessage.showMessage({ message: 'Please Scroll Down & Select a Size', type: 'danger', duration: 5000, floating: true, icon: 'warning' });
      console.log('Size Null');
      return;
    }
    const { userToken, internalReferralId, singleProductPageData } = this.props;
    const { productId, posterId, referrerPost, referrerId } = singleProductPageData;
    this.props.manageCartAddProductToCart({
      productId,
      quantity: 1,
      sizeSelected: this.state.sizeSelected,
      postId: referrerPost,
      posterId,
      referrerId: referrerId === undefined || referrerId.length === 0 ? internalReferralId : referrerId,
      userToken
    });
    this.refs.singleProductPageMessage.showMessage({ message: 'Added to Bag!', type: 'success', duration: 5000, floating: true, icon: 'success' });
  }
  renderImages({ imagesArray }) {
    return (
      <View style={{ height: 500, elevation: 1, justifyContent: 'center', alignSelf: 'center' }}>
        <Swiper
          loadMinimal
          loadMinimalSize={2}
          loop={false}
          containerStyle={{ marginTop: 0 }}
          dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 0, marginBottom: 3 }} />}
          activeDot={<View style={{ backgroundColor: '#007aff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 0, marginBottom: 3 }} />}
        >
          {imagesArray.map((item) => (
              <Image source={{ uri: item }} style={{ marginTop: 0, flex: 1, resizeMode: 'contain', borderRadius: 10 }} />
          ))}
        </Swiper>
      </View>
    );
  }
  renderSpinner() {
    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator
          size="large"
          color='#2196F3'
        />
      </View>
    );
  }
  renderPriceBlock({ singleProductPageData }) {
    const { title, brandName, crossedPrice, price } = singleProductPageData;
    if (brandName === undefined) {
      return <View style={{ height: 5000 }} />;
    }
    return (
      <View style={{ flex: 3, padding: 5 }}>
        <Text style={{ fontSize: 16, marginTop: 2 }}>{title}</Text>
        <Text style={styles.productBrand}>{brandName.trim().toUpperCase()}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.productPrice}>{`\u20B9${price}`}</Text>
          { this.renderCrossedPriceBlock({ crossedPrice, price }) }
        </View>
      </View>
    );
  }
  renderCrossedPriceBlock({ crossedPrice, price }) {
    const discount = Math.floor(((crossedPrice - price) * 100) / crossedPrice);
    if (discount === 0) {
      return <View />;
    }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
        <Text style={styles.productCost}>{`\u20B9 ${crossedPrice}`}</Text>
        <Text style={styles.productDiscount}>{`${discount}% Off`}</Text>
      </View>
    );
  }
  renderSizeBlock({ sizesAvailable, sizeChartUrl }) {
    const sizeSelected = this.state.sizeSelected;
    if (sizesAvailable === undefined) {
      return (
        <Card containerStyle={{ paddingBottom: 5, borderRadius: 8, margin: 6 }}>
          <Text style={styles.headingStyle}> Sizes Available </Text>
          <Text style={{ justifyContent: 'center', flexDirection: 'row', flex: 1 }}> Updating Sizes...... </Text>
        </Card>
      );
    }
    if (sizesAvailable.length === 0) {
      return (
        <View>
          <View style={styles.codeView}>
            <Text style={styles.codeText}> Out of Stock </Text>
          </View>
          {this.renderInStockReminderButton()}
        </View>
      );
      // return <Text style={{ color: 'red', textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}> Out of Stock </Text>;
    }
    return (
      <Card containerStyle={{ paddingBottom: 0, borderRadius: 8, margin: 6 }}>
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
                onPress={() => this.setState({ sizeSelected: item.size })}
              />
            );
          }}
        />
        </View>
        {this.renderSizeChartText({ sizeChartUrl })}
      </Card>
    );
  }
  renderInStockReminderButton() {
    const { reminderAdded, userToken, singleProductPageData } = this.props;
    if (reminderAdded) {
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
          this.props.productPageAddProductToReminder({ userToken, productData: singleProductPageData });
          this.refs.singleProductPageMessage.showMessage({ message: 'Reminder Added', type: 'success', duration: 5000, floating: true, icon: 'success', description: 'We will remind you when product is back in Stock' });
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
  }
  renderSizeChartText({ sizeChartUrl }) {
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
          onPress={() => this.flatListRef.scrollToEnd({ animated: true, duration: 1000 })}
        />
      </View>
    );
  }
  renderDescription({ description }) {
    if (description === undefined || description.length === 0) {
      return <View />;
    }
    return (
      <View style={{ marginBottom: 100 }}>
        {this.renderHeader('Other Details')}
        <Text style={styles.descStyle}>{ description }</Text>
      </View>
    );
  }
  renderHeader(title) {
    return (
      <View>
        <Text style={styles.headingStyle}>{ title }</Text>
      </View>
    );
  }
  renderFeatures({ features }) {
    if (features === undefined || features.length === 0) {
      return <View />;
    }
    return (
      <View>
        {this.renderHeader('Product Features')}
        <FlatList
          data={features}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <ListItem
                title={item}
                titleStyle={styles.featureStyle}
                contentContainerStyle={{ margin: 0, padding: 2 }}
                leftIcon={{ name: 'check', type: 'feather', color: 'green', size: 18 }}
                containerStyle={{ margin: 0, padding: 0 }}
              />
            );
          }}
        />
      </View>
    );
  }
  renderSizeChart({ sizeChartUrl }) {
    if (sizeChartUrl === undefined || sizeChartUrl.length === 0) {
      return <View />;
    }
    // const url = 'https://res.cloudinary.com/dhyo2ely0/image/upload/v1598555293/VisualSearch/sampleSizeChart.png';
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader('Size Details')}
            <Image
              source={{ uri: sizeChartUrl }}
              // source={{ uri: url }}
              style={{ height: 200, width: '100%', resizeMode: 'stretch' }}
            />
      </View>
    );
  }
  renderBuyNowButton() {
    const { userToken, internalReferralId, presentInWishlist, singleProductPageData } = this.props;
    const { productId, posterId, referrerPost, referrerId } = singleProductPageData;
    return (
      <View style={styles.checkoutButton}>
        <Card containerStyle={{ flex: 1, margin: 0, padding: 5, borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button
              titleStyle={{ fontWeight: 'bold', color: '#FF416C' }}
              title={'WISHLIST'}
              containerStyle={{ width: '40%' }}
              raised
              buttonStyle={{ borderColor: '#FF4B2B' }}
              type={'outline'}
              onPress={() => {
                this.props.manageCartAddProductToWishlist({
                  productId,
                  userToken,
                  posterId,
                  postId: referrerPost,
                  referrerId: referrerId === undefined || referrerId.length === 0 ? internalReferralId : referrerId,
                });
                this.refs.singleProductPageMessage.showMessage({ message: 'Added to Wishlist!', type: 'success', floating: true, icon: 'success' });
              }}
              disabled={presentInWishlist}
            />
            <Button
              ViewComponent={LinearGradient}
              titleStyle={{ fontWeight: 'bold' }}
              linearGradientProps={{
                colors: ['#FF4B2B', '#FF416C'],
                start: { x: 1.0, y: 0.0 },
                end: { y: 1.0, x: 1.0 },
              }}
              title={'BUY NOW'}
              containerStyle={{ width: '40%' }}
              raised
              onPress={() => this.checkAndCompleteRequest()}
            />
          </View>
        </Card>
      </View>
    );
  }

  render() {
    const { singleProductPageData, productLoading } = this.props;
    const { imagesArray, features, description, sizeChartUrl } = singleProductPageData;
    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <Header
          backgroundColor={null}
          leftComponent={{ icon: 'arrow-left',
            type: 'font-awesome',
            color: '#e9e9e9',
            onPress: () => { Actions.pop(); },
            reverse: true,
            size: 18,
            reverseColor: '#FF416C',
            containerStyle: { marginLeft: -5, marginTop: 0, opacity: 0.8 },
          }}
          rightComponent={{ icon: 'shopping-bag',
            type: 'font-awesome',
            color: '#FF416C',
            onPress: () => { Actions.manageCart(); },
            reverse: true,
            size: 18,
            containerStyle: { marginRight: -5, marginTop: 0, opacity: 0.8 },
            reverseColor: '#fff'
          }}
          containerStyle={{ paddingTop: 0, height: 50, backgroundColor: null }}
        />
        <FlatList
          listKey={'mainList'}
          ref={(ref) => { this.flatListRef = ref; }}
          // ListHeaderComponent={this.renderImages({ imagesArray: singleProductPageData.imagesArray })}
          // ListHeaderComponent={imagesArray === undefined ? this.renderSpinner() : this.renderImages({ imagesArray })}
          ListFooterComponent={
            <View style={{ marginBottom: 80 }}>
              {imagesArray === undefined ? this.renderSpinner() : this.renderImages({ imagesArray })}
              <Card containerStyle={{ paddingBottom: 4, borderRadius: 8, margin: 6 }}>
                {this.renderPriceBlock({ singleProductPageData })}
              </Card>
              {this.renderSizeBlock({ sizesAvailable: singleProductPageData.sizesAvailable, sizeChartUrl: singleProductPageData.sizeChartUrl })}
              <Card containerStyle={{ paddingBottom: 4, borderRadius: 8, margin: 6 }}>
                {this.renderFeatures({ features })}
                {this.renderDescription({ description })}
                {this.renderSizeChart({ sizeChartUrl })}
              </Card>
            </View>
          }
          data={[]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => {}}
          refreshControl={
            <RefreshControl
              onRefresh={() => {}}
              refreshing={productLoading}
              colors={['#D5252D', '#FE19AA']}
            />
          }
          refreshing={productLoading}
        />
        {this.renderBuyNowButton()}
        <FlashMessage position="top" ref="singleProductPageMessage" />
      </View>
    );
  }
}

const styles = {
  headingStyle: { fontWeight: 'bold', marginBottom: 5, marginTop: 5 },
  featureStyle: { fontSize: 14, fontWeight: '100', color: 'rgba(0, 0, 0, 0.7)' },
  descStyle: { fontSize: 14, fontWeight: '100', color: 'rgba(0, 0, 0, 0.7)' },
  productPrice: { fontSize: 20, marginTop: 4, fontWeight: 'bold' },
  productCost: { fontSize: 18, marginTop: 4, textDecorationLine: 'line-through', },
  productDiscount: { fontSize: 20, color: 'green', fontWeight: 'bold', marginLeft: 10 },
  productBrand: { fontSize: 15, color: 'orange', marginTop: 4, fontWeight: 'bold' },
  codeText: { fontWeight: 'bold', fontSize: 18, color: 'red', textAlign: 'center' },
  sizeContainerStyle: { margin: 6, padding: 3, height: 28, backgroundColor: 'white', borderWidth: 1 },
  sizeTextStyle: { fontSize: 18, fontWeight: 'bold', margin: 2, color: 'grey' },
  sizeChartText: { fontSize: 14, fontWeight: 'bold', color: '#ff3f6c', textShadowRadius: 1 },
  checkoutButton: { flexDirection: 'row', position: 'absolute', bottom: 0 },
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
};

const mapStateToProps = ({ personalPageState, productPageState, referralState, userActionData }) => {
    const { userToken } = personalPageState;
    const { productLoading, singleProductPageData, sizeAndPriceObject, productAddedForReminder } = productPageState;
    const { referrerId } = referralState;
    const { userWishlistMap } = userActionData;
    let productData = {};
    // console.log('sizeAndPriceObject', { sizeAndPriceObject });
    if (singleProductPageData.productId in sizeAndPriceObject) {
      productData = { ...singleProductPageData, ...sizeAndPriceObject[singleProductPageData.productId] };
    } else {
      productData = singleProductPageData;
    }
    let presentInWishlist = false;
    if (singleProductPageData.productId in userWishlistMap) {
      presentInWishlist = true;
    }
    let reminderAdded = false;
    if (singleProductPageData.productId in productAddedForReminder) {
      reminderAdded = true;
    }
    return { userToken, productLoading, singleProductPageData: productData, internalReferralId: referrerId, presentInWishlist, reminderAdded };
    // internalReferralId: Referral Id stored in the redux state
};

export default connect(mapStateToProps, {
  manageCartAddProductToCart,
  manageCartAddProductToWishlist,
  productPageAddProductToReminder
})(SingleProductPage);
