import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import del from "../../assets/poubelle.svg";
import modify from "../../assets/modify.svg";
import defaultImg from "../../assets/profil.jpg";

const ProfilUser = () => {
  const { user, updateUser, deleteUser } = useContext(UserContext);
  const [newPrenom, setNewPrenom] = useState("");
  const [newFile, setNewFile] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBio, setNewBio] = useState("");
  const [update, setUpdate] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      deleteUser(id);
      sessionStorage.removeItem("user");
      window.location = "/";
    }
  };

  const handleNewPrenom = (e) => {
    setNewPrenom(e.target.value);
  };

  const handleNewEmail = (e) => {
    setNewEmail(e.target.value);
  };

  const handleNewBio = (e) => {
    setNewBio(e.target.value);
  };

  const handleNewImage = (e) => {
    setNewImage(URL.createObjectURL(e.target.files[0]));
    setNewFile(e.target.files[0]);
  };

  const handleUpdate = (id) => {
    const data = new FormData();
    if (newPrenom || newFile || newEmail || newBio || newImage) {
      if (newPrenom) data.append("prenom", newPrenom);
      if (newFile) data.append("image", newFile);
      if (newEmail) data.append("email", newEmail);
      if (newBio) data.append("bio", newBio);
      if (window.confirm("Etes-vous sûr de vouloir modifier?")) {
        updateUser(id, data);
      }
    }
  };

  return (
    <div className="container-profil">
      <h1 className="bienvenue">
        Bienvenue sur votre page de profil {user.prenom}
      </h1>

      <div className="email">Votre email : {user.email}</div>
      <div className="info-user">
        {user.image ? (
          <div className="picture">
            <h2>Votre image de profil : </h2>
            <img src={user.image} alt="profil" />
          </div>
        ) : (
          <div className="picture">
            <h2>Votre image de profil : </h2>
            <img src={defaultImg} alt="" />
          </div>
        )}
        <div className="bio">
          <h2>Votre bio : </h2>
          {user.bio && <div className="user-bio">{user.bio}</div>}
        </div>
      </div>
      <div className="icon">
        <div className="deleteUser" onClick={() => handleDelete(user.id)}>
          <p>Supprimer votre profil : </p>
          <img src={del} alt="Supprimer utilisateur" />
        </div>
        {update === false && (
          <div className="modify-user" onClick={() => setUpdate(!update)}>
            <p>Modifer votre profil : </p>
            <img src={modify} alt="modifier utilisateur" />
          </div>
        )}
      </div>
      <div className="update">
        {update && (
          <>
            <h3>Modifier votre profil ? </h3>
            <div className="update-valid">
              <label htmlFor="prenom">Prénom : </label>
              <textarea
                type="text"
                defaultValue={user.prenom}
                onChange={(e) => handleNewPrenom(e)}
              ></textarea>
              <label htmlFor="email">Email : </label>
              <textarea
                type="text"
                defaultValue={user.email}
                onChange={(e) => handleNewEmail(e)}
              ></textarea>
              <label htmlFor="bio">Bio : </label>
              <textarea
                className="text-bio"
                type="text"
                defaultValue={user.bio}
                onChange={(e) => handleNewBio(e)}
              ></textarea>
              <input
                placeholder="image"
                id="file"
                type="file"
                name="image"
                onChange={(e) => handleNewImage(e)}
              />
            </div>
            <div className="valid-modif">
              <img
                src={modify}
                onClick={() => setUpdate(!update)}
                alt="modifier utilisateur"
              />
              <button onClick={() => handleUpdate(user.id)}>
                Modifier Profil
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilUser;
