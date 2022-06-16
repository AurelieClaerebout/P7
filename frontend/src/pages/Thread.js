import React from "react";
import Nav from "../components/Nav";
import NewPost from "../components/Thread/NewPost";
import Posts from "../components/Thread/Posts";
import { PostsProvider } from "../components/Thread/PostsContext";

const Thread = () => {
  return (
    <PostsProvider>
      <div className="thread">
        <div className="nav-bar">
          <Nav />
        </div>
        <div className="container">
          <Posts />
          <NewPost />
        </div>
      </div>
    </PostsProvider>
  );
};

export default Thread;
