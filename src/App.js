import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Restaurants from "./components/Restaurants";
import Items from "./components/Items";
import Contact from "./components/Contact";
import Foot from "./components/Foot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/itemsData.json");
      console.log(response.data.items);
      setItems(response.data.items);
    };
    fetchData();
  }, []);

  const [cartNum, setcartNum] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const refreshCart = () => {
    const newItems = items.filter((item) => item.amount > 0);
    setCartItems(newItems);
  };

  const onAdd = (id) => {
    items.map((item) => {
      if (item.id === id) {
        item.amount++;
        const a = cartNum + 1;
        setcartNum(a);
        refreshCart();
        console.log("itemid: " + item.id + " amount: " + item.amount);
      }
    });
  };

  const onRemove = (id) => {
    items.map((item) => {
      if (item.id === id) {
        if (item.amount > 0) {
          item.amount--;
          const a = cartNum - 1;
          setcartNum(a);
          refreshCart();
          console.log("itemid: " + item.id + " amount: " + item.amount);
        } else {
          console.log("Amount is already 0");
        }
      }
    });
  };

  return (
    <BrowserRouter>
      <NavBar cartNum={cartNum} />
      <Routes>
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route
          path="/items"
          element={<Items items={items} onAdd={onAdd} onRemove={onRemove} />}
        />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Foot/>
    </BrowserRouter>
  );
}

export default App;
