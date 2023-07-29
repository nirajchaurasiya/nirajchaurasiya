import React, { useEffect } from "react";
import project from "./project.json";
import { HiOutlineExternalLink } from "react-icons/hi";
import Image from "next/image";
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
