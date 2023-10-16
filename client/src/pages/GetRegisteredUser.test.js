import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import { CommonContextProvider } from "../context/CommonContext";
import GetRegisteredUser from "./GetRegisteredUser";

describe("GetRegisteredUser Component", () => {
  it("renders the component", () => {
    render(
      <MemoryRouter>
        <ToastContextProvider>
          <AuthContextProvider>
            <CommonContextProvider>
              <GetRegisteredUser />
            </CommonContextProvider>
          </AuthContextProvider>
        </ToastContextProvider>
      </MemoryRouter>
    );

    // Check if the component elements are present
    expect(screen.getByText("Passenger Details")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Add Passenger")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("NIC")).toBeInTheDocument();
    expect(screen.getByText("Contact No")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Account Balance")).toBeInTheDocument();
    expect(screen.getByText("New Account Balance")).toBeInTheDocument();
    expect(screen.getByText("Amount Paid")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("should search for passengers", async () => {
    const mockData = [
      {
        _id: "1",
        name: "John Doe",
        email: "johndoe@example.com",
        nic: "123456789V",
        contactNo: "0712345678",
        address: "123 Main St",
        accBalance: 100,
        newAccBalance: 0,
        amountPaid: 0,
        type: "",
        userId: "",
      },
      {
        _id: "2",
        name: "Jane Doe",
        email: "janedoe@example.com",
        nic: "987654321V",
        contactNo: "0776543210",
        address: "456 Elm St",
        accBalance: 50,
        newAccBalance: 0,
        amountPaid: 0,
        type: "",
        userId: "",
      },
    ];

    const searchPassengersMock = jest.fn(() => {
      return {
        result: mockData,
      };
    });

    render(
      <MemoryRouter>
        <ToastContextProvider>
          <AuthContextProvider>
            <CommonContextProvider
              value={{
                searchPassengers: searchPassengersMock,
                isSearchPressed: true,
              }}
            >
              <GetRegisteredUser />
            </CommonContextProvider>
          </AuthContextProvider>
        </ToastContextProvider>
      </MemoryRouter>
    );

    const searchInput = screen.getByLabelText("Search by name or email");
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "John" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(searchPassengersMock).toHaveBeenCalledTimes(1);
      //   expect(screen.getByText("John Doe")).toBeInTheDocument();
      //   expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
      //   expect(screen.getByText("123456789V")).toBeInTheDocument();
      //   expect(screen.getByText("0712345678")).toBeInTheDocument();
      //   expect(screen.getByText("123 Main St")).toBeInTheDocument();
      //   expect(screen.getByText("100")).toBeInTheDocument();
    });
  });
});
