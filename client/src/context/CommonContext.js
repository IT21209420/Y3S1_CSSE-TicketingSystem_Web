import { createContext, useContext, useState } from "react";
import ToastContext from "./ToastContext";

// Create a new context
const CommonContext = createContext();

// Define a provider component for the context
export const CommonContextProvider = ({ children }) => {
  // Get the toast function from the ToastContext
  const { toast } = useContext(ToastContext);

  // Define state variables for the context
  const [data, setData] = useState([]);
  const [isSearchPressed, setIsSearchPressed] = useState(false);

  // Define a function to top up a user's account
  const topUpAccount = async (amount, type, userID) => {
    // Define the data to send in the request body
    const dataToSend = {
      amount: amount,
      type: type,
    };

    // Send a PUT request to the server to add a transaction
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

    // Parse the response JSON
    const res = await response.json();

    // If there was an error, show a toast message
    if (res.error) return toast.error(res.error);
    else {
      // Otherwise, show a success toast message and return the response
      toast.success("Payment Successful");
      return res;
    }
  };

  // Define a function to get a user's permanent ID
  const getPermenantUserId = async () => {
    // Send a GET request to the server to get the user's permanent ID
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

    // Parse the response JSON
    const res = await response.json();

    // If there was an error, show a toast message
    if (res.error) return toast.error(res.error);
    else {
      // Otherwise, return the response
      return res;
    }
  };

  // Render the provider component with the context value and children
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

// Export the context
export default CommonContext;
