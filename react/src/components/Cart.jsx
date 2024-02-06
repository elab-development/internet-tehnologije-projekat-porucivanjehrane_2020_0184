import React from "react";
import CartItem from "./CartItem";
import ButtonToTop from "./ButtonToTop";

const Cart = ({ cartItems }) => {
  return (
    <div className="all-items">
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
      <ButtonToTop />
    </div>
  );
};
export default Cart;
