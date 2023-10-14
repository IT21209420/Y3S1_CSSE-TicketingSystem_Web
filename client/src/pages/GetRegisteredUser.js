import React, { useContext, useEffect, useRef, useState } from "react";
import CommonContext from "../context/CommonContext";
import GenerateTemporyQrCode from "../components/GenerateTemporyQrCode";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AddCardIcon from "@mui/icons-material/AddCard";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import ToastContext from "../context/ToastContext";

const GetRegisteredUser = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const topUpModalRef = useRef(null);
  const updateModalRef = useRef(null);
  const handleModalHidden = () => {
    setTopUpModalErrors({
      amountPaid: "",
      type: "",
    });
  };
  const handleUpdateModalHidden = () => {
    setTopUpModalErrors({
      amountPaid: "",
      type: "",
    });
  };

  useEffect(() => {
    const modalElementTopup = topUpModalRef.current;
    modalElementTopup.addEventListener("hidden.bs.modal", handleModalHidden);
    const modalElementUpdate = updateModalRef.current;
    modalElementUpdate.addEventListener(
      "hidden.bs.modal",
      handleUpdateModalHidden
    );

    return () => {
      modalElementTopup.removeEventListener(
        "hidden.bs.modal",
        handleModalHidden
      );
      modalElementUpdate.removeEventListener(
        "hidden.bs.modal",
        handleUpdateModalHidden
      );
    };
  }, []);

  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  const { data, isSearchPressed } = useContext(CommonContext);
  const [passengers, setPassengers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [amountPaid, setAmountPaid] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState({
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

  const [updateModalErrors, setUpdateModalErrors] = useState({
    name: "",
    email: "",
    nic: "",
    contactNo: "",
    address: "",
  });

  const [topUpModalErrors, setTopUpModalErrors] = useState({
    amountPaid: "",
    type: "",
  });
  console.log(
    "🚀 ~ file: GetRegisteredUser.js:41 ~ GetRegisteredUser ~ passengerDetails:",
    passengerDetails
  );

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
    if (datas.error) {
      toast.error(datas.error);
    } else {
      setPassengers(datas.result);
    }
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
    if (datas.error) {
      toast.error(datas.error);
    } else setPassengers(datas.result);
  };
  const handleUpdateChange = (e) => {
    setPassengerDetails({
      ...passengerDetails,
      passenger: {
        ...passengerDetails.passenger,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleUpdate = async () => {
    const errors = {
      name: passengerDetails.passenger.name.trim() === "",
      email: passengerDetails.passenger.email.trim() === "",
      nic: passengerDetails.passenger.nic.trim() === "",
      contactNo: passengerDetails.passenger.contactNo.trim() === "",
      address: passengerDetails.passenger.address.trim() === "",
    };

    setUpdateModalErrors({ ...updateModalErrors, ...errors });

    if (!Object.values(errors).every((error) => !error)) {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await fetch(
      `http://localhost:9000/api/updatePassenger/${passengerDetails.passenger._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(passengerDetails.passenger),
      }
    );
    const datas = await response.json();
    if (datas.error) {
      toast.error(datas.error);
    } else {
      toast.success("Updated successfully");
      setPassengers(
        passengers.map((user) =>
          user._id === datas.result._id ? datas.result : user
        )
      );
    }
  };
  const handleTopUp = async () => {
    const errors = {
      amountPaid: Number(amountPaid) === 0,
      type: passengerDetails.passenger.type.trim() === "",
    };

    setTopUpModalErrors({ ...topUpModalErrors, ...errors });

    if (!Object.values(errors).every((error) => !error)) {
      toast.error("Please fill all the fields");
      return;
    }
    const dataToSend = {
      amount: Number(amountPaid),
      type: passengerDetails.passenger.type,
    };
    const response = await fetch(
      `http://localhost:9000/api/addTransaction/${passengerDetails.passenger._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataToSend),
      }
    );
    const datas = await response.json();
    if (datas.error) {
      toast.error(datas.error);
    } else {
      toast.success("Updated successfully");

      setPassengers(
        passengers.map((user) =>
          user._id === datas.result._id ? { ...user, ...datas.result } : user
        )
      );
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
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
    setPassengerDetails({
      ...passengerDetails,
      passenger: {
        ...passengerDetails.passenger,
        newAccBalance:
          Number(passengerDetails.passenger.accBalance) + Number(amountPaid),
        amountPaid: Number(amountPaid),
      },
    });
  }, [amountPaid]);

  return (
    <div>
      {!passengerDetails.isGetQRClicked && (
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
                        <td className="px-1 py-2">{passenger.contactNo}</td>
                        <td className="px-1 py-2">{passenger.address}</td>
                        <td className="px-1 py-2">{passenger.accBalance}</td>

                        <td className="px-1 py-2 text-center">
                          <button
                            className="btn rounded py-1 px-2"
                            onClick={() => {
                              setPassengerDetails({
                                ...passengerDetails,
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
                            className="btn  rounded py-1 px-2"
                            data-bs-toggle="modal"
                            data-bs-target="#topUpModal"
                            onClick={() => {
                              setPassengerDetails({
                                ...passengerDetails,
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
                            className="btn  rounded py-1 px-2"
                            data-bs-toggle="modal"
                            data-bs-target="#updateUserModal"
                            onClick={() => {
                              setPassengerDetails({
                                ...passengerDetails,
                                passenger: passenger,
                              });
                            }}
                          >
                            <EditIcon />
                          </button>
                        </td>
                        <td className="px-1 py-2 text-center">
                          <button
                            className="btn btn-danger rounded-circle p-1"
                            onClick={() => {
                              handleDelete(passenger._id);
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
      {passengerDetails.isGetQRClicked && (
        <div className="">
          <GenerateTemporyQrCode userData={passengerDetails} />
          <div className="">
            <button
              className="btn btn-primary position-absolute bottom-0 end-0 mb-5 me-5"
              onClick={() => {
                setPassengerDetails({
                  ...passengerDetails,
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
        ref={updateModalRef}
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
                    value={passengerDetails.passenger.name}
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
                    value={passengerDetails.passenger.email}
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
                    value={passengerDetails.passenger.nic}
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
                    value={passengerDetails.passenger.contactNo}
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
                    value={passengerDetails.passenger.address}
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
        ref={topUpModalRef}
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
                    class="form-control border-0 ms-1 "
                    id="currentAmount"
                    name="currentAmount"
                    value={passengerDetails.passenger.newAccBalance}
                    readOnly
                  />
                </div>
                <div className="mb-3 d-flex">
                  <label htmlFor="inputPayment" className="col-form-label w-50">
                    Select Payment Type
                  </label>
                  {/* <div className=" ms-2 w-50"> */}
                  <select
                    className="form-select ms-1"
                    aria-label="Default select example"
                    name="type"
                    value={passengerDetails.passenger.type}
                    onChange={(e) => handleUpdateChange(e)}
                  >
                    <option value=""></option>
                    <option value="CASH">Cash</option>
                    <option value="CREDIT">Credit</option>
                    <option value="DEBIT">Debit</option>
                  </select>
                </div>

                <div class="mb-3 d-flex">
                  <label for="address" class="col-form-label w-50">
                    Amount Paid:
                  </label>
                  <input
                    class="form-control "
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
                onClick={handleTopUp}
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
