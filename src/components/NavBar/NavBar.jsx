"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import styles from "./page.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const session = useSession();
  const { mode } = useContext(ThemeContext);
  const pathname = usePathname();

  return (
    <nav className={styles.container}>
      <Link
        href="/"
        className={styles.logo}
      >
        MyBlog
      </Link>

      <DarkModeToggle />

      <div className={styles.links}>
        {links.map(({ id, url, title }) => (
          <Link
            key={id}
            href={url}
            className={pathname === url ? styles.active : styles.link}
          >
            {title}
          </Link>
        ))}

        {session.status == "authenticated" &&
          <button
            className={styles.logout}
            onClick={signOut}
          >
            Logout
          </button>}
      </div>

      <div className={styles.small}>
        <RiMenu3Line
          size={24}
          onClick={() => setToggleMenu(true)}
        />

        {toggleMenu && (
          <div
            className={
              [
                styles.small__overlay,
                styles.flex__center,
                styles.slide__bottom
              ].join(" ")
            }
            style={{
              backgroundColor:
                mode === "dark" ? "#333" : "#fff"
            }}
          >
            <RiCloseLine
              fontSize={27}
              className={styles.overlay__close}
              onClick={() => setToggleMenu(false)}
            />

            {links.map(({ id, url, title }) => (
              <Link
                key={id}
                href={url}
                className={styles.small__links}
                onClick={() => setToggleMenu(false)}
              >
                {title}
              </Link>
            ))}

            {session.status == "authenticated" &&
              <button
                className={styles.logout}
                onClick={signOut}
              >
                Logout
              </button>}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;