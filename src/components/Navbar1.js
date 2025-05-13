import React from "react"
import { Outlet, NavLink } from "react-router-dom";
import "../css/Navbar1.css";
import logo1 from "../assets/logo1b.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";

function Header(props) {
  const { isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   setLoggedIn(!!token);
  // }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="navb-logo">
            <img src={logo1} alt="Logo" />
          </div>

          <div className="navb-items nav-items d-none d-xl-flex">
            <NavLink className="item" to="/">Home</NavLink>
            <NavLink className="item" to="/products">Products</NavLink>
            <NavLink className="item" to="/contact">Contact</NavLink>
            <NavLink className="item" to="/about">About</NavLink>
            <NavLink className="item" to="/userorder">MyOrders</NavLink>

            <div className="item">
              <NavLink to="/cart">
                <i className="fas fa-shopping-cart" />
                <span className="cart-length">
                  {props.cartItems.length === 0 ? "" : props.cartItems.length}
                </span>
              </NavLink>
            </div>

            <div className="item">
              {isAuthenticated ? (
                <div className="user-dropdown-wrapper">
                  <i
                    className="fas fa-user-circle fa-lg"
                    style={{ fontSize: "1.8rem", cursor: "pointer" }}
                    onClick={toggleDropdown}
                  />
                  {showDropdown && (
                    <div className="dropdown-menu-user">
                      {/* <button onClick={() => navigate("/myorders")}>My Orders</button> */}
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to="/login">
                  <i className="fas fa-sign-in-alt fa-lg" style={{ fontSize: "1.5rem" }} />
                </NavLink>
              )}
            </div>
          </div>
          <div className="mobile-toggler d-xl-none">
        <a href="#" data-bs-toggle="modal" data-bs-target="#navbModal">
          <i className="fa fa-solid fa-bars fontbars"></i>
        </a>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="navbModal"
        tabIndex="-1"
        aria-labelledby="navbModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <img src={logo1} alt="Logo" style={{ height: "40px" }} />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">

              <div className="modal-line">
                <i className="fa fa-home" /> <NavLink to="/">Home</NavLink>
              </div>
              <div className="modal-line">
                <i className="fa-solid fa-droplet" /> <NavLink to="/products">Products</NavLink>
              </div>
              <div className="modal-line">
                <i className="fa-solid fa-phone" /> <NavLink to="/contact">Contact</NavLink>
              </div>
              <div className="modal-line">
                <i className="fa-solid fa-circle-info" /> <NavLink to="/about">About</NavLink>
              </div>
              <div className="modal-line">
                <i className="fas fa-shopping-cart" /> <NavLink to="/cart">Cart</NavLink>
              </div>
              <div className="modal-line">
                <i className="fa-solid fa-bag-shopping" /> <NavLink to="/userorder">MyOrder</NavLink>
              </div>

              <div className="modal-line">
                {isAuthenticated ? (
                  <div className="user-dropdown-wrapper">
                    <i
                      className="fas fa-user-circle fa-lg"
                      style={{ fontSize: "1.8rem", cursor: "pointer" }}
                      onClick={toggleDropdown}
                    />Profile
                    {showDropdown && (
                      <div className="dropdown-menu-user">
                        {/* <button onClick={() => navigate("/myorders")}>My Orders</button> */}
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink to="/login">
                    <i
                      className="fas fa-sign-in-alt fa-lg"
                      style={{ fontSize: "1.5rem" }}
                    />
                  </NavLink>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
      </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
