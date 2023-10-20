import request from "supertest";
import app from "../app.js";
import Passenger from "../models/Passenger.js";

let authToken;
let passengerId;
describe("POST /passengers", () => {
  beforeAll(async () => {
    // Simulate a user login to obtain the authentication token
    const loginResponse = await request(app)
      .post("/api/login") // Replace with your actual login route
      .send({ email: "user@gmail.com", password: "1234567" }); // Provide valid login credentials

    // Store the authentication token obtained from the login response
    authToken = loginResponse.body.jwtToken;
    console.log(authToken);
  }, 30000);

  it("should not able to create a  without email", async () => {
    // Define the passenger data you want to send in the request
    const passengerData = {
      name: "Jhon Doe",
      email: "",
      nic: "123456789V",
      contactNo: "0712345678",
      address: "123 Main St, Colombo",
      accBalance: 1000,
      type: "CASH",
    };

    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .post("/api/createPassenger")
      .send(passengerData)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`);
    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);
    // Optionally, you can further assert the response body or structure
    // For example, you can check if the response contains an error message indicating that "Email is required"
    expect(response.body.error).toBe("Email is required");
  });
});

it("should not able to create a  without name", async () => {
  const passengerData = {
    name: "",
    email: "test@gmail.com",
    nic: "123456789V",
    contactNo: "0712345678",
    address: "123 Main St, Colombo",
    accBalance: 1000,
    type: "CASH",
  };

  // Make a POST request to the "create passenger" endpoint
  const response = await request(app)
    .post("/api/createPassenger")
    .send(passengerData)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${authToken}`);
  // Assert the HTTP response status code (400 indicates a bad request)
  expect(response.statusCode).toEqual(400);
  expect(response.body.error).toBe("Name is required");
});

it("should create a new permenant passenger with all required fields ", async () => {
  const passengerData = {
    name: "Jhon Doe",
    email: "test@gmail.com",
    nic: "123456789V",
    contactNo: "0712345678",
    address: "123 Main St, Colombo",
    accBalance: 1000,
    type: "CASH",
  };

  // Make a POST request to the "create passenger" endpoint
  const response = await request(app)
    .post("/api/createPassenger")
    .send(passengerData)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${authToken}`);
  // Assert the HTTP response status code (400 indicates a bad request)
  expect(response.statusCode).toEqual(201);
  expect(response.body).toHaveProperty("_id");
  passengerId = response.body._id;
});

it("should update an existing permanent passenger with valid fields", async () => {
  const passengerData = {
    name: "Jhon Doe siva",
    email: "test@gmail.com",
    nic: "123456789V",
    contactNo: "0712345678",
    address: "123 Main St, Colombo",
    accBalance: 1000,
    type: "CASH",
  };
  const response = await request(app)
    .put(`/api/updatePassenger/${passengerId}`)
    .send(passengerData)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${authToken}`);
    
  expect(response.body.result.name).toBe("Jhon Doe siva");
});

it("should delete a passenger by its id", async () => {
  const response = await request(app)
    .delete(`/api/deletePassenger/${passengerId}`)
    .set("Authorization", `Bearer ${authToken}`);
  // Assert the HTTP response status code (400 indicates a bad request)
  expect(response.statusCode).toEqual(200);
});

//   it("should add a transaction to an existing permanent passenger with a valid amount and type", async () => {
//     const passenger = await Passenger.findOne({ email: "johndoe@example.com" });
//     const res = await request(app)
//       .post(`/passengers/${passenger._id}/transactions`)
//       .send({
//         amount: 500,
//         type: "Credit",
//       });
//     expect(res.statusCode).toEqual(201);
//     expect(res.body.transactions).toHaveLength(2);
//   });

//   it("should not create a new permanent passenger with a missing required field", async () => {
//     const res = await request(app).post("/passengers").send({
//       passengerType: "Permanent",
//       name: "John Doe",
//       email: "johndoe@example.com",
//       NIC: "123456789V",
//       contactNumber: "0712345678",
//       accountBalance: 1000,
//     });
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toHaveProperty("error");
//   });

//   it("should not create a new permanent passenger with an email or NIC that already exists in the database", async () => {
//     const res = await request(app).post("/passengers").send({
//       passengerType: "Permanent",
//       name: "Jane Doe",
//       email: "johndoe@example.com",
//       NIC: "123456789V",
//       contactNumber: "0777777777",
//       address: "456 Main St, Colombo",
//       accountBalance: 500,
//     });
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toHaveProperty("error");
//   });

//   it("should not create a new temporary passenger with a missing required field", async () => {
//     const res = await request(app).post("/passengers").send({
//       passengerType: "Temporary",
//       packageType: "One Day",
//     });
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toHaveProperty("error");
//   });

//   it("should not update an existing permanent passenger with an invalid NIC or email", async () => {
//     const passenger = await Passenger.findOne({ email: "johndoe@example.com" });
//     const res = await request(app).put(`/passengers/${passenger._id}`).send({
//       email: "janedoe@example.com",
//     });
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toHaveProperty("error");
//   });

//   it("should not add a transaction to an existing permanent passenger with an invalid amount or type", async () => {
//     const passenger = await Passenger.findOne({ email: "johndoe@example.com" });
//     const res = await request(app)
//       .post(`/passengers/${passenger._id}/transactions`)
//       .send({
//         amount: -500,
//         type: "Invalid",
//       });
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toHaveProperty("error");
//   });
