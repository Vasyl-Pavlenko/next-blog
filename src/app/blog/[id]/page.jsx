'use client'

import Loader from "@/components/Loader/Loader";
import styles from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

function fetchData(id) {
  return fetch(`/api/posts/${id}`, {
    cache: 'no-cache',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

export default function BlogId({ params }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(params.id)
      .then((result) => {
        setData(result)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [params]);

  if (!data) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

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
}