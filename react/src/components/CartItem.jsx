import React from "react";

const CartItem = ({ item, valuta }) => {
  var total_price = 0;
  return (
    <div className="itemCard">
      <img
        width={400}
        height={300}
        className="itemCard-img-top"
        src={item.image}
        alt="Slika jela"
      />
      <div className="itemCard-body">
        <h3 className="itemCard-title">{item.name}</h3>
        <p className="itemCard-text">
          {item.meal_description} <br></br>
          <b>Restaurant: {item.restaurant}</b>
        </p>
        <p className="itemCard-price">
          {" "}
          Price: {item.price} {valuta}
        </p>
        <h3> Amount: {item.amount}</h3>
        <h3>
          {" "}
          Total price: {(total_price += item.price * item.amount)} {valuta}
        </h3>
      </div>
    </div>
  );
};

export default CartItem;
