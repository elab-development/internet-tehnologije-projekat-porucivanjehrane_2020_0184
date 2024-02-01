import React from "react";
import OneRestaurant from "./OneRestaurant";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../style/Pagination.css";

const Restaurants = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const allRestaurants = [
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
      {
        id: 4,
        name: "Frans",
        description:
          "Frans je restoran sa specijalitetima francuske kuhinje. Uživajte u izvrsnoj hrani i autentičnoj atmosferi.",
        address: "Bulevar Oslobodjenja 18a",
        contact_phone_number: "+381 11 1111111",
        image:
          "https://frans.rs/wp-content/uploads/2017/05/basta-i-restoran-frans.jpg",
      },
      {
        id: 5,
        name: "Dolly Bell",
        description:
          "Dolly Bell nudi nezaboravna iskustva sa jelima mediteranske kuhinje. Posetite nas i uživajte u vrhunskoj hrani.",
        address: "Bulevar Mihajla Pupina 165b",
        contact_phone_number: "+381 11 2222222",
        image:
          "https://www.restoranibeograd.com/storage/news/interior/770/dolly_bell_beograd.jpg",
      },
      {
        id: 6,
        name: "Dva Jelena",
        description:
          "Restoran Dva Jelena je poznat po tradicionalnim srpskim specijalitetima. Posetite nas i doživite pravu domaću kuhinju.",
        address: "Skadarska 32",
        contact_phone_number: "+381 11 3333333",
        image:
          "https://www.restoranibeograd.com/storage/news/interior/770/restoran_dva_jelena.jpg",
      },
    ];

    const filtered = allRestaurants.filter(
      (restaurant) =>
        restaurant.name &&
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredRestaurants(filtered);
  }, [searchTerm]);

  const pageCount = filteredRestaurants
    ? Math.ceil(filteredRestaurants.length / itemsPerPage)
    : 0;

  const displayRestaurants = () => {
    if (
      !Array.isArray(filteredRestaurants) ||
      filteredRestaurants.length === 0
    ) {
      return <p>No restaurants to display.</p>;
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
      <div>
        {filteredRestaurants.slice(startIndex, endIndex).map((restaurant) => (
          <OneRestaurant key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    );
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search restaurants (name)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: "10px",
          padding: "8px",
          width: "30%",
          display: "block",
          margin: "0 auto",
        }}
      />
      {displayRestaurants()}
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousLabel={<div className="pagination-btn">previous</div>}
        nextLabel={<div className="pagination-btn">next</div>}
      />
    </div>
  );
};

export default Restaurants;
