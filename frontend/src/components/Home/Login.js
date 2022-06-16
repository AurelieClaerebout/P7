import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}api/users/login`, {
        email,
        password,
      })
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        window.location = "/thread";
      })
      .catch((err) => {
        document.getElementById("error").innerHTML = err.response.data.message;
      });
  };

  return (
    <div className="login">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2>Connectez-vous :</h2>
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
        <p id="error"></p>
        <input type="submit" value="Se connecter" className="btn" />
      </form>
    </div>
  );
};

export default Login;
