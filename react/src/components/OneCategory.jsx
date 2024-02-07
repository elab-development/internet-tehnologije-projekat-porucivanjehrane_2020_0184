import React from "react";

const OneCategory = ({ category }) => {
  return (
    <div className="categoriesCard">
      <img
        width={600}
        height={250}
        src={category.image}
        alt="Slika kategorije"
      />
    </div>
  );
};

export default OneCategory;
