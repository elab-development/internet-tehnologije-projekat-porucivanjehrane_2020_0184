import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/categories`
        );
        console.log(response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error while loading categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>All Categories</h2>
      <ul>
        {categories.map((category) => (
        //   <li key={category.id}>{category.category_name}</li>
        <Link to={`/category/${category.id}/restaurants`} key={category.id}>
        {category.category_name}
      </Link>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
