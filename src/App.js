import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Restaurants from "./components/Restaurants";
import Items from "./components/Items";
import Category from "./components/Categories";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const items = [
    {
      id: 1,
      name: "Mesano meso",
      meal_description:
        "cevapcici, leskovacki ustipak, pileci file, dimljena vesalica, kobasica, pomfrit, crni luk /450g",
      price: "850.00 RSD",
      category: "rostilj",
      amount: 0,
    },
  ];

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* <Route
          path="/"
          element={
          }
        /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/restaurants" elements={<Restaurants />} />
        <Route path="/items" elements={<Items />} />
        <Route path="/categories" elements={<Category />} />
      </Routes>
      <Items items={items} />
    </BrowserRouter>
  );
}

export default App;
