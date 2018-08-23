import { combineReducers } from 'redux';
import post2Reducer from './post2Reducer';
import profile2Reducer from './profile2Reducer';
import authReducer from './authReducer';
import storyReducer from './storyReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  posts2: post2Reducer,
  profile2: profile2Reducer,
  auth: authReducer,
  stories: storyReducer,
  errors: errorReducer
});
