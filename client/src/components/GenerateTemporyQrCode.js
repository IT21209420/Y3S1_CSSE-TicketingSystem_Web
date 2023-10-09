import React, { useRef } from "react";
import QRCode from "qrcode.react";
import { toPng } from "html-to-image";
import download from "downloadjs";

const GenerateTemporyQrCode = ({ userData }) => {
  const chart = useRef(null);

  const handleExportSVG = async () => {
    if (!chart.current) {
      return;
    }
    const dataUrl = await toPng(chart.current);
    download(dataUrl, "Qr_" + userData.nic + ".png");
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
              email: userData.email,
              nic: userData.nic,
              accBalance: userData.accBalance,
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

export default GenerateTemporyQrCode;
