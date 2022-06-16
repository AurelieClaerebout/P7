import React, { useState } from "react";
import RegisterForm from "./Register";
import LoginForm from "./Login";

const Log = () => {
  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(true);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setLoginModal(false);
      setRegisterModal(true);
    } else if (e.target.id === "login") {
      setRegisterModal(false);
      setLoginModal(true);
    }
  };

  return (
    <div className="connect-form">
      <ul>
        <li onClick={handleModals} id="register">
          S'inscrire
        </li>
        <li onClick={handleModals} id="login">
          Se connecter
        </li>
      </ul>
      {registerModal && <RegisterForm />}
      {loginModal && <LoginForm />}
    </div>
  );
};

export default Log;
