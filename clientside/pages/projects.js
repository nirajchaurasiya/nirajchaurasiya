import Head from "next/head";
import React, { useState } from "react";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import project from "./project/project.json";
import Project from "./project/Project";
export default function Projects() {
  const [project_all_data, setProject_all_data] = useState(project);
  const [hideProjectDesc, setHideProjectDesc] = useState(true);
  const [projectPos, setProjectPos] = useState("");
  return (
    <>
      <Head>
        <title>Niraj Chaurasiya - Projects</title>
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
