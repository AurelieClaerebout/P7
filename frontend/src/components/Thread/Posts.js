import React, { useContext } from "react";
import UserContext from "../Profil/UserContext";
import Card from "./Card";
import PostsContext from "./PostsContext";

const Posts = () => {
  const { posts } = useContext(PostsContext);
  const { user } = useContext(UserContext);

  return (
    <div className="posts">
      <h2>Fil d'actualité :</h2>
      <div className="posts-list">
        {posts.map((post, id) => (
          <Card key={id} post={post} user={user} />
        ))}
      </div>
    </div>
  );
};
export default Posts;
