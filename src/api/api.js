import axios from "axios";

const apiRoute = "https://fistblog.onrender.com/posts/";

export const getPosts = async () => await axios.get(apiRoute);

export const getSinglePost = async (id) => await axios.get(`${apiRoute}${id}`);

export const createPost = async (post) => await axios.post(apiRoute, post);

export const deletePost = async (id) => await axios.delete(`${apiRoute}${id}`);
