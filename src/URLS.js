
// HomePage Urls
export const HomePageGetInitialFeedDataURL = 'https://fashn-backend.herokuapp.com/feed/get-following-feed';
export const HomePageGetInitialPublicFeedDataURL = 'https://fashn-backend.herokuapp.com/feed/get-foryou-feed';
export const HomePageLikePostURL = 'https://fashn-backend.herokuapp.com/user/like-post';
export const HomePageUnlikePostURL = 'https://fashn-backend.herokuapp.com/user/unlike-post';
export const HomePageDislikePostURL = 'https://fashn-backend.herokuapp.com/user/unlike-post'; // TODO
export const HomePageFetchUserColdStartDetailsURL = 'https://fashn-backend.herokuapp.com/user/fetch-user-coldstart';

// CelebrityPage Urls
export const CelebrityPageFollowURL = 'https://fashn-backend.herokuapp.com/user/follow-user';
export const CelebrityPageUnfollowURL = 'https://fashn-backend.herokuapp.com/user/unfollow-user';
export const CelebrityPageGetUserDetailsURL = 'https://fashn-backend.herokuapp.com/user/get-user-profile';
export const CelebrityPageGetUserPostsURL = 'https://fashn-backend.herokuapp.com/user/get-user-posts';
export const CelebrityPageGetUserLikedPostsURL = 'https://fashn-backend.herokuapp.com/user/get-user-liked-posts';

// UploadPage Urls
export const UploadPageUploadContentURL = 'https://fashn-backend.herokuapp.com/user/create-post';

// SignupPage Urls
export const SignupPageSendOtpURL = 'https://fashn-backend.herokuapp.com/auth/send-otp';
export const SignupPageVerifyOtpURL = 'https://fashn-backend.herokuapp.com/auth/user/verify-otp';
export const SignupPageSetUserDetails = 'https://fashn-backend.herokuapp.com/user/create-user';

// ProductPage Urls
export const ProductPageFetchProductsInfoURL = 'https://fashn-backend.herokuapp.com/product/fetch-products';
export const ProductPageGetUpdatePriceAndSizeURL = 'https://fashn-backend.herokuapp.com/product/get-updated-price-and-size';

// SettingsPage Urls
export const SettingsPageAboutUsURL = 'https://fashn.me/about-us';
export const SettingsPagePrivacyPolicyURL = 'https://fashn.me/about-us';

// User Details
export const SettingsPageGetUserOrdersURL = 'https://fashn-backend.herokuapp.com/user/get-orders';
export const SettingsPageGetBidsByMeURL = 'https://fashn-backend.herokuapp.com/bid/get-bids-by-me';
export const SettingsPageGetBidsForMeURL = 'https://fashn-backend.herokuapp.com/bid/get-bids-for-me';
export const SettingsPageSaveProfileChangesURL = 'https://fashn-backend.herokuapp.com/user/edit-user-profile';
export const SettingsPageAddUserAddressURL = 'https://fashn-backend.herokuapp.com/user/update-delivery-details';

export const SettingsPageRejectBidURL = 'https://fashn-backend.herokuapp.com/bid/reject-bid';
export const SettingsPageAcceptBidURL = 'https://fashn-backend.herokuapp.com/bid/accept-bid';
export const SettingsPageCancelBidURL = 'https://fashn-backend.herokuapp.com/bid/cancel-bid';
export const SettingsPageCreateBidURL = 'https://fashn-backend.herokuapp.com/bid/create-bid';
export const SettingsPageEditBidURL = 'https://fashn-backend.herokuapp.com/bid/edit-bid';
export const SettingsPageGetUserWishlistURL = 'https://fashn-backend.herokuapp.com/user/get-user-wishlist';

// Checkout Page
export const ManageCartGetUserCartURL = 'https://fashn-backend.herokuapp.com/user/get-user-cart';
export const ManageCartAddProductToCartURL = 'https://fashn-backend.herokuapp.com/user/add-to-cart';
export const ManageCartRemoveProductFromCartURL = 'https://fashn-backend.herokuapp.com/user/remove-from-cart';
export const ManageCartAddProductToWishlistURL = 'https://fashn-backend.herokuapp.com/user/add-to-wishlist';
export const ManageCartRemoveProductFromWishlistURL = 'https://fashn-backend.herokuapp.com/user/remove-from-wishlist';
export const ManageCartPlaceOrderURL = 'https://fashn-backend.herokuapp.com/payments/checkout-cart';
