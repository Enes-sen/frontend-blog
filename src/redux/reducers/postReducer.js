import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_FAILURE,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  GET_POST_COMMENTS_SUCCESS,
  GET_POST_COMMENTS_FAILURE,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  comments: [],
  loading: true,
  error: null,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case GET_POSTS_FAILURE:
    case GET_SINGLE_POST_FAILURE:
    case CREATE_POST_FAILURE:
    case DELETE_POST_FAILURE:
    case GET_POST_COMMENTS_FAILURE:
    case CREATE_COMMENT_FAILURE:
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_SINGLE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
        error: null,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
        error: null,
      };
    case GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        loading: false,
        error: null,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default blogReducer;
