import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  explorePageGetProductSearchResults as _explorePageGetProductSearchResults
} from '../../actions';

import CategoryCard from './CategoryCard';

const renderItem = ({ item, userToken, explorePageGetProductSearchResults }) => {
  const { title, imageUri, imagePath } = item;
  const searchText = `women ${item.searchText}`;
  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 18 }}>
    <CategoryCard
      title={title}
      imageUri={imageUri}
      imagePath={imagePath}
      onPress={() => { console.log('title pressed', searchText); explorePageGetProductSearchResults({ userToken, query: searchText }); }}
    />
    </View>
  );
};

const renderHeader = ({ mainImageUri, mainImagePath }) => {
  try {
    return (
      <View style={{ marginBottom: 5 }}>
        <Image
          source={{ uri: mainImagePath }}
          style={{ flex: 1, height: 200, width: '100%', resizeMode: 'cover' }}
        />
      </View>
    );
  } catch (error) {
    console.log('Women Page renderHeader', mainImagePath);
    return (
      <View style={{ marginBottom: 5 }}>
        <Image
          source={{ uri: mainImageUri }}
          style={{ flex: 1, height: 200, width: '100%', resizeMode: 'cover' }}
        />
      </View>
    );
  }
};

const WomenPage = ({ womenCategoriesData, explorePageGetProductSearchResults, userToken }) => {
  // console.log('WomenPage', womenCategoriesData);
  const { categories, mainImageUri, mainImagePath } = womenCategoriesData;
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader({ mainImageUri, mainImagePath })}
        data={categories}
        numColumns={2}
        renderItem={({ item, index }) => renderItem({ item, index, userToken, explorePageGetProductSearchResults })}
        // style={{ borderRadius: 10, margin: 0 }}
      />
    </View>
  );
};

const mapStateToProps = ({ personalPageState, explorePageState }) => {
    const { userToken } = personalPageState;
    const { womenCategoriesData } = explorePageState;
    return { userToken, womenCategoriesData };
};

export default connect(mapStateToProps, {
  explorePageGetProductSearchResults: _explorePageGetProductSearchResults
})(WomenPage);
