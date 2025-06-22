import React, { useEffect } from "react";
import project from "./project.json";
import { HiOutlineExternalLink } from "react-icons/hi";
import Image from "next/image";
import Head from "next/head";
export default function Project(props) {
  useEffect(() => {
    // Add the CSS class to the image wrapper div after the page loads
    const imageWrapper = document.querySelector(
      ".project_description_contents"
    );
    imageWrapper.classList.add("image-first-content");
  }, []);
  return (
    <>
      <Head>
        {/* SEO meta tags */}
        <title>
          {project[props.projectPos - 1]?.project_title} - Niraj Chaurasiya
        </title>
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
        <meta property="og:url" content="https://www..com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags (for better sharing on Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Niraj Chaurasiya - Home" />
        <meta
          name="twitter:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta name="twitter:image" content="/favicon.ico" />
        <meta name="twitter:url" content="https://www..com" />

        {/* Other meta tags */}
        <link
          rel="shortcut icon"
          href="/assests/logo.jpg"
          type="image/x-icon"
        />
      </Head>
      <div>
        <div className="project_description_contents">
          <div className="project_title_desc">
            <p>{project[props.projectPos - 1]?.project_title}</p>
            <p>{project[props.projectPos - 1]?.project_description}</p>
          </div>

          <div className="specific_project_image">
            <Image
              src={project[props.projectPos - 1]?.project_image_url}
              alt=""
              width={100}
              height={370}
              className="img"
            />
          </div>

          <div className="specific_project_description">
            <h4>About</h4>
            <p>{project[props.projectPos - 1]?.about}</p>
          </div>
          <br />
          <div className="specific_project_history">
            <h4>History</h4>
            <p>{project[props.projectPos - 1]?.history}</p>
          </div>
          <br />
          <div className="specific_project_tech">
            <h4>Technologies used</h4>
            <div className="tech">
              {project[props.projectPos - 1]?.technologies_used.map(
                (e, index) => (
                  <div key={index} className="html">
                    <Image
                      height={e.style.height.slice(0, 2)}
                      width={e.style.width.slice(0, 2)}
                      src={e?.image}
                      alt={e?.title}
                      title={e?.title}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <br />
          <div className="specific_project_links">
            <div className="github_link">
              <h4>Github</h4>
              {project[props.projectPos - 1]?.github_link ? (
                <button
                  onClick={() => {
                    window.open(
                      project[props.projectPos - 1]?.github_link,
                      "_blank"
                    );
                  }}
                >
                  {project[props.projectPos - 1]?.github_link}
                </button>
              ) : (
                <button>Unavailable</button>
              )}
            </div>
            <br />
            <div className="website_link">
              <h4>Website link</h4>
              {project[props.projectPos - 1]?.website_link ? (
                <button
                  onClick={() => {
                    window.open(
                      project[props.projectPos - 1]?.website_link,
                      "_blank"
                    );
                  }}
                >
                  {project[props.projectPos - 1]?.website_link}
                </button>
              ) : (
                <button>Unavailable</button>
              )}
            </div>
          </div>
          <br />
        </div>

        {project[props.projectPos - 1]?.github_link ? (
          <button
            className="open_project_links"
            onClick={() => {
              window.open(project[props.projectPos - 1]?.github_link, "_blank");
            }}
          >
            Open Project <HiOutlineExternalLink style={{ fontSize: "22px" }} />{" "}
          </button>
        ) : (
          <button
            className="open_project_links"
            onClick={() => {
              window.open(
                project[props.projectPos - 1]?.website_link,
                "_blank"
              );
            }}
          >
            Open Project <HiOutlineExternalLink style={{ fontSize: "22px" }} />{" "}
          </button>
        )}
      </div>
    </>
  );
}
