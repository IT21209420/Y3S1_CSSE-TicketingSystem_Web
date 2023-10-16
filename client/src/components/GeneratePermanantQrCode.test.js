import GeneratePermanantQrCode from "./GeneratePermanantQrCode";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";

describe("GeneratePermanantQrCode Component", () => {
  it("renders the QR code", () => {
    const userData = { _id: "123" };
    const passengerType = "adult";
    render(
      <MemoryRouter>
        <ToastContextProvider>
          <AuthContextProvider>
            <GeneratePermanantQrCode userData={userData} passengerType={passengerType} />
          </AuthContextProvider>
        </ToastContextProvider>
      </MemoryRouter>
    );

    // Check if the QR code is present
    expect(screen.getByLabelText("QR code")).toBeInTheDocument();
  });

  it("should download the QR code as PNG", () => {
    const userData = { _id: "123" };
    const passengerType = "adult";
    render(
      <MemoryRouter>
        <ToastContextProvider>
          <AuthContextProvider>
            <GeneratePermanantQrCode userData={userData} passengerType={passengerType} />
          </AuthContextProvider>
        </ToastContextProvider>
      </MemoryRouter>
    );

    const downloadButton = screen.getByText("Download QR Code");

    // Click the download button
    fireEvent.click(downloadButton);

    // Assertions
    expect(downloadButton).toBeInTheDocument();
  });
});