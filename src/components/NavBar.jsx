import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../images/logout.png";
import axios from "axios";
import Swal from "sweetalert2";

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
      <div className="menu">
        <span>
          {!isUserLoggedIn &&
          <Link to="/">Register</Link>
          }
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/items">Items</Link>
          <Link to="/contact">Contact</Link>

          <Link to="/cart" className="cart-items">
            <FaCartShopping style={{ marginLeft: 10 }} />
            <div className="cart-num">{cartNum}</div>
          </Link>
        </span>
      </div>
      {isUserLoggedIn && (
        <div className="logout">
          <span className="cursor-pointer" onClick={logout}>
            <img width={30} src={Logout} alt="Logout" />
          </span>
        </div>
      )}
    </div>
  );
}
