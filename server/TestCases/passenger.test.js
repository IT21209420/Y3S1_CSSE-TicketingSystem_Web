import request from "supertest";
import app from "../app.js";

let authToken;
let passengerId;

//Hasaranga
describe("POST /passengers", () => {
  //Positive test case
  beforeAll(async () => {
    // Simulate a user login to obtain the authentication token
    const loginResponse = await request(app)
      .post("/api/login") // Replace with your actual login route
      .send({ email: "user@gmail.com", password: "1234567" }); // Provide valid login credentials

    // Store the authentication token obtained from the login response
    authToken = loginResponse.body.jwtToken;
    console.log(authToken);
  }, 30000);
  //Negative test case
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
    expect(response.body.error).toBe("Email is required");
  });

  //Negative test case
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

  //Positive test case
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
  //Positive test case
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
});

//Chamikara
describe("POST /temporyPassengers", () => {
  //Negative test case
  it("should not able to create a tempory passenger without amount", async () => {
    // Define the passenger data you want to send in the request

    const temporyPassengerData = {
      amount: "",
      type: "CASH",
      packageType: "One Day",
    };

    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .post("/api/createTemporyPassenger")
      .send(temporyPassengerData)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`);

    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("amount not recieved");
  });
  //Negative test case
  it("should not able to create a tempory passenger without type", async () => {
    // Define the passenger data you want to send in the request

    const temporyPassengerData = {
      amount: "3000",
      type: "",
      packageType: "One Day",
    };

    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .post("/api/createTemporyPassenger")
      .send(temporyPassengerData)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`);

    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("type not recieved");
  });
  //Negative test case
  it("should not able to create a tempory passenger without packageType", async () => {
    // Define the passenger data you want to send in the request

    const temporyPassengerData = {
      amount: "3000",
      type: "CASH",
      packageType: "",
    };

    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .post("/api/createTemporyPassenger")
      .send(temporyPassengerData)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`);

    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("packageType not recieved");
  });
  //Positive test case
  it("should be able to create a tempory passenger tempory Passenger with all details.", async () => {
    // Define the passenger data you want to send in the request

    const temporyPassengerData = {
      amount: "3000",
      type: "CASH",
      packageType: "One Day",
    };

    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .post("/api/createTemporyPassenger")
      .send(temporyPassengerData)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`);

    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
  });
});

//Pasindu
describe("POST /passengerTransactions", () => {
  //Negative test case
  it("should not able to create a transacion without a valid passengerId", async () => {
    const passengerTransactionsData = {
      amount: "3000",
      type: "CASH",
    };

    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .put("/api/addTransaction/12121")
      .send(passengerTransactionsData)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`);

    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("please enter a valid id");
  });
  //Negative test case
  it("should not able to create a transacion without a amount", async () => {
    const passengerTransactionsData = {
      amount: "",
      type: "CASH",
    };

    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .put(`/api/addTransaction/${passengerId}`)
      .send(passengerTransactionsData)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`);

    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("amount not recieved");
  });
  //Negative test case
  it("should not able to create a transacion without a type", async () => {
    const passengerTransactionsData = {
      amount: "3000",
      type: "",
    };

    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .put(`/api/addTransaction/${passengerId}`)
      .send(passengerTransactionsData)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`);

    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("type not recieved");
  });
  //Positive test case
  it("should be able to create a transacion with all required details", async () => {
    const passengerTransactionsData = {
      amount: "3000",
      type: "One Day",
    };

    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .put(`/api/addTransaction/${passengerId}`)
      .send(passengerTransactionsData)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`);

    console.log(
      "🚀 ~ file: passenger.test.js:264 ~ it ~ passengerId:",
      passengerId
    );
    // Assert the HTTP response status code (400 indicates a bad request)
    console.log(response.body);
    expect(response.status).toBe(200);
  });
});

//Ashen
describe("Get passernger and delete /passenger", () => {
  //Negative test case
  it("should not get all passengers when pageSize is not a number", async () => {
    const response = await request(app)
      .get("/api//getPassengers/fdf/1")
      .set("Authorization", `Bearer ${authToken}`);
    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Page size is not a number");
  });
  //Negative test case
  it("should not get all passengers when pageNumber is not a number", async () => {
    const response = await request(app)
      .get("/api//getPassengers/8/dssd")
      .set("Authorization", `Bearer ${authToken}`);
    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Page number is not a number");
  });
  //Positive test case
  it("should get all passengers when pageNumber and pagesize are numbers", async () => {
    const response = await request(app)
      .get("/api//getPassengers/8/1")
      .set("Authorization", `Bearer ${authToken}`);
    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(200);
  });

  //Posotiive test case
  it("should delete a passenger by its id", async () => {
    const response = await request(app)
      .delete(`/api/deletePassenger/${passengerId}`)
      .set("Authorization", `Bearer ${authToken}`);
    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.statusCode).toEqual(200);
  });
});
