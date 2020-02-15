import { combineReducers } from 'redux';
import HomePageReducer from './HomePageReducer';
import ProductPageReducer from './ProductPageReducer';
import UserActionDataReducer from './UserActionDataReducer';
import CelebrityPageReducer from './CelebrityPageReducer';
import UploadPageReducer from './UploadPageReducer';
import PersonalPageReducer from './PersonalPageReducer';

export default combineReducers({
    homePageState: HomePageReducer,
    productPageState: ProductPageReducer,
    userActionData: UserActionDataReducer,
    celebPageState: CelebrityPageReducer,
    uploadPageState: UploadPageReducer,
    personalPageState: PersonalPageReducer
});
