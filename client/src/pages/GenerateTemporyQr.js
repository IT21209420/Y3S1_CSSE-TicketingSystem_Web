import React, { useContext, useState } from "react";
import GenerateTemporyQrAddUser from "../components/GenerateTemporyQrAddUser";
import GenerateTemporyQrAddPayment from "../components/GenerateTemporyQrAddPayment";
import GenerateTemporyQrCode from "../components/GenerateTemporyQrCode";
import ToastContext from "../context/ToastContext";

const GenerateTemporyQr = () => {
    const { toast } = useContext(ToastContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    nic: "",
    contactNo: "",
    address: "",
    accBalance: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    nic: "",
    contactNo: "",
    address: "",
    accBalance: "",
  });
  const [accBalanceErrors, setAccBalanceErrors] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  function pageNumberHandler(event) {
    if (currentPage === 1 && event.target.name === "next") {
      const errors = {
        name: userData.name.trim() === "",
        email: userData.email.trim() === "",
        nic: userData.nic.trim() === "",
        contactNo: userData.contactNo.trim() === "",
        address: userData.address.trim() === "",
      };

      setFormErrors({ ...formErrors, ...errors });

      if (!Object.values(errors).every((error) => !error)) {
        return;
      }
    } else if (
      currentPage === 2 &&
      userData.accBalance === "" &&
      event.target.name === "next"
    ) {
      setAccBalanceErrors(true);
      return;
    }

    if (event.target.name === "previous" && currentPage > 1)
      setCurrentPage(currentPage - 1);
    else if (event.target.name === "next" && currentPage < 3)
      setCurrentPage(currentPage + 1);
    if (event.target.name === "next" && currentPage === 2) {
      //login request
    }
  }
  const createUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:9000/api/createPassenger`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success("Created successfully");
        localStorage.setItem("token", result.jwtToken);
        setUser(result.user);

        navigate("/", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      {currentPage === 1 && (
        <GenerateTemporyQrAddUser
          userData={userData}
          setUserData={(user) => {
            setUserData(user);
          }}
          formErrors={formErrors}
        />
      )}
      {currentPage === 2 && (
        <GenerateTemporyQrAddPayment
          userData={userData}
          setUserData={(user) => {
            setUserData(user);
          }}
          accBalanceErrors={accBalanceErrors}
        />
      )}
      {currentPage === 3 && <GenerateTemporyQrCode userData={userData} />}

      <div>
        {currentPage !== 1 && (
          <button
            name="previous"
            className="position-absolute bottom-0 start-0  m-5 btn btn-secondary"
            onClick={(event) => {
              pageNumberHandler(event);
            }}
          >
            Previous
          </button>
        )}
        {currentPage !== 3 && (
          <button
            name="next"
            className={`position-absolute bottom-0 end-0 m-5 btn ${
              currentPage !== 2 ? "btn-primary" : "btn-success"
            }`}
            onClick={(event) => {
              pageNumberHandler(event);
            }}
          >
            {currentPage !== 2 ? "Next" : "Generate QR"}
          </button>
        )}
      </div>
    </>
  );
};

export default GenerateTemporyQr;
