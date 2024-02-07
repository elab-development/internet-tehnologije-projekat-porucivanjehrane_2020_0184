import React from "react";
import OneRestaurant from "./OneRestaurant";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../style/Pagination.css";
import Button from "./Button";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';

// const categories = {
//   azijska: 1,
//   meksicka: 2,
//   srpska: 3,
//   americka: 4
// }

function Restaurants () {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const { id: categoryId } = useParams();
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/category/${categoryId}/restaurants`);
        console.log(response.data.data);
        
        
        const filtered = response.data?.data.filter(
          (restaurant) =>
            restaurant.name &&
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
        setFilteredRestaurants(filtered);
      } catch (error) {
        console.error('Error while loading restaurants for a category:', error);
      }
    };

    fetchData();
  }, [categoryId, searchTerm]);
 
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
          <Link to = {`/items/${restaurant.id}`} key = {restaurant.id} >
          <OneRestaurant restaurant={restaurant} />
        </Link>
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
        previousLabel={<Button text="Previous" />}
        nextLabel={<Button text="Next" />}
      />
    </div>
  );
};

export default Restaurants;
