"use client";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
export default function Navbar() {
  const [showMbleNave, setShowMbleNave] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hideClass, setHideClass] = useState(true);
  const [select, setSelect] = useState("all");
  const [cmd_text, setCmd_text] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage) {
      const color_mode = localStorage.getItem("darkmodenkc");
      document.body.className = color_mode;
      if (localStorage.getItem("nkcdata")) {
        const name = JSON.parse(localStorage.getItem("nkcdata")).name;
        setIsLoggedIn(true);
        setUserData(name);
      }
    } else {
      document.body.className = !isLightMode ? "dark" : "light";
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
  const handleSearch = () => {
    if (searchQuery === "") {
      const notify = () => toast("Please enter a query to search!");
      notify();
    } else {
      router.push(`/search/${select}/${searchQuery}`);
    }
  };

  const handleCMD = () => {
    setHideClass(!hideClass);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    switch (cmd_text) {
      case "echo about":
        // console.log("echo about");
        router.push("/about");
        break;
      case "echo contact":
        // console.log("echo contact");
        router.push("/contact");
        break;
      case "echo projects":
        // console.log("echo projects");
        router.push("/projects");
        break;
      case "echo blog":
        // console.log("echo blog");
        router.push("/blog");
        break;
      case "echo login":
        // console.log("echo login");
        router.push("/login");
        break;
      case "echo register":
        // console.log("echo register");
        router.push("/register");
        break;
      default:
        const notify = () => toast("Command didn't match.");
        notify();
        break;
    }
    setCmd_text("");
  };

  return (
    <>
      <ToastContainer />
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
          <Link style={{ textDecoration: "none" }} href="/plays">
            <li onClick={playTickSound}>Plays</li>
          </Link>
          <button
            style={{
              background: "transparent",
              border: "1px solid var(--nav-bg-color)",
              outline: "none",
              padding: "6px",
              borderRadius: "5px",
            }}
            onClick={handleCMD}
          >
            <span className={styles.new_cmd}>new</span>
            <li onClick={playTickSound}>CMD</li>
          </button>
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
                src="/assests/sun.png"
                alt="light"
                onClick={playTickSound}
              />
            ) : (
              <Image
                width={20}
                height={20}
                src="/assests//moon.png"
                alt="dark"
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
              {!showMbleNave ? (
                <>
                  <div></div>
                  <div></div>
                  <div></div>
                </>
              ) : (
                <ImCross
                  style={{ zIndex: "10", height: "20px", width: "20px" }}
                />
              )}
            </div>
            <ul className={showMbleNave ? styles.mble_navbar : styles.hide_nav}>
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
              <Link style={{ textDecoration: "none" }} href="/plays">
                <li onClick={playTickSound}>Plays</li>
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
          </div>
        </div>
      </div>
      {/* Search Bar */}
      <div className={styles.seaarch_bar_nav}>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search Projects or Blog"
          name="search" // Add a random value to the name attribute
        />
        <div className={styles.select_box}>
          <select
            name="select"
            id="select"
            onChange={(e) => {
              setSelect(e.target.value);
            }}
          >
            <option value="all">Default</option>
            <option value="project">Projects</option>
            <option value="blog">Blog</option>
          </select>
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* CMD */}
      <div
        className={`${!hideClass ? styles.cmd : styles.hide_cmd} hide_in_phone`}
      >
        <div className={styles.hide_cmd_btn}>
          <button onClick={handleCMD}>X</button>
        </div>
        <p style={{ padding: "0px 20px" }}>Comand Prompt</p>
        <p style={{ padding: "0 20px" }}>@nirajchaurasiya.com &copy; 2023</p>
        <span style={{ padding: "0 20px", fontSize: "14px" }}>
          1{`)`} echo contact 2{`)`} echo about 3{`)`} echo projects 4{`)`} echo
          blog 5{`)`} echo login 6{`)`} echo register
        </span>
        <form className={styles.input_cmd} onSubmit={onSubmitForm}>
          <p>N:\nirajchaurasiya{`>`} </p>
          <input
            value={cmd_text}
            onChange={(e) => {
              setCmd_text(e.target.value);
            }}
            type="text"
            placeholder="_"
          />
        </form>
      </div>
    </>
  );
}
