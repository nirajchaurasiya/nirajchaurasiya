import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (!name || !email || !message) {
      const notify = () => toast("Please fill all the fields!");
      notify();
      setLoader(false);
    } else {
      try {
        await axios.post("/api/sendemail", {
          email,
          name,
          message,
        });
        // Simulating a delay of 1 second before hiding the loader
        setTimeout(() => {
          setLoader(false);
          const notify = () => toast("Message sent successfully!");
          notify();
          setEmail("");
          setName("");
          setMessage("");
        }, 1000);
      } catch (error) {
        const notify = () => toast("Failed to send email. Please try again!");
        notify();
        setLoader(false); // Hide the loader in case of an error
      }
    }
  };

  useEffect(() => {
    // Add the CSS class to the image wrapper div after the page loads
    const imageWrapper = document.querySelector(".image_first_content_contact");
    imageWrapper.classList.add("image-first-content");
  }, []);
  return (
    <>
      <Head>
        {/* SEO meta tags */}
        <title>Contact - Niraj Chaurasiya</title>
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
        <meta property="og:image" content="/favicon.ico" />
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
        <meta name="twitter:image" content="/favicon.ico" />
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
      <div style={{ marginTop: "5%" }} className="image_first_content_contact">
        <div
          style={{
            marginBottom: "3%",
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
          }}
        >
          <a href="https://twitter.com/LoveForRobotics">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              color="white"
              className="mx-3 hover:text-white hover:bg-slate-500 cursor-pointer"
              style={{
                color: "var(--nav-text-color)",
                fontSize: "35px",
                height: "1em",
              }}
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0 0 75-94 336.64 336.64 0 0 1-108.2 41.2A170.1 170.1 0 0 0 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 0 0-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 0 1-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 0 1-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z" />
            </svg>
          </a>
          <a href="https://www.facebook.com/niraj.chaurasiya0/">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              color="white"
              className="mx-3 hover:text-white hover:bg-slate-500 cursor-pointer"
              style={{
                color: "var(--nav-text-color)",
                fontSize: "35px",
                height: "1em",
                width: "1em",
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z" />
            </svg>
          </a>
          <a href="https://github.com/nirajkumar1234">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              color="white"
              className="mx-3 hover:text-white hover:bg-slate-500 cursor-pointer"
              style={{
                color: "var(--nav-text-color)",
                fontSize: "35px",
                height: "1em",
                width: "1em",
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/loveforrobotics/">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              color="white"
              className="mx-3 hover:text-white hover:bg-slate-500 cursor-pointer"
              style={{
                color: "var(--nav-text-color)",
                fontSize: "35px",
                height: "1em",
                width: "1em",
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z" />
            </svg>
          </a>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "30px",
          }}
        >
          Feel free to connect!
        </p>
        {loader && <div className="loader"></div>}
        <div className="_form_section">
          <form onSubmit={handleFormSubmit}>
            <div className="mid_form_section">
              <textarea
                type="text"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ resize: "vertical", maxWidth: "100%" }}
              />
            </div>

            <div className="mid_form_section_mid">
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button type="submit">Shoot</button>
          </form>
        </div>
      </div>
    </>
  );
}
