import Login from "./Login";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";

describe("Login Component", () => {
  it("renders the login form", () => {
    render(
      <MemoryRouter>
        <ToastContextProvider>
          <AuthContextProvider>
            <Login />
          </AuthContextProvider>
        </ToastContextProvider>
      </MemoryRouter>
    );

    // Check if the form elements are present
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Don't have an account ?")).toBeInTheDocument();
  });

  it("should render login form with email and password fields", () => {
    render(
      <MemoryRouter>
        <ToastContextProvider>
          <AuthContextProvider>
            <Login />
          </AuthContextProvider>
        </ToastContextProvider>
      </MemoryRouter>
    );
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("should render login form with login button", () => {
    render(
      <MemoryRouter>
        <ToastContextProvider>
          <AuthContextProvider>
            <Login />
          </AuthContextProvider>
        </ToastContextProvider>
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");

    // Fill out the form fields
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Assertions
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
    // Submit the form
  });
});
