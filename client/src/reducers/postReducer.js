import {
  GET_POSTS,
  GET_OWNED_POSTS,
  GET_FOLLOWED_POSTS,
  GET_POST,
  POST_LOADING,
  POST_A_POST,
  ADD_CURRENT_POST,
  CLEAR_CURRENT_POST,
  DELETE_POST,
  RESET_POST_STATE,
  TOGGLE_LIKES_MENU,
  GET_POST_NOTIFICATIONS
} from "../actions/types";

const initialState = {
  loading: false,
  posts: [],
  ownedPosts: [],
  followedPosts: [],
  postNotifications: [],
  post: {},
  likesMenuOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_OWNED_POSTS:
      return {
        ...state,
        loading: false,
        ownedPosts: action.payload
      };
    case GET_FOLLOWED_POSTS:
      return {
        ...state,
        loading: false,
        followedPosts: action.payload
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: action.payload
      };

    case POST_A_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case ADD_CURRENT_POST:
      return {
        ...state,
        post: action.payload
      };
    case CLEAR_CURRENT_POST:
      return {
        ...state,
        post: {}
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case TOGGLE_LIKES_MENU:
      return {
        ...state,
        likesMenuOpen: !state.likesMenuOpen
      };
    case GET_POST_NOTIFICATIONS: {
      return {
        ...state,
        loading: false,
        postNotifications: action.payload
      };
    }
    case RESET_POST_STATE: {
      return initialState;
    }
    default:
      return state;
  }
}
