import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { authHeader } from "../../services/auth.header";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userId = JSON.parse(sessionStorage.getItem("user")).id;
  const [user, setUser] = useState([]);
  const [reset, setReset] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUser();
    getAllUsers();
  }, [reset]);

  const getUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${userId}`, authHeader())
      .then((res) => setUser(res.data.user))
      .catch((err) => ({ message: err }));
  };

  const getAllUsers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/users`, authHeader())
      .then((res) => setAllUsers(res.data.users))
      .catch((err) => ({ message: err }));
  };

  const updateUser = async (id, data) => {
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}api/users/${id}`,
        data,
        authHeader()
      )
      .then((res) => setReset(res.data))
      .catch((err) => ({ message: err }));
  };

  const deleteUser = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}api/users/${id}`, authHeader())
      .then((res) => setReset(res.data))
      .catch((err) => ({ message: err }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        allUsers,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
