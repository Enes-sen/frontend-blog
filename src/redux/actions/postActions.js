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
} from "./actionTypes";
import * as api from "../../api/api";

// Tüm postları getir
export const fetchPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({ type: GET_POSTS_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_POSTS_FAILURE, payload: error.message });
  }
};

// Belirli bir id'ye sahip postu getir
export const fetchSinglePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.getSinglePost(id);
    dispatch({ type: GET_SINGLE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_SINGLE_POST_FAILURE, payload: error.message });
  }
};

// Yeni bir post oluştur
export const addPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({ type: CREATE_POST_FAILURE, payload: error.message });
  }
};

// Belirli bir id'ye sahip postu sil
export const removePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE_POST_SUCCESS, payload: id });
  } catch (error) {
    console.error(error);
    dispatch({ type: DELETE_POST_FAILURE, payload: error.message });
  }
};

// Bir postun tüm yorumlarını getir
export const fetchPostComments = (postId) => async (dispatch) => {
  try {
    const { data } = await api.getPostComments(postId);
    dispatch({
      type: GET_POST_COMMENTS_SUCCESS,
      payload: { postId, comments: data },
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: GET_POST_COMMENTS_FAILURE,
      payload: error.message,
    });
  }
};

// Bir posta yorum ekle
export const addComment = (comment, postId) => async (dispatch) => {
  try {
    const { data } = await api.createComment(comment, postId);
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: { postId, comment: data },
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CREATE_COMMENT_FAILURE,
      payload: error.message,
    });
  }
};

// Bir posttan yorum sil
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.deleteComment(commentId, postId);
    dispatch({ type: DELETE_COMMENT_SUCCESS, payload: { postId, commentId } });
  } catch (error) {
    console.error(error);
    dispatch({ type: DELETE_COMMENT_FAILURE, payload: error.message });
  }
};
