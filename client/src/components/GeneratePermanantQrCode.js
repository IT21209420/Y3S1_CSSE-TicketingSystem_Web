import React, { useContext, useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import ToastContext from "../context/ToastContext";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * A component that generates a permanent QR code for a given user data and passenger type.
 * @param {Object} props - The component props.
 * @param {Object} props.userData - The user data object.
 * @param {string} props.passengerType - The passenger type.
 * @returns {JSX.Element} - The JSX element representing the component.
 */
const GeneratePermanantQrCode = ({ userData, passengerType }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if user is not logged in.
    !user && navigate("/login", { replace: true });
  }, []);

  const chart = useRef(null);
  const { toast } = useContext(ToastContext);
  const [parentId, setParentId] = useState("");

  /**
   * Handles the export of the QR code as a PNG image.
   */
  const handleExportSVG = async () => {
    if (!chart.current) {
      return;
    }
    const dataUrl = await toPng(chart.current);
    download(dataUrl, "Qr_" + userData._id + ".png");
  };

  useEffect(() => {
    handleQrOnlick();
  }, [userData]);

  /**
   * Handles the click event on the QR code.
   */
  const handleQrOnlick = async () => {
    const response = await fetch(
      `http://localhost:9000/api/getPassengerParentId/${userData._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ passengerType: passengerType }),
      }
    );
    const datas = await response.json();
    if (datas.error) {
      toast.error(datas.error);
    } else {
      setParentId(datas);
    }
  };

  return (
    <div>
      <div className="mt-5" align="center">
        <div
          ref={chart}
          className="bg-light-subtle p-5 rounded shadow w-25"
          align="center"
        >
          <QRCode
            value={JSON.stringify({
              id: parentId,
            })}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button onClick={handleExportSVG} className="mx-auto btn btn-success">
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default GeneratePermanantQrCode;
