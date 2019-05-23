import { SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS } from "./types";
import axios from "axios";
import setAuthToken from "../utilities/setAuthToken";
import jwt_decode from "jwt-decode";

import { resetPostState } from "./postActions";
import { resetProfileState } from "./profileActions";

export const registerUser = (userData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(resetProfileState());
  dispatch(resetPostState());
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
