  "use client"

import styles from "./page.module.css";
import Image from "next/image";
import { useState } from "react";

const Contact = () => {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value.trim();
    const email = e.target[1].value.trim();
    const message = e.target[2].value.trim();

    if (!name || !email || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    setError('');
    e.target.reset();
  };

  const handleChange = () => {
    setError('');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Lets Keep in Touch
      </h1>

      {error && <div className={styles.error}>
        {error}
      </div>
      }

      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt="contacts"
            width={500}
            height={500}
            className={styles.image}
          />
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <input
            type="text"
            placeholder="Enter your name"
            className={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            required
          />

          <textarea
            className={styles.textArea}
            placeholder="Enter your message"
            cols="30"
            rows="10"
            required
          ></textarea>

          {!error && <button className={styles.button}>
            Send
          </button>}
        </form>
      </div>
    </div>
  );
};

export default Contact;