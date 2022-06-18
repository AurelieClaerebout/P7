import React, { useContext } from "react";
import UserContext from "./UserContext";
import del from "../../assets/poubelle.svg";

const Admin = ({ profilUser }) => {
  const { deleteUser } = useContext(UserContext);

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
        <img
          src={del}
          onClick={() => handleDelete(profilUser.id)}
          alt="Supprimer utilisateur"
        />
      </div>
    </div>
  );
};

export default Admin;
