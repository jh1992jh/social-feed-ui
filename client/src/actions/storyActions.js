import { GET_STORIES, GET_A_STORY, POST_A_STORY, STORY_LOADING, PREVIEW_STORY } from './types';
import axios from 'axios';

export const getStories = () => dispatch => {
    dispatch(setStoryLoading());
    axios
        .get('/api/stories')
        .then(res => 
            dispatch({
                type: GET_STORIES,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
}

export const getStory = storyId => dispatch => {
    dispatch(setStoryLoading());
    axios
        .get(`/api/stories/${storyId}`)
        .then(res =>
            dispatch({
                type: GET_A_STORY,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
} 

export const postStory = storyData => dispatch => {
    dispatch(setStoryLoading());
    axios
        .post('/api/story')
        .then(res => {
            dispatch({
                type: POST_A_STORY,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

export const previewStory = (storyData, history) => dispatch => {
    dispatch({
        type: PREVIEW_STORY,
        payload: storyData
    })
    dispatch(() => history.push('/preview-story'));
}

export const setStoryLoading = () => {
    return {
        type: STORY_LOADING
    }
}