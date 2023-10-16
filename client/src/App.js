import React from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";
import { CommonContextProvider } from "./context/CommonContext";
import GeneratePermanantQr from "./pages/GeneratePermanantQr";
import GetRegisteredUser from "./pages/GetRegisteredUser";
import GetRegisteredUserQR from "./pages/GetRegisteredUserQR";
import Transactions from "./pages/Transactions";
import TopUpUser from "./pages/TopUpUser";
import TemporyQR from "./pages/TemporyQR";

const App = () => {
  return (
    <ToastContextProvider>
      <CommonContextProvider>
        <AuthContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generateqr" element={<GeneratePermanantQr />} />
              <Route
                path="/getregistereduser"
                element={<GetRegisteredUser />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/getregistereduserqr"
                element={<GetRegisteredUserQR />}
              />
              <Route path="/userTransactions" element={<Transactions />} />
              <Route path="/topUpAccount" element={<TopUpUser />} />
              <Route path="/temporyQr" element={<TemporyQR />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </Layout>
        </AuthContextProvider>
      </CommonContextProvider>
    </ToastContextProvider>
  );
};

export default App;
