"use client";

import useSWR from "swr";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  if (session.status == "loading") {
    return <Loader />;
  }

  if (session.status == "unauthenticated") {
    router?.push("/dashboard/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value.trim();
    const desc = e.target[1].value.trim(); 
    const img = e.target[2].value.trim();
    const content = e.target[3].value.trim();

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  if (session.status == "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading && !error
            ? <Loader />
            : data?.map(({_id, title, img }) => (
              <div
                className={styles.post}
                key={_id}
              >
                <div className={styles.imgContainer}>
                  <Image
                    src={img}
                    alt={title}
                    width={200}
                    height={200}
                    className={styles.img}
                    placeholder="blur"
                  />
                </div>

                <h2 className={styles.postTitle}>
                  {title}
                </h2>

                <span
                  className={styles.delete}
                  onClick={() => handleDelete(_id)}
                >
                  DELETE
                </span>
              </div>
            ))}
        </div>

        <form
          className={styles.new}
          onSubmit={handleSubmit}
        >
          <h1 className={styles.title}>
            Add New Post
          </h1>

          <input
            type="text"
            placeholder="Title"
            className={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Description"
            className={styles.input}
            required
          />

          <input
            type="url"
            placeholder="Enter URL for image from https://www.freepik.com/"
            className={styles.input}
            required
          />

          <textarea
            cols="30"
            rows="10"
            className={styles.textArea}
          />

          <button className={styles.button}>
            Send
          </button>
        </form>
      </div>
    );
  }
};

export default Dashboard;
