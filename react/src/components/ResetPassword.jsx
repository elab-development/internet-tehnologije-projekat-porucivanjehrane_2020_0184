import React, { useState } from "react";
import axios from "axios";
import "../style/ResetPassword.css";
import Button from "./Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  let navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/reset-password",
        {
          email,
          password,
          password_confirmation: confirmPassword,
        }
      );
      Swal.fire({
        icon: "success",
        title: "Password has been changed!",
      });
      navigate("/login");
    } catch (error) {
      if (error.response.data.error == "User not found") {
        Swal.fire({
          icon: "error",
          title: "User not found",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to reset password",
        });
      }
    }
  };

  return (
    <div className="reset-wrapper">
      <h2>Reset Password</h2>
      <input
        className="reset-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="reset-input"
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="reset-input"
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button onClick={handleResetPassword} text="Reset Password" />

      {message && <div>{message}</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default ResetPassword;
