import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSeen, setIsPasswordSeen] = useState("password");
  const [isPasswordSeenText, setIsPasswordSeenText] = useState("😎");
  const handlePasswordToggle = () => {
    setIsPasswordSeen((prevState) =>
      prevState === "password" ? "text" : "password"
    );
    setIsPasswordSeenText((prevState) => (prevState === "😀" ? "😎" : "😀"));
  };

  const handleRegister = async () => {
    try {
      // Simple client-side validation
      if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        const notify = () => toast("All fields are mandatory!");
        notify();
        return;
      }

      if (password !== confirmPassword) {
        const notify = () => toast("Passwords do not match!");
        notify();
        return;
      }

      axios
        .post("/api/createuser", { email, name, password })
        .then((data) => {
          if (data.data.status === 1) {
            const notify = () =>
              toast("Information to activate this account sent to your email!");
            notify();
          } else if (data.data.status === 0) {
            const notify = () =>
              toast("Account with this email already exists!");
            notify();
          } else if (data.data.status === 2) {
            const notify = () =>
              toast("Verification url already sent to your email!");
            notify();
          } else {
            const notify = () => toast("Error registering user!");
            notify();
          }
        })
        .catch((err) => {
          const notify = () => toast("Error registering user!");
          notify();
        });
    } catch (error) {
      const notify = () => toast("Error registering user:");
      notify();
    }
  };
  useEffect(() => {
    // Add the CSS class to the image wrapper div after the page loads
    const imageWrapper = document.querySelector(".register_now_className");
    imageWrapper.classList.add("image-first-content");
    if (localStorage) {
      if (localStorage.getItem("nkcdata")) {
        window.location.href = "/";
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Niraj Chaurasiya - Register Now</title>
        <link
          rel="shortcut icon"
          href="/assests/logo.jpg"
          type="image/x-icon"
        />
      </Head>
      <ToastContainer />
      <div style={{ marginTop: "5%" }} className="register_now_className">
        <p style={{ textAlign: "center", fontSize: "24px", fontWeight: "700" }}>
          Register Now
        </p>
        <div className="_form_section">
          <div className="mid_form_section">
            <textarea
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mid_form_section_mid">
            <input
              autoComplete="false"
              type={isPasswordSeen}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              autoComplete="false"
              type={isPasswordSeen}
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              style={{
                height: "100%",
                width: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handlePasswordToggle}
            >
              {isPasswordSeenText}
            </button>
          </div>
          <button
            onClick={() => {
              handleRegister();
            }}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}
