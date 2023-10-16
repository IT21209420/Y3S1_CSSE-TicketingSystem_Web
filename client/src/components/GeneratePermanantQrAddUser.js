import React from "react";

const GeneratePermanantQrAddUser = ({ userData, setUserData, formErrors }) => {
  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  return (
    <div>
      <div className="w-50  mx-auto mt-5 bg-light-subtle p-4 rounded shadow">
        <h3>Enter user details</h3>
        <form>
          <div className="form-group d-flex align-items-center mt-4">
            <label htmlFor="inputName " className="w-25">
              Name
            </label>
            <div className=" ms-2 w-75">
              <input
                type="text"
                className="form-control"
                id="inputName"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                aria-describedby="nameHelp"
                placeholder="Enter name"
              />
              {formErrors.name && (
                <span className="text-danger ms-2">Name is Required</span>
              )}
            </div>
          </div>

          <div className="form-group d-flex align-items-center mt-2">
            <label htmlFor="inputEmail" className="w-25">
              Email address
            </label>
            <div className=" ms-2 w-75">
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                aria-describedby="emailHelp"
                placeholder="peter@example.com"
              />
              {formErrors.email && (
                <span className="text-danger ms-2">Email is Required</span>
              )}
            </div>
          </div>
          <div className="form-group d-flex align-items-center mt-2">
            <label htmlFor="inputNic" className="w-25">
              NIC
            </label>
            <div className=" ms-2 w-75">
              <input
                type="text"
                className="form-control"
                id="inputNIC"
                name="nic"
                value={userData.nic}
                onChange={handleInputChange}
                aria-describedby="emailHelp"
                placeholder="Enter NIC"
              />
              {formErrors.nic && (
                <span className="text-danger ms-2">NIC is Required</span>
              )}
            </div>
          </div>
          <div className="form-group d-flex align-items-center mt-2">
            <label htmlFor="inputContactNo" className="w-25">
              Contact No
            </label>
            <div className=" ms-2 w-75">
              <input
                type="text"
                className="form-control"
                id="inputContactNo"
                name="contactNo"
                value={userData.contactNo}
                onChange={handleInputChange}
                aria-describedby="emailHelp"
                placeholder="Enter contact no"
              />
              {formErrors.contactNo && (
                <span className="text-danger ms-2">Contact No is Required</span>
              )}
            </div>
          </div>
          <div className="form-group d-flex align-items-center mt-2">
            <label htmlFor="inputAddress" className="w-25">
              Address
            </label>
            <div className=" ms-2 w-75">
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                aria-describedby="emailHelp"
                placeholder="Enter address"
              />
              {formErrors.address && (
                <span className="text-danger ms-2">Address is Required</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePermanantQrAddUser;
