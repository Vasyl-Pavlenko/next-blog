import styles from "./page.module.css";
import Image from "next/image";
import Button from "@/components/Button/Button";

export const metadata = {
  title: "Contact",
};

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Lets Keep in Touch
      </h1>

      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt="contacts"
            width={500}
            height={500}
            className={styles.image}
            placeholder="blur"
          />
        </div>

        <form className={styles.form}>
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

          <Button
            url="#"
            text="Send"
          />
        </form>
      </div>
    </div>
  );
};

export default Contact;