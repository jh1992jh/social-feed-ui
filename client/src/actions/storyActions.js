import { GET_STORIES, GET_FOLLOWED_STORIES, GET_A_STORY, POST_A_STORY, STORY_LOADING, PREVIEW_STORY, WATCH_ALL_STORIES } from './types';
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

export const getFollowedStories = userId => dispatch => {
    dispatch(setStoryLoading());
    axios
        .get(`/api/stories/following/stories/${userId}`)
        .then(res => {
            dispatch({
                type: GET_FOLLOWED_STORIES,
                payload: res.data
            })
        })
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

export const postStory = (storyData, history) => dispatch => {
    dispatch(setStoryLoading());
    axios
        .post('/api/stories', storyData)
        .then(res => {
            dispatch({
                type: POST_A_STORY,
                payload: storyData
            })
        })
        .then(() => history.push('/'))
        .catch(err => console.log(err));
}

export const previewStory = (storyData, history) => dispatch => {
    dispatch({
        type: PREVIEW_STORY,
        payload: storyData
    })
    dispatch(() => history.push('/preview-story'));
}

export const watchAllStories = () => dispatch => {
    dispatch({
        type: WATCH_ALL_STORIES
    })
}

export const setStoryLoading = () => {
    return {
        type: STORY_LOADING
    }
}