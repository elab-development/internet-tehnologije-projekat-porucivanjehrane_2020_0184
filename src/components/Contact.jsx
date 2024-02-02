import React from "react";

const Contact = () => {
  return (
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
        <button class="buttonContact">Send the message :)</button>
      </form>
    </div>
  );
};

export default Contact;
