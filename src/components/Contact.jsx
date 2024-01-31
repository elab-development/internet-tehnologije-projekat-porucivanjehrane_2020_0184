import React from "react";

const Contact = () => {
  return (
    <div>
      <h3 className="contactTitle">Kontaktirajte nas</h3>
      <form className="formClass">
        <div className="input__container">
          <label htmlFor="name">Vaše ime:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="input__container">
          <label htmlFor="email">Vaš email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="input__container">
          <label htmlFor="message">Vaša poruka:</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button class="buttonContact">Pošaljite poruku :)</button>
      </form>
    </div>
  );
};

export default Contact;
