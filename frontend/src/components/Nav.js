import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import imgLogout from "../assets/logout.svg";
import thread from "../assets/thread.svg";
import profil from "../assets/profil.svg";
import UserContext from "./Profil/UserContext";

const Nav = () => {
  const { user } = useContext(UserContext);

  const logout = () => {
    sessionStorage.removeItem("user");
  };

  return (
    <div className="nav-container">
      <div className="nav">
        <h1 className="welcome">
          <p> Bienvenue {user.prenom} </p>
        </h1>
        <ul>
          <li>
            <NavLink to="/">
              <img
                onClick={() => {
                  logout();
                }}
                src={imgLogout}
                alt="Déconnexion"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/thread">
              <img src={thread} alt="fil d'actualité" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/profil">
              <img src={profil} alt="profil" />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
