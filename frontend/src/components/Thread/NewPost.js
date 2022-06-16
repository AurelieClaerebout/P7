import React, { useContext, useState } from "react";
import { dateParser } from "../../services/date";
import UserContext from "../Profil/UserContext";
import PostsContext from "./PostsContext";

const NewPost = () => {
  const { user } = useContext(UserContext);
  const { addPost } = useContext(PostsContext);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setImage("");
    setFile("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user.id;
    if (message || image) {
      const data = new FormData();
      data.append("message", message);
      data.append("userId", userId);
      if (file) data.append("image", file);
      addPost(data);
      cancelPost();
    }
  };
  return (
    <div className="container-newPost">
      <div className="newpost">
        <div className="title-post">
          <h2>Quoi de neuf ?</h2>
        </div>
        <form
          className="formPost"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="label-post">
            <textarea
              placeholder="Quoi de neuf ?"
              type="message"
              value={message}
              required
              onChange={(e) => {
                handleMessageChange(e);
              }}
            />
          </div>
          <div className="input-file">
            <input
              placeholder="image"
              id="file"
              type="file"
              name="image"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
            <br />
          </div>
          <div className="button">
            {message || image ? (
              <button className="btn-cancel" onClick={cancelPost}>
                Annuler
              </button>
            ) : null}
            <button type="submit" value="Envoyer" className="btn">
              Envoyer
            </button>
          </div>
        </form>
      </div>
      {message || image ? (
        <div className="preview">
          <div className="info-poster">
            <h3> {user.prenom} </h3>
            <span>{dateParser(Date.now())}</span>
          </div>
          <div className="content">
            <p className="preview-message">{message}</p>
            <img src={image} alt="" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NewPost;
