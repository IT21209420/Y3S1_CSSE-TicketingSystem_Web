import React, { useContext, useEffect, useState } from "react";
import PaymentPortal from "../components/PaymentPortal";
import ToastContext from "../context/ToastContext";
import CommonContext from "../context/CommonContext";
import AuthContext from "../context/AuthContext";

const TopUpUser = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const { topUpAccount, getPermenantUserId } = useContext(CommonContext);

  useEffect(() => {
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
