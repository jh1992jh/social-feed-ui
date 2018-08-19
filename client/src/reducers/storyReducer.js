import { GET_STORIES, GET_A_STORY, POST_A_STORY, STORY_LOADING, PREVIEW_STORY } from '../actions/types';

const initialState = {
    stories: [],
    story: {},
    previewStory: null,
    loading: false
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case STORY_LOADING: 
            return {
                ...state,
                loading: true
            }
        case GET_STORIES: 
            return {
                ...state,
                loading: false,
                stories: action.payload
            }
        case GET_A_STORY: 
            return {
                ...state,
                loading: false,
                story: action.payload
            }
        case POST_A_STORY: 
            return {
                ...state,
                loading: false,
                stories: [...state.stories, action.payload] 
            }
        case PREVIEW_STORY:
            return {
                ...state,
                previewStory: action.payload
            }
        default: 
            return state;
    }
}