import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import HomeButton from "../components/HomeButton";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  const buttonArray = ["Create User", "Get QR"];
  return (
    <div
      className="d-flex align-items-center  justify-content-center "
      style={{ height: "80vh" }}
    >
      {buttonArray.map((text) => {
        return <HomeButton text={text} />;
      })}
    </div>
  );
};

export default Home;
