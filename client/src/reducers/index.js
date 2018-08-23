import { combineReducers } from 'redux';
import postReducer from './postReducer';
import profileReducer from './profileReducer';
import authReducer from './authReducer';
import storyReducer from './storyReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  posts: postReducer,
  profile: profileReducer,
  auth: authReducer,
  stories: storyReducer,
  errors: errorReducer
});
