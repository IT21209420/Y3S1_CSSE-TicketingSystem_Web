import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import { PackageButton } from "./PackageButton";

describe("PackageButton Component", () => {
  const packageData = {
    title: "Test Package",
    description: "This is a test package",
    amount: 100,
  };

  it("renders the package button", () => {
    render(
      <ToastContextProvider>
        <AuthContextProvider>
          <PackageButton packageData={packageData} setSelectedPackage={() => {}} />
        </AuthContextProvider>
      </ToastContextProvider>
    );

    // Check if the package details are present
    expect(screen.getByText("Test Package")).toBeInTheDocument();
    expect(screen.getByText("This is a test package")).toBeInTheDocument();
    expect(screen.getByText("Amount : Rs.100.00")).toBeInTheDocument();
  });

  it("calls setSelectedPackage function when clicked", () => {
    const setSelectedPackage = jest.fn();
    render(
      <ToastContextProvider>
        <AuthContextProvider>
          <PackageButton packageData={packageData} setSelectedPackage={setSelectedPackage} />
        </AuthContextProvider>
      </ToastContextProvider>
    );

    // Click the package button
    fireEvent.click(screen.getByText("Test Package"));

    // Check if setSelectedPackage function was called with the correct package data
    expect(setSelectedPackage).toHaveBeenCalledTimes(1);
    expect(setSelectedPackage).toHaveBeenCalledWith(packageData);
  });
});