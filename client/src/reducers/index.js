import { combineReducers } from 'redux';
import authUserReducer from './authUserReducer';
import postReducer from './postReducer';
import post2Reducer from './post2Reducer';
import profileReducer from './profileReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  authUser: authUserReducer,
  posts: postReducer,
  posts2: post2Reducer,
  profile: profileReducer,
  auth: authReducer,
  errors: errorReducer
});
