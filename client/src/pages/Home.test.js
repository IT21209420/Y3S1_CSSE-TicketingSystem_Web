import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Home page", () => {
  beforeEach(() => {
    useNavigate.mockClear();
  });

  test("renders admin buttons when user is a stationadmin", () => {
    const user = { role: "stationadmin" };
    render(
      <AuthContext.Provider value={{ user }}>
        <Home />
      </AuthContext.Provider>
    );

    expect(screen.getByText("Generate QR")).toBeInTheDocument();
    expect(screen.getByText("Get QR")).toBeInTheDocument();
    expect(screen.getByText("Tempory QR")).toBeInTheDocument();
  });

  test("renders user buttons when user is a user", () => {
    const user = { role: "user" };
    render(
      <AuthContext.Provider value={{ user }}>
        <Home />
      </AuthContext.Provider>
    );

    expect(screen.getByText("Already Have QR")).toBeInTheDocument();
    expect(screen.getByText("Generate QR")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Top Up")).toBeInTheDocument();
  });

  test("redirects to login page when user is not authenticated", () => {
    const user = null;
    render(
      <AuthContext.Provider value={{ user }}>
        <Home />
      </AuthContext.Provider>
    );

    expect(useNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});