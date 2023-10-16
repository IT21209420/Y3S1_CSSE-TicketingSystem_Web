import React, { useContext, useEffect, useState } from "react";
import PackageButton from "../components/PackageButton";
import GeneratePermanantQrAddPayment from "../components/GeneratePermanantQrAddPayment";
import ToastContext from "../context/ToastContext";
import GeneratePermanantQrCode from "../components/GeneratePermanantQrCode";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * A React functional component that generates a temporary QR code for a passenger.
 * @returns {JSX.Element} The JSX code for the component UI.
 */
const TemporyQR = () => {
  const { toast } = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login page if user is not logged in
    !user && navigate("/login", { replace: true });
  }, []);
  
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  const [userData, setUserData] = useState({
    accBalance: "",
    type: "",
  });

  const [qrData, setQrData] = useState(null);
  const [accBalanceErrors, setAccBalanceErrors] = useState({
    accBalance: "",
    type: "",
  });

  const packageButtonArray = [
    {
      title: "One Day",
      description: "One day Package is valid for 24 hours.",
      amount: 1000,
    },
    {
      title: "Week",
      description: "Week Package is valid for 7 days.",
      amount: 2500,
    },
  ];

  /**
   * Handles the payment process for generating the temporary QR code.
   * @returns {Promise<void>} A Promise that resolves when the payment is successful.
   */
  const handlePayment = async () => {
    const errors = {
      accBalance: userData.accBalance.trim() === "",
      type: userData.type.trim() === "",
    };

    setAccBalanceErrors({ ...accBalanceErrors, ...errors });

    if (!Object.values(errors).every((error) => !error)) {
      return;
    }
    try {
      const res = await fetch(
        "http://localhost:9000/api/createTemporyPassenger",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify({
            amount: userData.accBalance,
            type: userData.type,
            packageType: selectedPackage.title,
          }),
        }
      );
      const result = await res.json();
      if (!result.error) {
        toast.success("Payment Successfull");
        setQrData(result);
        console.log(
          "🚀 ~ file: TemporyQR.js:64 ~ handlePayment ~ result:",
          result
        );
      } else {
        toast.error(result.error);
      }
    } catch (error) {}
  };

  return (
    <div>
      {!selectedPackage && !qrData && (
        <>
          {/* Render package buttons */}
          <div className="d-flex justify-content-center">
            {packageButtonArray.map((packageData) => {
              return (
                <div>
                  <PackageButton
                    packageData={packageData}
                    setSelectedPackage={(selectedPackage) => {
                      setSelectedPackage(selectedPackage);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
      {selectedPackage && !qrData && (
        <div className="position-relative  p-3" style={{ height: "75vh" }}>
          {/* Render form for adding payment details */}
          <GeneratePermanantQrAddPayment
            userData={userData}
            setUserData={setUserData}
            accBalanceErrors={accBalanceErrors}
          />
          {/* Render button for generating QR code */}
          <button
            className="position-absolute bottom-0 end-0  btn btn-success"
            onClick={handlePayment}
          >
            Generate QR
          </button>
        </div>
      )}
      {selectedPackage && qrData && (
        // Render generated QR code
        <GeneratePermanantQrCode userData={qrData} passengerType="Tempory" />
      )}
    </div>
  );
};

export default TemporyQR;
