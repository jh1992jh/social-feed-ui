import {
  GET_POSTS,
  GET_OWNED_POSTS,
  POST_LOADING,
  POST_A_POST,
  ADD_CURRENT_POST,
  CLEAR_CURRENT_POST,
  GET_POST,
  DELETE_POST,
  GET_FOLLOWED_POSTS,
  TOGGLE_LIKES_MENU,
  GET_POST_NOTIFICATIONS,
  RESET_POST_STATE
} from "./types";
import axios from "axios";

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());

  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getOwnedPosts = userId => dispatch => {
  dispatch(setPostLoading());

  axios
    .get(`/api/posts/owned/${userId}`)
    .then(res =>
      dispatch({
        type: GET_OWNED_POSTS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getPostNotifications = userId => dispatch => {
  //dispatch(setPostLoading());

  axios
    .get(`/api/posts/owned/${userId}/notifications`)
    .then(res =>
      dispatch({
        type: GET_POST_NOTIFICATIONS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getFollowedPosts = userId => dispatch => {
  dispatch(setPostLoading());

  axios
    .get(`/api/posts/following/posts/${userId}`)
    .then(res =>
      dispatch({
        type: GET_FOLLOWED_POSTS,
        payload: res.data
      })
    )
    .catch(err => console.error(err.response.data));
};

export const getPost = postId => dispatch => {
  dispatch(setPostLoading());

  axios
    .get(`/api/posts/${postId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const addPost = (postData, history) => dispatch => {
  dispatch(setPostLoading());
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: POST_A_POST,
        payload: postData
      })
    )
    .then(history.push("/"))
    .catch(err => console.log(err));
};

export const deletePost = (postId, history) => dispatch => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: postId
      })
    )
    .then(history.go(-1))
    .catch(err => console.log(err));
};

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

export const addLike = postId => dispatch => {
  axios
    .post(`/api/posts/like/${postId}`)
    //.then(res => dispatch(setPostLoading))
    //.then(res => dispatch(getPost(postId)))
    .catch(err => console.log(err));
};

export const removeLike = postId => dispatch => {
  axios
    .post(`/api/posts/unlike/${postId}`)
    //.then(res => dispatch(setPostLoading))
    //.then(res => dispatch(getPost(postId)))
    .catch(err => console.log(err));
};

export const addComment = (postId, commentData) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const toggleLikesMenu = () => dispatch => {
  dispatch({
    type: TOGGLE_LIKES_MENU
  });
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

export const resetPostState = () => dispatch => {
  dispatch({
    type: RESET_POST_STATE
  });
};
