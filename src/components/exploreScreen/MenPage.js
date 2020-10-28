import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  explorePageGetProductSearchResults as _explorePageGetProductSearchResults
} from '../../actions';

import CategoryCard from './CategoryCard';

const renderItem = ({ item, userToken, explorePageGetProductSearchResults }) => {
  const { title, imageUri, imagePath } = item;
  const searchText = `men ${item.searchText}`;
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
    console.log('Men Page renderHeader', mainImagePath);
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

const MenPage = ({ menCategoriesData, explorePageGetProductSearchResults, userToken }) => {
  // console.log('MenPage', menCategoriesData);
  const { categories, mainImageUri, mainImagePath } = menCategoriesData;
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
    const { menCategoriesData } = explorePageState;
    return { userToken, menCategoriesData };
};

export default connect(mapStateToProps, {
  explorePageGetProductSearchResults: _explorePageGetProductSearchResults
})(MenPage);
