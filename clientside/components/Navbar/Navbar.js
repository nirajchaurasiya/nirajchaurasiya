"use client";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [showMbleNave, setShowMbleNave] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  useEffect(() => {
    if (localStorage) {
      document.body.className = localStorage.getItem("darkmodenkc");
      if (localStorage.getItem("nkcdata")) {
        const name = JSON.parse(localStorage.getItem("nkcdata")).name;
        setIsLoggedIn(true);
        setUserData(name);
      }
    } else {
      document.body.className = isLightMode ? "dark" : "light";
    }
  }, [isLightMode]);

  // Function to play the tick sound
  const playTickSound = () => {
    const tickSound = new Audio("/tick.mp3");
    tickSound.play();
  };

  function toggleTheme() {
    setIsLightMode(!isLightMode);
    localStorage.setItem("darkmodenkc", !isLightMode ? "light" : "dark");
  }

  return (
    <div className={styles.navbar}>
      <ul className={styles.first_navbar}>
        <Link onClick={playTickSound} href="/" className={styles.logo}>
          Niraj Chaurasiya
        </Link>
      </ul>
      <ul className={`${styles.second_nav} hideInPhone`}>
        <Link style={{ textDecoration: "none" }} href="/">
          <li onClick={playTickSound}>Home</li>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/contact">
          <li onClick={playTickSound}>Contact</li>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/about">
          <li onClick={playTickSound}>About</li>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/projects">
          <li onClick={playTickSound}>Projects</li>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/blog">
          <li onClick={playTickSound}>Blog</li>
        </Link>
      </ul>
      <div
        className={styles.thirdNav}
        style={{ listStyle: "none", alignItems: "center", display: "flex" }}
      >
        {isLoggedIn ? (
          <>
            <Link
              style={{ textDecoration: "none" }}
              className="hideInPhone"
              href="#"
            >
              <li onClick={playTickSound}>{userData}</li>
            </Link>
            <Link
              href="#"
              onClick={playTickSound}
              style={{ textDecoration: "none" }}
              className="hideInPhone"
            >
              <li
                onClick={() => {
                  localStorage.removeItem("nkcdata");
                  window.location.href = "/login";
                }}
              >
                Logout
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link
              style={{ textDecoration: "none" }}
              className="hideInPhone"
              href="/login"
            >
              <li onClick={playTickSound}>Login</li>
            </Link>
            <Link
              style={{ textDecoration: "none", userSelect: "none" }}
              className="hideInPhone"
              href="/register"
            >
              <li onClick={playTickSound}>Register</li>
            </Link>
          </>
        )}
        <li className={styles.themeToggle} onClick={toggleTheme}>
          {!isLightMode ? (
            <Image
              width={20}
              height={20}
              src="https://img.icons8.com/arcade/256/sun.png"
              alt=""
              onClick={playTickSound}
            />
          ) : (
            <Image
              width={20}
              height={20}
              src="https://img.icons8.com/sf-black-filled/256/moon-symbol.png"
              alt=""
              onClick={playTickSound}
            />
          )}
        </li>
        <div className={styles.mble_navbar}>
          <div
            style={{ display: "grid", gap: "5px" }}
            onClick={() => {
              setShowMbleNave(!showMbleNave);
              playTickSound();
            }}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          {showMbleNave && (
            <ul>
              <Link style={{ textDecoration: "none" }} href="/">
                <li onClick={playTickSound}>Home</li>
              </Link>
              <Link style={{ textDecoration: "none" }} href="/contact">
                <li onClick={playTickSound}>Contact</li>
              </Link>
              <Link style={{ textDecoration: "none" }} href="/about">
                <li onClick={playTickSound}>About</li>
              </Link>
              <Link style={{ textDecoration: "none" }} href="/projects">
                <li onClick={playTickSound}>Projects</li>
              </Link>
              <Link style={{ textDecoration: "none" }} href="/blog">
                <li onClick={playTickSound}>Blog</li>
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    onClick={playTickSound}
                    style={{ textDecoration: "none" }}
                    href="#"
                  >
                    <button
                      style={{
                        padding: "10px",
                        width: "100%",
                        border: "1px solid var(--nav-text-color)",
                        outline: "none",
                        backgroundColor: "transparent",
                        color: "var(--nav-text-color)",
                      }}
                    >
                      {userData}
                    </button>
                  </Link>
                  <Link
                    onClick={playTickSound}
                    style={{ textDecoration: "none" }}
                    href="#"
                  >
                    <button
                      style={{
                        padding: "10px",
                        width: "100%",
                        border: "1px solid var(--nav-text-color)",
                        outline: "none",
                        backgroundColor: "transparent",
                        color: "var(--nav-text-color)",
                      }}
                      onClick={() => {
                        localStorage.removeItem("nkcdata");
                        window.location.href = "/login";
                      }}
                    >
                      Logout
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link style={{ textDecoration: "none" }} href="/login">
                    <button
                      style={{
                        padding: "10px",
                        width: "100%",
                        border: "1px solid var(--nav-text-color)",
                        outline: "none",
                        backgroundColor: "transparent",
                        color: "var(--nav-text-color)",
                      }}
                      onClick={playTickSound}
                    >
                      Login
                    </button>
                  </Link>
                  <Link style={{ textDecoration: "none" }} href="/register">
                    <button
                      style={{
                        padding: "10px",
                        width: "100%",
                        border: "1px solid var(--nav-text-color)",
                        outline: "none",
                        backgroundColor: "transparent",
                        color: "var(--nav-text-color)",
                      }}
                      onClick={playTickSound}
                    >
                      Register
                    </button>
                  </Link>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
