import React, { useState } from "react";
import styles from "../../css/User_view_css/getInTouch.module.css";
import contactImage from "../../images/contactImage.png";
import axios from "axios";

function GetIntouch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError(false);

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setStatus("Please fill all the fields");
      setError(true);
      return;
    }

    setLoading(true); // Set loading to true when submitting the form

    try {
      await axios.post(
        "https://projects-mood-backend-yugw.onrender.com/getintouch",
        formData
      );
      setStatus("Message sent successfully");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message");
      setError(true);
    } finally {
      setLoading(false); // Reset loading state when the request completes
    }
  };

  return (
    <div className={styles.getIntouchDiv} id="contact">
      <div className={styles.image}>
        <img src={contactImage} alt="contact-image" />
      </div>
      <div className={styles.contactOuter}>
        <div className={styles.contactInner}>
          <div className={styles.getIntouchTitle}>
            <span>Get in touch</span>
            <p>
              Feel free to contact us and we will get back to you as soon as
              possible
            </p>
          </div>
          <form onSubmit={handleSubmit} className={styles.inputNbutton}>
            <div className={styles.inputs}>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
                className={styles.nameInput}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                className={styles.emailInput}
              />
              <textarea
                name="message"
                value={formData.message}
                placeholder="How we can help?"
                onChange={handleChange}
                className={styles.messageBox}
              ></textarea>
            </div>
            <button className={styles.send} type="submit">
              {loading ? "Sending..." : "Send"}{" "}
              {/* Change button text based on loading state */}
            </button>
          </form>
          {status && (
            <p style={{ color: error ? "red" : "green", marginTop: "10px" }}>
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetIntouch;
