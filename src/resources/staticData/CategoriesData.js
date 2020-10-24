import { Image } from 'react-native';

export const MenCategoriesData = {
  mainImageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-main-image.jpeg',
  categories: [
    {
      title: 'T-SHIRTS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-tshirt.jpg',
      searchText: 'tshirts'
    },
    {
      title: 'SHIRTS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-shirt.jpg',
      searchText: 'shirts'
    },
    {
      title: 'JEANS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-jeans.jpg',
      searchText: 'jeans'
    },
    {
      title: 'SHOES',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-shoes.jpg',
      searchText: 'shoes'
    },
    {
      title: 'JOGGERS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-joggers.jpg',
      searchText: 'joggers'
    },
    {
      title: 'JACKETS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-jackets.jpg',
      searchText: 'jackets'
    }
  ]
};

MenCategoriesData.categories.forEach((item,) => {
  Image.prefetch(item.imageUri);
  // console.log(item);
});


export const WomenCategoriesData = {
  mainImageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-main-image.jpeg',
  categories: [
    {
      title: 'TOPS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-tops.jpeg',
      searchText: 'tops'
    },
    {
      title: 'DRESSES',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-dresses.jpeg',
      searchText: 'dress'
    },
    {
      title: 'JEANS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-jeans.jpeg',
      searchText: 'jeans'
    },
    {
      title: 'SHORTS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-shorts.jpg',
      searchText: 'shorts'
    },
    {
      title: 'SHOES',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-shoes.jpg',
      searchText: 'shoes'
    },
    {
      title: 'SKIRTS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-skirts.jpg',
      searchText: 'skirts'
    },
    {
      title: 'JACKETS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-jackets.jpg',
      searchText: 'jackets'
    },
    {
      title: 'JOGGERS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-joggers.jpg',
      searchText: 'joggers'
    },
  ]
};

WomenCategoriesData.categories.forEach((item,) => {
  Image.prefetch(item.imageUri);
  // console.log(item);
});
