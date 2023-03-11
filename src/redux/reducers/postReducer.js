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
} from "../actions/actionTypes";

const initialState = {
  posts: [],
  singlePost: {},
  postComments: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_POSTS_FAILURE:
      console.error(action.payload);
      return state;
    case GET_SINGLE_POST_SUCCESS:
      return {
        ...state,
        singlePost: action.payload,
      };
    case GET_SINGLE_POST_FAILURE:
      console.error(action.payload);
      return state;
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case CREATE_POST_FAILURE:
      console.error(action.payload);
      return state;
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case DELETE_POST_FAILURE:
      console.error(action.payload);
      return state;
    case GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [action.payload.postId]: action.payload.comments,
        },
      };
    case GET_POST_COMMENTS_FAILURE:
      console.error(action.payload);
      return state;
 case CREATE_COMMENT_SUCCESS:
  const postId = action.payload.postId;
  const comment = action.payload.comment;
  const postIndex = state.posts.findIndex(post => post.id === postId);
  if (postIndex === -1) {
    // If the post doesn't exist in the current state, don't update it
    return state;
  }
  const updatedPost = {
    ...state.posts[postIndex],
    comments: [comment, ...(state.posts[postIndex].comments || [])]
  };
  return {
    ...state,
    posts: [
      ...state.posts.slice(0, postIndex),
      updatedPost,
      ...state.posts.slice(postIndex + 1)
    ],
    postComments: {
      ...state.postComments,
      [postId]: [
        comment,
        ...(state.postComments[postId] || [])
      ],
    },
  };
    case CREATE_COMMENT_FAILURE:
      console.error(action.payload);
      return state;
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [action.payload.postId]: state.postComments[action.payload.postId].filter(
            (comment) => comment.id !== action.payload.commentId
          ),
        },
      };
    case DELETE_COMMENT_FAILURE:
      console.error(action.payload);
      return state;
    default:
      return state;
  }
};

export default postReducer;
