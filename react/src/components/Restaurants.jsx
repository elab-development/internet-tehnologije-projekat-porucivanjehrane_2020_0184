import React, { useState, useEffect } from "react";
import OneRestaurant from "./OneRestaurant";
import ReactPaginate from "react-paginate";
import "../style/Pagination.css";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Restaurants() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [roleId, setRoleId] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/restaurants`
        );
        const filtered = response.data?.data.filter(
          (restaurant) =>
            restaurant.name &&
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredRestaurants(filtered);
      } catch (error) {
        console.error("Error while loading restaurants:", error);
      }
    };

    fetchData();

    // Dobijamo role_id korisnika iz session storage-a
    const storedRoleId = sessionStorage.getItem("role_id");
    setRoleId(storedRoleId);
  }, [searchTerm]);

  const deleteRestaurant = async (restaurantId) => {
    try {
      const token = sessionStorage.getItem("auth_token"); // Dobijamo access token
      await axios.delete(
        `http://127.0.0.1:8000/api/restaurants/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Dodajemo access token u zaglavlje
          },
        }
      );

      // Uklanjamo izbrisani restoran iz stanja
      setFilteredRestaurants(
        filteredRestaurants.filter((r) => r.id !== restaurantId)
      );
      Swal.fire({
        icon: "success",
        title: "Restaurant has been deleted!",
      });
      navigate("/categories");
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      Swal.fire({
        icon: "error",
        title: "Error while deleting the restaurant",
      });
    }
  };

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
          <div key={restaurant.id}>
            <Link
              to={`/restaurant/${restaurant.id}/items`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <OneRestaurant restaurant={restaurant} />
            </Link>
            {/* Samo admin moze da obrise restoran */}
            {roleId === "1" && (
              <Button
                text="Delete"
                onClick={() => deleteRestaurant(restaurant.id)}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
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
}

export default Restaurants;
