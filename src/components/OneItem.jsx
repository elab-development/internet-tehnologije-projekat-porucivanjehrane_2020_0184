import React from "react";

const OneItem = ({ item }) => {
  return (
    <div className="card" style={{ margin: 10, borderStyle: "dashed" }}>
      <img
        className="card-img-top"
        src="https://picsum.photos/200"
        alt="Slika jela"
      />
      <div className="card-body">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-text">{item.meal_description} </p>
        <a className="btn">+</a>
        <a className="btn">-</a>
      </div>
    </div>
  );
};

export default OneItem;
