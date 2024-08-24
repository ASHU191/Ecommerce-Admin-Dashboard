import React, { memo } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../App/features/adminAuthSlice";

const Navbar = ({ toggle, setToggle }) => {

  const dispatch = useDispatch()

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleLogout = () => {
      dispatch(logout())
    }

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link className="navbar-brand ps-3" to="/admin">
        My Admin
      </Link>

      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        to="#!"
        onClick={handleToggle}
      >
        <FaBars /> 
      </button>

      {/* Search from */}
      <div className="d-none d-md-inline-block ms-auto me-0 me-md-3 my-2 my-md-0">
        {/* <form className="form-inline ">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <FaSearch />
            </button>
          </div>
        </form> */}
      </div>

      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            to="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaUser />
          </Link>

          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link className="dropdown-item" to="/admin/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/profile/edit">
                Edit Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
               className="dropdown-item"
               onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Navbar);
