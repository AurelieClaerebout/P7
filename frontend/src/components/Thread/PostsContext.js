import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { authHeader } from "../../services/auth.header";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [reset, setReset] = useState([]);

  useEffect(() => {
    getPosts();
  }, [reset]);

  //  POSTS
  const getPosts = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/posts`, authHeader())
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  };

  const addPost = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}api/posts`, data, authHeader())
      .then((res) => setReset(res))
      .catch((err) => console.log(err));
  };

  const updatePost = async (id, data) => {
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}api/posts/${id}`,
        data,
        authHeader()
      )
      .then((res) => setReset(res))
      .catch((err) => console.log(err));
  };

  const deletePost = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}api/posts/${id}`,
      authHeader()
    );
    setPosts(posts.filter((post) => post.id !== id));
  };

  const likePost = async (id) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}api/posts/${id}/like`,

        authHeader()
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
        likePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
