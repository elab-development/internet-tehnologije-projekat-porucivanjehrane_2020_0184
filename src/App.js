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
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./components/User";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // const [token,setToken]=useState();

  // function addToken(auth_token){
  //     setToken(auth_token);
  // }

  // function removeToken(){
  //     setToken(null);
  //     setCurrentUser(null);

  // }

  // const [users, setUsers]=useState();

  //  useEffect(()=>{
  //      if(users==null){
  //          axios.get("http://127.0.0.1:8000/api/users").then((res)=>{
  //              console.log(res.data);
  //              setUsers(res.data);
  //          });
  //      }
  //  },[users]);

  // const [currentUser, setCurrentUser] = useState();

  // function addUser(u){
  //   console.log('123123');
  //   console.log("users: " + users);
  //     if(users != null){
  //         // users.find((user) =>{
  //         //     if(user.email == u.email){
  //         //         setCurrentUser(user);
  //         //         console.log(user);

  //         //         setCurrentUser(user);
  //         //         console.log("User: " + currentUser);
  //         //         loadFavourites();
  //         //     };
  //         // });
  //         const foundUser = users.find(user => user.email == u.email);
  //         console.log('asdasd');
  //         if (foundUser) {
  //           setCurrentUser(foundUser);
  //           console.log("User:", foundUser);
  //         }
  //     };
  // }

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
        {/* 
        <Route
          path="/user"
          element={
            <div>
              <NavBar
                token={token}
                removeToken={removeToken}
                currentUser={currentUser}
              />
              <User currentUser={currentUser} />
            </div>
          }
        /> */}

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/categories" element={<Category />} /> */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
