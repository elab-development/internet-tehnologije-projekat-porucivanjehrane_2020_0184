import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "./Button";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/login", userData)
      .then((response) => {
        console.log(response.data);
        window.sessionStorage.setItem("auth_token", response.data.access_token);
        window.sessionStorage.setItem("role_id", response.data.role_id);
        window.sessionStorage.setItem("user", response.data.name);
        window.sessionStorage.setItem("user_id", response.data.user_id);
        navigate("/categories");
        Swal.fire({
          icon: "success",
          title: "Successfull",
          text: "Operation was successful!",
        });
      })
      .catch((error) => {
        console.error("Login failed:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong credentials",
        });

        setError("Invalid username or password. Please try again.");
      });
  };

  return (
    <section>
      <div style={{ borderRadius: 1 + "rem" }}>
        <div className="login-wrapper">
          <form onSubmit={handleLogin}>
            <div>
              <p>
                <b>Please enter your email and password</b>
              </p>

              <div>
                <div>
                  <label style={{ textAlign: "start" }}>
                    Email: <br></br>
                  </label>
                </div>
                <input
                  className="input-form"
                  type="text"
                  id="typeEmailX"
                  name="email"
                  onInput={handleInput}
                />
              </div>

              <div>
                <div>
                  <label>
                    Password: <br></br>
                  </label>
                </div>
                <input
                  className="input-form"
                  type="password"
                  id="typePasswordX"
                  name="password"
                  onInput={handleInput}
                />
              </div>
              <center>
                <Button type="submit" text="Login" />
              </center>
            </div>

            <div>
              <p className="mb-0">
                Don't have an account? <a href="/">Sign Up</a>
              </p>
            </div>
            <div>
              <Link to="/reset-password">Forgot your password?</Link>
            </div>
          </form>
        </div>
      </div>

      <br></br>
    </section>
  );
};

export default Login;
