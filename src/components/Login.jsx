import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "./Button";

const Login = ({ addToken, addUser, currentUser }) => {
  const [userData, setUserData] = useState({
    username: "",
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
        navigate("/items");

        window.sessionStorage.setItem("auth_token", response.data.access_token);
        window.sessionStorage.setItem("role", response.data.role_name);
        window.sessionStorage.setItem("name", response.data.name);

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

        // Update the error state with the error message
        setError("Invalid username or password. Please try again.");
      });
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: 1 + "rem" }}
            >
              <div className="card-body p-5 text-center">
                <form onSubmit={handleLogin}>
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <p className="text-white-50 mb-5">
                      Please enter your email and password
                    </p>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="typeEmailX">
                        Email
                      </label>
                      <input
                        type="text"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        name="email"
                        onInput={handleInput}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                      </label>
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        name="password"
                        onInput={handleInput}
                      />
                    </div>

                    <Button type="submit" text="Login" />
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <a href="/" className="text-white-50 fw-bold">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
