import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { UserProvider } from "./components/Profil/UserContext";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Thread from "./pages/Thread";
import useToken from "./services/useToken";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <>
        <Header />
        <Home setToken={setToken} />
        <Footer />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thread" element={<Thread />} />
          <Route path="/profil" element={<Profil />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </UserProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
