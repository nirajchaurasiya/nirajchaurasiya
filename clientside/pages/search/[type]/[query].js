import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";

import projectData from "../../../pages/project/project.json";
import blogData from "../../../components/Blog/allblog/allblog.json";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import Project from "../../project/Project";
import Head from "next/head";

export default function Query() {
  const [searchResult, setSearchResult] = useState([]);
  const [misMatcheType, setMisMatcheType] = useState(false);
  const [hideProjectDesc, setHideProjectDesc] = useState(true);
  const [projectPos, setProjectPos] = useState("");
  const router = useRouter();
  const { type, query } = router.query;

  useEffect(() => {
    if (type) {
      switch (type) {
        case "all":
          // Combine both project and blog data arrays and filter based on the query
          const allData = [...projectData, ...blogData];
          const searchResults = allData.filter(
            (item) =>
              item.name?.toLowerCase().includes(query?.toLowerCase()) ||
              item.author?.toLowerCase().includes(query?.toLowerCase()) ||
              item.category?.toLowerCase().includes(query?.toLowerCase()) ||
              item.project_title
                ?.toLowerCase()
                .includes(query?.toLowerCase()) ||
              item.project_description
                ?.toLowerCase()
                .includes(query?.toLowerCase()) ||
              item.about?.toLowerCase().includes(query?.toLowerCase())
          );
          setSearchResult(searchResults);
          break;
        case "project":
          // Filter project data based on the query
          const projectResults = projectData.filter(
            (item) =>
              item.name?.toLowerCase().includes(query?.toLowerCase()) ||
              item.category?.toLowerCase().includes(query?.toLowerCase()) ||
              item.project_title
                ?.toLowerCase()
                .includes(query?.toLowerCase()) ||
              item.project_description
                ?.toLowerCase()
                .includes(query?.toLowerCase()) ||
              item.about?.toLowerCase().includes(query?.toLowerCase())
          );
          setSearchResult(projectResults);
          break;
        case "blog":
          // Filter blog data based on the query
          const blogResults = blogData.filter(
            (item) =>
              item.name?.toLowerCase().includes(query?.toLowerCase()) ||
              item.author?.toLowerCase().includes(query?.toLowerCase()) ||
              item.description?.toLowerCase().includes(query?.toLowerCase())
          );
          setSearchResult(blogResults);
          break;
        default:
          setMisMatcheType(true);
          break;
      }
    }
  }, [query, type]);

  return (
    <>
      <Head>
        {/* SEO meta tags */}
        <title>Niraj Chaurasiya - Search {query}</title>
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
        <meta property="og:url" content="https://www.nirajchaurasiya.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags (for better sharing on Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Niraj Chaurasiya - Home" />
        <meta
          name="twitter:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta name="twitter:image" content="/favicon.ico" />
        <meta name="twitter:url" content="https://www.nirajchaurasiya.com/" />

        {/* Other meta tags */}
        <link
          rel="shortcut icon"
          href="/assests/logo.jpg"
          type="image/x-icon"
        />
      </Head>
      <ToastContainer />
      {misMatcheType ? (
        // search.css
        <div className="misMatchSearch">
          <h5>
            Sorry! but the provided type in the URL is not valid{" "}
            <span>{`${type}`}</span>
          </h5>
        </div>
      ) : searchResult.length > 0 ? (
        <div className="project-page_card" style={{ width: "80vw" }}>
          <div className="_project-pages_card">
            {searchResult?.map((item, index) => (
              <div key={index} className="item_card_project-pages">
                <Image
                  style={{ objectFit: "cover" }}
                  width={200}
                  height={200}
                  src={item.image}
                  alt=""
                />
                <div className="project-pages_heading">
                  <p>
                    {item?.project_title ? item?.project_title : item?.name}
                  </p>
                  {item?.blog ? (
                    <p>{item.description.slice(0, 70)}...</p>
                  ) : (
                    <p>{item.about.slice(0, 70)}...</p>
                  )}
                  {item?.blog ? <p>Author: {item?.author}</p> : ""}
                  {item?.blog ? <p>Created At: {item?.createdAt}</p> : ""}
                </div>
                {item?.blog ? (
                  <Link href={`/blog/${item?.index}/${item.name}`}>
                    <button>See More</button>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setHideProjectDesc(false);
                      setProjectPos(item.index);
                    }}
                  >
                    See Project
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="misMatchSearch">
          <p>No result found</p>
        </div>
      )}

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
