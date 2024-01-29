import React from "react";
import OneItem from "./OneItem";
const items = [
  {
    id: 1,
    name: "Mešano meso",
    meal_description:
      "Ćevapi, leskovački uštipak, pileći file, dimljena vešalica, kobasica, pomfrit, crni luk /450g",
    price: "950.00 RSD",
    image:
      "https://www.smartkurir.com/wp-content/uploads/2022/09/rostilj-za-4.6-osoba.jpg",
    category: "rostilj",
  },
  {
    id: 2,
    name: "Karbonara",
    meal_description:
      "Slanina, pavlaka, jaje, ekstradevičansko maslinovo ulje, parmezan",
    price: "650.00 RSD",
    image:
      "https://rucakza200dinara.com/wp-content/uploads/2018/12/IMG_20181111_110351_045.jpg",
    category: "pasta",
  },
  {
    id: 3,
    name: "Leskovački uštipci",
    meal_description:
      "kackavalj, slanina, crni luk, beli luk, sunka, tucana paprika, pomfrit",
    price: "700.00 RSD",
    image:
      "https://www.salas011.rs/wp-content/uploads/2018/02/web-leskova%C4%8Dki-u%C5%A1tipci-Sala%C5%A1011-dostava-hrane-1.jpg",
    category: "rostilj",
  },
];
const Items = () => {
  const name = "New Item Name";
  const description =
    "New items description that we got from Item component using props.";
  return (
    <div className="all-items">
      <OneItem item={items[0]} />
      <OneItem item={items[1]} />
      <OneItem item={items[2]} />
    </div>
  );
};

export default Items;
