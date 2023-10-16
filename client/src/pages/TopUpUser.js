import React, { useContext, useEffect, useState } from "react";
import PaymentPortal from "../components/PaymentPortal";
import ToastContext from "../context/ToastContext";
import CommonContext from "../context/CommonContext";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * TopUpUser component for adding funds to user's account
 * @return {JSX.Element} JSX representation of the component
 */
const TopUpUser = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  const { toast } = useContext(ToastContext);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const { topUpAccount, getPermenantUserId } = useContext(CommonContext);

  useEffect(() => {
    /**
     * Function to top up user's account after successful payment
     * @return {Promise<void>} Promise that resolves after topping up the account
     */
    async function topUp() {
      if (isPaymentSuccess) {
        const permentPassenger = await getPermenantUserId();
        await topUpAccount(amountPaid, "ONLINE", permentPassenger._id);
      }
    }
    topUp();
  }, [isPaymentSuccess]);

  const [amountPaid, setAmountPaid] = useState(0);

  return (
    <div>
      <PaymentPortal
        isPaymentSuccess={isPaymentSuccess}
        setIsPaymentSuccess={setIsPaymentSuccess}
        setAmountPaid={(amountPaid) => setAmountPaid(amountPaid)}
      />
    </div>
  );
};

export default TopUpUser;
