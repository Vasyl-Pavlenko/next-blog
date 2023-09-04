"use client";

import { signIn, useSession } from "next-auth/react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";

const Login = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status == "loading") {
    return <Loader />;
  }

  if (session.status == "authenticated") {
    router?.push("dashboard")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn("credentials", { email, password });
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <input
          type="email"
          placeholder="Email"
          required
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button
          type="submit"
          className={styles.button}
        >
          Login
        </button>
      </form>

      <button
        onClick={() => signIn("google")}
        className={styles.button}
      >
        Login with Google
      </button>

      <Link href='/dashboard/register'>
        <button
          className={styles.button}
        >
          {"Don't have account yet?"}
        </button>
      </Link>
    </div>
  );
};

export default Login;