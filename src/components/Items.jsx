import React from "react";
import OneItem from "./OneItem";

const Items = ({ items }) => {
  const name = "New Item Name";
  const description =
    "New items description that we got from Item component using props.";
  return (
    <div className="all-products">
      <OneItem item={items[0]} />
      <OneItem item={items[0]} />
      <OneItem item={items[0]} />
    </div>
  );
};

export default Items;
