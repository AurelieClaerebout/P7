import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const prenomRegexp = new RegExp("[a-zA-ZàâéèêîÏùû' -]{2,25}$");

  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  };
  const cancelRegister = () => {
    setPrenom("");
    setEmail("");
    setPassword("");
    setConfPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prenomRegexp.test(prenom)) {
      document.getElementById("error").innerHTML =
        "Prénom non valide (minimum 2 lettres)";
    } else if (password !== confPassword) {
      document.getElementById("error").innerHTML =
        "Les mots de passe ne sont pas identique";
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}api/users/register`, {
          prenom,
          email,
          password,
        })
        .then((res) => {
          document.getElementById("create-user").innerHTML =
            "Vous êtes enregistré ! Vous pouvez vous connecter.";
          // window.location = "/";
        })
        .catch((err) => {
          if (err) {
            document.getElementById("error").innerHTML =
              err.response.data.message;
          }
        });
    }
    cancelRegister();
  };

  return (
    <div className="register">
      <div id="create-user"></div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2> Inscrivez-vous :</h2>
        <input
          placeholder="prenom"
          type="text"
          value={prenom}
          required
          onChange={(e) => {
            handlePrenomChange(e);
          }}
        />
        <input
          placeholder="email"
          type="email"
          value={email}
          required
          onChange={(e) => {
            handleEmailChange(e);
          }}
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          required
          onChange={(e) => {
            handlePasswordChange(e);
          }}
        />
        <input
          placeholder="password"
          type="password"
          value={confPassword}
          required
          onChange={(e) => {
            handleConfPasswordChange(e);
          }}
        />
        <p id="error"></p>
        <input type="submit" value="S'enregistrer" className="btn" />
      </form>
    </div>
  );
};

export default Register;
