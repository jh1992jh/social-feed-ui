import { combineReducers } from 'redux';
import authUserReducer from './authUserReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  authUser: authUserReducer,
  posts: postReducer,
  profile: profileReducer,
  auth: authReducer,
  errors: errorReducer
});
