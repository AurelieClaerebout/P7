import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user?.token;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setToken(user.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
