import { render, screen, fireEvent } from "@testing-library/react";
import GeneratePermanantQrAddPayment from "./GeneratePermanantQrAddPayment";
import { ToastContextProvider } from "../context/ToastContext";
import { AuthContextProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

describe("GeneratePermanantQrAddPayment Component", () => {
  //   it("renders the payment form", () => {
  //     render(<GeneratePermanantQrAddPayment />);
  //     expect(screen.getByText("Add Payment")).toBeInTheDocument();
  //     expect(screen.getByLabelText("Payment")).toBeInTheDocument();
  //     expect(screen.getByLabelText("Select Payment Type")).toBeInTheDocument();
  //     expect(screen.getByPlaceholderText("Enter Payment")).toBeInTheDocument();
  //     expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  //   });

  it("should update the payment input value when typed in", () => {
    render(
      <MemoryRouter>
        <ToastContextProvider>
          <AuthContextProvider>
            <GeneratePermanantQrAddPayment
              userData={{
                name: "",
                email: "",
                nic: "",
                contactNo: "",
                address: "",
                accBalance: "200",
                type: "",
                created: false,
              }}
              accBalanceErrors={{}}
              setUserData={() => {}}
            />
          </AuthContextProvider>
        </ToastContextProvider>
      </MemoryRouter>
    );
    const paymentInput = screen.getByLabelText("Payment");
    fireEvent.change(paymentInput, { target: { value: "200" } });
    expect(paymentInput).toHaveValue("200");
  });

  it("should update the payment type value when selected", () => {
    render(
      <MemoryRouter>
        <ToastContextProvider>
          <AuthContextProvider>
            <GeneratePermanantQrAddPayment
              userData={{ accBalance: "200" }}
              accBalanceErrors={{}}
              setUserData={() => {}}
            />
          </AuthContextProvider>
        </ToastContextProvider>
      </MemoryRouter>
    );
    const paymentTypeSelect = screen.getByLabelText("Select Payment Type");
    fireEvent.change(paymentTypeSelect, { target: { value: "CASH" } });
    expect(paymentTypeSelect).toHaveValue("CASH");
  });
});
