import styles from "./page.module.css";
import Image from "next/image";
import { images } from "./data";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.title}>
        2023 MyBlog. All rights reserved
      </div>

      <div className={styles.social}>
        {images.map(({ id, src, alt, url }) => (
          <Link
            href={url}
            key={id}
          >
            <Image
              key={id}
              src={src}
              width={15}
              height={15}
              className={styles.icon}
              alt={alt}
            />
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;