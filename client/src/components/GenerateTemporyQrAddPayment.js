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
          <div className="form-group">
            <label htmlFor="inputPayment" className="form-label mt-4">
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
              {accBalanceErrors && (
                <span className="text-danger ms-2">Payment amount</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateTemporyQrAddPayment;
