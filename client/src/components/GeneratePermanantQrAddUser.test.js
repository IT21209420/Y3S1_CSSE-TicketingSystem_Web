// import GeneratePermanantQrAddUser from "./GeneratePermanantQrAddUser";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { BrowserRouter, MemoryRouter } from "react-router-dom";
// import { AuthContextProvider } from "../context/AuthContext";
// import { ToastContextProvider } from "../context/ToastContext";

// describe("GeneratePermanantQrAddUser Component", () => {
//   // it("renders the form for adding a new user", () => {
//   //   render(
//   //     <MemoryRouter>
//   //       <ToastContextProvider>
//   //         <AuthContextProvider>
//   //           <GeneratePermanantQrAddUser />
//   //         </AuthContextProvider>
//   //       </ToastContextProvider>
//   //     </MemoryRouter>
//   //   );

//   //   // Check if the form elements are present
//   //   expect(screen.getByText("Enter user details")).toBeInTheDocument();
//   //   expect(screen.getByLabelText("Name")).toBeInTheDocument();
//   //   expect(screen.getByLabelText("Email address")).toBeInTheDocument();
//   //   expect(screen.getByLabelText("NIC")).toBeInTheDocument();
//   //   expect(screen.getByLabelText("Contact No")).toBeInTheDocument();
//   //   expect(screen.getByLabelText("Address")).toBeInTheDocument();
//   //   expect(screen.getByText("Submit")).toBeInTheDocument();
//   // });

//   // it("should render form with name, email, NIC, contact no and address fields", () => {
//   //   render(
//   //     <MemoryRouter>
//   //       <ToastContextProvider>
//   //         <AuthContextProvider>
//   //           <GeneratePermanantQrAddUser />
//   //         </AuthContextProvider>
//   //       </ToastContextProvider>
//   //     </MemoryRouter>
//   //   );
//   //   expect(screen.getByLabelText("Name")).toBeInTheDocument();
//   //   expect(screen.getByLabelText("Email address")).toBeInTheDocument();
//   //   expect(screen.getByLabelText("NIC")).toBeInTheDocument();
//   //   expect(screen.getByLabelText("Contact No")).toBeInTheDocument();
//   //   expect(screen.getByLabelText("Address")).toBeInTheDocument();
//   // });

//   // it("should render form with submit button", () => {
//   //   render(
//   //     <MemoryRouter>
//   //       <ToastContextProvider>
//   //         <AuthContextProvider>
//   //           <GeneratePermanantQrAddUser />
//   //         </AuthContextProvider>
//   //       </ToastContextProvider>
//   //     </MemoryRouter>
//   //   );
//   //   const nameInput = screen.getByLabelText("Name");
//   //   const emailInput = screen.getByLabelText("Email address");
//   //   const nicInput = screen.getByLabelText("NIC");
//   //   const contactNoInput = screen.getByLabelText("Contact No");
//   //   const addressInput = screen.getByLabelText("Address");

//   //   // Fill out the form fields
//   //   fireEvent.change(nameInput, { target: { value: "John Doe" } });
//   //   fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
//   //   fireEvent.change(nicInput, { target: { value: "123456789V" } });
//   //   fireEvent.change(contactNoInput, { target: { value: "0712345678" } });
//   //   fireEvent.change(addressInput, { target: { value: "123 Main St" } });

//   //   // Assertions
//   //   expect(nameInput).toHaveValue("John Doe");
//   //   expect(emailInput).toHaveValue("johndoe@example.com");
//   //   expect(nicInput).toHaveValue("123456789V");
//   //   expect(contactNoInput).toHaveValue("0712345678");
//   //   expect(addressInput).toHaveValue("123 Main St");
//   //   // Submit the form
//   // });
// });
