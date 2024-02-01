import React from "react";
import CartItem from "./CartItem";

const Cart = ({ cartItems }) => {
  return (
    <div class="all-items">
      {cartItems.length === 0 ? (
        <div>
          <h1>Your cart is currently empty.</h1>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"></img>
          <br></br>
          <br></br>{" "}
        </div>
      ) : (
        cartItems.map((item) => <CartItem key={item.id} item={item} />)
      )}
    </div>
  );
};
export default Cart;
