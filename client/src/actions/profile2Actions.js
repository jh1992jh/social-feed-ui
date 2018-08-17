import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES } from './types';
import axios from 'axios';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())

    axios
        .get('/api/profiles')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        )
}

export const getProfileById = userId => dispatch => {
    axios
        .get(`/api/profiles/user/${userId}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
}

export const getProfileByHandle = handle => dispatch => {
    dispatch(setProfileLoading())

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
        )
}

export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profiles', profileData)
        .then(res => history.push('/'))
        .catch(err => console.log(err))
}

export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());

    axios
        .get('/api/profiles/all')
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
            })
        })
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}