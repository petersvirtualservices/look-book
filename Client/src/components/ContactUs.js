import React from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import contact from "../assets/contact-us-buttons-clipart-design-illustration-free-png.webp";

const SERVICE_ID = "service_cx6bv5m";
const TEMPLATE_ID = "template_2sq0c3p";
const USER_ID = "_6y1-n0BgunG9ywls";

const ContactUs = () => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      (result) => {
        console.log(result.text);
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
      },
      (error) => {
        console.log(error.text);
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
    e.target.reset();
  };
  return (
    <div className="contactPage">
      <div className="contactBox">
        <h1 className="mt-4">
          <img src={contact} alt="" height="80" width="250" />
        </h1>
        <p>
          "Thank you for visiting our site! If you have any concerns or
          suggestion where we can improve our services, please reach out here.
          We are more than happy to serve you."
        </p>
        <br></br>
        <form onSubmit={handleOnSubmit} className="contactForm">
          <input
            id="form-input-control-email"
            label="Email"
            name="user_email"
            placeholder="Email…"
            required
            icon="mail"
            iconPosition="left"
          />
          <br></br>
          <input
            id="form-input-control-last-name"
            label="Name"
            name="user_name"
            placeholder="Name…"
            required
            icon="user circle"
            iconPosition="left"
          />
          <br></br>
          <textarea
            id="form-textarea-control-opinion"
            label="Message"
            name="user_message"
            placeholder="Message…"
            required
          /><br></br>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div><br></br><br></br>
    </div>
  );
};

export default ContactUs;
