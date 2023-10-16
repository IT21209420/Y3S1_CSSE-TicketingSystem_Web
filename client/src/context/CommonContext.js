import { createContext, useContext, useState } from "react";
import ToastContext from "./ToastContext";

const CommonContext = createContext();
export const CommonContextProvider = ({ children }) => {
  const { toast } = useContext(ToastContext);
  const [data, setData] = useState([]);
  const [isSearchPressed, setIsSearchPressed] = useState(false);

  const topUpAccount = async (amount, type, userID) => {
    const dataToSend = {
      amount: amount,
      type: type,
    };
    const response = await fetch(
      `http://localhost:9000/api/addTransaction/${userID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataToSend),
      }
    );
    const res = await response.json();
    if (res.error) return toast.error(res.error);
    else {
      toast.success("Payment Successful");
      return res;
    }
  };
  const getPermenantUserId = async () => {
    const response = await fetch(
      `http://localhost:9000/api/getPassengerByUserId`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const res = await response.json();
    if (res.error) return toast.error(res.error);
    else {
      return res;
    }
  };

  return (
    <CommonContext.Provider
      value={{
        data,
        setData,
        isSearchPressed,
        setIsSearchPressed,
        topUpAccount,
        getPermenantUserId,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContext;
