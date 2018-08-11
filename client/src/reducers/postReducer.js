import {
  ADD_CURRENT_POST,
  CLEAR_CURRENT_POST,
  DELETE_POST
} from '../actions/types';
import { postItems } from '../components/posts/postItems';

const initialState = {
  posts: postItems,
  currentPost: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload
      };
    case CLEAR_CURRENT_POST:
      return {
        ...state,
        currentPost: []
      };
    case DELETE_POST:
      const postId = action.payload;
      return {
        ...state,
        posts: state.posts.filter(post => post.postId !== postId)
      };
    default:
      return state;
  }
}
