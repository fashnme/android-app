import { combineReducers } from 'redux';
import HomePageReducer from './HomePageReducer';
import UserActionDataReducer from './UserActionDataReducer';


export default combineReducers({
    homePageState: HomePageReducer,
    userActionData: UserActionDataReducer
});
