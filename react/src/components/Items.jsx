import React from "react";
import OneItem from "./OneItem";
import ButtonToTop from "./ButtonToTop";

const Items = ({ items, onAdd, onRemove }) => {
  return (
    <div className="all-items">
      {items === null
        ? "No items"
        : items.map((it) => (
            <OneItem item={it} key={it.id} onAdd={onAdd} onRemove={onRemove} />
          ))}
      <ButtonToTop />
    </div>
  );
};

export default Items;
