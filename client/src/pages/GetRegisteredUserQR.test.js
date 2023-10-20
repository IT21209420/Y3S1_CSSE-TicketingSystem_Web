import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ToastContext } from "../contexts/ToastContext";
import GetRegisteredUserQR from "./GetRegisteredUserQR";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("GetRegisteredUserQR", () => {
  const mockUserData = {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
  };
  const mockToken = "mockToken";

  beforeEach(() => {
    jest.spyOn(window, "fetch");
    window.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockUserData),
    });
    localStorage.setItem("token", mockToken);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  // it("should redirect to login page if user is not authenticated", () => {
  //   const mockNavigate = jest.fn();
  //   useNavigate.mockReturnValue(mockNavigate);
  //   render(
  //     <AuthContext.Provider value={{ user: null }}>
  //       <GetRegisteredUserQR />
  //     </AuthContext.Provider>
  //   );
  //   expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  // });

  // it("should fetch user data and render QR code", async () => {
  //   const mockToast = { error: jest.fn() };
  //   render(
  //     <AuthContext.Provider value={{ user: { id: 1 } }}>
  //       <ToastContext.Provider value={{ toast: mockToast }}>
  //         <GetRegisteredUserQR />
  //       </ToastContext.Provider>
  //     </AuthContext.Provider>
  //   );
  //   await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
  //   expect(window.fetch).toHaveBeenCalledWith(
  //     "http://localhost:9000/api/getPassengerByUserId",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${mockToken}`,
  //       },
  //     }
  //   );
  //   expect(screen.getByText("Loading...")).toBeInTheDocument();
  //   // await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());
  //   expect(screen.getByTestId("qr-code")).toBeInTheDocument();
  // });

  // it("should show error toast if fetch fails", async () => {
  //   const mockToast = { error: jest.fn() };
  //   window.fetch.mockRejectedValueOnce(new Error("Fetch failed"));
  //   render(
  //     <AuthContext.Provider value={{ user: { id: 1 } }}>
  //       <ToastContext.Provider value={{ toast: mockToast }}>
  //         <GetRegisteredUserQR />
  //       </ToastContext.Provider>
  //     </AuthContext.Provider>
  //   );
  //   await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
  //   expect(mockToast.error).toHaveBeenCalledWith("Fetch failed");
  // });

  // it("should show 'No Qr Found !!!' message if user data is null", async () => {
  //   const mockToast = { error: jest.fn() };
  //   window.fetch.mockResolvedValueOnce({
  //     json: jest.fn().mockResolvedValue(null),
  //   });
  //   render(
  //     <AuthContext.Provider value={{ user: { id: 1 } }}>
  //       <ToastContext.Provider value={{ toast: mockToast }}>
  //         <GetRegisteredUserQR />
  //       </ToastContext.Provider>
  //     </AuthContext.Provider>
  //   );
  //   await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
  //   expect(screen.getByText("No Qr Found !!!")).toBeInTheDocument();
  // });

  // it("should navigate to home page when back button is clicked", () => {
  //   const mockNavigate = jest.fn();
  //   useNavigate.mockReturnValue(mockNavigate);
  //   render(
  //     <AuthContext.Provider value={{ user: { id: 1 } }}>
  //       <GetRegisteredUserQR />
  //     </AuthContext.Provider>
  //   );
  //   userEvent.click(screen.getByRole("button"));
  //   expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
  // });
});