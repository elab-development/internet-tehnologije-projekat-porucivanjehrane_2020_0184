import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Restaurants from "./components/Restaurants";
import Items from "./components/Items";
import Category from "./components/Categories";
import Contact from "./components/Contact";
import Footer from "./components/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
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
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/items" element={<Items />} />
        {/* <Route path="/categories" element={<Category />} /> */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
