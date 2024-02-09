import "./App.css";
import NavBar from "./components/NavBar";
import Restaurants from "./components/Restaurants";
import RestaurantByCategory from "./components/RestaurantsByCategory";
import Items from "./components/Items";
import Contact from "./components/Contact";
import Foot from "./components/Foot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useState } from "react";
import Categories from "./components/Categories";
import MealDBApiExample from "./components/MealDBApiExample";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [items, setItems] = useState(null);
  const [cartNum, setCartNum] = useState(0);

  const onAdd = () => {
    setCartNum(cartNum + 1);
  };

  const onRemove = () => {
    if (cartNum > 0) {
      setCartNum((previousNumber) => previousNumber - 1);
    }
  };

  return (
    <BrowserRouter>
      <NavBar cartNum={cartNum} />
      <Routes>
        <Route path="/restaurants" element={<Restaurants />} />
        <Route
          path="/restaurant/:id/items"
          element={
            <Items
              cartNum={cartNum}
              onAdd={onAdd}
              onRemove={onRemove}
              setCartNum={setCartNum}
            />
          }
        />
        <Route
          path="/category/:id/restaurants"
          element={<RestaurantByCategory />}
        />
        <Route path="/categories" element={<Categories />} />
        <Route
          path="/items"
          element={<Items items={items} onAdd={onAdd} onRemove={onRemove} />}
        />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/meal-db-example" element={<MealDBApiExample />} />
      </Routes>
      <Foot />
    </BrowserRouter>
  );
}

export default App;
