import { combineReducers } from 'redux';
import HomePageReducer from './HomePageReducer';


export default combineReducers({
    homePageState: HomePageReducer
});
