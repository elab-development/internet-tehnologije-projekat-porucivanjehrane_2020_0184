import React from "react";

const OneCategory = ({ category }) => {
  return (
    <div className="categoriesCard">
      <img
        width={600}
        height={250}
        src={category.image}
        alt="Category image"
      />
    </div>
  );
};

export default OneCategory;
