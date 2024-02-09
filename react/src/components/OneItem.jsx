import React from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { CgRemoveR } from "react-icons/cg";

function OneItem({ item, onAdd, onRemove, inCart, valuta }) {
  const role = window.sessionStorage.getItem("role_id");

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
          <b>Restoran: {item.restaurant}</b>
        </p>
        <p className="itemCard-price">
          {" "}
          Cena: {item.price} {valuta}
        </p>
        {role == "2" && (
          <div>
            <button className="btn" onClick={onAdd}>
              <MdAddShoppingCart size="30" />
            </button>
            <button className="btn" onClick={onRemove}>
              <CgRemoveR size="30" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OneItem;
