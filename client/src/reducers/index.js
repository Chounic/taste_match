import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import reviewsReducer from './reviews.reducer';
import errorsReducer from './errors.reducer';

export default combineReducers({
    userReducer, 
    usersReducer, 
    reviewsReducer, 
    errorsReducer
});