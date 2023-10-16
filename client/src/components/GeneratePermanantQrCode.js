import React, { useContext, useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import ToastContext from "../context/ToastContext";

const GeneratePermanantQrCode = ({ userData, passengerType }) => {
  console.log(
    "🚀 ~ file: GeneratePermanantQrCode.js:8 ~ GeneratePermanantQrCode ~ userData:",
    userData
  );
  const chart = useRef(null);
  const { toast } = useContext(ToastContext);
  const [parentId, setParentId] = useState("");
  console.log(
    "🚀 ~ file: GeneratePermanantQrCode.js:11 ~ GeneratePermanantQrCode ~ parentId:",
    parentId
  );

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
