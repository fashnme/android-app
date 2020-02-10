import { combineReducers } from 'redux';
import HomePageReducer from './HomePageReducer';
import UserActionDataReducer from './UserActionDataReducer';
import CelebrityPageReducer from './CelebrityPageReducer';
import UploadPageReducer from './UploadPageReducer';

export default combineReducers({
    homePageState: HomePageReducer,
    userActionData: UserActionDataReducer,
    celebPageState: CelebrityPageReducer,
    uploadPageState: UploadPageReducer
});
