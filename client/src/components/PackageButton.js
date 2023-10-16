import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * A button component that displays package information and allows selection of a package.
 * @param {Object} props - The component props.
 * @param {Object} props.packageData - The package data to display.
 * @param {Function} props.setSelectedPackage - The function to call when a package is selected.
 * @returns {JSX.Element} - The rendered component.
 */
const PackageButton = ({ packageData, setSelectedPackage }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  /**
   * Handles the click event of the package button and calls the setSelectedPackage function.
   */
  const handleClick = () => {
    setSelectedPackage(packageData);
  };

  return (
    <div className="mt-5 mx-5 px-2">
      <div
        class="card text-white  mb-3 rounded border-2 border-primary shadow-lg"
        style={{
          maxWidth: "20rem",
          width: "20rem",
          height: "250px",
          cursor: "pointer",
          backgroundColor: "#a0c2e8",
        }}
        onClick={handleClick}
      >
        <div class="card-body ">
          <div class=" d-flex ">
            <p className="fs-1 text-black mx-auto fw-semibold mb-2">
              {packageData.title}
            </p>
          </div>
          <p class="m-0 fs-5 text-black">{packageData.description}</p>
        </div>
        <div className="card-footer d-flex bg-light p-1 mb-1">
          <p class="m-0  fs-4 mx-auto text-danger fw-bold ">
            Amount : Rs.{packageData.amount}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackageButton;
