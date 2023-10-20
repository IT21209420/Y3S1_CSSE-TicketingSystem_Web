import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import HomeButton from "./HomeButton";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("HomeButton", () => {
  const mockNavigate = jest.fn();
  const mockUser = { username: "testuser" };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it("should render the button with the correct text", () => {
  //   render(<HomeButton text="Generate QR" />);
  //   const button = screen.getByRole("button");
  //   expect(button).toHaveTextContent("Generate QR");
  // });

  // it("should navigate to the correct path when clicked", () => {
  //   render(<HomeButton text="Generate QR" />);
  //   const button = screen.getByRole("button");
  //   userEvent.click(button);
  //   expect(mockNavigate).toHaveBeenCalledWith("/generateqr", { replace: true });
  // });

  // it("should not navigate if user is not logged in", () => {
  //   render(<HomeButton text="Generate QR" />);
  //   expect(mockNavigate).not.toHaveBeenCalled();
  // });

  // it("should navigate if user is logged in", () => {
  //   render(
  //     <AuthContext.Provider value={{ user: mockUser }}>
  //       <HomeButton text="Generate QR" />
  //     </AuthContext.Provider>
  //   );
  //   const button = screen.getByRole("button");
  //   userEvent.click(button);
  //   expect(mockNavigate).toHaveBeenCalledWith("/generateqr", { replace: true });
  // });
});