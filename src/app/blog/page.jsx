"use client"

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";

async function getData() {
  try {
    const res = await fetch(`/api/posts`, {
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

const Blog = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const result = await getData();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    fetchDataAsync();
  }, []);

  return (
    <div className={styles.mainContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        data.map(({ _id, title, img, desc }) => (
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
                placeholder="blur"
              />
            </div>

            <div className={styles.content}>
              <h1 className={styles.title}>
                {title}
              </h1>

              <p className={desc}>
                {desc}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Blog;