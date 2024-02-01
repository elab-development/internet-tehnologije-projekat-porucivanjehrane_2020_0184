import React from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { CgRemoveR } from "react-icons/cg";

const CartItem = ({ item }) => {
  var total_price = 0;
  return (
    <div className="itemCard">
      <img
        width={250}
        className="itemCard-img-top"
        src={item.image}
        alt="Slika jela"
      />
      <div className="itemCard-body">
        <h3 className="itemCard-title">{item.name}</h3>
        <p className="itemCard-text">{item.meal_description} </p>
        <p className="itemCard-price"> Cena: {item.price}</p>
        <h3> Amount: {item.amount}</h3>
        <h3> Total price: {(total_price += item.price * item.amount)}</h3>
      </div>
    </div>
  );
};

export default CartItem;
