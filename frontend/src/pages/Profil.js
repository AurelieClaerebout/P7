import React, { useContext, useState } from "react";
import Nav from "../components/Nav";
import Admin from "../components/Profil/Admin";
import ProfilUser from "../components/Profil/ProfilUser";
import UserContext from "../components/Profil/UserContext";

const Profil = () => {
  const { user, allUsers } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  return (
    <div className="profil">
      <Nav />
      {user.role === 1 && (
        <div className="profil-admin">
          {toggle === false && (
            <button onClick={() => setToggle(!toggle)}>admin</button>
          )}
          {toggle && (
            <div className="toggle-true">
              <div className="btn-admin">
                <button onClick={() => setToggle(!toggle)}>Fermer</button>
              </div>
              <div className="allUsers">
                {allUsers.map((profilUser, id) => (
                  <Admin key={id} profilUser={profilUser} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="user">
        <ProfilUser />
      </div>
    </div>
  );
};

export default Profil;
