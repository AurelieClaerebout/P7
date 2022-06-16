import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import modify from "../../assets/modify.svg";
import del from "../../assets/poubelle.svg";

const Admin = ({ profilUser }) => {
  const { updateUser, deleteUser } = useContext(UserContext);
  const [newPrenom, setNewPrenom] = useState("");
  const [newFile, setNewFile] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBio, setNewBio] = useState("");
  const [update, setUpdate] = useState(false);

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
  const handleDelete = (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      deleteUser(id);
    }
  };

  return (
    <div className="profilUser">
      <h1 className="profilUser-prenom">{profilUser.prenom}</h1>
      <p className="profilUser-email"> {profilUser.email} </p>
      <div className="profilUser-icon">
        {update === false && (
          <img
            src={modify}
            onClick={() => setUpdate(!update)}
            alt="Modifier utilisateur"
          />
        )}
        <img
          src={del}
          onClick={() => handleDelete(profilUser.id)}
          alt="Supprimer utilisateur"
        />
      </div>
      {update && (
        <>
          <div className="profilUser-modify">
            <textarea
              type="text"
              defaultValue={profilUser.prenom}
              onChange={(e) => handleNewPrenom(e)}
            ></textarea>
            <textarea
              type="text"
              defaultValue={profilUser.email}
              onChange={(e) => handleNewEmail(e)}
            ></textarea>
            <textarea
              type="text"
              defaultValue={profilUser.bio}
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
          <div>
            <button onClick={() => handleUpdate(profilUser.id)}>
              Modifier Profil
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
