import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

function NavBar({ cartNum }) {
  return (
    <div className="navBar">
      <Link to="/">Home</Link>
      <Link to="/restaurants">Restaurants</Link>
      <Link to="/items">Items</Link>
      <Link to="/contact">Contact</Link>

      <Link to="/cart" className="cart-items">
        <FaCartShopping style={{ marginLeft: 10 }} />
        <div className="cart-num">{cartNum}</div>
      </Link>
    </div>
  );
}

export default NavBar;
