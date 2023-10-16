import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import HomeButton from "../components/HomeButton";

/**
 * Home page component
 * @returns {JSX.Element} Home page JSX element
 */
const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);
  console.log(user);

  const adminButtonArray = ["Generate QR", "Get QR", "Tempory QR"];
  const userButtonArray = [
    "Already Have QR",
    "Generate QR",
    "Transactions",
    "Top Up",
  ];
  return (
    <>
      {user && user.role === "stationadmin" && (
        <div
          className="row row-cols-1 row-cols-lg-2 row-cols-xl-3"
          style={{ height: "80vh" }}
        >
          {adminButtonArray.map((text) => {
            return (
              <div className="col">
                <HomeButton text={text} />
              </div>
            );
          })}
        </div>
      )}
      {user && user.role === "user" && (
        <div
          className="row row-cols-1 row-cols-lg-2 row-cols-xl-3"
          style={{ height: "80vh" }}
        >
          {userButtonArray.map((text) => {
            return (
              <div className="col">
                <HomeButton text={text} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;
