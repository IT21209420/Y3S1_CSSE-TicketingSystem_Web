import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import HomeButton from "../components/HomeButton";
import { HomeButtonFactory } from "../components/HomeButtonFactory";

/**
 * Home page component
 * @returns {JSX.Element} Home page JSX element
 */
const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  let adminButtonArray = [];
  let userButtonArray = [];
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);
  console.log(user);

  try {
    const homeButtonFactory = new HomeButtonFactory();
    const homeButton1 = homeButtonFactory.createPayment("Generate QR");
    const homeButton2 = homeButtonFactory.createPayment("Find User Data");
    const homeButton3 = homeButtonFactory.createPayment("Temporary QR");
    const homeButton4 = homeButtonFactory.createPayment("Already Have QR");
    const homeButton5 = homeButtonFactory.createPayment("Transactions");
    const homeButton6 = homeButtonFactory.createPayment("Top Up");

    adminButtonArray = [
      homeButton1.getButtonNameInfo(),
      homeButton2.getButtonNameInfo(),
      homeButton3.getButtonNameInfo(),
    ];
    userButtonArray = [
      homeButton4.getButtonNameInfo(),
      homeButton1.getButtonNameInfo(),
      homeButton5.getButtonNameInfo(),
      homeButton6.getButtonNameInfo(),
    ];
  } catch (e) {
    console.log(e);
  }

  return (
    <>
      {user && user.role === "stationadmin" && (
        <div
          className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 align-items-center"
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
