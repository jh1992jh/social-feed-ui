import { ADD_CURRENT_POST, CLEAR_CURRENT_POST, DELETE_POST } from './types';

export const addCurrentPost = postData => dispatch => {
  dispatch({
    type: ADD_CURRENT_POST,
    payload: postData
  });
};

export const clearCurrentPost = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_POST
  });
};

export const deletePost = postId => dispatch => {
  dispatch({
    type: DELETE_POST,
    payload: postId
  });
};
