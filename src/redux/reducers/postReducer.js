import * as types from "../actions/actionTypes";

const initialState = {
  posts: [],
  singlePost: null,
  postComments: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    case types.GET_POSTS_FAILURE:
      console.error(action.payload);
      return state;
    case types.GET_SINGLE_POST_SUCCESS:
      return {
        ...state,
        singlePost: action.payload,
      };
    case types.GET_SINGLE_POST_FAILURE:
      console.error(action.payload);
      return state;
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case types.CREATE_POST_FAILURE:
      console.error(action.payload);
      return state;
    case types.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case types.DELETE_POST_FAILURE:
      console.error(action.payload);
      return state;
    case types.GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [action.payload.postId]: action.payload.comments,
        },
      };
    case types.GET_POST_COMMENTS_FAILURE:
      console.error(action.payload);
      return state;
    case types.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [action.payload.postId]: [
            action.payload.comment,
            ...(state.postComments[action.payload.postId] || []),
          ],
        },
      };
    case types.CREATE_COMMENT_FAILURE:
      console.error(action.payload);
      return state;
    case types.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [action.payload.postId]: state.postComments[action.payload.postId].filter(
            (comment) => comment.id !== action.payload.commentId
          ),
        },
      };
    case types.DELETE_COMMENT_FAILURE:
      console.error(action.payload);
      return state;
    default:
      return state;
  }
};

export default postReducer;
