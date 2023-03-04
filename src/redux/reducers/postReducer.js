import * as types from "../actions/actionTypes";
import * as api from "../../api/api";

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
    case types.ADD_COMMENT_SUCCESS:
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: [...post.comments, action.payload.comment],
          };
        }
        return post;
      });
      return {
        ...state,
        posts: updatedPosts,
        currentPost: {
          ...state.currentPost,
          comments: [...state.currentPost.comments, action.payload.comment],
        },
      };
    case types.DELETE_COMMENT_SUCCESS:
      const updatedPosts2 = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        }
        return post;
      });
      return {
        ...state,
        posts: updatedPosts2,
        currentPost: {
          ...state.currentPost,
          comments: state.currentPost.comments.filter(
            (comment) => comment._id !== action.payload.commentId
          ),
        },
      };
    default:
      return state;
  }
};

export default postReducer;
