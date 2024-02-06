import React from "react";
import Map from "./Map";

const Contact = () => {
  const handleSendMessage = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("message", message);

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  };
  return (
    <div>
      <div>
        <h3 className="contactTitle">Contact us</h3>
        <form className="formClass">
          <div className="input__container">
            <label htmlFor="name">Your name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="input__container">
            <label htmlFor="email">Your email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input__container">
            <label htmlFor="message">Your message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button className="buttonContact" onClick={handleSendMessage}>
            Send the message :)
          </button>
        </form>
      </div>
      <div>
        <Map />
      </div>
    </div>
  );
};

export default Contact;
