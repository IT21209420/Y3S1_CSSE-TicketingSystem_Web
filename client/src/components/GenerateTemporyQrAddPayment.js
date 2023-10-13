import React from "react";

const GenerateTemporyQrAddPayment = ({
  userData,
  setUserData,
  accBalanceErrors,
}) => {
  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }
  return (
    <div>
      <div className="w-50  mx-auto mt-5 bg-light-subtle p-4 rounded shadow">
        <h3>Add Payment</h3>
        <form>
          <div className="form-group d-flex align-items-center mt-4">
            <label htmlFor="inputPayment" className="form-label m-0">
              Payment
            </label>
            <div className=" ms-2 w-75">
              <input
                type="text"
                className="form-control"
                id="inputPayment"
                name="accBalance"
                value={userData.accBalance}
                onChange={handleInputChange}
                aria-describedby="accBalanceHelp"
                placeholder="Enter Payment"
              />
              {accBalanceErrors.accBalance && (
                <span className="text-danger ms-2">Payment amount</span>
              )}
            </div>
          </div>
          <div className="form-group  d-flex align-items-center mt-2">
            <label htmlFor="inputPayment" className="form-label mt-4">
              Select Payment Type
            </label>
            <div className=" ms-2 w-75">
              <select
                className="form-select"
                aria-label="Default select example"
                name="type"
                value={userData.type}
                onChange={handleInputChange}
              >
                <option value=""></option>
                <option value="CASH">Cash</option>
                <option value="CREDIT">Credit</option>
                <option value="DEBIT">Debit</option>
              </select>

              {accBalanceErrors.type && (
                <span className="text-danger ms-2">Payment type</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateTemporyQrAddPayment;
