import React from "react";
import ButtonToTop from "./ButtonToTop";
import OneItem from "./OneItem";

function Cart({ items, cart }) {
  return (
    <div className="all-items">
      {cart.length === 0 ? (
        <div>
          <h1>Your cart is currently empty.</h1>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"></img>
          <br></br>
          <br></br>{" "}
        </div>
      ) : (
        cart?.map((i) => (
          <OneItem item={i} key={i.id} onAdd={() => {}} inCart={0} />
        ))
      )}
      <ButtonToTop />
    </div>
  );
}
export default Cart;
