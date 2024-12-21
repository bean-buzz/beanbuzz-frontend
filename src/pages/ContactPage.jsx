import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "../styles/ContactPage.css";

export default function ContactPage() {
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;
  const [state, handleSubmit] = useForm(formId);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (state.succeeded) {
    return (
      <div className="response-container">
        <p className="response-message">
          Thanks for contacting us! We will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Get In Touch Today</h2>
        <p>We will do our best to respond to you ASAP</p>

        <div className="contact-form-row">
          <div className="contact-form-group contact-form-half">
            <label>Name</label>
            <input
              className="contact-form-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>
          <div className="contact-form-group contact-form-half">
            <label>Email</label>
            <input
              className="contact-form-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
        </div>

        <div className="contact-form-group">
          <label>Phone Number</label>
          <input
            className="contact-form-input"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
          />
        </div>
        <div className="contact-form-group">
          <label>Address</label>
          <input
            className="contact-form-input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your Address"
          />
        </div>
        <div className="contact-form-group">
          <label>Message</label>
          <textarea
            className="contact-form-input"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>
        <button
          type="submit"
          className="submit-btn"
          disabled={state.submitting}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
