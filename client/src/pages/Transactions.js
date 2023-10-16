import React, { useContext, useEffect, useState } from "react";
import ToastContext from "../context/ToastContext";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { toast } = useContext(ToastContext);

  useEffect(() => {
    loadUserTransactions();
  }, []);
  async function loadUserTransactions() {
    try {
      const res = await fetch(
        `http://localhost:9000/api/getTransactionByUserId`,
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
        setTransactions(result);
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  function getDate(date) {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();
    return `${"Date :"}  ${day}/${month}/${year}     ${" Time : "} ${hour}:${minute}:${second}`;
  }

  return (
    <div>
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <div
            id="table-container"
            className="border mb-2 pe-0 w-100 "
            style={{
              height: "75vh",
              overflow: "scroll",
              paddingRight: "10px",
              scrollbarWidth: "none", // For Firefox
              msOverflowStyle: "none",
            }}
          >
            <table className="table table-bordered table-responsive">
              <thead className="position-sticky top-0  bg-light ">
                <tr>
                  <th scope="col" className="px-1 py-2 text-center w-25 bg-light">
                    Amount
                  </th>
                  <th scope="col" className="px-1 py-2 text-center w-25  bg-light">
                    Type
                  </th>
                  <th scope="col" className="px-1 py-2 text-center w-25  bg-light">
                    Date and Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions ? (
                  transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="px-1 py-2 text-center">
                        {transaction.amount}
                      </td>
                      <td className="px-1 py-2 text-center">
                        {transaction.type}
                      </td>
                      <td className="px-1 py-2 text-center">
                        {getDate(transaction.createdAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
