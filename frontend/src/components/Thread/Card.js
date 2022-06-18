import React, { useContext, useEffect, useState } from "react";
import supPost from "../../assets/del.svg";
import modify from "../../assets/modify.svg";
import coeur from "../../assets/coeur.svg";
import coeur2 from "../../assets/coeur-rouge.svg";
import { dateParser } from "../../services/date";
import PostsContext from "./PostsContext";
import UserContext from "../Profil/UserContext";
import axios from "axios";
import { authHeader } from "../../services/auth.header";

const Card = ({ post }) => {
  const { user } = useContext(UserContext);
  const { deletePost, updatePost, likePost } = useContext(PostsContext);
  const [update, setUpdate] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newFile, setNewFile] = useState();
  const [poster, setPoster] = useState("");

  const userLike = post.like.find((like) => like.userId === user.id);

  console.log(userLike);

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      deletePost(id);
    }
  };

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const handleNewImage = (e) => {
    setNewImage(URL.createObjectURL(e.target.files[0]));
    setNewFile(e.target.files[0]);
  };

  const handleUpdatePost = (id) => {
    if (newMessage || newImage) {
      const data = new FormData();

      if (newMessage) data.append("message", newMessage);
      if (newFile) data.append("image", newFile);

      if (window.confirm("Êtes-vous sûr de vouloir modifier?")) {
        updatePost(id, data);
        setUpdate(!update);
      }
    }
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/users/${post.userId}`,
        authHeader()
      )
      .then((res) => {
        setPoster(res.data.user);
      });
  }, [post]);

  return (
    <div className="card" key={post.id}>
      <div className="info">
        <div className="poster">
          {poster.image && (
            <img className="img-poster" src={poster.image} alt="" />
          )}
          <p>{poster.prenom}</p>
        </div>
        <span className="date">{dateParser(post.updatedAt)} </span>
      </div>
      <div className="container-post">
        <div className="post">
          <div className="container-img-poster"></div>
          <div className="message">
            <p className="message-value">{post.message}</p>
          </div>
        </div>
        {post.image && (
          <div className="post-img">
            <img className="img-post" src={post.image} alt="" />
          </div>
        )}
      </div>
      <div className="icon">
        <div className="like">
          {userLike !== undefined ? (
            <img src={coeur2} alt="coeur" onClick={() => likePost(post.id)} />
          ) : (
            <img
              src={coeur}
              alt="coeur vide"
              onClick={() => likePost(post.id)}
            />
          )}
          <span>{post.like.length}</span>
        </div>
        {(user.id === post.userId) | (user.role === 1) ? (
          <div className="admin">
            <div className="modify">
              {update === false && (
                <img
                  src={modify}
                  onClick={() => setUpdate(!update)}
                  alt="Modifier post"
                />
              )}
            </div>
            <div className="delete-post">
              <img
                src={supPost}
                onClick={() => handleDelete(post.id)}
                alt="supprimer article"
              />
            </div>
          </div>
        ) : null}
      </div>
      {update && (
        <>
          <div className="modify-true">
            <img
              src={modify}
              onClick={() => setUpdate(!update)}
              alt="Modifier post"
            />
            <textarea
              type="text"
              defaultValue={post.message}
              onChange={(e) => handleNewMessage(e)}
            />
            <div className="input">
              <input
                placeholder="image"
                id="file"
                type="file"
                name="image"
                onChange={(e) => handleNewImage(e)}
              />
              <button onClick={() => handleUpdatePost(post.id)}>
                Modifier
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
