import React, {  useState } from "react";

const PaymentPortal = ({
  isPaymentSuccess,
  setIsPaymentSuccess,
  setAmountPaid,
}) => {

  const [formData, setFormData] = useState({
    paymentAmount: "",
    cardNumber: "",
    cardType: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
  });

  const [formErrors, setFormErrors] = useState({
    paymentAmount: "",
    cardNumber: "",
    cardType: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
  });

  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const yearArray = [2021, 2022, 2023, 2024, 2025, 2026, 2027];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "paymentAmount") {
      setAmountPaid(value);
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    const errors = {
      cardNumber: formData.cardNumber.trim() === "",
      cardType: formData.cardType.trim() === "",
      expirationMonth: formData.expirationMonth.trim() === "",
      expirationYear: formData.expirationYear.trim() === "",
      securityCode: formData.securityCode.trim() === "",
      paymentAmount: Number(formData.paymentAmount) < 400,
    };

    setFormErrors({ ...formErrors, ...errors });

    if (!Object.values(errors).every((error) => !error)) {
      return;
    }
    setIsPaymentSuccess(true);
  };

  return (
    <div className="d-flex">
      {!isPaymentSuccess && (
        <div className="border w-50 rounded mx-auto p-4 shadow">
          <p className="fs-3  border-bottom fw-semibold py-2">Payment Portal</p>
          <div>
            <div className="d-flex align-items-center mt-3 ">
              <label htmlFor="paymentAmount " className="w-25 ">
                Amount*
              </label>
              <input
                type="text"
                id="paymentAmount"
                name="paymentAmount"
                value={formData.paymentAmount}
                onChange={handleChange}
                className={`form-control w-25 ${
                  formErrors.paymentAmount ? "border-danger" : ""
                }`}
              />
              {formErrors.paymentAmount && (
                <span className="text-danger ms-2 ">Enter 400 or more</span>
              )}
              {!formErrors.paymentAmount && (
                <i className="text-warning ms-2 " style={{ fontSize: "12px" }}>
                  Minimum Payment Amount Rs.400.00
                </i>
              )}
            </div>

            <div>
              <label htmlFor="cardType" className=" mt-3">
                Card Type*
              </label>
            </div>
            <div>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="visa"
                    name="cardType"
                    value="visa"
                    onChange={handleChange}
                    className="form-check-input m-0"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    alt="visa"
                  />
                  <label htmlFor="visa">Visa</label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="mastercard"
                    name="cardType"
                    value="mastercard"
                    onChange={handleChange}
                    className="form-check-input m-0"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/mastercard.png"
                    alt="mastercard"
                  />
                  <label htmlFor="mastercard">Mastercard</label>
                </div>
              </div>
              <div className="d-flex">
                {formErrors.cardType && (
                  <span className="text-danger mx-auto">Select card type</span>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center mt-3 ">
            <label htmlFor="cardNumber" className="w-25">
              Card Number*
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              // className="form-control w-25

              // "
              className={`form-control w-25 ${
                formErrors.cardNumber ? "border-danger" : ""
              }`}
            />
            {formErrors.cardNumber && (
              <span className="text-danger ms-2">Card number is required</span>
            )}
          </div>

          <div className="d-flex align-items-center mt-3">
            <label htmlFor="expirationMonth" className="w-25 ">
              Expiration Date*
            </label>

            <div className="d-flex  align-items-center w-75 ">
              <select
                name="expirationMonth"
                id="expirationMonth"
                className={`form-select ${
                  formErrors.expirationMonth ? "border-danger" : ""
                }`}
                style={{ width: "100px" }}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Month</option>
                {monthArray.map((month) => (
                  <option value={month} key={month}>
                    {month}
                  </option>
                ))}
              </select>

              <label htmlFor="expirationYear" className="ms-5">
                Expiration Year:
              </label>
              <select
                name="expirationYear"
                id="expirationYear"
                style={{ width: "100px" }}
                className={`form-select ms-3 ${
                  formErrors.expirationYear ? "border-danger" : ""
                }`}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Year</option>
                {yearArray.map((year) => (
                  <option value={year} key={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div></div>
          <div className="d-flex align-items-center mt-3 ">
            <label htmlFor="securityCode " className="w-25 ">
              CVV*
            </label>
            <input
              type="text"
              id="securityCode"
              name="securityCode"
              value={formData.securityCode}
              onChange={handleChange}
              className={`form-control w-25 ${
                formErrors.securityCode ? "border-danger" : ""
              }`}
            />
            {formErrors.securityCode && (
              <span className="text-danger ms-2 ">Enter security Code</span>
            )}
          </div>

          <div className="d-flex justify-content-end mt-5">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "80px" }}
              onClick={(e) => handlePayment(e)}
            >
              Pay
            </button>
          </div>
        </div>
      )}
      {isPaymentSuccess && (
        <div className="border w-50 rounded mx-auto p-4 shadow">
          <p className="fs-3  border-bottom fw-semibold py-2">
            Payment Successful
          </p>
          <div className="d-flex justify-content-center ">
            <img
              src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif"
              width="300px"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPortal;
