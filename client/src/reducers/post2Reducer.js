import { GET_POSTS, GET_POST, POST_LOADING, POST_A_POST, ADD_CURRENT_POST, CLEAR_CURRENT_POST, DELETE_POST } from '../actions/types';

const initialState = {
    loading: false,
    posts: [],
    post: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case POST_LOADING: 
            return {
                ...state,
                loading: true
            }
        case GET_POSTS: 
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case GET_POST: 
        return {
            ...state,
            loading: false,
            post: action.payload,
        }
        
        case POST_A_POST: 
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case ADD_CURRENT_POST: 
            return {
                ...state,
                post: action.payload
            }
        case CLEAR_CURRENT_POST: 
            return {
                ...state,
                post: {}
            }
        case DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        default:
            return state
    }
}