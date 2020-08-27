import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
// import testData from './testData';

const renderHeader = (title) => {
  return (
    <View>
      <Text style={styles.headingStyle}>{ title }</Text>
    </View>
  );
};

const renderFeatures = ({ features }) => {
  if (features === undefined || features.length === 0) {
    return <View />;
  }
  return (
    <View>
      {renderHeader('Product Features')}
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
};

const renderDescription = ({ description }) => {
  if (description === undefined || description.length === 0) {
    return <View />;
  }
  return (
    <View>
      {renderHeader('Other Details')}
      <Text style={styles.descStyle}>{ description }</Text>
    </View>
  );
};

const renderSizeChart = ({ sizeChartUrl }) => {
  if (sizeChartUrl === undefined || sizeChartUrl.length === 0) {
    return <View />;
  }
  // const url = 'https://res.cloudinary.com/dhyo2ely0/image/upload/v1598555293/VisualSearch/sampleSizeChart.png';
  return (
    <View style={{ flex: 1 }}>
      {renderHeader('Size Details')}
          <Image
            source={{ uri: sizeChartUrl }}
            // source={{ uri: url }}
            style={{ height: 200, width: '100%', resizeMode: 'stretch' }}
          />
    </View>
  );
};

const ProductExtraInfo = ({ selectedItem, productsCompleteData, allFine }) => {
  // console.log('ProductExtraInfo', selectedItem, productsCompleteData, allFine);
  if (!allFine) {
    return <View />;
  }
  const { features, description, sizeChartUrl } = productsCompleteData[selectedItem];
  // const { features, description } = testData;
  return (
    <Card containerStyle={{ marginBottom: 6, paddingBottom: 4, borderRadius: 8 }}>
      {renderFeatures({ features })}
      {renderDescription({ description })}
      {renderSizeChart({ sizeChartUrl })}
    </Card>
  );
};

const styles = {
  headingStyle: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5
  },
  featureStyle: {
    fontSize: 14,
    fontWeight: '100',
    color: 'rgba(0, 0, 0, 0.7)'
  },
  descStyle: {
    fontSize: 14,
    fontWeight: '100',
    color: 'rgba(0, 0, 0, 0.7)'
  }
};


const mapStateToProps = ({ productPageState }) => {
  const { productsData, selectedItem, productsCompleteData } = productPageState;
  let allFine = false;
  if (productsData.length === productsCompleteData.length
    && selectedItem < productsData.length
    && productsData[selectedItem].productId === productsCompleteData[selectedItem].productId) {
    allFine = true; //console.log('Everything is Fine');
  }
  return { selectedItem, productsCompleteData, allFine };
};

export default connect(mapStateToProps)(ProductExtraInfo);
