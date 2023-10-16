import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import GeneratePermanantQrCode from "../components/GeneratePermanantQrCode";
import ToastContext from "../context/ToastContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GetRegisteredUserQR = () => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  const { toast } = useContext(ToastContext);

  useEffect(() => {
    setIsLoading(true);
    handleButtonClick();
  }, []);
  async function handleButtonClick() {
    try {
      const res = await fetch(
        `http://localhost:9000/api/getPassengerByUserId`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await res.json();
      if (!result.error) {
        console.log(result);
        setUserData(result);
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.error(err.message);
    }
    setIsLoading(false);
  }
  return (
    <div>
      <div>
        <button className="btn btn-secondary p-1">
          <ArrowBackIcon
            onClick={() => {
              navigate("/", { replace: true });
            }}
          />
        </button>
      </div>
      {!isLoading ? (
        userData ? (
          <GeneratePermanantQrCode
            userData={userData}
            passengerType="Permenant"
          />
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <p>No Qr Found !!!</p>
          </div>
        )
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default GetRegisteredUserQR;
