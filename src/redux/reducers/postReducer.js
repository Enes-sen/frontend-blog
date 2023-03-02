import * as types from "../actions/actionTypes";

const initialState = {
  posts: [],
  currentPost: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    case types.GET_SINGLE_POST_SUCCESS:
      return {
        ...state,
        currentPost: action.payload,
      };
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case types.DELETE_POST_SUCCESS:
      const filteredPosts = state.posts.filter(
        (post) => post._id !== action.payload
      );
      return {
        ...state,
        posts: filteredPosts,
        currentPost: {},
      };
    default:
      return state;
  }
};

export default postReducer;
