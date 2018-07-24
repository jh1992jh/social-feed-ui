import { combineReducers } from 'redux';
import authUserReducer from './authUserReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  authUser: authUserReducer,
  posts: postReducer,
  profile: profileReducer
});
