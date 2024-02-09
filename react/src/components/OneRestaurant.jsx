import React from "react";

const OneRestaurant = ({ restaurant }) => {
  return (
    <div className="restaurantCard">
      <img
        width={600}
        height={250}
        src={restaurant.image}
        alt="Restaurant image"
      />
      <div className="restaurantCard-body">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.description} </p>
        <p>
          <b>Address: </b>
          {restaurant.address}
        </p>
        <p>
          <b>Contact phone:</b> {restaurant.contact_phone_number}
        </p>
        <i>
          <p>Food category: {restaurant.category} </p>{" "}
        </i>
      </div>
    </div>
  );
};

export default OneRestaurant;
