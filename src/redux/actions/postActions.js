import * as types from "./actionTypes";
import * as api from "../../api/api";

// Tüm postları getir
export const fetchPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({ type: types.GET_POSTS_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: types.GET_POSTS_FAILURE, payload: error.message });
  }
};

// Belirli bir id'ye sahip postu getir
export const fetchSinglePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.getSinglePost(id);
    dispatch({ type: types.GET_SINGLE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: types.GET_SINGLE_POST_FAILURE, payload: error.message });
  }
};

// Yeni bir post oluştur
export const addPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: types.CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: types.CREATE_POST_FAILURE, payload: error.message });
  }
};

// Belirli bir id'ye sahip postu sil
export const removePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: types.DELETE_POST_SUCCESS, payload: id });
  } catch (error) {
    console.error(error);
    dispatch({ type: types.DELETE_POST_FAILURE, payload: error.message });
  }
};

// Bir postun tüm yorumlarını getir
export const fetchPostComments = (postId) => async (dispatch) => {
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

// Add a comment to a post by post id
export const addComment = (comment, postId) => async (dispatch) => {
  try {
    const { data } = await api.createComment(comment, postId);
    dispatch({
      type: types.CREATE_COMMENT_SUCCESS,
      payload: { postId, comment: data },
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.CREATE_COMMENT_FAILURE,
      payload: error.message,
    });
  }
};

// Bir posttan yorum sil
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.deleteComment(commentId, postId);
    dispatch({ type: types.DELETE_COMMENT_SUCCESS, payload: { postId, commentId } });
  } catch (error) {
    console.error(error);
    dispatch({ type: types.DELETE_COMMENT_FAILURE, payload: error.message });
  }
};
