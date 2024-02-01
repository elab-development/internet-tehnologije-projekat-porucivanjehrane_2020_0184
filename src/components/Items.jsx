import React from "react";
import OneItem from "./OneItem";

const Items = ({ items, onAdd, onRemove }) => {
  return (
    <div className="all-items">
      {items === null
        ? "No items"
        : items.map((it) => (
            <OneItem item={it} key={it.id} onAdd={onAdd} onRemove={onRemove} />
          ))}
    </div>
  );
};

export default Items;
