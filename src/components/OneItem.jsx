import React from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { CgRemoveR } from "react-icons/cg";

const OneItem = ({ item }) => {
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
        <button className="btn">
          <MdAddShoppingCart size="30" />
        </button>
        <button className="btn">
          <CgRemoveR size="30" />
        </button>
      </div>
    </div>
  );
};

export default OneItem;
