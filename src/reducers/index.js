import { combineReducers } from 'redux';
import HomePageReducer from './HomePageReducer';
import ProductPageReducer from './ProductPageReducer';
import UserActionDataReducer from './UserActionDataReducer';
import CelebrityPageReducer from './CelebrityPageReducer';
import UploadPageReducer from './UploadPageReducer';
import PersonalPageReducer from './PersonalPageReducer';
import SignupPageReducer from './SignupPageReducer';
import SettingsPageReducer from './SettingsPageReducer';
import AccountSettingsReducer from './AccountSettingsReducer';
import CommentsPageReducer from './CommentsPageReducer';
import NotificationReducer from './NotificationReducer';
import CustomPostListViewReducer from './CustomPostListViewReducer';
import VideoPlayStatusReducer from './VideoPlayStatusReducer';
import ExplorePageReducer from './ExplorePageReducer';

export default combineReducers({
    homePageState: HomePageReducer,
    productPageState: ProductPageReducer,
    userActionData: UserActionDataReducer,
    celebPageState: CelebrityPageReducer,
    uploadPageState: UploadPageReducer,
    personalPageState: PersonalPageReducer,
    signupPageState: SignupPageReducer,
    settingsPageState: SettingsPageReducer,
    accountSettingState: AccountSettingsReducer,
    postCommentState: CommentsPageReducer,
    notificationState: NotificationReducer,
    customPostListViewState: CustomPostListViewReducer,
    videoPlayStatusState: VideoPlayStatusReducer,
    explorePageState: ExplorePageReducer
});
