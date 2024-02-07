import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoIosLogOut } from "react-icons/io";

export default function NavBar({ cartNum }) {
  const navigate = useNavigate();

  const logout = () => {
    window.sessionStorage.removeItem("auth_token");
    window.sessionStorage.removeItem("role_id");
    window.sessionStorage.removeItem("user");
    navigate("/login");
    Swal.fire({
      icon: "success",
      title: "Successfull",
      text: "Operation was successful!",
    });
  };

  const isUserLoggedIn = !!window.sessionStorage.getItem("auth_token");

  return (
    <div className="navBar">
      {!isUserLoggedIn && <Link to="/">Register/Login</Link>}
      <Link to="/categories">Categories</Link>
      <Link to="/restaurants">Restaurants</Link>
      {/* <Link to="/items">Items</Link> */}
      <Link to="/contact">Contact</Link>
      {isUserLoggedIn && (
        <Link to="/cart" className="cart-items">
          <FaCartShopping />
          <div className="cart-num">{cartNum}</div>
        </Link>
      )}
      {isUserLoggedIn && (
        <IoIosLogOut style={{ cursor: "pointer" }} onClick={logout} />
      )}
    </div>
  );
}
