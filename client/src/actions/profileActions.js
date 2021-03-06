import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  RESET_PROFILE_STATE,
  GET_ERRORS
} from "./types";
import { getFollowedPosts } from "./postActions";
import axios from "axios";

export const getCurrentProfile = followedPosts => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get("/api/profiles")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      return res;
    })
    .then(resData => {
      if (followedPosts && resData.data.following.length > 0) {
        dispatch(getFollowedPosts(resData.data.user._id));
      }

      return resData;
    })
    .catch(err => {
      console.error(err.response.data.noprofile);
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

export const getProfileById = userId => dispatch => {
  axios.get(`/api/profiles/user/${userId}`).then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  );
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get(`/api/profiles/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profiles", profileData)
    //.then(res => history.push("/"))
    .then(() => (window.location.href = "/"))
    .catch(err => console.log(err));
};

export const editProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profiles/edit", profileData)
    .then(res => history.go(-1))
    .catch(err => console.log(err));
};

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get("/api/profiles/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
    });
};

export const followProfile = (profileId, userId) => dispatch => {
  axios
    .post(`/api/profiles/follow/${profileId}`)
    .then(res => dispatch(setProfileLoading()))
    .then(res => dispatch(getProfileById(userId)))
    .catch(err => console.log(err));
};

export const unfollowProfile = (profileId, userId) => dispatch => {
  axios
    .post(`/api/profiles/unfollow/${profileId}`)
    .then(res => dispatch(setProfileLoading()))
    .then(res => dispatch(getProfileById(userId)))
    .catch(err => console.log(err));
};
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const resetProfileState = () => dispatch => {
  dispatch({
    type: RESET_PROFILE_STATE
  });
};

export const setErrors = err => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  });
};
