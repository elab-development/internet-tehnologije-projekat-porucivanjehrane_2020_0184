import React, { useEffect, useState } from "react";
import OneItem from "./OneItem";
import axios from "axios";
import ButtonToTop from "./ButtonToTop";
import { useParams } from "react-router-dom";
import useScrollToTop from "./useScrollToTop";
import Cart from "./Cart";

function Items({ cartNum, setCartNum }) {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const { id: restaurantId } = useParams();

  useScrollToTop();

  const onAdd = (item) => {
    setCartNum((previousNumber) => previousNumber + 1);
    setCart([...cart, item]);
  };

  const onRemove = (item) => {
    if (cartNum > 0) {
      setCartNum((previousNumber) => previousNumber - 1);
    }

    let array = cart.filter((it) => it.id != item.id);
    console.log(array);
    setCart(array);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/restaurant/${restaurantId}/items`
        );
        console.log(response.data.data);
        setItems(response.data.data);
      } catch (error) {
        console.error("Error while loading items for a restaurant:", error);
      }
    };

    fetchData();
  }, [restaurantId]);

  return (
    <div className="all-items">
      {items?.map((i) => (
        <OneItem
          item={i}
          key={i.id}
          onAdd={onAdd}
          onRemove={onRemove}
          inCart={1}
        />
      ))}
      <ButtonToTop />
      <Cart cartNum={cartNum} cart={cart} />
    </div>
  );
}

export default Items;
