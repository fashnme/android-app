export const ANDROID_APP_SHARING_URL = 'https://bit.ly/patang_android';

export const PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.patang';
export const FIREBASE_DOMAIN_URI_PREFIX = 'https://patang.page.link';

// export const PRODUCT_SHARING_URL_INITIAL = 'https://fashn.me/p/';
// export const ECOM_SHARING_URL_INITIAL = 'https://fashn.me/cashback-intermediate-page';

export const AWS_OPTIONS = {
    keyPrefix: '', // Change this Folder Name
    bucket: 'patang-source',
    accessKey: 'AKIAVL3V3EGR6PYGXK6Z',
    secretKey: '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',
    region: 'ap-south-1',
    successActionStatus: 201
};

export const ASYNCSTORAGE_USER_TOKEN_NAME = 'userToken';
export const ASYNCSTORAGE_USER_USER_NAME = 'userName';

export const HOME_PAGE_PUBLIC_MODE = 1;
export const HOME_PAGE_PERSONAL_MODE = 2;
export const HOME_PAGE_FEED_INITIAL_DATA_UPDATE = 'home_page_feed_initial_data_update';
export const HOME_PAGE_FEED_EXTRA_DATA_UPDATE = 'home_page_feed_extra_data_update';
export const HOME_PAGE_PUBLIC_FEED_INITIAL_DATA_UPDATE = 'home_page_public_feed_initial_data_update';
export const HOME_PAGE_PUBLIC_FEED_EXTRA_DATA_UPDATE = 'home_page_public_feed_extra_data_update';
export const HOME_PAGE_SET_PUBLIC_VERTICAL_CAROUSEL_REF = 'home_page_set_public_vertical_carousel_ref';
export const HOME_PAGE_SET_PERSONAL_VERTICAL_CAROUSEL_REF = 'home_page_set_personal_vertical_carousel_ref';
export const HOME_PAGE_ACTIVE_TAB_UPDATE = 'home_page_active_tab_update';
export const HOME_PAGE_TOGGLE_SHARE_MODAL = 'home_page_toggle_share_modal';

// Keeping track of users Actions
export const USER_SET_ACTION_DATA = 'user_set_action_data';
export const USER_LIKED_POST = 'user_liked_post';
export const USER_UNLIKED_POST = 'user_unliked_post';
export const USER_FOLLOWED_HIM = 'user_followed_him';
export const USER_UNFOLLOWED_HIM = 'user_unfollowed_him';
export const USER_ADDED_PRODUCT_TO_CART = 'user_added_product_to_cart';
export const USER_REMOVED_PRODUCT_FROM_CART = 'user_removed_product_from_cart';
export const USER_ADDED_PRODUCT_TO_WISHLIST = 'user_added_product_to_wishlist';
export const USER_REMOVED_PRODUCT_FROM_WISHLIST = 'user_removed_product_from_wishlist';
export const USER_LIKED_COMMENT = 'user_liked_comment';
export const USER_UNLIKED_COMMENT = 'user_unliked_comment';

// Celebrity Page
export const CELEBRITY_PAGE_SET_CELEB_DATA = 'celebrity_page_set_celeb_data';
export const CELEBRITY_PAGE_GET_CELEB_POSTS = 'celebrity_page_get_celeb_posts';
export const CELEBRITY_PAGE_GET_CELEB_LIKED_POSTS = 'celebrity_page_get_celeb_liked_posts';

// Upload Page
export const UPLOAD_PAGE_TOGGLE_ISSELECTED = 'upload_page_toggle_isselected';
export const UPLOAD_PAGE_UPDATE_CAPTION = 'upload_page_update_caption';
export const UPLOAD_PAGE_UPDATE_SELECTED_IMAGE_PATH = 'upload_page_update_selected_image_path';
export const UPLOAD_PAGE_UPDATE_UPLOADING_STATUS = 'upload_page_update_uploading_status';

// Product Related types
export const PRODUCT_PAGE_SELECTED_PRODUCT_UPDATE = 'product_page_selected_product_update';
export const PRODUCT_PAGE_SET_POSTID_AND_POSTERID = 'product_page_set_postid_and_posterid';
export const PRODUCT_PAGE_SET_TOGGLE_PRODUCTS_DATA = 'product_page_set_toggle_products_data';
export const PRODUCT_PAGE_SET_COMPLETE_PRODUCTS_DATA = 'product_page_set_complete_products_data';
export const PRODUCT_PAGE_PRICE_AND_SIZE_UPDATE = 'product_page_price_and_size_update';
export const PRODUCT_PAGE_TOGGLE_FULL_IMAGE_VIEWER = 'product_page_toggle_full_image_viewer';

// Signup page
export const SIGNUP_PAGE_PHONE_UPDATE = 'signup_page_phone_update';
export const SIGNUP_PAGE_OTP_UPDATE = 'signup_page_otp_update';
export const SIGNUP_PAGE_REFERRER_UPDATE = 'signup_page_referrer_update';
export const SIGNUP_PAGE_TOGGLE_OTP_SENT = 'signup_page_toggle_otp_sent';
export const SIGNUP_PAGE_COUNTRY_CODE_UPDATE = 'signup_page_country_code_update';
export const SIGNUP_PAGE_ERROR_UPDATE = 'signup_page_error_update';
export const SIGNUP_PAGE_TOGGLE_LOADING = 'signup_page_toggle_loading';
export const SIGNUP_PAGE_USERNAME_UPDATE = 'signup_page_username_update';
export const SIGNUP_PAGE_FULLNAME_UPDATE = 'signup_page_fullname_update';
export const SIGNUP_PAGE_GENDER_UPDATE = 'signup_page_gender_update';

// Personal Page
export const PERSONAL_PAGE_SET_USERTOKEN = 'personal_page_set_usertoken';
export const PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID = 'personal_page_set_personal_details_and_userid';
export const PERSONAL_PAGE_SET_OWN_POSTS = 'personal_page_set_own_posts';
export const PERSONAL_PAGE_SET_OWN_LIKED_POSTS = 'personal_page_set_own_liked_posts';
export const PERSONAL_PAGE_DELETE_POST = 'personal_page_delete_post';

// Explore Page
export const EXPLORE_PAGE_SET_USER_SEARCH_DATA = 'explore_page_set_user_search_data';
export const EXPLORE_PAGE_SET_TRENDING_USERS = 'explore_page_set_trending_users';
export const EXPLORE_PAGE_SET_TRENDING_POSTS = 'explore_page_set_trending_posts';

// Settings
export const SETTING_PAGE_SET_USER_ORDERS = 'setting_page_set_user_orders';
export const SETTING_PAGE_SET_RENT_BID_BY_ME = 'setting_page_set_rent_bid_by_me';
export const SETTING_PAGE_SET_RENT_BID_FOR_ME = 'setting_page_set_rent_bid_for_me';
export const SETTING_PAGE_SET_USER_REWARDS = 'setting_page_set_user_rewards';

export const SETTING_PAGE_USER_CAPTION_UPDATE = 'setting_page_user_caption_update';
export const SETTING_PAGE_USER_DOB_UPDATE = 'setting_page_user_dob_update';
export const SETTING_PAGE_USER_SOCIAL_LINK_UPDATE = 'setting_page_user_social_link_update';
export const SETTING_PAGE_USER_PROFILE_PIC_UDPATE = 'setting_page_user_profile_pic_update';
export const SETTING_PAGE_USER_ADD_ADDRESS = 'setting_page_user_add_address';
export const SETTING_PAGE_SET_SELECTED_ADDRESS = 'setting_page_set_selected_address';
export const SETTING_PAGE_SET_USER_WISHLIST = 'setting_page_set_user_wishlist';

export const SETTING_PAGE_GENERAL_LOADING_TOGGLE = 'setting_page_general_loading_toggle';

// Cart Operation
export const MANAGE_CART_PAGE_SET_CART_ARRAY = 'manage_cart_page_set_cart_array';

// Comments Page
export const COMMENTS_PAGE_TOGGLE_COMMENTS_MODAL = 'comments_page_toggle_comments_modal';
export const COMMENTS_PAGE_ADD_MORE_COMMENTS = 'comments_page_add_more_comments';
export const COMMENTS_PAGE_ADD_USER_COMMENT = 'comments_page_add_user_comment';
export const COMMENTS_PAGE_DELETE_USER_COMMENT = 'comments_page_delete_user_comment';

// Notification Page
export const NOTIFICATION_PAGE_UPDATE_NOTIFICATIONS = 'notification_page_update_notifications';
export const NOTIFICATION_PAGE_TOGGLE_NOTIFICATION_LOADING = 'notification_page_toggle_notification_loading';

// CustomPostListView
export const CUSTOM_POST_LIST_VIEW_PAGE_SET_DATA = 'custom_post_list_view_page_set_data';

// VideoPageStatus
export const VIDEO_PAGE_PLAY_STATUS_UPDATE = 'video_page_play_status_update';

// Referral Page
export const REFERRAL_PAGE_REFERRER_DATA_UPDATE = 'referral_page_referrer_data_update';

// Wishlist Page
// export const WISHLIST_ADD_OPERATION = 'add';
// export const WISHLIST_REMOVE_OPERATION = 'remove';
