import React, { useContext, useEffect, useState } from "react";
import CommonContext from "../context/CommonContext";
import GenerateTemporyQrCode from "./GenerateTemporyQrCode";

const GetRegisteredUser = () => {
  const { data, isSearchPressed } = useContext(CommonContext);
  const [passengers, setPassengers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [user, setUser] = useState({
    user: {},
    isGetQRClicked: false,
  });
  console.log(
    "🚀 ~ file: GetRegisteredUser.js:14 ~ GetRegisteredUser ~ user:",
    user
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
                    <th scope="col" className="px-1 py-2 text-center">
                      Name
                    </th>
                    <th scope="col" className="px-1 py-2 text-center">
                      Email
                    </th>
                    <th scope="col" className="px-1 py-2 text-center">
                      NIC
                    </th>
                    <th scope="col" className="px-1 py-2 text-center">
                      Account Balance
                    </th>
                    <th scope="col" className="px-1 py-2 text-center">
                      Get QR
                    </th>
                    <th scope="col" className="px-1 py-2 text-center">
                      Update
                    </th>
                    <th scope="col" className="px-1 py-2 text-center">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {passengers ? (
                    passengers.map((user) => (
                      <tr key={user._id}>
                        <td className="px-1 py-2">{user.name}</td>
                        <td className="px-1 py-2">{user.email}</td>
                        <td className="px-1 py-2">{user.nic}</td>
                        <td className="px-1 py-2">{user.accBalance}</td>
                        <td className="px-1 py-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setUser({
                                ...user,
                                isGetQRClicked: true,
                                user: user,
                              });
                            }}
                          >
                            Get QR
                          </button>
                        </td>

                        <td className="px-1 py-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setUser({
                                ...user,
                                isGetQRClicked: true,
                                user: user,
                              });
                            }}
                          >
                            Update
                          </button>
                        </td>
                        <td className="px-1 py-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setUser({
                                ...user,
                                isGetQRClicked: true,
                                user: user,
                              });
                            }}
                          >
                            Delete
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
    </div>
  );
};

export default GetRegisteredUser;
