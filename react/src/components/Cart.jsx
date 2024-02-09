import React from "react";
import ButtonToTop from "./ButtonToTop";
import OneItem from "./OneItem";
import CartItem from "./CartItem";

function Cart({ items, cart, valuta }) {
  return (
    <div className="all-items">
      <h1 style={{ marginLeft: "25px" }}> Your cart:</h1>
      {cart.length === 0 ? (
        <div>
          <h1>Your cart is currently empty.</h1>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"></img>
          <br></br>
          <br></br>{" "}
        </div>
      ) : (
        cart?.map((i) => (
          <CartItem
            item={i}
            key={i.id}
            valuta={valuta}
            onAdd={() => {}}
            inCart={0}
          />
        ))
      )}
      <ButtonToTop />
    </div>
  );
}
export default Cart;
