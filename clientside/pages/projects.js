import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import project from "./project/project.json";
import Project from "./project/Project";
export default function Projects() {
  const [project_all_data, setProject_all_data] = useState(project);
  const [hideProjectDesc, setHideProjectDesc] = useState(true);
  const [projectPos, setProjectPos] = useState("");
  useEffect(() => {
    // Add the CSS class to the image wrapper div after the page loads
    const imageWrapper = document.querySelector(".project-page_card");
    imageWrapper.classList.add("image-first-content");
  }, []);
  return (
    <>
      <Head>
        {/* SEO meta tags */}
        <title>All Projects - Niraj Chaurasiya</title>
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
        <meta property="og:url" content="https://www.nirajchaurasiya.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags (for better sharing on Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Niraj Chaurasiya - Home" />
        <meta
          name="twitter:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta name="twitter:image" content="/favicon.ico" />
        <meta name="twitter:url" content="https://www.nirajchaurasiya.com" />

        {/* Other meta tags */}
        <link
          rel="shortcut icon"
          href="/assests/logo.jpg"
          type="image/x-icon"
        />
      </Head>
      <div>
        <div className="filter_btn" style={{ textAlign: "center" }}>
          <p>Filter</p>
        </div>
        <div className="box">
          <select
            onChange={(e) => {
              e.target.value.toLowerCase() === "all"
                ? setProject_all_data(project)
                : setProject_all_data(
                    project.filter(
                      (cat) =>
                        e.target.value.toLowerCase() ===
                        cat.category.toLowerCase()
                    )
                  );
            }}
          >
            <option value="all" defaultChecked>
              All App
            </option>
            <option value="ecommerce">Ecommerce App</option>
            <option value="productivity">Productivity App</option>
            <option value="socialmedia">Social Media App</option>
            <option value="videouploading">Video Uploading App</option>
            <option value="chat">Chat App</option>
            <option value="ai">AI App</option>
          </select>
        </div>
        <div className="project-page_card" style={{ width: "80vw" }}>
          <div className="_project-pages_card">
            {project_all_data.map((e, i) => {
              return (
                <div key={i} className="item_card_project-pages">
                  <Image
                    style={{ objectFit: "cover" }}
                    width={200}
                    height={200}
                    src={e.image}
                    alt=""
                  />
                  <div className="project-pages_heading">
                    <p>{e?.project_title}</p>
                    <p>{e.about.slice(0, 150)}...</p>
                  </div>
                  {/* <Link href={`/project/${e.index}/${e.name}`}> */}
                  <button
                    onClick={() => {
                      setHideProjectDesc(false);
                      setProjectPos(e.index);
                    }}
                  >
                    See More
                  </button>
                  {/* </Link> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`${
          !hideProjectDesc ? "project_desc" : "project_desc_hide"
        } project_scroll_if_overflow`}
      >
        <div className="hide_icon_desc_project">
          <ImCross
            style={{ cursor: "url('/pointer.png'), auto" }}
            onClick={() => {
              setHideProjectDesc(true);
            }}
          />
        </div>
        {!hideProjectDesc && <Project projectPos={projectPos} />}
      </div>
    </>
  );
}
