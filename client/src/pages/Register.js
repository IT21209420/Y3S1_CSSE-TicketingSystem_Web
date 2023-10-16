import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ToastContext from "../context/ToastContext";
import AuthContext from "../context/AuthContext";

/**
 * React functional component that renders a registration form.
 * @returns {JSX.Element} JSX element representing the registration form.
 */
const Register = () => {
  /**
   * Toast context object used to display toast messages.
   * @type {Object}
   * @property {Function} toast - Function used to display toast messages.
   */
  const { toast } = useContext(ToastContext);

  /**
   * Authentication context object used to register a user.
   * @type {Object}
   * @property {Function} registerUser - Function used to register a user.
   */
  const { registerUser } = useContext(AuthContext);

  /**
   * State object that holds the user's registration credentials.
   * @type {Object}
   * @property {string} email - User's email address.
   * @property {string} password - User's password.
   * @property {string} confirmPassword - User's password confirmation.
   */
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  /**
   * Event handler function that updates the state object when the user types in the input fields.
   * @param {Object} event - The event object.
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  /**
   * Event handler function that submits the registration form.
   * @param {Object} event - The event object.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("Please enter all the required fields!");
      return;
    }

    //check if the password and confirm password match
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("password do not match");
      return;
    }
    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };

  return (
    <div >
      <div className="w-50  mx-auto mt-5 bg-light-subtle p-4 rounded shadow">
        <h3>Create your account</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputEmail" className="form-label mt-4">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              aria-describedby="emailHelp"
              placeholder="peter@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput" className="form-label mt-4">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPasswordInput" className="form-label mt-4">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPasswordInput"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleInputChange}
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn btn-primary my-3">
            Register
          </button>
          <p>
            Already have an account ?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
