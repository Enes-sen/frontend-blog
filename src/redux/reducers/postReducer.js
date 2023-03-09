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
    case types.GET_POST_COMMENTS_SUCCESS:
      const comments = Array.isArray(action.payload.comments) ? action.payload.comments : [];
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: comments,
          };
        }
        return post;
      });
      return {
        ...state,
        posts: updatedPosts,
        currentPost: {
          ...state.currentPost,
          comments: comments,
        },
      };
    case types.CREATE_COMMENT_SUCCESS:
      const comment = action.payload.comment;
      const updatedPosts2 = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      });
      return {
        ...state,
        posts: updatedPosts2,
        currentPost: {
          ...state.currentPost,
          comments: [...state.currentPost.comments, comment],
        },
      };
    case types.DELETE_COMMENT_SUCCESS:
      const updatedPosts3 = state.posts.map((post) => {
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
        posts: updatedPosts3,
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
