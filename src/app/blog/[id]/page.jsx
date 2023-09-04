"use client"

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

async function getData(id) {
  try {
    const res = await fetch(`/api/posts/${id}`, {
      revalidate: 10,
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const BlogId = async ({ params }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const result = await getData(params.id);
        setData(result);
      } catch (error) {
        console.log(error);
      } 
    }

    fetchDataAsync();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>
            {data.title}
          </h1>

          <p className={styles.desc}>
            {data.desc}
          </p>

          <div className={styles.author}>
            <Image
              src={data.img}
              alt={data.title}
              width={50}
              height={50}
              className={styles.avatar}
              placeholder="blur"
            />
            <span className={styles.username}>
              {data.username}
            </span>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt={data.title}
            width={390}
            height={300}
            className={styles.image}
            placeholder="blur"
          />
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.text}>
          {data.content}
        </p>
      </div>
    </div>
  );
};

export default BlogId;