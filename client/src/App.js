import React from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";
import { CommonContextProvider } from "./context/CommonContext";
import GenerateTemporyQr from "./pages/GenerateTemporyQr";
import GetRegisteredUser from "./pages/GetRegisteredUser";

const App = () => {
  return (
    <CommonContextProvider>
      <ToastContextProvider>
        <AuthContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generateqr" element={<GenerateTemporyQr />} />
              <Route
                path="/getregistereduser"
                element={<GetRegisteredUser />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Layout>
        </AuthContextProvider>
      </ToastContextProvider>
    </CommonContextProvider>
  );
};

export default App;
