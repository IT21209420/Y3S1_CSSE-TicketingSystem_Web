import React, { useContext, useEffect, useState } from "react";
import CommonContext from "../context/CommonContext";
import GenerateTemporyQrCode from "./GenerateTemporyQrCode";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AddCardIcon from "@mui/icons-material/AddCard";

const GetRegisteredUser = () => {
  const { data, isSearchPressed } = useContext(CommonContext);
  const [passengers, setPassengers] = useState([]);

  console.log(
    "🚀 ~ file: GetRegisteredUser.js:8 ~ GetRegisteredUser ~ passengers:",
    passengers
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [amountPaid, setAmountPaid] = useState(0);
  const [user, setUser] = useState({
    passenger: {
      name: "",
      email: "",
      nic: "",
      contactNo: "",
      address: "",
      accBalance: 0,
      newAccBalance: 0,
      amountPaid: 0,
    },
    isGetQRClicked: false,
  });



  useEffect(() => {
    getPassengers(10, 1);
  }, []);

  useEffect(() => {
    searchPassengers();
  }, [isSearchPressed]);

  const loadPassengerDetails = (pageNumber, pageSize) => {
    if (pageNumber < 1) {
      return;
    }
    setCurrentPage(pageNumber);
    getPassengers(pageSize, pageNumber);
  };

  const getPassengers = async (pageSize, pageNumber) => {
    const response = await fetch(
      `http://localhost:9000/api/getPassengers/${pageSize}/${pageNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const datas = await response.json();
    setPassengers(datas.result);
  };
  const searchPassengers = async () => {
    const response = await fetch(
      `http://localhost:9000/api/getPassenger/${data}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const datas = await response.json();
    setPassengers(datas.result);
  };
  const handleUpdateChange = (e) => {
    setUser({
      ...user,
      passenger: { ...user.passenger, [e.target.name]: e.target.value },
    });
  };
  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:9000/api/updatePassenger/${user.passenger._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(user.passenger),
      }
    );
    const datas = await response.json();
    setPassengers(
      passengers.map((user) =>
        user._id === datas.result._id ? datas.result : user
      )
    );
  };
  const handleDelete = async (id) => {
    const response = await fetch(
      `http://localhost:9000/api/deletePassenger/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const datas = await response.json();
    setPassengers(passengers.filter((user) => user._id !== id));
  };
  const handleChange = (e) => {
    setAmountPaid(e.target.value);
  };
  useEffect(() => {
    setUser({
      ...user,
      passenger: {
        ...user.passenger,
        newAccBalance: Number(user.passenger.accBalance) + Number(amountPaid),
        amountPaid: Number(amountPaid),
      },
    });
  }, [amountPaid]);

  return (
    <div>
      {!user.isGetQRClicked && (
        <div>
          <div className="d-flex justify-content-center align-items-center">
            <div
              id="table-container"
              className="border mb-2 pe-0 w-100"
              style={{
                height: "75vh",
                overflow: "scroll",
                paddingRight: "10px",
                scrollbarWidth: "none", // For Firefox
                msOverflowStyle: "none",
              }}
            >
              <table className="table table-bordered table-responsive">
                <thead className="position-sticky top-0 bg-light ">
                  <tr>
                    <th scope="col" className="px-1 py-2 text-center ">
                      Name
                    </th>
                    <th scope="col" className="px-1 py-2 text-center">
                      Email
                    </th>
                    <th scope="col" className="px-1 py-2 text-center">
                      NIC
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-2 text-center text-nowrap"
                    >
                      Contact No
                    </th>
                    <th scope="col" className="px-1 py-2 text-center">
                      Address
                    </th>

                    <th
                      scope="col"
                      className="px-1 py-2 text-center text-nowrap"
                    >
                      Account Balance
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-2 text-center text-nowrap"
                    >
                      Get QR
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-2 text-center text-nowrap"
                    >
                      Top Up
                    </th>
                    <th scope="col" className="px-1 py-2 text-center ">
                      Update
                    </th>
                    <th scope="col" className="px-1 py-2 text-center">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {passengers ? (
                    passengers.map((passenger) => (
                      <tr key={passenger._id}>
                        <td
                          className="px-1 py-2"
                          style={{ maxWidth: "110px", overflow: "hidden" }}
                        >
                          {passenger.name}
                        </td>
                        <td className="px-1 py-2 ">{passenger.email}</td>
                        <td className="px-1 py-2">{passenger.nic}</td>
                        <td className="px-1 py-2">{passenger.accBalance}</td>
                        <td className="px-1 py-2">{passenger.address}</td>
                        <td className="px-1 py-2">{passenger.contactNo}</td>

                        <td className="px-1 py-2 text-center">
                          <button
                            className="btn btn-primary rounded py-1 px-2"
                            onClick={() => {
                              setUser({
                                ...user,
                                isGetQRClicked: true,
                                passenger: passenger,
                              });
                            }}
                          >
                            <QrCodeIcon />
                          </button>
                        </td>
                        <td className="px-1 py-2 text-center">
                          <button
                            className="btn btn-success rounded py-1 px-2"
                            data-bs-toggle="modal"
                            data-bs-target="#topUpModal"
                            onClick={() => {
                              setUser({
                                ...user,
                                passenger: {
                                  ...passenger,
                                  newAccBalance: passenger.accBalance,
                                },
                              });
                            }}
                          >
                            <AddCardIcon />
                          </button>
                        </td>

                        <td className="px-1 py-2 text-center">
                          <button
                            className="btn btn-warning rounded py-1 px-2"
                            data-bs-toggle="modal"
                            data-bs-target="#updateUserModal"
                            onClick={() => {
                              setUser({
                                ...user,
                                passenger: passenger,
                              });
                            }}
                          >
                            <EditIcon />
                          </button>
                        </td>
                        <td className="px-1 py-2 text-center">
                          <button
                            className="btn btn-danger rounded py-1 px-2"
                            onClick={() => {
                              handleDelete(user._id);
                            }}
                          >
                            <DeleteIcon />
                          </button>
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
          <div className="d-flex justify-content-center align-items-center">
            <ul className="pagination justify-content-end">
              <li className="page-item ">
                <button
                  className="page-link"
                  name="previous"
                  onClick={() => loadPassengerDetails(currentPage - 1, 10)}
                  style={{ cursor: "pointer" }}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => loadPassengerDetails(1, 10)}
                  style={{ cursor: "pointer" }}
                >
                  1
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => loadPassengerDetails(2, 10)}
                  style={{ cursor: "pointer" }}
                >
                  2
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => loadPassengerDetails(3, 10)}
                  style={{ cursor: "pointer" }}
                >
                  3
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => loadPassengerDetails(currentPage + 1, 10)}
                  style={{ cursor: "pointer" }}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {user.isGetQRClicked && (
        <div className="">
          <GenerateTemporyQrCode userData={user} />
          <div className="">
            <button
              className="btn btn-primary position-absolute bottom-0 end-0 mb-5 me-5"
              onClick={() => {
                setUser({
                  ...user,
                  isGetQRClicked: false,
                });
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}
      <div
        class="modal fade"
        id="updateUserModal"
        tabindex="-1"
        aria-labelledby="updateUserModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog  ">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="updateUserModalLabel">
                Update User
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3 d-flex">
                  <label for="name" class="col-form-label w-25">
                    Name:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    value={user.passenger.name}
                    onChange={(e) => handleUpdateChange(e)}
                  />
                </div>

                <div class="mb-3 d-flex">
                  <label for="email" class="col-form-label w-25">
                    Email:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    name="email"
                    value={user.passenger.email}
                    onChange={(e) => handleUpdateChange(e)}
                  />
                </div>
                <div class="mb-3 d-flex">
                  <label for="nic" class="col-form-label w-25">
                    NIC:
                  </label>
                  <input
                    class="form-control"
                    id="nic"
                    name="nic"
                    value={user.passenger.nic}
                    onChange={(e) => handleUpdateChange(e)}
                  />
                </div>
                <div class="mb-3 d-flex">
                  <label for="contactNo" class="col-form-label w-25">
                    Contact No:
                  </label>
                  <input
                    class="form-control"
                    id="contactNo"
                    name="contactNo"
                    value={user.passenger.contactNo}
                    onChange={(e) => handleUpdateChange(e)}
                  />
                </div>
                <div class="mb-3 d-flex">
                  <label for="address" class="col-form-label w-25">
                    Address:
                  </label>
                  <input
                    class="form-control"
                    id="address"
                    name="address"
                    value={user.passenger.address}
                    onChange={(e) => handleUpdateChange(e)}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleUpdate}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="topUpModal"
        tabindex="-1"
        aria-labelledby="topUpModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog  ">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="topUpModalLabel">
                Top Up Amount
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3 d-flex">
                  <label for="currentAmount" class="col-form-label w-50 ">
                    Current Amount:
                  </label>
                  <input
                    type="text"
                    class="form-control border-0 "
                    id="currentAmount"
                    name="currentAmount"
                    value={user.passenger.newAccBalance}
                    readOnly
                  />
                </div>

                <div class="mb-3 d-flex">
                  <label for="address" class="col-form-label w-50">
                    Amount Paid:
                  </label>
                  <input
                    class="form-control"
                    id="address"
                    name="address"
                    value={amountPaid}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleUpdate}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetRegisteredUser;
