import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/MealDBApiExample.css';

const MealDBApiExample = () => {
  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
        setMealData(response.data.meals); // Postavljanje podataka u stanje komponente
      } catch (error) {
        console.error('Error fetching data from TheMealDB API:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="meal-container">
      <h2>Meals with Chicken - Our recommendations</h2>
      <div className="meal-list">
        {mealData.map(meal => (
          <div key={meal.idMeal} className="meal-item">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
            <div className="meal-details">
              <h3 className="meal-name">{meal.strMeal}</h3>
              <p className="meal-category">Category: {meal.strCategory}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealDBApiExample;
