'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader/Loader";

async function fetchData() {
  try {
    const res = await fetch(`/api/posts`, { cache: 'no-cache' });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export default function Blog() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then((result) => {
        setData(result);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); 
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  
  const sortedData = data
    .map((item) => ({
      ...item,
      createdAt: +new Date(item.createdAt), 
    }))
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className={styles.mainContainer}>
      {sortedData.map(({ _id, title, img, desc }) => (
        <Link
          key={_id}
          href={`blog/${_id}`}
          className={styles.container}
        >
          <div className={styles.imageContainer}>
            <Image
              src={img}
              alt={title}
              width={400}
              height={250}
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>
              {title}
            </h1>

            <p className={styles.desc}>
              {desc}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}