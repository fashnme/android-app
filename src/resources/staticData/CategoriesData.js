import {
  PATH_TO_CACHE_DIR,
  FILE_TYPE
} from '../../types';

const DirPath = `${FILE_TYPE}${PATH_TO_CACHE_DIR}`;

export const MenCategoriesData = {
  mainImageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-main-image.jpeg',
  mainImagePath: `${DirPath}/men-main-image.jpg`,
  categories: [
    {
      title: 'T-SHIRTS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-tshirt.jpg',
      searchText: 'tshirts',
      imagePath: `${DirPath}/men-tshirts.jpg` // Download Image to this path
    },
    {
      title: 'SHIRTS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-shirt.jpg',
      searchText: 'shirts',
      imagePath: `${DirPath}/men-shirts.jpg`
    },
    {
      title: 'JEANS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-jeans.jpg',
      searchText: 'jeans',
      imagePath: `${DirPath}/men-jeans.jpg`
    },
    {
      title: 'SHOES',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-shoes.jpg',
      searchText: 'shoes',
      imagePath: `${DirPath}/men-shoes.jpg`
    },
    {
      title: 'JOGGERS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-joggers.jpg',
      searchText: 'joggers',
      imagePath: `${DirPath}/men-joggers.jpg`
    },
    {
      title: 'JACKETS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/men/men-jackets.jpg',
      searchText: 'jackets',
      imagePath: `${DirPath}/men-jackets.jpg`
    }
  ]
};

export const WomenCategoriesData = {
  mainImageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-main-image.jpeg',
  mainImagePath: `${DirPath}/women-main-image.jpg`,
  categories: [
    {
      title: 'TOPS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-tops.jpeg',
      searchText: 'tops',
      imagePath: `${DirPath}/women-tops.jpg`
    },
    {
      title: 'DRESSES',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-dresses.jpeg',
      searchText: 'dress',
      imagePath: `${DirPath}/women-dress.jpg`
    },
    {
      title: 'JEANS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-jeans.jpeg',
      searchText: 'jeans',
      imagePath: `${DirPath}/women-jeans.jpg`
    },
    {
      title: 'SHORTS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-shorts.jpg',
      searchText: 'shorts',
      imagePath: `${DirPath}/women-shorts.jpg`
    },
    {
      title: 'SHOES',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-shoes.jpg',
      searchText: 'shoes',
      imagePath: `${DirPath}/women-shoes.jpg`
    },
    {
      title: 'SKIRTS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-skirts.jpg',
      searchText: 'skirts',
      imagePath: `${DirPath}/women-skirts.jpg`
    },
    {
      title: 'JACKETS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-jackets.jpg',
      searchText: 'jackets',
      imagePath: `${DirPath}/women-jackets.jpg`
    },
    {
      title: 'JOGGERS',
      imageUri: 'https://patang-source.s3.ap-south-1.amazonaws.com/staticAssets/women/women-joggers.jpg',
      searchText: 'joggers',
      imagePath: `${DirPath}/women-joggers.jpg`
    },
  ]
};
