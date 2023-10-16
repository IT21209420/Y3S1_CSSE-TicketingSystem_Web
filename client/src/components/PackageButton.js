import React from "react";

const PackageButton = ({ packageData, setSelectedPackage }) => {
  return (
    <div className="mt-5 mx-5 px-2">
      <div
        class="card text-white  mb-3 rounded border-2 border-primary shadow-lg"
        style={{
          maxWidth: "20rem",
          width: "20rem",
          height: "250px",
          cursor: "pointer",
          backgroundColor: "#a0c2e8",
        }}
        onClick={() => {
          setSelectedPackage(packageData);
        }}
      >
        <div class="card-body ">
          <div class=" d-flex ">
            <p className="fs-1 text-black mx-auto fw-semibold mb-2">
              {packageData.title}
            </p>
          </div>
          <p class="m-0 fs-5 text-black">{packageData.description}</p>
        </div>
        <div className="card-footer d-flex bg-light p-1 mb-1">
          <p class="m-0  fs-4 mx-auto text-danger fw-bold ">
            Amount : Rs.{packageData.amount}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackageButton;
