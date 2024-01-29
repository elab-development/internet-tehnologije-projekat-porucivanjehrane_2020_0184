import React from "react";
import OneRestaurant from "./OneRestaurant";
const restaurants = [
  {
    id: 1,
    name: "Restoran Sindjelic",
    description:
      "Restoran sa dugogodisnjom tradicijom. Mozete dobiti da jedete sve sto zamislite.Hrana je veoma ukusna. Prijatno mesto sa dobrom muzikom uzivo u vecernjim satima. Osoblje je savrseno, pazljivo i ljubazno.",
    address: "Vojislava Ilica 86, Beograd 11050",
    contact_phone_number: "+381 11 3087067",
    image:
      "https://www.restoransindjelic.com/wp-content/uploads/2022/02/AMT_2196-Copy.jpg",
  },
  {
    id: 2,
    name: "Restoran Lider",
    description:
      "Uživajte u autentičnim ukusima tradicionalnih jela pripremljenih po starim receptima. Naša udobna i prijateljska atmosfera stvara mesto gde se svaki zalogaj pretvara u toplinu i sećanje. Pridružite nam se i otkrijte svet udobnosti i ukusa u Lideru.",
    address: "Ustanička 189, Beograd 11050",
    contact_phone_number: "+381 11 2881851",
    image:
      "https://img.restaurantguru.com/rd1a-Restoran-Lider-interior-2022-07.jpg",
  },
  {
    id: 3,
    name: "Agi Pasta Away",
    description:
      "Agi Pasta Away je koncept brze ulične hrane zasnovan na pripremi tradicionalnih italijanskih pasti i soseva. Mi pastu doživljavamo kao umetnost i tako se prema njoj i ophodimo. Shvatili smo kao izazov da Beograđanima, a zatim i Novosađanima, Banjalučanima, ponudimo najkvalitetniju i najukusniju italijansku pastu.",
    address: "Njegoševa 47, Beograd ",
    contact_phone_number: "+ 381 11 317852",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/05/39/57/22/agi-pasta-away.jpg",
  },
];
const Restaurants = () => {
  return (
    <div className="all-restaurants">
      <OneRestaurant restaurant={restaurants[0]} />
      <OneRestaurant restaurant={restaurants[1]} />
      <OneRestaurant restaurant={restaurants[2]} />
    </div>
  );
};

export default Restaurants;
