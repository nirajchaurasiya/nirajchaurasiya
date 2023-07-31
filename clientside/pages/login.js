import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const [isPasswordSeen, setIsPasswordSeen] = useState("password");
  const [isPasswordSeenText, setIsPasswordSeenText] = useState("😀");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Add the CSS class to the image wrapper div after the page loads
    const imageWrapper = document.querySelector("._form_section");
    imageWrapper.classList.add("image-first-content");
    if (localStorage) {
      if (localStorage.getItem("nkcdata")) {
        window.location.href = "/";
      }
    }
  }, []);

  const handleLogin = async () => {
    try {
      const notify = () =>
        toast("Please wait while we verify your credentials!");
      notify();
      // Make the POST request to /api/login
      if (!email || !password) {
        const notify = () => toast("Please fill all the fields!");
        notify();
      } else {
        const response = await axios.post("/api/login", {
          email: email,
          entered_password: password,
        });

        // Handle the response, for example, you can redirect the user on successful login
        if (response.data.status === 1) {
          const notify = () => toast("Logged in successfully!");
          notify();
          localStorage.setItem("nkcdata", JSON.stringify(response.data.data));
          window.location.href = "/login";
        } else if (response.data.status === 2) {
          const notify = () => toast("Account is not activated!");
          notify();
        } else if (response.data.status === 0) {
          const notify = () => toast("Invalid Credentials!");
          notify();
        } else if (response.data.status === -1) {
          const notify = () => toast("An error occurred!");
          notify();
        } else {
          const notify = () => toast("An error occurred!");
          notify();
        }
      }
    } catch (error) {
      const notify = () =>
        toast("Something went wrong! Please try again later.");
      notify();
    }
  };

  return (
    <>
      <Head>
        {/* SEO meta tags */}
        <title>Login - Niraj Chaurasiya</title>
        <meta
          name="description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta
          name="keywords"
          content="full stack web developer, web applications, front-end, back-end"
        />
        <meta name="author" content="Niraj Chaurasiya" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph meta tags (for better sharing on social media) */}
        <meta property="og:title" content="Niraj Chaurasiya - Home" />
        <meta
          property="og:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta property="og:image" content="/path/to/your/og-image.jpg" />
        <meta
          property="og:url"
          content="https://www.nirajchaurasiya.netlify.app/"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags (for better sharing on Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Niraj Chaurasiya - Home" />
        <meta
          name="twitter:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta name="twitter:image" content="/path/to/your/twitter-image.jpg" />
        <meta
          name="twitter:url"
          content="https://www.nirajchaurasiya.netlify.app/"
        />

        {/* Other meta tags */}
        <link
          rel="shortcut icon"
          href="/assests/logo.jpg"
          type="image/x-icon"
        />
      </Head>
      <ToastContainer />
      <div style={{ marginTop: "5%" }}>
        <p style={{ textAlign: "center", fontSize: "24px", fontWeight: "700" }}>
          Login Now
        </p>
        <div className="_form_section">
          <div className="mid_form_section">
            <textarea
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mid_form_section_mid_login">
            <input
              type={isPasswordSeen}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              style={{
                height: "100%",
                width: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setIsPasswordSeen(
                  isPasswordSeen === "password" ? "text" : "password"
                );
                setIsPasswordSeenText(
                  isPasswordSeenText === "😀" ? "😎" : "😀"
                );
              }}
            >
              {isPasswordSeenText}
            </button>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  );
}
