import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import CommonContext from "../context/CommonContext";
import "./NavBar.css";

/**
 * Navbar component that displays a navigation bar with links based on user role
 * @param {Object} props - Component props
 * @param {string} props.title - Title to display in the navigation bar
 * @returns {JSX.Element} - Rendered component
 */
const Navbar = ({ title = "Bus Ticketing System" }) => {
  // Context hooks
  const { toast } = useContext(ToastContext);
  const { user, setUser } = useContext(AuthContext);
  const { setData, isSearchPressed, setIsSearchPressed } =
    useContext(CommonContext);

  // Navigation hooks
  const navigate = useNavigate();
  const location = useLocation();

  // State hooks
  const [currentPage, setCurrentPage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  // Update date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ref to the sidebar element
  const sidebarRef = useRef(null);

  /**
   * Toggles the visibility of the sidebar
   */
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  /**
   * Sets the showSidebar state to true when mouse enters the sidebar
   */
  const handleMouseEnter = () => {
    setShowSidebar(true);
  };

  /**
   * Sets the showSidebar state to false when mouse leaves the sidebar
   */
  const handleMouseLeave = () => {
    setShowSidebar(false);
  };

  // Update current page based on location pathname
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {/* Button to toggle the sidebar */}
      <button
        type="button"
        className="btn btn-secondary toggle-btn fs-6"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`sidenav ${showSidebar ? "open" : ""} `}
        ref={sidebarRef} // set the ref to the sidebar element
        onMouseEnter={handleMouseEnter} // handle mouse enter event
        onMouseLeave={handleMouseLeave} // handle mouse leave event
      >
        <ul className="navbar-nav">
          {/* Links for station admin */}
          {user && user.role === "stationadmin" && (
            <>
              <li className="nav-item">
                <Link to="/generateqr" role="button" className="nav-link">
                  Generate QR
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/getregistereduser"
                  role="button"
                  className="nav-link"
                >
                  Find User
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/temporyQr" role="button" className="nav-link">
                  Tempory QR
                </Link>
              </li>
            </>
          )}

          {/* Links for regular user */}
          {user && user.role === "user" && (
            <>
              <li className="nav-item">
                <Link
                  to="/getregistereduserqr"
                  role="button"
                  className="nav-link"
                >
                  Already Have QR
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/generateqr" role="button" className="nav-link">
                  Generate QR
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/userTransactions" role="button" className="nav-link">
                  Transactions
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/topUpAccount" role="button" className="nav-link">
                  Top Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Main navigation bar */}
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          {/* Title */}
          <Link to="./" style={{ textDecoration: "none", marginLeft: "70px" }}>
            <a className="navbar-brand">{title}</a>
          </Link>

          {/* Hamburger menu */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav ms-auto">
              {/* Search bar for station admin */}
              {user ? (
                <>
                  {currentPage === "/getregistereduser" && (
                    <li className="me-5">
                      <form className="d-flex">
                        <input
                          className="form-control me-sm-2"
                          type="search"
                          placeholder="Search by NIC"
                          onChange={(e) => {
                            setData(e.target.value);
                          }}
                        />
                        <button
                          className="btn btn-secondary rounded my-2 my-sm-0"
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault();

                            setIsSearchPressed(!isSearchPressed);
                          }}
                        >
                          Search
                        </button>
                      </form>
                    </li>
                  )}
                  <li
                    className="nav-item"
                    onClick={() => {
                      setUser(null);
                      localStorage.clear();
                      toast.success("Logged out successfully!");
                      navigate("/login", { replace: true });
                    }}
                  >
                    <button type="button" class="btn btn-danger">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="./login" style={{ textDecoration: "none" }}>
                      <a className="nav-link">Login</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="./register" style={{ textDecoration: "none" }}>
                      <a className="nav-link">Register</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
