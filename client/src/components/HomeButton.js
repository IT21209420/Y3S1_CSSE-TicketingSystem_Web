import React, { useEffect, useState } from "react";
import "./HomeButton.css";
import { useNavigate } from "react-router-dom";

const HomeButton = ({ text }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (text === "Create User") {
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
    }
  }, [text]);
  function handleButtonClick() {
    if (text === "Create User") {
      navigate("/generateqr", { replace: true });
    } else if (text === "Get QR") {
      navigate("/getregistereduser", { replace: true });
    }
  }

  return (
    <div
      className={`rounded  shadow m-5 d-flex align-items-center justify-content-center border `}
      style={{
        height: "250px",
        width: "420px",
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
        className="fs-2 text-center  text-black m-0 fw-semibold  w-75 rounded bg-body-tertiary "
       
      >
        {text}
      </p>
    </div>
  );
};

export default HomeButton;
