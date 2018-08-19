import { combineReducers } from 'redux';
import authUserReducer from './authUserReducer';
import postReducer from './postReducer';
import post2Reducer from './post2Reducer';
import profileReducer from './profileReducer';
import profile2Reducer from './profile2Reducer';
import authReducer from './authReducer';
import storyReducer from './storyReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  authUser: authUserReducer,
  posts: postReducer,
  posts2: post2Reducer,
  profile: profileReducer,
  profile2: profile2Reducer,
  auth: authReducer,
  stories: storyReducer,
  errors: errorReducer
});
