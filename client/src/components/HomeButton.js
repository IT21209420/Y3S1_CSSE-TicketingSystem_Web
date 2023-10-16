import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const HomeButton = ({ text }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (text === "Generate QR") {
      setImageUrl(
        "https://www.shantellesmith.com/wp-content/uploads/2018/12/users.jpg"
      );
    } else if (text === "Get QR") {
      setImageUrl(
        "https://slidemodel.com/wp-content/uploads/qrcode-presentation-powerpoint.jpg"
      );
    } else if (text === "Remove User") {
      setImageUrl(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZgr6DVuqWaOkDGg7tUcy948QSKXUruVhhi4oclUJOc8ZEeluhSh3Mr-TIHHb8iNNdTQQ&usqp=CAU"
      );
    } else if (text === "Already Have QR") {
      setImageUrl(
        "https://img.freepik.com/free-vector/qr-code-concept-illustration_114360-5933.jpg?w=740&t=st=1697403358~exp=1697403958~hmac=d8f2f3b5aba72ce55691c297bc45f5759ba917f4da6223117a9f7c40bd277703"
      );
    } else if (text === "Transactions") {
      setImageUrl(
        "https://img.freepik.com/free-vector/people-using-mobile-bank-remittance-money_74855-6617.jpg?w=826&t=st=1697408857~exp=1697409457~hmac=8019d9c2a682dde504000eba173878d6ca33ae14bfeb196ad87916c6d2afd7ae"
      );
    } else if (text === "Top Up") {
      setImageUrl(
        "https://img.freepik.com/free-vector/transfer-money-concept-illustration_114360-3762.jpg?w=740&t=st=1697412240~exp=1697412840~hmac=98e3e15ae7d47bc7d0fb5e67469bf058db2ace5279f7a2551dae0fa126856bbc"
      );
    } else if (text === "Tempory QR") {
      setImageUrl(
        "https://img.freepik.com/free-photo/high-angle-qr-code-note-plateg_23-2149357885.jpg?w=360&t=st=1697420499~exp=1697421099~hmac=189f1b84a0dcb48b63d2416cb266031ee35d342885d753685cb6ecb09c4383c4"
      );
    }
  }, [text]);
  async function handleButtonClick() {
    if (text === "Generate QR") {
      navigate("/generateqr", { replace: true });
    } else if (text === "Get QR") {
      navigate("/getregistereduser", { replace: true });
    } else if (text === "Already Have QR") {
      navigate("/getregistereduserqr", { replace: true });
    } else if (text === "Transactions") {
      navigate("/userTransactions", { replace: true });
    } else if (text === "Top Up") {
      navigate("/topUpAccount", { replace: true });
    } else if (text === "Tempory QR") {
      navigate("/temporyQr", { replace: true });
    }
  }

  return (
    <div
      className={`rounded  shadow mb-3 d-flex align-items-center justify-content-center border `}
      style={{
        height: "250px",
        width: "300px",
        cursor: "pointer",
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: hovered ? "#e6e6e6" : "",
        transition: "background-color 0.3s ease-in-out",
        opacity: hovered ? "0.5" : "1",
      }}
      onClick={() => handleButtonClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* i want to only reduce back ground opacity not the text */}
      <p
        className="fs-2 text-center  text-black m-0 fw-bold  w-75 rounded "
        style={{
          textShadow: " 0 0 2px #ffffff, 0 0 6px #2780e3, 0 0 10px #ffffff",
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default HomeButton;
