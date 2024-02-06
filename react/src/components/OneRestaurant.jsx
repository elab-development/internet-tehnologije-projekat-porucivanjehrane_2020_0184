import React from "react";
const OneRestaurant = ({ restaurant }) => {
  return (
    <div className="restaurantCard">
      <img
        width={600}
        height={250}
        src={restaurant.image}
        alt="Slika restorana"
      />
      <div className="restaurantCard-body">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.description} </p>
        <p>
          <b>Adresa: </b>
          {restaurant.address}
        </p>
        <p>
          <b>Kontakt telefon:</b> {restaurant.contact_phone_number}
        </p>
      </div>
    </div>
  );
};

export default OneRestaurant;
