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
};
