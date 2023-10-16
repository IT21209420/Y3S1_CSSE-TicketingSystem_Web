import React, { useContext, useEffect, useState } from "react";
import GeneratePermanantQrAddUser from "../components/GeneratePermanantQrAddUser";
import GeneratePermanantQrAddPayment from "../components/GeneratePermanantQrAddPayment";
import GeneratePermanantQrCode from "../components/GeneratePermanantQrCode";
import ToastContext from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PaymentPortal from "../components/PaymentPortal";

/**
 * Component for generating a permanent QR code for a passenger.
 * @returns {JSX.Element} The GeneratePermanantQr component.
 */
const GeneratePermanantQr = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  const { toast } = useContext(ToastContext);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    nic: "",
    contactNo: "",
    address: "",
    accBalance: "",
    type: user ? (user.role === "user" ? "ONLINE" : "") : "",
    created: false,
  });


  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    nic: "",
    contactNo: "",
    address: "",
    accBalance: "",
  });
  const [accBalanceErrors, setAccBalanceErrors] = useState({
    accBalance: "",
    type: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Handles the page number change when the user clicks on the next or previous button.
   * @param {Object} event - The event object.
   */
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
    } else if (currentPage === 2 && event.target.name === "next") {
      const errors = {
        type: userData.type.trim() === "",
        accBalance: Number(userData.accBalance) === 0,
      };

      setAccBalanceErrors({ ...accBalanceErrors, ...errors });

      if (!Object.values(errors).every((error) => !error)) {
        return;
      }
      if (userData.created) {
        setCurrentPage(3);
        return;
      }
      createUser(userData);

      return;
    } else if (currentPage === 3 && event.target.name === "next") {
      navigate("/", { replace: true });
      return;
    }

    if (event.target.name === "previous" && currentPage > 1)
      setCurrentPage(currentPage - 1);
    else if (event.target.name === "next" && currentPage < 3)
      setCurrentPage(currentPage + 1);
  }

  /**
   * Creates a new passenger with the given user data.
   * @param {Object} userData - The user data to create the passenger.
   */
  const createUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:9000/api/createPassenger`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success("Created successfully");
        console.log(result);
        setUserData({ ...userData, ...result, created: true });
        setCurrentPage(3);
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * Sets the amount paid by the user.
   * @param {number} amountPaid - The amount paid by the user.
   */
  const setAmountPaid = (amountPaid) => {
    setUserData({ ...userData, accBalance: amountPaid });
  };

  return (
    <>
      {currentPage === 1 && (
        <GeneratePermanantQrAddUser
          userData={userData}
          setUserData={(user) => {
            setUserData(user);
          }}
          formErrors={formErrors}
        />
      )}
      {currentPage === 2 && user && user.role === "stationadmin" && (
        <GeneratePermanantQrAddPayment
          userData={userData}
          setUserData={(user) => {
            setUserData(user);
          }}
          accBalanceErrors={accBalanceErrors}
          
        />
      )}
      {currentPage === 2 && user && user.role === "user" && (
        <PaymentPortal
          isPaymentSuccess={isPaymentSuccess}
          setIsPaymentSuccess={setIsPaymentSuccess}
          setAmountPaid={setAmountPaid}
        />
      )}
      {currentPage === 3 && (
        <GeneratePermanantQrCode
          userData={userData}
          passengerType="Permenant"
        />
      )}

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

        <button
          name="next"
          className={`position-absolute bottom-0 end-0 m-5 btn ${
            currentPage !== 2 ? "btn-primary" : "btn-success"
          }`}
          onClick={(event) => {
            pageNumberHandler(event);
          }}
          disabled={
            !isPaymentSuccess && currentPage === 2 && user.role === "user"
          }
        >
          {currentPage === 3
            ? "Back Home"
            : currentPage === 1
            ? "Next"
            : "Generate QR"}
        </button>
      </div>
    </>
  );
};
export default GeneratePermanantQr;
