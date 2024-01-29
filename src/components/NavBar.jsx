import React from "react";
import { FaCartShopping } from "react-icons/fa6";

function NavBar() {
  return (
    <div className="navBar">
      <a href="/">Home</a>
      <a href="/restaurants">Restaurants</a>
      <a href="/items">Items</a>
      <a href="/categories">Categories</a>
      <a href="/cart" className="cart-items">
        <FaCartShopping style={{ marginLeft: 10 }} />
        {/* <div className="cart-num">{cartNum}</div> */}
      </a>
    </div>
  );
}

export default NavBar;
