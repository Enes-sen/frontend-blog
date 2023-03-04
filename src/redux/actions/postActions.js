import * as types from "./actionTypes";
import * as api from "../../api/api";

// Fetch all posts
export const fetchPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({ type: types.GET_POSTS_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: types.GET_POSTS_FAILURE, payload: error.message });
  }
};

// Fetch a single post by id
export const fetchSinglePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.getSinglePost(id);
    dispatch({
      type: types.GET_SINGLE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.GET_SINGLE_POST_FAILURE,
      payload: error.message,
    });
  }
};

// Create a new post
export const addPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: types.CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: types.CREATE_POST_FAILURE, payload: error.message });
  }
};

// Delete a post by id
export const removePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: types.DELETE_POST_SUCCESS, payload: id });
  } catch (error) {
    console.error(error);
    dispatch({ type: types.DELETE_POST_FAILURE, payload: error.message });
  }
}; // Fetch all comments for a post
export const fetchComments = (postId) => async (dispatch) => {
try {
const { data } = await api.getPostComments(postId);
dispatch({
type: types.GET_POST_COMMENTS_SUCCESS,
payload: { postId, comments: data },
});
} catch (error) {
console.error(error);
dispatch({
type: types.GET_POST_COMMENTS_FAILURE,
payload: error.message,
});
}
};

// Add a comment to a post
export const addComment = (postId, comment) => async (dispatch) => {
try {
const { data } = await api.createComment(postId, comment);
dispatch({
type: types.ADD_COMMENT_SUCCESS,
payload: { postId, comment: data },
});
} catch (error) {
console.error(error);
dispatch({
type: types.ADD_COMMENT_FAILURE,
payload: error.message,
});
}
};

// Delete a comment from a post
export const deleteComment = (postId, commentId) => async (dispatch) => {
try {
await api.deleteComment(postId, commentId);
dispatch({
type: types.DELETE_COMMENT_SUCCESS,
payload: { postId, commentId },
});
} catch (error) {
console.error(error);
dispatch({
type: types.DELETE_COMMENT_FAILURE,
payload: error.message,
});
}
}; 
